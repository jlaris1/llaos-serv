var mongoose = require('mongoose'),
    Tickets = mongoose.model('Tickets'),
    Usuarios = mongoose.model('Usuarios'),
    FechaHora = require('./fechahora'),
    zf = require('./zfill'),
    path = require('path'),
    fs = require('fs'),
    nodemailer = require('nodemailer');

    // Variables de conexión para envio de correo
	var smtpTransport = nodemailer.createTransport({
		host: 'mail.llaos.com',
		port: 587,
		secure: false,
		auth: {
			user: 'sistema@llaos.com',
			pass: '@SisWeb_2020!a'
		},
		tls: {
			rejectUnauthorized: false
		}
    });

module.exports = {
    // Método para mostrar la bandeja de tickets
    todos: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            if(solicitud.session.user.permisos == 'developer'){
                Tickets.find(function(error, tickets) {
                    Usuarios.populate(tickets, {path: 'usuario'}, function(error, tickets){
                        if(error){
                            console.log(error);
                        }else{
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else { 
                                    respuesta.render("Tickets/tickets", {
                                        user: solicitud.session.user,
                                        tickets: tickets,
                                        titulo: "Tickets",
                                        criterios: [
                                            {
                                                val: "",
                                                name: ""
                                            }
                                        ],
                                        piscinas: [
                                            {
                                                id: 0,
                                                nombre: ""
                                            }
                                        ],
                                        charoleros: [
                                            {
                                                id: 0,
                                                nombre: ""
                                            }   
                                        ],
                                        usuarios: usuarios,
                                        ruta: "tickets"
                                    });
                                }
                            });
                        };
                    });
                });
            }else{
                Tickets.find({ usuario: solicitud.session.user }, function(error, tickets){
                    Usuarios.populate(tickets, {path: 'usuario'}, function(error, tickets){
                        if(error){
                            console.log(error);
                        }else{
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else { 
                                    respuesta.render("Tickets/tickets", {
                                        user: solicitud.session.user,
                                        tickets: tickets,
                                        titulo: "Tickets",
                                        criterios: [
                                            {
                                                val: "",
                                                name: ""
                                            }
                                        ],
                                        piscinas: [
                                            {
                                                id: 0,
                                                nombre: ""
                                            }
                                        ],
                                        charoleros: [
                                            {
                                                id: 0,
                                                nombre: ""
                                            }   
                                        ],
                                        usuarios: usuarios,
                                        ruta: "tickets"
                                    });
                                }
                            });
                        };
                    });
                });
            }
        };
    },
    // Método para mostrar el formulario de nuevo ticket
    nuevo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Usuarios.find( function(error, usuarios){
                if(error){
                    console.log(error);
                } else { 
                    respuesta.render("Tickets/ticket", {
                        user: solicitud.session.user,
                        titulo: "Tickets",
                        criterios: [
                            {
                                val: "",
                                name: ""
                            }
                        ],
                        piscinas: [
                            {
                                id: 0,
                                nombre: ""
                            }
                        ],
                        charoleros: [
                            {
                                id: 0,
                                nombre: ""
                            }   
                        ],
                        usuarios: usuarios,
                        ruta: "tickets"
                    });
                }
            });
        };
    },
    // Método para registrar el ticket nuevo
    guardar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            var folioTicket;
            
            Tickets.find(function(error, ticks){
                if(error){
                    console.log(error);
                } else {
                    folioTicket = "TCK"+zf.zfill(ticks.length+1,5);
                    
                    var carpeta = './files/Tickets';
                    var carpetaTicket = '/'+folioTicket;
                    
                    fs.mkdir(carpeta+carpetaTicket, function(err){
                        if(err){
                            //console.log('ERROR: Falla detectada al crear la carpeta.', err);
                        } else{// Carpeta creada
                            //Considerar hacer todo aqui
                            //console.log('Carpeta creada con éxito.');
                        };
                    });
                    var cat = solicitud.body.categoria;
                    var subcat = '';
                    var prioridad = '';
                    switch(cat){
                        case 'Red/Internet':
                            subcat = solicitud.body.subcategoriaRed;
                            prioridad = subcat.split("-")[0];
                            subcat = subcat.split("-")[1];
                            break;
                        case 'Equipo de cómputo':
                            subcat = solicitud.body.subcategoriaHard;
                            prioridad = subcat.split("-")[0];
                            subcat = subcat.split("-")[1];
                            break;
                        case 'Software/Programas':
                            subcat = solicitud.body.subcategoriaSoft;
                            prioridad = subcat.split("-")[0];
                            subcat = subcat.split("-")[1];
                            break;
                        case 'Sistema Llaos':
                            subcat = solicitud.body.subcategoriaSistema;
                            prioridad = subcat.split("-")[0];
                            subcat = subcat.split("-")[1];
                            break;
                        case 'Correo':
                            subcat = solicitud.body.subcategoriaCorreo;
                            prioridad = subcat.split("-")[0];
                            subcat = subcat.split("-")[1];
                            break;
                        case 'Otro':
                            subcat = solicitud.body.otro;
                            prioridad = "Media";
                            break;
                        case '':
                            break;
                    }
                    var adjunto = solicitud.files.adjunto;
                    var adjuntoRuta = '';

                    if(adjunto != undefined){
                        adjuntoRuta = carpetaTicket+'/Adjunto'+path.extname(solicitud.files.adjunto.name);
                        adjunto.mv(carpeta+adjuntoRuta, function(error){
                            if(error){
                                //Que hacer si hay error al subir....
                                return respuesta.status(500).send(error);
                            }else{
                                //console.log("Adjunto subido exitosamente");
                            }
                        });
                    }else{
                        //console.log("No se halló archivo Adjunto.");
                    };
                    
                    var comentarios = new Array;
                    var data = {
                        usuario: solicitud.session.user,
                        folio: folioTicket,
                        titulo: solicitud.body.titulo,
                        categoria: cat,
                        subcategoria: subcat,
                        prioridad: prioridad,
                        solicitud: solicitud.body.solicitud,
                        imagen: adjuntoRuta,
                        fecha: FechaHora.obtenerfecha(),
                        hora: FechaHora.obtenerhora(),
                        estatus: "Nuevo",
                        comentarios: comentarios
                    };
        
                    var ticket = new Tickets(data);
        
                    ticket.save(function(error){
                        if(error){
                            console.log(error);
                        }else{
                            //Enviar correo de ticket nuevo
                            var mailOptions = {
                                from: 'Llaos Sist 1.0 <sistema@llaos.com>',
                                to: 'flopez@llaos.com; clopez@llaos.com',
                                cc: '',
                                subject: 'Nuevo Ticket ' + folioTicket,
                                html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
                                            "<html xmlns='http://www.w3.org/1999/xhtml'>" +
                                                "<head>" +
                                                    "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />" +
                                                    "<title>LLaos 1.0</title>" +
                                                    "<style type='text/css'>" +
                                                        "body {margin: 0; padding: 0; min-width: 100%!important;}" +
                                                        ".content {width: 100%; max-width: 600px;}" +
                                                        "@media only screen and (min-device-width: 601px) {" +
                                                        "	.content {width: 600px !important;}" +
                                                        "	.header {padding: 40px 30px 20px 30px;}" +
                                                        "}" +
                                                        "@media only screen and (min-device-width: 601px) {" +
                                                        "	.content {width: 600px !important;}" +
                                                        "	.col425 {width: 425px!important;}" +
                                                        "	.col380 {width: 380px!important;}" +
                                                        "}" +
                                                        "@media only screen and (max-width: 550px), screen and (max-device-width: 550px) {" +
                                                        "	body[yahoo] .buttonwrapper {background-color: transparent!important;}" +
                                                        "	body[yahoo] .button a {background-color: #e05443; padding: 15px 15px 13px!important; display: block!important;}" +
                                                        "}" +
                                                        ".col425 {width: 425px!important;}" +
                                                        ".subhead {font-size: 15px; color: #ffffff; font-family: sans-serif; letter-spacing: 10px;}" +
                                                        ".h1 {font-size: 33px; line-height: 38px; font-weight: bold;}" +
                                                        ".h1, .h2, .bodycopy {color: #153643; font-family: sans-serif;}" +
                                                        ".innerpadding {padding: 30px 30px 30px 30px; text-align: justify;}" +
                                                        ".borderbottom {border-bottom: 1px solid #f2eeed; text-align: justify;}" +
                                                        ".h2 {padding: 0 0 15px 0; font-size: 24px; line-height: 28px; font-weight: bold;}" +
                                                        ".bodycopy {font-size: 16px; line-height: 22px;  text-align: justify;}" +
                                                        ".button {text-align: center; font-size: 18px; font-family: sans-serif; font-weight: bold; padding: 0 30px 0 30px;}" +
                                                        ".button a {color: #ffffff; text-decoration: none;}" +
                                                        ".footer {padding: 20px 30px 15px 30px;}" +
                                                        ".footercopy {font-family: sans-serif; font-size: 14px; color: #ffffff;}" +
                                                        ".footercopy a {color: #ffffff; text-decoration: underline;}" +
                                                    "</style>" +
                                                "</head>" +
                                                "<body yahoo bgcolor='#f6f8f1'>" +
                                                    "<table width='100%' bgcolor='#f6f8f1' border='0' cellpadding='0' cellspacing='0'>" +
                                                        "<tr>" +
                                                            "<td>" +
                                                                "<!--[if (gte mso 9)|(IE)]>" +
                                                                "<table width='600' align='center' cellpadding='0' cellspacing='0' border='0'>" +
                                                                    "<tr>" +
                                                                        "<td>" +
                                                                            "<![endif]-->" +
                                                                            "<table class='content' align='center' cellpadding='0' cellspacing='0' border='0'>" +
                                                                                "<!-- HEADER -->" +
                                                                                "<tr>" +
                                                                                    "<td class='header' bgcolor='#c7d8a7'>" +
                                                                                        "<table width='70' align='left' border='0' cellpadding='0' cellspacing='0'>" +
                                                                                            "<tr>" +
                                                                                                "<td height='70' style='padding: 0 20px 20px 0;'>" +
                                                                                                    "<img src='cid:unique@headerMail' width='70' height='70' border='0' alt='' / >" +
                                                                                                "</td>" +
                                                                                            "</tr>" +
                                                                                        "</table>" +
                                                                                        "<!--[if (gte mso 9)|(IE)]>" +
                                                                                        "<table width='425' align='left' cellpadding='0' cellspacing='0' border='0'>" +
                                                                                            "<tr>" +
                                                                                                "<td>" +
                                                                                                "<![endif]-->" +
                                                                                                    "<table class='col425' align='left' border='0' cellpadding='0' cellspacing='0' style='width: 100%; max-width: 425px;'>" +
                                                                                                        "<tr>" +
                                                                                                            "<td height='70'>" +
                                                                                                                "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                                                    "<tr>" +
                                                                                                                        "<td class='subhead' style='padding: 0 0 0 3px;'>" +
                                                                                                                        "	LLAOS 1.0" +
                                                                                                                        "</td>" +
                                                                                                                    "</tr>" +
                                                                                                                    "<tr>" +
                                                                                                                        "<td class='h1' style='padding: 5px 0 0 0;'>" +
                                                                                                                        "	Tickets" +
                                                                                                                        "</td>" +
                                                                                                                    "</tr>" +
                                                                                                                "</table>" +
                                                                                                            "</td>" +
                                                                                                        "</tr>" +
                                                                                                    "</table>" + 
                                                                                                "<!--[if (gte mso 9)|(IE)]>" +
                                                                                                "</td>" +
                                                                                            "</tr>" +
                                                                                        "</table>" +
                                                                                        "<![endif]-->" +
                                                                                    "</td>" +
                                                                                "</tr>" +
                                                                                "<!-- CONTENIDO 1 -->" +
                                                                                "<tr>" +
                                                                                    "<td class='innerpadding borderbottom'>" +
                                                                                        "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                            "<tr>" +
                                                                                                "<td class='h2'>" +
                                                                                                "	Departamento de Sistemas:" +
                                                                                                "</td>" +
                                                                                            "</tr>" +
                                                                                            "<tr>" +
                                                                                                "<td class='bodycopy'>" +
                                                                                                "   Ha sido registrado un nuevo ticket por el usuario <b>"+solicitud.session.user.nombre+"</b> con el folio <b>"+ticket.folio+"</b>, " + 
                                                                                                "   el día <b>"+ticket.fecha+"</b> a las <b>"+ticket.hora+"</b>. " +
                                                                                                "   Dicho ticket lleva por título <b>'"+ticket.titulo+"'</b> con la categoría <b>"+ticket.categoria+"</b>, y cuenta "  +
                                                                                                "   con una prioridad <b>"+ticket.prioridad+"</b>."  +
                                                                                                "</td>" +
                                                                                            "</tr>" +
                                                                                        "</table>" +
                                                                                    "</td>" +
                                                                                "</tr>" +
                                                                                "<!-- CONTENIDO 3 -->" +
                                                                                "<tr>" +
                                                                                    "<td class='innerpadding borderbottom'>" +
                                                                                    "	Este correo ha sido generado en automático por el sistema" +
                                                                                    "	llaos 1.0, no responda al mismo ya que no tendrá respuesta" +
                                                                                    "	alguna." +
                                                                                    "<br>" +
                                                                                    "</td>" +
                                                                                "</tr>" +
                                                                                "<!-- FOOTER -->" +
                                                                                "<tr>" +
                                                                                    "<td class='footer' bgcolor='#44525f'>" +
                                                                                        "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                            "<tr>" +
                                                                                                "<td align='center' class='footercopy'>" +
                                                                                                "	&reg; Llaos Acuacultura S.A. de C.V. " + new Date().getFullYear() + 
                                                                                                "</td>" +
                                                                                            "</tr>" +
                                                                                        "</table>" +
                                                                                    "</td>" +
                                                                                "</tr>" +
                                                                            "</table>" +
                                                                            "<!--[if (gte mso 9)|(IE)]>" +
                                                                        "</td>" +
                                                                    "</tr>" +
                                                                "</table>" +
                                                                "<![endif]-->" +
                                                            "</td>" +
                                                        "</tr>" +
                                                    "</table>" +
                                                "</body>" +
                                            "</html>",
                                attachments:[
                                    {
                                        fileName: 'mail.png',
                                        path: './public/imgs/mail.png',
                                        cid: 'unique@headerMail'
                                    },
                                ]
                            }
                            smtpTransport.sendMail(mailOptions, function(error,res){
                                if(error){
                                    console.log(error);
                                }else{
                                    respuesta.redirect('/tickets');
                                }
                            });
                            smtpTransport.close();
                        };
                    });
                };
            });
        };
    },
    // Método para ver información del ticket
    ver: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Tickets.findById({"_id":solicitud.params.id}, function(error, ticket){
                if(error){
                    console.log(error);
                }else{
                    Usuarios.populate(ticket, {path: 'usuario'}, function(error, ticket){
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else { 
                                    respuesta.render("Tickets/detalles", {
                                        user: solicitud.session.user,
                                        ticket: ticket,
                                        titulo: "Tickets",
                                        criterios: [
                                            {
                                                val: "",
                                                name: ""
                                            }
                                        ],
                                        piscinas: [
                                            {
                                                id: 0,
                                                nombre: ""
                                            }
                                        ],
                                        charoleros: [
                                            {
                                                id: 0,
                                                nombre: ""
                                            }   
                                        ],
                                        usuarios: usuarios,
                                        ruta: "tickets"
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
    },
    // Método para asignar el ticket a un empleado de sistemas
    asignar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Tickets.findById({"_id":solicitud.params.id}, function(error, ticket){
                if(error){
                    console.log(error);
                }else{
                    var data = {};

                    if(ticket.estatus == 'Nuevo'){
                        data = {
                            encargado: solicitud.body.encargado,
                            estatus: 'Asignado'
                        }
                    }else{
                        data = {
                            encargado: solicitud.body.encargado
                        }
                    }

                    Tickets.updateOne({"_id": solicitud.params.id}, data, function(error){
                        respuesta.redirect('/tickets/ver/'+solicitud.params.id);
                    });
                };
            });
        }
    },
    // Método para hacer un comentario en el ticket
    comentar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Tickets.findById({"_id":solicitud.params.id}, function(error, ticket){
                if(error){
                    console.log(error);
                }else{
                    Usuarios.populate(ticket, {path: 'usuario'}, function(error, ticket){
                        if(error){
                            console.log(error);
                        } else {
                            var comentarios = ticket.comentarios;

                            var nuevoComentario = {
                                usuario: solicitud.session.user.nombre,
                                comentario: solicitud.body.comentario,
                                fecha: FechaHora.obtenerfecha(),
                                hora: FechaHora.obtenerhora()
                            }
                            
                            comentarios[ticket.comentarios.length] = nuevoComentario;
                            var data = {}
                            if(ticket.estatus == 'Asignado'){
                                if(solicitud.session.user.nombre == ticket.encargado){
                                    data = {
                                        comentarios: comentarios,
                                        estatus: 'En proceso'
                                    }
                                    //Enviar correo de ticket en proceso
                                    var mailOptions = {
                                        from: 'Llaos Sist 1.0 <sistema@llaos.com>',
                                        to: 'flopez@llaos.com; clopez@llaos.com',
                                        cc: '',
                                        subject: 'Ticket '+ticket.folio+' en proceso',
                                        html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
                                                    "<html xmlns='http://www.w3.org/1999/xhtml'>" +
                                                        "<head>" +
                                                            "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />" +
                                                            "<title>LLaos 1.0</title>" +
                                                            "<style type='text/css'>" +
                                                                "body {margin: 0; padding: 0; min-width: 100%!important;}" +
                                                                ".content {width: 100%; max-width: 600px;}" +
                                                                "@media only screen and (min-device-width: 601px) {" +
                                                                "	.content {width: 600px !important;}" +
                                                                "	.header {padding: 40px 30px 20px 30px;}" +
                                                                "}" +
                                                                "@media only screen and (min-device-width: 601px) {" +
                                                                "	.content {width: 600px !important;}" +
                                                                "	.col425 {width: 425px!important;}" +
                                                                "	.col380 {width: 380px!important;}" +
                                                                "}" +
                                                                "@media only screen and (max-width: 550px), screen and (max-device-width: 550px) {" +
                                                                "	body[yahoo] .buttonwrapper {background-color: transparent!important;}" +
                                                                "	body[yahoo] .button a {background-color: #e05443; padding: 15px 15px 13px!important; display: block!important;}" +
                                                                "}" +
                                                                ".col425 {width: 425px!important;}" +
                                                                ".subhead {font-size: 15px; color: #ffffff; font-family: sans-serif; letter-spacing: 10px;}" +
                                                                ".h1 {font-size: 33px; line-height: 38px; font-weight: bold;}" +
                                                                ".h1, .h2, .bodycopy {color: #153643; font-family: sans-serif;}" +
                                                                ".innerpadding {padding: 30px 30px 30px 30px; text-align: justify;}" +
                                                                ".borderbottom {border-bottom: 1px solid #f2eeed; text-align: justify;}" +
                                                                ".h2 {padding: 0 0 15px 0; font-size: 24px; line-height: 28px; font-weight: bold;}" +
                                                                ".bodycopy {font-size: 16px; line-height: 22px;  text-align: justify;}" +
                                                                ".button {text-align: center; font-size: 18px; font-family: sans-serif; font-weight: bold; padding: 0 30px 0 30px;}" +
                                                                ".button a {color: #ffffff; text-decoration: none;}" +
                                                                ".footer {padding: 20px 30px 15px 30px;}" +
                                                                ".footercopy {font-family: sans-serif; font-size: 14px; color: #ffffff;}" +
                                                                ".footercopy a {color: #ffffff; text-decoration: underline;}" +
                                                            "</style>" +
                                                        "</head>" +
                                                        "<body yahoo bgcolor='#f6f8f1'>" +
                                                            "<table width='100%' bgcolor='#f6f8f1' border='0' cellpadding='0' cellspacing='0'>" +
                                                                "<tr>" +
                                                                    "<td>" +
                                                                        "<!--[if (gte mso 9)|(IE)]>" +
                                                                        "<table width='600' align='center' cellpadding='0' cellspacing='0' border='0'>" +
                                                                            "<tr>" +
                                                                                "<td>" +
                                                                                    "<![endif]-->" +
                                                                                    "<table class='content' align='center' cellpadding='0' cellspacing='0' border='0'>" +
                                                                                        "<!-- HEADER -->" +
                                                                                        "<tr>" +
                                                                                            "<td class='header' bgcolor='#c7d8a7'>" +
                                                                                                "<table width='70' align='left' border='0' cellpadding='0' cellspacing='0'>" +
                                                                                                    "<tr>" +
                                                                                                        "<td height='70' style='padding: 0 20px 20px 0;'>" +
                                                                                                            "<img src='cid:unique@headerMail' width='70' height='70' border='0' alt='' / >" +
                                                                                                        "</td>" +
                                                                                                    "</tr>" +
                                                                                                "</table>" +
                                                                                                "<!--[if (gte mso 9)|(IE)]>" +
                                                                                                "<table width='425' align='left' cellpadding='0' cellspacing='0' border='0'>" +
                                                                                                    "<tr>" +
                                                                                                        "<td>" +
                                                                                                        "<![endif]-->" +
                                                                                                            "<table class='col425' align='left' border='0' cellpadding='0' cellspacing='0' style='width: 100%; max-width: 425px;'>" +
                                                                                                                "<tr>" +
                                                                                                                    "<td height='70'>" +
                                                                                                                        "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                                                            "<tr>" +
                                                                                                                                "<td class='subhead' style='padding: 0 0 0 3px;'>" +
                                                                                                                                "	LLAOS 1.0" +
                                                                                                                                "</td>" +
                                                                                                                            "</tr>" +
                                                                                                                            "<tr>" +
                                                                                                                                "<td class='h1' style='padding: 5px 0 0 0;'>" +
                                                                                                                                "	Tickets" +
                                                                                                                                "</td>" +
                                                                                                                            "</tr>" +
                                                                                                                        "</table>" +
                                                                                                                    "</td>" +
                                                                                                                "</tr>" +
                                                                                                            "</table>" + 
                                                                                                        "<!--[if (gte mso 9)|(IE)]>" +
                                                                                                        "</td>" +
                                                                                                    "</tr>" +
                                                                                                "</table>" +
                                                                                                "<![endif]-->" +
                                                                                            "</td>" +
                                                                                        "</tr>" +
                                                                                        "<!-- CONTENIDO 1 -->" +
                                                                                        "<tr>" +
                                                                                            "<td class='innerpadding borderbottom'>" +
                                                                                                "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                                    "<tr>" +
                                                                                                        "<td class='h2'>" +
                                                                                                        "	Estimado usuario "+ticket.usuario.nombre+":" +
                                                                                                        "</td>" +
                                                                                                    "</tr>" +
                                                                                                    "<tr>" +
                                                                                                        "<td class='bodycopy'>" +
                                                                                                        "   Su ticket, con el folio <b>"+ticket.folio+"</b> ha sido asignado a <b>"+solicitud.session.user.nombre+"</b>, "+
                                                                                                        "   quien ha analizado su situación y ofrecerá " +
                                                                                                        "   su atención en la brevedad. Se le pide de su paciencia para proporcionar la mejor de las soluciones. "  +
                                                                                                        "   Siéntase con la libertad de comunicarse con el Departamento de Sistemas comentando su ticket." + 
                                                                                                        "</td>" +
                                                                                                    "</tr>" +
                                                                                                "</table>" +
                                                                                            "</td>" +
                                                                                        "</tr>" +
                                                                                        "<!-- CONTENIDO 3 -->" +
                                                                                        "<tr>" +
                                                                                            "<td class='innerpadding borderbottom'>" +
                                                                                            "	Este correo ha sido generado en automático por el sistema" +
                                                                                            "	llaos 1.0, no responda al mismo ya que no tendrá respuesta" +
                                                                                            "	alguna." +
                                                                                            "<br>" +
                                                                                            "</td>" +
                                                                                        "</tr>" +
                                                                                        "<!-- FOOTER -->" +
                                                                                        "<tr>" +
                                                                                            "<td class='footer' bgcolor='#44525f'>" +
                                                                                                "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                                    "<tr>" +
                                                                                                        "<td align='center' class='footercopy'>" +
                                                                                                        "	&reg; Llaos Acuacultura S.A. de C.V. " + new Date().getFullYear() + 
                                                                                                        "</td>" +
                                                                                                    "</tr>" +
                                                                                                "</table>" +
                                                                                            "</td>" +
                                                                                        "</tr>" +
                                                                                    "</table>" +
                                                                                    "<!--[if (gte mso 9)|(IE)]>" +
                                                                                "</td>" +
                                                                            "</tr>" +
                                                                        "</table>" +
                                                                        "<![endif]-->" +
                                                                    "</td>" +
                                                                "</tr>" +
                                                            "</table>" +
                                                        "</body>" +
                                                    "</html>",
                                        attachments:[
                                            {
                                                fileName: 'mail.png',
                                                path: './public/imgs/mail.png',
                                                cid: 'unique@headerMail'
                                            }
                                        ]
                                    }
                                    smtpTransport.sendMail(mailOptions, function(error,res){
                                        if(error){
                                            console.log(error);
                                        }
                                    });
                                    smtpTransport.close();
                                }else{
                                    data = {
                                        comentarios: comentarios
                                    }
                                }
                            }else{
                                data = {
                                    comentarios: comentarios
                                }
                            }
                            
                            Tickets.updateOne({"_id": solicitud.params.id}, data, function(error){
                                respuesta.redirect('/tickets/ver/'+solicitud.params.id);
                            });
                        };
                    });
                };
            });
        };
    },
    // Método para cancelar el ticket
    cancelar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            var data = {
                estatus: "Cancelado"
            }

            Tickets.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(error);
                } else {
                    respuesta.redirect("/tickets");
                }
            });
        };
    },
    // Método para finalizar el ticket
    finalizar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            var data = {
                estatus: "Cerrado"
            }

            Tickets.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(error);
                } else {
                    respuesta.redirect("/tickets");
                }
            });
        };
    }
}