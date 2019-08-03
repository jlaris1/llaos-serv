var mongoose = require('mongoose');
    Requisiciones = mongoose.model('Requisiciones');
    RequisicionesOld = mongoose.model('RequisicionesOld');
    ArticulosRequisiciones = mongoose.model('ArticulosRequisiciones');
    Usuarios = mongoose.model('Usuarios');
    FechaHora = require('./fechahora');
    zf = require('./zfill');
    nodemailer = require('nodemailer');
	pdf = require('pdfkit');
	fs = require('fs');
    fileUpload = require('express-fileupload');
    path = require('path');

    var file_path = './files/';

    // Variables de conexión para envio de correo
	var smtpTransport = nodemailer.createTransport({
		host: 'mail.llaos.com',
		port: 587,
		secure: false,
		auth: {
			user: 'sistema@llaos.com',
			pass: '@Llaos2018'
		},
		tls: {
			rejectUnauthorized: false
		}
	});
    
    // Cambiar dependiendo lo necesario
    //var pag_sistema = "http://llaos.ddns.net:3000";
    var pag_sistema = "http://201.107.5.12:3000";

    // Solo para pruebas sistemas
    //var pag_sistema = "http://localhost:3000";


    module.exports = {
    allOlds: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            if (solicitud.session.user.permisos == "compras"){
                RequisicionesOld.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            respuesta.render("Requisiciones/requisicionesold", {
                                user: solicitud.session.user,
                                requisiciones: requisiciones,
                                usuarios: usuarios,
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
                                url: ''
                            });
                        }).sort({ nombre : 1});
                    }
                });
            } else if (solicitud.session.user.permisos == 'developer' || solicitud.session.user.permisos == "admin") {
                RequisicionesOld.find( function(error, requisiciones){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            respuesta.render("Requisiciones/requisicionesold", {
                                user: solicitud.session.user,
                                requisiciones: requisiciones,
                                usuarios: usuarios,
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
                                url: ''
                            });
                        }).sort({ nombre : 1});
                    }
                });
            } else if (solicitud.session.user.permisos == "usuario"){
                RequisicionesOld.find({ "solicita": solicitud.session.user.nombre } , function(error, requisiciones){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            respuesta.render("Requisiciones/requisicionesold", {
                                user: solicitud.session.user,
                                requisiciones: requisiciones,
                                usuarios: usuarios,
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
                                url: ''
                            });
                        }).sort({ nombre : 1});
                    }
                });
            } else if (solicitud.session.user.permisos == "owner"){
                RequisicionesOld.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            respuesta.render("Requisiciones/requisicionesold", {
                                user: solicitud.session.user,
                                requisiciones: requisiciones,
                                usuarios: usuarios,
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
                                url: ''
                            });
                        }).sort({ nombre : 1});
                    }
                });
            } else if (solicitud.session.user.permisos == "supervisor"){ // REVISAR BIEN QUE MOSTRARA
                RequisicionesOld.find( function(error, requisiciones){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            respuesta.render("Requisiciones/requisicionesold", {
                                user: solicitud.session.user,
                                requisiciones: requisiciones,
                                usuarios: usuarios,
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
                                url: ''
                            });
                        }).sort({ nombre : 1});
                    }
                });
            }
        };
    },
	// Ver todas las requisiciones hechas por autorizador
    todos: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            if (solicitud.session.user.permisos == "compras"){
                Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            respuesta.render("Requisiciones/requisiciones", {
                                user: solicitud.session.user,
                                requisiciones: requisiciones,
                                titulo: "Requisiciones",
                                criterios: [
                                    {
                                        val: "area",
                                        name: "Área"
                                    },
                                    {
                                        val: "modulo",
                                        name: "Módulo"
                                    },
                                    {
                                        val: "responsable",
                                        name: "Responsable"
                                    },
                                    {
                                        val: "solicita",
                                        name: "Solicita"
                                    },
                                    {
                                        val: "estatus",
                                        name: "Estatus"
                                    },
                                    {
                                        val: "fecha",
                                        name: "Fecha"
                                    },
                                    {
                                        val: "fechas",
                                        name: "Fechas"
                                    }
                                ],
                                usuarios: usuarios,
                                ruta: "requisiciones",
                                url: '',
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
                            });
                        }).sort({ nombre : 1});
                    }
                }).sort({ fecha : 1});
            } else if (solicitud.session.user.permisos == 'developer' || solicitud.session.user.permisos == "admin") {
                Requisiciones.find( function(error, requisiciones){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            respuesta.render("Requisiciones/requisiciones", {
                                user: solicitud.session.user,
                                requisiciones: requisiciones,
                                usuarios: usuarios,
                                titulo: "Requisiciones",
                                criterios: [
                                    {
                                        val: "area",
                                        name: "Área"
                                    },
                                    {
                                        val: "modulo",
                                        name: "Módulo"
                                    },
                                    {
                                        val: "responsable",
                                        name: "Responsable"
                                    },
                                    {
                                        val: "solicita",
                                        name: "Solicita"
                                    },
                                    {
                                        val: "estatus",
                                        name: "Estatus"
                                    },
                                    {
                                        val: "fecha",
                                        name: "Fecha"
                                    },
                                    {
                                        val: "fechas",
                                        name: "Fechas"
                                    }
                                ],
                                usuarios: usuarios,
                                ruta: "requisiciones",
                                url: '',
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
                            });
                        }).sort({ nombre : 1});
                    }
                }).sort({ fecha : 1});
            } else if (solicitud.session.user.permisos == "usuario"){
                Requisiciones.find({ "solicita": solicitud.session.user.nombre } , function(error, requisiciones){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            respuesta.render("Requisiciones/requisiciones", {
                                user: solicitud.session.user,
                                requisiciones: requisiciones,
                                usuarios: usuarios,
                                titulo: "Requisiciones",
                                criterios: [
                                    {
                                        val: "area",
                                        name: "Área"
                                    },
                                    {
                                        val: "modulo",
                                        name: "Módulo"
                                    },
                                    {
                                        val: "responsable",
                                        name: "Responsable"
                                    },
                                    {
                                        val: "solicita",
                                        name: "Solicita"
                                    },
                                    {
                                        val: "estatus",
                                        name: "Estatus"
                                    },
                                    {
                                        val: "fecha",
                                        name: "Fecha"
                                    },
                                    {
                                        val: "fechas",
                                        name: "Fechas"
                                    }
                                ],
                                usuarios: usuarios,
                                ruta: "requisiciones",
                                url: '',
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
                            });
                        }).sort({ nombre : 1});
                    }
                }).sort({ fecha : 1});
            } else if (solicitud.session.user.permisos == "owner"){
                Requisiciones.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            respuesta.render("Requisiciones/requisiciones", {
                                user: solicitud.session.user,
                                requisiciones: requisiciones,
                                usuarios: usuarios,
                                titulo: "Requisiciones",
                                criterios: [
                                    {
                                        val: "area",
                                        name: "Área"
                                    },
                                    {
                                        val: "modulo",
                                        name: "Módulo"
                                    },
                                    {
                                        val: "responsable",
                                        name: "Responsable"
                                    },
                                    {
                                        val: "solicita",
                                        name: "Solicita"
                                    },
                                    {
                                        val: "estatus",
                                        name: "Estatus"
                                    },
                                    {
                                        val: "fecha",
                                        name: "Fecha"
                                    },
                                    {
                                        val: "fechas",
                                        name: "Fechas"
                                    }
                                ],
                                usuarios: usuarios,
                                ruta: "requisiciones",
                                url: '',
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
                            });
                        }).sort({ nombre : 1});
                    }
                }).sort({ fecha : 1});
            } else if (solicitud.session.user.permisos == "supervisor"){ // REVISAR BIEN QUE MOSTRARA
                Requisiciones.find( function(error, requisiciones){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            respuesta.render("Requisiciones/requisiciones", {
                                user: solicitud.session.user,
                                requisiciones: requisiciones,
                                usuarios: usuarios,
                                titulo: "Requisiciones",
                                criterios: [
                                    {
                                        val: "area",
                                        name: "Área"
                                    },
                                    {
                                        val: "modulo",
                                        name: "Módulo"
                                    },
                                    {
                                        val: "responsable",
                                        name: "Responsable"
                                    },
                                    {
                                        val: "solicita",
                                        name: "Solicita"
                                    },
                                    {
                                        val: "estatus",
                                        name: "Estatus"
                                    },
                                    {
                                        val: "fecha",
                                        name: "Fecha"
                                    },
                                    {
                                        val: "fechas",
                                        name: "Fechas"
                                    }
                                ],
                                usuarios: usuarios,
                                ruta: "requisiciones",
                                url: '',
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
                            });
                        }).sort({ nombre : 1});
                    }
                }).sort({ fecha : 1});
            }
        };
    },
    // Ver todas las requisiciones canceladas
    canceladas: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Requisiciones.find({"estatus": "Cancelada"}, function(error, canceladas){
                if(error){
                    console.log(error);
                } else {
                    Usuarios.find( function(error, usuarios){
                        respuesta.render("Requisiciones/requisiciones", {
                            user: solicitud.session.user,
                            requisiciones: canceladas,
                            titulo: "",
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
                            usuarios: usuarios
                        });
                    });
                }
            });
        };
    },
    // Crear nueva requisición
    nueva: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Usuarios.find({ "autorizador": "true" }, function(error, usuarios){
                if(error){
                    console.log(error);
                } else {
                    respuesta.render("Requisiciones/requisicion",{
                        user: solicitud.session.user,
                        listaRequisicion: {},
                        usuarios: usuarios,
                        req: {
                            codigoRequi: 'REQ00000',
                            uso: ''
                        },
                        titulo: "",
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
                    });
                } 
            });
        };
    },
    // Guardar requisición en BD con sus artículos agregados.
    guardar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            if (solicitud.body.codigo === 'undefined'){
                var numReqs = 0;

                Requisiciones.find( function(error, requisiciones){
                    if(error){
                        console.log(error);
                    } else {
                        numReqs = requisiciones.length + 1;

                        var data = {
                            area: solicitud.body.area,
                            modulo: solicitud.body.modulo,
                            solicita: solicitud.session.user.nombre,
                            responsable: solicitud.body.responsable,
                            uso: solicitud.body.uso,
                            estatus: 'Nueva',
                            fecha: new Date(),
                            hora: FechaHora.obtenerhora(),
                            codigoRequi: 'REQ' + zf.zfill(numReqs, 5)	
                        }

                        var requisicion = new Requisiciones(data);
                    
                        requisicion.save(function(error, result){
                            if(error){
                                console.log(error);
                            }else{

                                var prov = '';

                                if(solicitud.body.proveedor == 'on')	{
                                    prov = true;
                                } else {
                                    prov = false;
                                }

                                var data2 = {
                                    codigoRequisicion: result._id,
                                    cantidad: solicitud.body.cantidad,
                                    unidad: solicitud.body.unidad,
                                    descripcion: solicitud.body.descripcion,
                                    estatus: solicitud.body.estatus,
                                    proveedor: prov,
                                    nombreProveedor: solicitud.body.nombreProveedor,
                                    telefonoProveedor: solicitud.body.telefonoProveedor,
                                    correoProveedor: solicitud.body.correoProveedor
                                }
                    
                                console.log(data2);

                                var articuloReq = new ArticulosRequisiciones(data2);
                    
                                articuloReq.save(function(error){
                                    if(error){
                                        console.log(error);
                                    }else{
                                        ArticulosRequisiciones.find({'codigoRequisicion': result._id}, function(error, listaRequisiciones){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Requisiciones.findById({'_id': result._id}, function(error, req){
                                                    if(error){
                                                        console.log(error);
                                                    } else {
                                                        Usuarios.find( function(error, usuarios){
                                                            if(error){
                                                                console.log(error);
                                                            } else {

                                                                console.log(req);

                                                                respuesta.render("Requisiciones/requisicion",{
                                                                    user: solicitud.session.user,
                                                                    req: req,
                                                                    listaRequisicion: listaRequisiciones,
                                                                    usuarios: usuarios,
                                                                    titulo: "",
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
                                                                });
                                                            } 
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                
                var prov = '';

                if(solicitud.body.proveedor == 'on')	{
                    prov = true;
                } else {
                    prov = false;
                }
                
                var data1 = {
                    codigoRequisicion: solicitud.body.codigo,
                    cantidad: solicitud.body.cantidad,
                    unidad: solicitud.body.unidad,
                    descripcion: solicitud.body.descripcion,
                    estatus: solicitud.body.estatus,
                    proveedor: prov,
                    nombreProveedor: solicitud.body.nombreProveedor,
                    telefonoProveedor: solicitud.body.telefonoProveedor,
                    correoProveedor: solicitud.body.correoProveedor
                }

                var articuloReq = new ArticulosRequisiciones(data1);

                articuloReq.save(function(error){
                    if(error){
                        console.log(error);
                    }else{
                        ArticulosRequisiciones.find({'codigoRequisicion': solicitud.body.codigo}, function(error, listaRequisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Requisiciones.findOne({'_id': solicitud.body.codigo}, function(error, req){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        Usuarios.find( function(error, usuarios){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                respuesta.render("Requisiciones/requisicion",{
                                                    user: solicitud.session.user,
                                                    req: req,
                                                    listaRequisicion: listaRequisiciones,
                                                    usuarios: usuarios,
                                                    codReq: req.codigoRequi,
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
                                                });
                                            } 
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        };
    },
    // Autorizar requisición
    autorizar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var data = {
                estatus: "Autorizada"
            }

            var id_req = solicitud.params.id;

            Requisiciones.updateOne({"_id": id_req}, data, function(error){
                if(error){
                    console.log(error);
                } else {
                    Requisiciones.findById({ "_id":id_req }, function(error, req){
                        Usuarios.findOne({"nombre": req.solicita}, function(error, usuario){
                            var mailOptions = {
                                from: 'Llaos Sist 1.0 <sistema@llaos.com>',
                                to: 'jcuamea@llaos.com',
                                cco: 'flopez@llaos.com',
                                subject: 'Requisición autorizada',
                                html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
                                            "<html xmlns='http://www.w3.org/1999/xhtml'>" +
                                                "<head>" +
                                                    "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />" +
                                                    "<title>Requisiciones LLaos 1.0</title>" +
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
                                                                                                                        "	Requisiciones" +
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
                                                                                                "	Estimado usuario:" +
                                                                                                "</td>" +
                                                                                            "</tr>" +
                                                                                            "<tr>" +
                                                                                                "<td class='bodycopy'>" +
                                                                                                "	La solicitud de requisición con el código <strong>" + req.id + "</strong> para el área de <strong>" + req.area + "</strong> y que se " +  
                                                                                                " 	utilizara en <strong>" + req.uso + "</strong>, ha sido autorizada. Para ver la requisición puede entrar al sistema y verificarla." +
                                                                                                "</td>" +
                                                                                            "</tr>" +
                                                                                            "<tr>" +
                                                                                                "<td style='padding: 20px 0 0 0;'>" +
                                                                                                    "<table class='buttonwrapper' bgcolor='#e05443' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                                        "<tr>" +
                                                                                                            "<td class='button' height='45'>" +
                                                                                                            "<a href='" + pag_sistema + "'>Ir al sistema</a>" +
                                                                                                            "</td>" +
                                                                                                        "</tr>" +
                                                                                                    "</table>" +
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
                                                                                    "	alguna, si usted no es un usuario que autoriza Requisiciones" +
                                                                                    "	favor de reportar el insidente al departamento de sistemas." +
                                                                                    "<br>" +
                                                                                    "<br>" +
                                                                                    "	Cualquier problema para abrir la requisición o el sistema" +
                                                                                    "	favor de reportar al departamento de sistemas." +
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
                                        Name: 'mail.png',
                                        path: './public/imgs/mail.png',
                                        cid: 'unique@headerMail'
                                    },
                                ]
                            }
                        
                            smtpTransport.sendMail(mailOptions, function(error,res){
                                if(error){
                                    console.log(error);
                                    return false;
                                }else{
                                    console.log(res)
                                    Requisiciones.find( function(error, requisiciones){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            if (solicitud.session.user.permisos == "compras"){
                                                Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                                                    if(error){
                                                        console.log(error);
                                                    } else {
                                                        Usuarios.find( function(error, usuarios){
                                                            respuesta.render("Requisiciones/requisiciones", {
                                                                user: solicitud.session.user,
                                                                requisiciones: requisiciones,
                                                                usuarios: usuarios,
                                                                titulo: "Requisiciones",
                                                                criterios: [
                                                                    {
                                                                        val: "area",
                                                                        name: "Área"
                                                                    },
                                                                    {
                                                                        val: "modulo",
                                                                        name: "Módulo"
                                                                    },
                                                                    {
                                                                        val: "responsable",
                                                                        name: "Responsable"
                                                                    },
                                                                    {
                                                                        val: "solicita",
                                                                        name: "Solicita"
                                                                    },
                                                                    {
                                                                        val: "estatus",
                                                                        name: "Estatus"
                                                                    },
                                                                    {
                                                                        val: "fecha",
                                                                        name: "Fecha"
                                                                    },
                                                                    {
                                                                        val: "fechas",
                                                                        name: "Fechas"
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
                                                            });
                                                        });
                                                    }
                                                });
                                            } else {
                                                console.log(solicitud.session.user._id);
                                                Requisiciones.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                                                    if(error){
                                                        console.log(error);
                                                    } else {
                                                        Usuarios.find( function(error, usuarios){
                                                            respuesta.render("Requisiciones/requisiciones", {
                                                                user: solicitud.session.user,
                                                                requisiciones: requisiciones,
                                                                usuarios: usuarios,
                                                                titulo: "Requisciones",
                                                                criterios: [
                                                                    {
                                                                        val: "area",
                                                                        name: "Área"
                                                                    },
                                                                    {
                                                                        val: "modulo",
                                                                        name: "Módulo"
                                                                    },
                                                                    {
                                                                        val: "responsable",
                                                                        name: "Responsable"
                                                                    },
                                                                    {
                                                                        val: "solicita",
                                                                        name: "Solicita"
                                                                    },
                                                                    {
                                                                        val: "estatus",
                                                                        name: "Estatus"
                                                                    },
                                                                    {
                                                                        val: "fecha",
                                                                        name: "Fecha"
                                                                    },
                                                                    {
                                                                        val: "fechas",
                                                                        name: "Fechas"
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
                                                            });
                                                        });
                                                    }
                                                });
                                            }	
                                        }
                                    });
                                    console.log("Correo enviado!")
                                    return true;
                                }
                                //
                                smtpTransport.close();
                            });
                            //Creo que se debe cerrar aca
                            //smtpTransport.close();
                        });
                    });
                }
            });
        };
    },
    // Cancelar requisición
    cancelar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var data = {
                estatus: "Cancelada"
            }

            Requisiciones.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(error);
                } else {
                    if (solicitud.session.user.permisos == "compras"){
                        Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        usuarios: usuarios,
                                        titulo: "Requisiciones",
                                        criterios: [
                                            {
                                                val: "area",
                                                name: "Área"
                                            },
                                            {
                                                val: "modulo",
                                                name: "Módulo"
                                            },
                                            {
                                                val: "responsable",
                                                name: "Responsable"
                                            },
                                            {
                                                val: "solicita",
                                                name: "Solicita"
                                            },
                                            {
                                                val: "estatus",
                                                name: "Estatus"
                                            },
                                            {
                                                val: "fecha",
                                                name: "Fecha"
                                            },
                                            {
                                                val: "fechas",
                                                name: "Fechas"
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
                                    });
                                });
                            }
                        });
                    } else {
                        console.log(solicitud.session.user._id);
                        Requisiciones.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        usuarios: usuarios,
                                        titulo: "Requisiciones",
                                        criterios: [
                                            {
                                                val: "area",
                                                name: "Área"
                                            },
                                            {
                                                val: "modulo",
                                                name: "Módulo"
                                            },
                                            {
                                                val: "responsable",
                                                name: "Responsable"
                                            },
                                            {
                                                val: "solicita",
                                                name: "Solicita"
                                            },
                                            {
                                                val: "estatus",
                                                name: "Estatus"
                                            },
                                            {
                                                val: "fecha",
                                                name: "Fecha"
                                            },
                                            {
                                                val: "fechas",
                                                name: "Fechas"
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
                                    });
                                });
                            }
                        });
                    }	
                }
            });
        };
    },
    // Cerrar requisición
    cerrar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var data = {
                estatus: "Cerrada"
            }

            Requisiciones.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(error);
                } else {
                    if (solicitud.session.user.permisos == "compras"){
                        Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        usuarios: usuarios,
                                        titulo: "Requisiciones",
                                        criterios: [
                                            {
                                                val: "area",
                                                name: "Área"
                                            },
                                            {
                                                val: "modulo",
                                                name: "Módulo"
                                            },
                                            {
                                                val: "responsable",
                                                name: "Responsable"
                                            },
                                            {
                                                val: "solicita",
                                                name: "Solicita"
                                            },
                                            {
                                                val: "estatus",
                                                name: "Estatus"
                                            },
                                            {
                                                val: "fecha",
                                                name: "Fecha"
                                            },
                                            {
                                                val: "fechas",
                                                name: "Fechas"
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
                                        url: ''
                                    });
                                });
                            }
                        });
                    } else if (solicitud.session.user.permisos == 'developer' || solicitud.session.user.permisos == "admin") {
                        Requisiciones.find( function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        usuarios: usuarios,
                                        titulo: "Requisiciones",
                                        criterios: [
                                            {
                                                val: "area",
                                                name: "Área"
                                            },
                                            {
                                                val: "modulo",
                                                name: "Módulo"
                                            },
                                            {
                                                val: "responsable",
                                                name: "Responsable"
                                            },
                                            {
                                                val: "solicita",
                                                name: "Solicita"
                                            },
                                            {
                                                val: "estatus",
                                                name: "Estatus"
                                            },
                                            {
                                                val: "fecha",
                                                name: "Fecha"
                                            },
                                            {
                                                val: "fechas",
                                                name: "Fechas"
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
                                        url: ''
                                    });
                                });
                            }
                        });
                    } else if (solicitud.session.user.permisos == "usuario"){
                        Requisiciones.find({ "solicita": solicitud.session.user.nombre } , function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        usuarios: usuarios,
                                        titulo: "Requisiciones",
                                        criterios: [
                                            {
                                                val: "area",
                                                name: "Área"
                                            },
                                            {
                                                val: "modulo",
                                                name: "Módulo"
                                            },
                                            {
                                                val: "responsable",
                                                name: "Responsable"
                                            },
                                            {
                                                val: "solicita",
                                                name: "Solicita"
                                            },
                                            {
                                                val: "estatus",
                                                name: "Estatus"
                                            },
                                            {
                                                val: "fecha",
                                                name: "Fecha"
                                            },
                                            {
                                                val: "fechas",
                                                name: "Fechas"
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
                                        url: ''
                                    });
                                });
                            }
                        });
                    } else if (solicitud.session.user.permisos == "owner"){
                        Requisiciones.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        usuarios: usuarios,
                                        titulo: "Requisiciones",
                                        criterios: [
                                            {
                                                val: "area",
                                                name: "Área"
                                            },
                                            {
                                                val: "modulo",
                                                name: "Módulo"
                                            },
                                            {
                                                val: "responsable",
                                                name: "Responsable"
                                            },
                                            {
                                                val: "solicita",
                                                name: "Solicita"
                                            },
                                            {
                                                val: "estatus",
                                                name: "Estatus"
                                            },
                                            {
                                                val: "fecha",
                                                name: "Fecha"
                                            },
                                            {
                                                val: "fechas",
                                                name: "Fechas"
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
                                        url: ''
                                    });
                                });
                            }
                        });
                    } else if (solicitud.session.user.permisos == "supervisor"){ // REVISAR BIEN QUE MOSTRARA
                        Requisiciones.find( function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        usuarios: usuarios,
                                        titulo: "Requisiciones",
                                        criterios: [
                                            {
                                                val: "area",
                                                name: "Área"
                                            },
                                            {
                                                val: "modulo",
                                                name: "Módulo"
                                            },
                                            {
                                                val: "responsable",
                                                name: "Responsable"
                                            },
                                            {
                                                val: "solicita",
                                                name: "Solicita"
                                            },
                                            {
                                                val: "estatus",
                                                name: "Estatus"
                                            },
                                            {
                                                val: "fecha",
                                                name: "Fecha"
                                            },
                                            {
                                                val: "fechas",
                                                name: "Fechas"
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
                                        url: ''
                                    });
                                });
                            }
                        });
                    }
                }
            });
        };
    },
    // Ver datos de requisición
    ver: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Requisiciones.findOne({"_id": solicitud.params.id}, function(error, requisicion){
                if(error){
                    console.log(error);
                } else {
                    ArticulosRequisiciones.find({"codigoRequisicion": requisicion.id}, function(error, articulos){
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(errro);
                                } else {
                                    respuesta.render("Requisiciones/view",{
                                        req: requisicion,
                                        user: solicitud.session.user,
                                        listaRequisicion: articulos,
                                        usuarios: usuarios,
                                        codReq: requisicion.codigoRequi,
                                        titulo: "",
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
                                    });
                                }
                            });
                        }
                    })
                }
            });
        };
    },
    verAnteriores: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            RequisicionesOld.findOne({"_id": solicitud.params.id}, function(error, requisicion){
                if(error){
                    console.log(error);
                } else {
                    ArticulosRequisiciones.find({"codigoRequisicion": requisicion.id}, function(error, articulos){
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(errro);
                                } else {
                                    respuesta.render("Requisiciones/viewold",{
                                        req: requisicion,
                                        user: solicitud.session.user,
                                        listaRequisicion: articulos,
                                        usuarios: usuarios,
                                        codReq: requisicion.codigoRequi,
                                        titulo: "",
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
                                    });
                                }
                            });
                        }
                    })
                }
            });
        };
    },
    // Ver datos de requisición redireccionado desde correo
    verReqCorreo: function(solicitud, respuesta){
        Usuarios.findById({"_id": solicitud.params.id_usr}, function(error, user){
            if(error){
                console.log(error);
                //respuesta.redirect("/sesion-expirada");
            }else{
                // Crear sesión
                solicitud.session.user = user;

                Requisiciones.findOne({"_id": solicitud.params.id}, function(error, requisicion){
                    if(error){
                        console.log(error);
                    } else {
                        ArticulosRequisiciones.find({"codigoRequisicion": requisicion.id}, function(error, articulos){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        respuesta.render("Requisiciones/view",{
                                            req: requisicion,
                                            user: user,
                                            listaRequisicion: articulos,
                                            usuarios: usuarios,
                                            titulo: "Requisiciones",
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
                                            codReq: requisicion.codigoRequi
                                        });
                                    }
                                });
                            }
                        })
                    }
                });
            }
        });
    },
    // Editar datos de requisición
    editarRequisicion: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Requisiciones.findOne({"_id": solicitud.params.id}, function(error, requisicion){
                if(error){
                    console.log(error);
                } else {
                    ArticulosRequisiciones.find({"codigoRequisicion": requisicion.id}, function(error, articulos){
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find({ "autorizador": true }, function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else {
                                    respuesta.render("Requisiciones/editar",{
                                        req: requisicion,
                                        user: solicitud.session.user,
                                        listaRequisicion: articulos,
                                        articulo: {},
                                        usuarios: usuarios,
                                        codReq: requisicion.codigoRequi,
                                        titulo: "Requisiciones",
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
                                    });
                                }
                            });
                        }
                    })
                }
            });
        };
    },
    // Editar artículo agregado a requisición
    editarArticulo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Requisiciones.findOne({"_id": solicitud.params.req_id}, function(error, requisicion){
                if(error){
                    console.log(error);
                } else {
                    ArticulosRequisiciones.find({"codigoRequisicion": requisicion.id}, function(error, articulos){
                        if(error){
                            console.log(error);
                        } else {
                            ArticulosRequisiciones.findOne({"_id": solicitud.params.id}, function(error, articulo){
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.find({ "autorizador": true }, function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            respuesta.render("Requisiciones/editar",{
                                                req: requisicion,
                                                user: solicitud.session.user,
                                                listaRequisicion: articulos,
                                                articulo: articulo,
                                                usuarios: usuarios,
                                                titulo: "Requisiciones",
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
                                                codReq: requisicion.codigoRequi,
                                                updArt: true
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    })
                }
            });
        };
    },
    // Actualizar solo requisición
    actualizarSoloRequisicion: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var data = { 
                area: solicitud.body.area,
                modulo: solicitud.body.modulo,
                responsable: solicitud.body.responsable,
                estatus: solicitud.body.status,
                uso: solicitud.body.uso
            }

            Requisiciones.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(error);
                } else {
                    if (solicitud.session.user.permisos == "compras"){
                        Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        usuarios: usuarios,
                                        titulo: "Requisiciones",
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
                                        url: ''
                                    });
                                });
                            }
                        });
                    } else if (solicitud.session.user.permisos == 'developer' || solicitud.session.user.permisos == "admin") {
                        Requisiciones.find( function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        titulo: "Requisiciones",
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
                                        url: ''
                                    });
                                });
                            }
                        });
                    } else if (solicitud.session.user.permisos == "usuario"){
                        Requisiciones.find({ "solicita": solicitud.session.user.nombre } , function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        titulo: "Requisiciones",
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
                                        url: ''
                                    });
                                });
                            }
                        });
                    } else if (solicitud.session.user.permisos == "owner"){
                        Requisiciones.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        titulo: "Requisiciones",
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
                                        url: ''
                                    });
                                });
                            }
                        });
                    } else if (solicitud.session.user.permisos == "supervisor"){ // REVISAR BIEN QUE MOSTRARA
                        Requisiciones.find( function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        titulo: "Requisiciones",
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
                                        url: ''
                                    });
                                });
                            }
                        });
                    }	
                }
            });
        };
    },
    // Actualizar requisición y artículo en requisición
    actualizarReqArt: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var dataReq = { 
                area: solicitud.body.area,
                modulo: solicitud.body.modulo,
                responsable: solicitud.body.responsable,
                estatus: solicitud.body.status,
                uso: solicitud.body.uso,
            }

            var dataArt = {
                codigoRequisicion: solicitud.body.codigo,
                cantidad: solicitud.body.cantidad,
                unidad: solicitud.body.unidad,
                descripcion: solicitud.body.descripcion,
                estatus: solicitud.body.estatus,
                proveedor: solicitud.body.proveedor,
                nombreProveedor: solicitud.body.nombreProveedor,
                telefonoProveedor: solicitud.body.telefonoProveedor,
                correoProveedor: solicitud.body.correo
            }

            Requisiciones.updateOne({"_id": solicitud.params.req_id}, dataReq, function(error){
                if(error){
                    console.log(error);
                } else {
                    if(solicitud.params.art_id === 'undefined'){
                        var articuloReq = new ArticulosRequisiciones(dataArt);

                        articuloReq.save(function(error){
                            if(error){
                                console.log(error);
                            }else{
                                ArticulosRequisiciones.find({'codigoRequisicion': solicitud.body.codigo}, function(error, listaRequisiciones){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        Requisiciones.findById({ "_id": solicitud.body.codigo}, function(error, requisicion){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Usuarios.find({ "autorizador": true }, function(error, usuarios){
                                                    respuesta.render("Requisiciones/editar",{
                                                        req: requisicion,
                                                        user: solicitud.session.user,
                                                        listaRequisicion: listaRequisiciones,
                                                        articulo: {},
                                                        usuarios: usuarios,
                                                        titulo: "Requisiciones",
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
                                                        codReq: requisicion.codigoRequi
                                                    });
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        ArticulosRequisiciones.updateOne({"_id": solicitud.params.art_id}, dataArt, function(error){
                            if(error){
                                console.log(error);
                            }else{
                                ArticulosRequisiciones.find({'codigoRequisicion': solicitud.body.codigo}, function(error, listaRequisiciones){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        Requisiciones.findById({ "_id": solicitud.body.codigo}, function(error, requisicion){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Usuarios.find({ "autorizador": true }, function(error, usuarios){
                                                    respuesta.render("Requisiciones/editar",{
                                                        req: requisicion,
                                                        user: solicitud.session.user,
                                                        listaRequisicion: listaRequisiciones,
                                                        articulo: {},
                                                        titulo: "Requisiciones",
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
                                                        codReq: requisicion.codigoRequi
                                                    });
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        };
    },
    // Enviar correo de nueva requisición
    correoNuevaRequisicion: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Requisiciones.findById({"_id": solicitud.params.id}, function(error, requisicion){
                if(error){
                    console.log(error);
                }else{
                    Usuarios.findById({"_id": solicitud.params.id_usr_aut} ,function(error, autoriza){
                        if(error){
                            console.log(error);
                        } else {

                            var ccorreo;

                            if(autoriza.usuario == 'vllanes'){
                                ccorreo = 'cfelixa@llaos.com';
                            } else if(autoriza.usuario) {
                                ccorreo = 'victorllanes@llaos.com';
                            }
                            
                            var mailOptions = {
                                from: 'Llaos Sist 1.0 <sistema@llaos.com>',
                                //to: 'flopez@llaos.com',
                                to: autoriza.correo,
                                cc: ccorreo,
                                cco: 'davilar@llaos.com',
                                subject: 'Solicitud de requisición',
                                html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
                                            "<html xmlns='http://www.w3.org/1999/xhtml'>" +
                                                "<head>" +
                                                    "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />" +
                                                    "<title>Requisiciones LLaos 1.0</title>" +
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
                                                                                                                        "	Solicitud de Requisiciones" +
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
                                                                                                "	Estimado "+ autoriza.nombre +" :" +
                                                                                                "</td>" +
                                                                                            "</tr>" +
                                                                                            "<tr>" +
                                                                                                "<td class='bodycopy'>" +
                                                                                                "	El usuario <strong> " + requisicion.solicita + " </strong> acaba de realizar" +
                                                                                                "	una solicitud de requisición con el código <strong>" + requisicion.id + "</strong> en el sistema, para el área de <strong>" + requisicion.area + "</strong> y lo " +  
                                                                                                " 	utilizara en <strong>" + requisicion.uso + "</strong>, si desea realizar acción alguna a la misma, haga clic en el botón ver requisición." +
                                                                                                "</td>" +
                                                                                            "</tr>" +
                                                                                            "<tr>" +
                                                                                                "<td style='padding: 20px 0 0 0;'>" +
                                                                                                    "<table class='buttonwrapper' bgcolor='#e05443' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                                        "<tr>" +
                                                                                                            "<td class='button' height='45'>" +
                                                                                                            "<a href='" + pag_sistema + "/requisiciones/requisicion/ver/"+ requisicion.id +"/" + autoriza.id + "'>Ver requisición</a>" +
                                                                                                            "</td>" +
                                                                                                        "</tr>" +
                                                                                                    "</table>" +
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
                                                                                    "	alguna, si usted no es un usuario que autoriza Requisiciones" +
                                                                                    "	favor de reportar el insidente al departamento de sistemas." +
                                                                                    "<br>" +
                                                                                    "<br>" +
                                                                                    "	Cualquier problema para abrir la requisición o el sistema" +
                                                                                    "	favor de reportar al departamento de sistemas." +
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
                                    if (solicitud.session.user.permisos == "compras"){
                                        Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Usuarios.find( function(error, usuarios){
                                                    respuesta.render("Requisiciones/requisiciones", {
                                                        user: solicitud.session.user,
                                                        requisiciones: requisiciones,
                                                        titulo: "Requisiciones",
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
                                                        usuarios: usuarios
                                                    });
                                                });
                                            }
                                        });
                                    } else {	
                                        Requisiciones.find({ "solicita": solicitud.session.user.nombre } , function(error, requisiciones){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Usuarios.find( function(error, usuarios){
                                                    respuesta.render("Requisiciones/requisiciones", {
                                                        user: solicitud.session.user,
                                                        requisiciones: requisiciones,
                                                        titulo: "Requisiciones",
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
                                                        usuarios: usuarios
                                                    });
                                                });
                                            }
                                        });
                                    }
                                    console.log("Correo enviado!")
                                }
                                smtpTransport.close();
                            });
                        } 
                    });
                }
            });
        };
    },
    // Eliminar requisicion
    eliminarRequisicion: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Requisiciones.remove({"_id": solicitud.params.id}, function(error){
                if(error){
                    console.log(error);
                } else {
                    if (solicitud.session.user.permisos == "compras"){
                        Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        titulo: "Requisiciones",
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
                                        usuarios: usuarios
                                    });
                                });
                            }
                        });
                    } else {
                        console.log(solicitud.session.user._id);
                        Requisiciones.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    respuesta.render("Requisiciones/requisiciones", {
                                        user: solicitud.session.user,
                                        requisiciones: requisiciones,
                                        titulo: "Requisiciones",
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
                                        usuarios: usuarios
                                    });
                                });
                            }
                        });
                    }	
                }
            });
        };
    },
    // Eliminar artículo de requisición
    eliminarArticulo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var codigo_Req = '';

            ArticulosRequisiciones.findById({"_id": solicitud.params.id}, function(error, articulo){
                if(error){
                    console.log(error);
                } else {
                    codigo_Req = articulo.codigoRequisicion;

                    var updData = {
                        estatus: 'No Autorizado'
                    }

                    ArticulosRequisiciones.updateOne({"_id": solicitud.params.id}, updData, function(error){
                        if(error){
                            console.log(error);
                        } else {
                            ArticulosRequisiciones.find({'codigoRequisicion': codigo_Req}, function(error, listaRequisiciones){
                                if(error){
                                    console.log(error);
                                } else {
                                    Requisiciones.findOne({'_id': codigo_Req}, function(error, req){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            Usuarios.find( function(error, usuarios){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    respuesta.render("Requisiciones/editar",{
                                                        user: solicitud.session.user,
                                                        req: req,
                                                        articulo: {},
                                                        listaRequisicion: listaRequisiciones,
                                                        usuarios: usuarios,
                                                        titulo: "Requisiciones",
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
                                                        codReq: req.codigoRequi
                                                    });
                                                } 
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
    },
    // Requisiciones solo nuevas pero que ya fueron autorizadas
    requisicionesNuevasAutorizadas: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            if(solicitud.session.user.permisos == 'developer'){
                Requisiciones.find( function(error, requisiciones){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            respuesta.render("Requisiciones/requisiciones", {
                                user: solicitud.session.user,
                                requisiciones: requisiciones,
                                usuarios: usuarios,
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
                            });
                        });
                    }
                });	
            } else {
                Requisiciones.find({ "estatus": "Autorizada" } , function(error, requisiciones){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            respuesta.render("Requisiciones/requisiciones", {
                                user: solicitud.session.user,
                                requisiciones: requisiciones,
                                titulo: "Requisiciones",
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
                                usuarios: usuarios
                            });
                        });
                    }
                });	
            }		
        };
    },
    // PDF requisiciones
    pdfRequisiciones: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch      
            var columna = solicitud.body.criterio;
            var busqueda = '';
            var especial = false;
            var requis = [];
            var nombre_pdf = '';
            var titulo = '';
            var responsable = '';

            if(columna == 'fecha'){
                busqueda = solicitud.body.fecha;
                especial = true;
                nombre_pdf = 'requisicionesFecha.pdf';
                titulo = 'Fecha: ';
            } else if (columna == 'area'){
                busqueda = solicitud.body.area;
                nombre_pdf = 'requisicionesArea.pdf';
                titulo = 'Área: ';
            } else if (columna == 'modulo'){
                busqueda = solicitud.body.modulo;
                nombre_pdf = 'requisicionesModulo.pdf';
                titulo = 'Módulo: ';
            } else if (columna == 'responsable'){
                busqueda = solicitud.body.responsable;
                nombre_pdf = 'requisicionesResponsable.pdf';
                titulo = 'Responsable: ';
            } else if (columna == 'solicita'){
                busqueda = solicitud.body.solicitante;
                nombre_pdf = 'requisicionesSolicitante.pdf';
                titulo = 'Solicitante: ';
            } else if (columna == 'estatus'){
                busqueda = solicitud.body.estatus;
                nombre_pdf = 'requisicionesEstatus.pdf';
                titulo = 'Estatus: ';
            } else if (columna == 'fechas'){
                especial = true;
                
                fechaInicio = (new Date(solicitud.body.fechaInicio).getDate() + 1)+ '-' +
                              (new Date(solicitud.body.fechaInicio).getMonth() + 1)+ '-' +
                              new Date(solicitud.body.fechaInicio).getFullYear();
                fechaFin = (new Date(solicitud.body.fechaFin).getDate() + 1)+ '-' +
                           (new Date(solicitud.body.fechaFin).getMonth() + 1)+ '-' +
                           new Date(solicitud.body.fechaFin).getFullYear();
                
                fInicio = new Date(solicitud.body.fechaInicio).getFullYear() + '-' +
                        (new Date(solicitud.body.fechaInicio).getMonth() + 1)  + '-' +
                        (new Date(solicitud.body.fechaInicio).getDate() + 1 ); 
                           
                fFin = new Date(solicitud.body.fechaFin).getFullYear() + '-' +
                        (new Date(solicitud.body.fechaFin).getMonth() + 1)  + '-' +
                        (new Date(solicitud.body.fechaFin).getDate() + 1 ); 

                fI = new Date(fInicio).toISOString();
                fF = new Date(fFin).toISOString()

                console.log(fI + " - " + fF);

                nombre_pdf = 'requisiciones_Entre' + fechaInicio + '_' + fechaFin + '.pdf';
                titulo = 'Fechas entre: '  + fechaInicio.replace(new RegExp('-','g'),'/') + '-' + fechaFin.replace(new RegExp('-','g'),'/');
            }
            
            //console.log(columna);
            //console.log(busqueda);

            if(especial){
                if(columna == 'fecha'){

                } else if (columna == 'fechas'){
                    Requisiciones.find({
                        fecha: {
                            $gte: fI,
                            $lte: fF
                        }
                    }, { _id: 1 }, function(error, requisiciones){

                        console.log(requisiciones);

                        arr = Array();
                        
                        requisiciones.forEach( req => {
                            arr.push(req._id);
                        });

                        ArticulosRequisiciones.find({ codigoRequisicion: { $in: arr}}, function(error, articulos){
                            Requisiciones.populate(articulos, {path: 'codigoRequisicion'}, function(error, articulos){
                                if(error){
                                    console.log(error);
                                } else {
                                    doc = new pdf({
                                        // Establecer tamaño de hoja
                                        size: 'letter',
                                        layout: 'landscape'
                                    });
                                    
                                    // Logo empresa
                                    doc.image('./public/imgs/logo.png', 5, 40,{width: 200})
                                    
                                    // Nombre empresa y rfc
                                    doc.font('fonts/Roboto-Black.ttf')
                                    .fontSize(14)
                                    .text('LLAOS ACUACULTURA S.A. de C.V.', 480, 40, { align: 'right', width: 290 })
                                    .text('REQUISICIONES POR FECHA', { align: 'right', width: 290 })
                                    
                                    // Nombre formato, fecha y hora de creación
                                    doc.font('fonts/Roboto-Regular.ttf')
                                    .fontSize(14)
                                    .text(titulo + busqueda,{ align: 'right' , width: 290})  
                                    .text("Fecha: "+ FechaHora.obtenerfecha() + " " + FechaHora.obtenerhora(),{ align: 'right' , width: 290})
                                                                                                                                    
                                    // Encabezados tabla
                                    doc.lineWidth(25)
                                    doc.lineCap('butt')
                                    .fillColor("blue")
                                    .moveTo(15, 150)
                                    .lineTo(780, 150)
                                    .stroke()
                                    
                                    doc.fontSize(10)
                                    .fill('white')
                                    .text("Cant", 17, 140, {align: 'center', width: 45})
                                    .text("Unidad", 49, 140,  {align: 'center', width: 70})
                                    .text("Descripción",69, 140, {align: 'center', width: 250})
                                    .text("Solicitante",450, 140, {align: 'center', width: 100})
                                    .text("Urgencia",574, 140, {align: 'center', width: 55})
                                    .text("Requisición",635, 140, {align: 'center', width: 80})
                                    .text("Fecha",709, 140, {align: 'center', width: 80})
                                    
                                    // Llenado de tabla
                                    var y = 155;
                                    var total = 0;

                                    articulos.forEach( function(art) {                                          
                                        total = total + 1;
                                        y += 10;
                        
                                        if (y > 525){
                                            y = 165;
                        
                                            doc.addPage()
                        
                                            // Logo empresa
                                            doc.image('./public/imgs/logo.png', 5, 40,{width: 200})
                                            
                                            // Nombre empresa y rfc
                                            doc.font('fonts/Roboto-Black.ttf')
                                            .fontSize(14)
                                            .text('LLAOS ACUACULTURA S.A. de C.V.', 480, 40, { align: 'right', width: 290 })
                                            .text('REQUISICIONES POR ' + titulo, { align: 'right', width: 290 })
                        
                                            // Nombre formato, fecha y hora de creación
                                            doc.font('fonts/Roboto-Regular.ttf')
                                            .fontSize(14)
                                            .text(titulo + busqueda,{ align: 'right' , width: 290})  
                                            .text("Fecha: "+ FechaHora.obtenerfecha() + " " + FechaHora.obtenerhora(),{ align: 'right' , width: 290})
                                                                
                                            // Encabezados tabla
                                            doc.lineWidth(25)
                                            doc.lineCap('butt')
                                            .fillColor("blue")
                                            .moveTo(15, 150)
                                            .lineTo(780, 150)
                                            .stroke()
                                        
                                            doc.fontSize(10)
                                            .fill('white')
                                            .text("Cant", 17, 140, {align: 'center', width: 45})
                                            .text("Unidad", 49, 140,  {align: 'center', width: 70})
                                            .text("Descripción",69, 140, {align: 'center', width: 250})
                                            .text("Solicitante",450, 140, {align: 'center', width: 100})
                                            .text("Urgencia",574, 140, {align: 'center', width: 55})
                                            .text("Requisición",635, 140, {align: 'center', width: 80})
                                            .text("Fecha",709, 140, {align: 'center', width: 80})
                                        }

                                        


                                            doc.fillColor('black')
                                            .text(art.cantidad, 10, y, {align: 'center', width: 45})
                                            .text(art.unidad, 49, y,  {align: 'center', width: 70})
                                            .text(art.descripcion, 124, y, {align: 'left', width: 300, height: 15})
                                            .text(art.codigoRequisicion.solicita, 424, y, {align: 'center', width: 150, height: 15})
                                            .text(art.estatus, 564, y, {align: 'center', width: 75})
                                            .text(art.codigoRequisicion.codigoRequi, 634, y, {align: 'center', width: 80})
                                            .text((new Date(art.codigoRequisicion.fecha).getMonth()+1)+ '/' + new Date(art.codigoRequisicion.fecha).getDate() + '/' + new Date(art.codigoRequisicion.fecha).getFullYear(), 709, y, {align: 'center', width: 80})
                                            
                                    });
                                                    
                                    // División productos y totales
                                    doc.lineWidth(2)
                                    doc.lineCap('butt')
                                    .moveTo(15, y + 15)
                                    .lineTo(780, y + 15)
                                    .stroke()
                                    
                                    // Conciciones / Observaciones / Comentarios
                                    doc.font('fonts/Roboto-Black.ttf')
                                    .text("No. artículos solicitados: " + total, 15, y + 15, { align: 'left', width: 400 })
                                    
                                    // Creación del documento y guardado
                                    
                                    var nombre_archivo = './files/';
                                                                    
                                    console.log(nombre_archivo);
                                    
                                    doc.pipe(fs.createWriteStream(nombre_archivo+nombre_pdf)).on('finish', function (error){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            console.log('PDF closed');
                                        }
                                    });     
                                    
                                    // Finalize PDF file
                                    doc.end();   
                                    
                                    if (solicitud.session.user.permisos == "compras"){
                                        Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Usuarios.find( function(error, usuarios){
                                                    respuesta.render("Requisiciones/requisiciones", {
                                                        user: solicitud.session.user,
                                                        requisiciones: requisiciones,
                                                        usuarios: usuarios,
                                                        titulo: "Requisiciones",
                                                        criterios: [
                                                            {
                                                                val: "area",
                                                                name: "Área"
                                                            },
                                                            {
                                                                val: "modulo",
                                                                name: "Módulo"
                                                            },
                                                            {
                                                                val: "responsable",
                                                                name: "Responsable"
                                                            },
                                                            {
                                                                val: "solicita",
                                                                name: "Solicita"
                                                            },
                                                            {
                                                                val: "estatus",
                                                                name: "Estatus"
                                                            },
                                                            {
                                                                val: "fecha",
                                                                name: "Fecha"
                                                            },
                                                            {
                                                                val: "fechas",
                                                                name: "Fechas"
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
                                                        url: nombre_pdf
                                                    });
                                                });
                                            }
                                        });
                                    } else if (solicitud.session.user.permisos == 'developer' || solicitud.session.user.permisos == "admin") {
                                        Requisiciones.find( function(error, requisiciones){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Usuarios.find( function(error, usuarios){
                                                    respuesta.render("Requisiciones/requisiciones", {
                                                        user: solicitud.session.user,
                                                        requisiciones: requisiciones,
                                                        usuarios: usuarios,
                                                        titulo: "Requisiciones",
                                                        criterios: [
                                                            {
                                                                val: "area",
                                                                name: "Área"
                                                            },
                                                            {
                                                                val: "modulo",
                                                                name: "Módulo"
                                                            },
                                                            {
                                                                val: "responsable",
                                                                name: "Responsable"
                                                            },
                                                            {
                                                                val: "solicita",
                                                                name: "Solicita"
                                                            },
                                                            {
                                                                val: "estatus",
                                                                name: "Estatus"
                                                            },
                                                            {
                                                                val: "fecha",
                                                                name: "Fecha"
                                                            },
                                                            {
                                                                val: "fechas",
                                                                name: "Fechas"
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
                                                        url: nombre_pdf
                                                    });
                                                });
                                            }
                                        });
                                    } else if (solicitud.session.user.permisos == "usuario"){
                                        Requisiciones.find({ "solicita": solicitud.session.user.nombre } , function(error, requisiciones){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Usuarios.find( function(error, usuarios){
                                                    respuesta.render("Requisiciones/requisiciones", {
                                                        user: solicitud.session.user,
                                                        requisiciones: requisiciones,
                                                        usuarios: usuarios,
                                                        titulo: "Requisiciones",
                                                        criterios: [
                                                            {
                                                                val: "area",
                                                                name: "Área"
                                                            },
                                                            {
                                                                val: "modulo",
                                                                name: "Módulo"
                                                            },
                                                            {
                                                                val: "responsable",
                                                                name: "Responsable"
                                                            },
                                                            {
                                                                val: "solicita",
                                                                name: "Solicita"
                                                            },
                                                            {
                                                                val: "estatus",
                                                                name: "Estatus"
                                                            },
                                                            {
                                                                val: "fecha",
                                                                name: "Fecha"
                                                            },
                                                            {
                                                                val: "fechas",
                                                                name: "Fechas"
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
                                                        url: nombre_pdf
                                                    });
                                                });
                                            }
                                        });
                                    } else if (solicitud.session.user.permisos == "owner"){
                                        Requisiciones.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Usuarios.find( function(error, usuarios){
                                                    respuesta.render("Requisiciones/requisiciones", {
                                                        user: solicitud.session.user,
                                                        requisiciones: requisiciones,
                                                        usuarios: usuarios,
                                                        titulo: "Requisiciones",
                                                        criterios: [
                                                            {
                                                                val: "area",
                                                                name: "Área"
                                                            },
                                                            {
                                                                val: "modulo",
                                                                name: "Módulo"
                                                            },
                                                            {
                                                                val: "responsable",
                                                                name: "Responsable"
                                                            },
                                                            {
                                                                val: "solicita",
                                                                name: "Solicita"
                                                            },
                                                            {
                                                                val: "estatus",
                                                                name: "Estatus"
                                                            },
                                                            {
                                                                val: "fecha",
                                                                name: "Fecha"
                                                            },
                                                            {
                                                                val: "fechas",
                                                                name: "Fechas"
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
                                                        url: nombre_pdf
                                                    });
                                                });
                                            }
                                        });
                                    } else if (solicitud.session.user.permisos == "supervisor"){ // REVISAR BIEN QUE MOSTRARA
                                        Requisiciones.find( function(error, requisiciones){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Usuarios.find( function(error, usuarios){
                                                    respuesta.render("Requisiciones/requisiciones", {
                                                        user: solicitud.session.user,
                                                        requisiciones: requisiciones,
                                                        usuarios: usuarios,
                                                        titulo: "Requisiciones",
                                                        criterios: [
                                                            {
                                                                val: "area",
                                                                name: "Área"
                                                            },
                                                            {
                                                                val: "modulo",
                                                                name: "Módulo"
                                                            },
                                                            {
                                                                val: "responsable",
                                                                name: "Responsable"
                                                            },
                                                            {
                                                                val: "solicita",
                                                                name: "Solicita"
                                                            },
                                                            {
                                                                val: "estatus",
                                                                name: "Estatus"
                                                            },
                                                            {
                                                                val: "fecha",
                                                                name: "Fecha"
                                                            },
                                                            {
                                                                val: "fechas",
                                                                name: "Fechas"
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
                                                        url: nombre_pdf
                                                    });
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        });
                    });
                }
            } else {
                if (columna == 'area'){
                    Requisiciones.find({"area": busqueda}, function(error, requisiciones){
                        if(error){
                            console.log(error);
                        } else {
                            requis = requisiciones;
                            console.log(requis.length);
                            //console.log(requis)
                        }
                    });
                } else if (columna == 'modulo'){
                    Requisiciones.find({"modulo": busqueda}, function(error, requisiciones){
                        if(error){
                            console.log(error);
                        } else {
                            requis = requisiciones;
                            console.log(requis.length);
                            //console.log(requis)
                        }
                    });
                } else if (columna == 'responsable' || columna == 'solicita'){
                    if(columna == 'responsable'){
                        Requisiciones.find({"responsable": busqueda}, function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.findById({"_id": busqueda}, function(error, respo){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        responsable = respo;
                                        busqueda = responsable.nombre;
                                        console.log(respo.nombre);
                                    }
                                })
                                requis = requisiciones;
                                console.log(requis.length);
                                //console.log(requis)
                            }
                        });
                    } else {
                        Requisiciones.find({"solicita": busqueda}, function(error, requisiciones){
                            if(error){
                                console.log(error);
                            } else {
                                requis = requisiciones;
                                console.log(requis.length);
                                //console.log(requis)
                            }
                        });
                    }
                } else if (columna == 'estatus'){
                    Requisiciones.find({"estatus": busqueda}, function(error, requisiciones){
                        if(error){
                            console.log(error);
                        } else {
                            requis = requisiciones;
                            console.log(requis.length);
                            //console.log(requis)
                        }
                    });
                }

                ArticulosRequisiciones.find({"estatus": {$ne: 'No Autorizado'}}, function(error, articulos){
                    if(error){
                        console.log(error);
                    } else {
                        doc = new pdf({
                            // Establecer tamaño de hoja
                            size: 'letter',
                            layout: 'landscape'
                        });
                        
                        // Logo empresa
                        doc.image('./public/imgs/logo.png', 5, 40,{width: 200})
                        
                        // Nombre empresa y rfc
                        doc.font('fonts/Roboto-Black.ttf')
                        .fontSize(14)
                        .text('LLAOS ACUACULTURA S.A. de C.V.', 480, 40, { align: 'right', width: 290 })
                        .text('REQUISICIONES POR ' + columna.toUpperCase(), { align: 'right', width: 290 })
                        
                        // Nombre formato, fecha y hora de creación
                        doc.font('fonts/Roboto-Regular.ttf')
                        .fontSize(14)
                        .text(titulo + busqueda,{ align: 'right' , width: 290})  
                        .text("Fecha: "+ FechaHora.obtenerfecha() + " " + FechaHora.obtenerhora(),{ align: 'right' , width: 290})
                        
                        // Encabezados tabla
                        doc.lineWidth(25)
                        doc.lineCap('butt')
                        .fillColor("blue")
                        .moveTo(15, 150)
                        .lineTo(780, 150)
                        .stroke()
                        
                        doc.fontSize(10)
                        .fill('white')
                        .text("Cant", 17, 140, {align: 'center', width: 45})
                        .text("Unidad", 49, 140,  {align: 'center', width: 70})
                        .text("Descripción",69, 140, {align: 'center', width: 250})
                        .text("Solicitante",450, 140, {align: 'center', width: 100})
                        .text("Urgencia",574, 140, {align: 'center', width: 55})
                        .text("Requisición",635, 140, {align: 'center', width: 80})
                        .text("Fecha",709, 140, {align: 'center', width: 80})
                        
                        // Llenado de tabla
                        var y = 155;
                        var total = 0;
                                               
                        articulos.forEach( function(art) {
                            requis.forEach( function(req){
                                //console.log("comparando: " + req.id + " contra " + art.codigoRequisicion);
                                if(req.id == art.codigoRequisicion){
                                    total = total + 1;
                                    y += 10;
                    
                                    if (y > 525){
                                        y = 165;
                    
                                        doc.addPage()
                    
                                        // Logo empresa
                                        doc.image('./public/imgs/logo.png', 5, 40,{width: 200})
                                        
                                        // Nombre empresa y rfc
                                        doc.font('fonts/Roboto-Black.ttf')
                                        .fontSize(14)
                                        .text('LLAOS ACUACULTURA S.A. de C.V.', 480, 40, { align: 'right', width: 290 })
                                        .text('REQUISICIONES POR ' + columna.toUpperCase(), { align: 'right', width: 290 })
                                        
                                        // Nombre formato, fecha y hora de creación
                                        doc.font('fonts/Roboto-Regular.ttf')
                                        .fontSize(14)
                                        .text(titulo + busqueda,{ align: 'right' , width: 290})
                                        .text("Fecha: "+ FechaHora.obtenerfecha() + " " + FechaHora.obtenerhora(),{ align: 'right' , width: 290})                
                                        
                                        // Encabezados tabla
                                        doc.lineWidth(25)
                                        doc.lineCap('butt')
                                        .fillColor("blue")
                                        .moveTo(15, 150)
                                        .lineTo(780, 150)
                                        .stroke()
                                    
                                        doc.fontSize(10)
                                        .fill('white')
                                        .text("Cant", 17, 140, {align: 'center', width: 45})
                                        .text("Unidad", 49, 140,  {align: 'center', width: 70})
                                        .text("Descripción",69, 140, {align: 'center', width: 250})
                                        .text("Solicitante",450, 140, {align: 'center', width: 100})
                                        .text("Urgencia",574, 140, {align: 'center', width: 55})
                                        .text("Requisición",635, 140, {align: 'center', width: 80})
                                        .text("Fecha",709, 140, {align: 'center', width: 80})
                                    }
                                        doc.fillColor('black')
                                        .text(art.cantidad, 10, y, {align: 'center', width: 45})
                                        .text(art.unidad, 49, y,  {align: 'center', width: 70})
                                        .text(art.descripcion, 124, y, {align: 'left', width: 300, height: 15})
                                        .text(req.solicita, 424, y, {align: 'center', width: 150, height: 15})
                                        .text(art.estatus, 564, y, {align: 'center', width: 75})
                                        .text(req.codigoRequi, 634, y, {align: 'center', width: 80})
                                        
                                        if ((new Date(req.fecha).getMonth() + 1) < 10) {
                                            if ((new Date(req.fecha).getDate()) < 10) {
                                                doc.text( '0' + new Date(req.fecha).getDate()+ '/0' + (new Date(req.fecha).getMonth() + 1)+ '/' + new Date(req.fecha).getFullYear(), 704, y, {align: 'center', width: 70 })
                                            } else {
                                                doc.text(new Date(req.fecha).getDate()+ '/0' + (new Date(req.fecha).getMonth() + 1)+ '/' + new Date(req.fecha).getFullYear(), 704, y, {align: 'center', width: 70 })
                                            }
                                        } else {
                                            if ((new Date(req.fecha).getDate()) < 10) {
                                                doc.text( '0' + new Date(req.fecha).getDate()+ '/' + (new Date(req.fecha).getMonth() + 1)+ '/' + new Date(req.fecha).getFullYear(), 704, y, {align: 'center', width: 70 })
                                            } else {
                                                doc.text(new Date(req.fecha).getDate()+ '/' + (new Date(req.fecha).getMonth() + 1)+ '/' + new Date(req.fecha).getFullYear(), 704, y, {align: 'center', width: 70 })
                                            }
                                        }
                                
                                }
                            });
                        });
                                        
                        // División productos y totales
                        doc.lineWidth(2)
                        doc.lineCap('butt')
                        .moveTo(15, y + 15)
                        .lineTo(780, y + 15)
                        .stroke()
                        
                        // Conciciones / Observaciones / Comentarios
                        doc.font('fonts/Roboto-Black.ttf')
                        .text("No. artículos solicitados: " + total, 15, y + 15, { align: 'left', width: 400 })
                        
                        // Creación del documento y guardado
                        
                        var nombre_archivo = './files/';

                        console.log(nombre_archivo);
                        
                        doc.pipe(fs.createWriteStream(nombre_archivo+nombre_pdf)).on('finish', function (error){
                            if(error){
                                console.log(error);
                            } else {
                                console.log('PDF closed');
                            }
                        });     
                        
                        // Finalize PDF file
                        doc.end();   
                        
                        if (solicitud.session.user.permisos == "compras"){
                            Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        respuesta.render("Requisiciones/requisiciones", {
                                            user: solicitud.session.user,
                                            requisiciones: requisiciones,
                                            usuarios: usuarios,
                                            titulo: "Requisiciones",
                                            criterios: [
                                                {
                                                    val: "area",
                                                    name: "Área"
                                                },
                                                {
                                                    val: "modulo",
                                                    name: "Módulo"
                                                },
                                                {
                                                    val: "responsable",
                                                    name: "Responsable"
                                                },
                                                {
                                                    val: "solicita",
                                                    name: "Solicita"
                                                },
                                                {
                                                    val: "estatus",
                                                    name: "Estatus"
                                                },
                                                {
                                                    val: "fecha",
                                                    name: "Fecha"
                                                },
                                                {
                                                    val: "fechas",
                                                    name: "Fechas"
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
                                            url: nombre_pdf
                                        });
                                    });
                                }
                            });
                        } else if (solicitud.session.user.permisos == 'developer' || solicitud.session.user.permisos == "admin") {
                            Requisiciones.find( function(error, requisiciones){
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        respuesta.render("Requisiciones/requisiciones", {
                                            user: solicitud.session.user,
                                            requisiciones: requisiciones,
                                            usuarios: usuarios,
                                            titulo: "Requisiciones",
                                            criterios: [
                                                {
                                                    val: "area",
                                                    name: "Área"
                                                },
                                                {
                                                    val: "modulo",
                                                    name: "Módulo"
                                                },
                                                {
                                                    val: "responsable",
                                                    name: "Responsable"
                                                },
                                                {
                                                    val: "solicita",
                                                    name: "Solicita"
                                                },
                                                {
                                                    val: "estatus",
                                                    name: "Estatus"
                                                },
                                                {
                                                    val: "fecha",
                                                    name: "Fecha"
                                                },
                                                {
                                                    val: "fechas",
                                                    name: "Fechas"
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
                                            url: nombre_pdf
                                        });
                                    });
                                }
                            });
                        } else if (solicitud.session.user.permisos == "usuario"){
                            Requisiciones.find({ "solicita": solicitud.session.user.nombre } , function(error, requisiciones){
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        respuesta.render("Requisiciones/requisiciones", {
                                            user: solicitud.session.user,
                                            requisiciones: requisiciones,
                                            usuarios: usuarios,
                                            titulo: "Requisiciones",
                                            criterios: [
                                                {
                                                    val: "area",
                                                    name: "Área"
                                                },
                                                {
                                                    val: "modulo",
                                                    name: "Módulo"
                                                },
                                                {
                                                    val: "responsable",
                                                    name: "Responsable"
                                                },
                                                {
                                                    val: "solicita",
                                                    name: "Solicita"
                                                },
                                                {
                                                    val: "estatus",
                                                    name: "Estatus"
                                                },
                                                {
                                                    val: "fecha",
                                                    name: "Fecha"
                                                },
                                                {
                                                    val: "fechas",
                                                    name: "Fechas"
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
                                            url: nombre_pdf
                                        });
                                    });
                                }
                            });
                        } else if (solicitud.session.user.permisos == "owner"){
                            Requisiciones.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        respuesta.render("Requisiciones/requisiciones", {
                                            user: solicitud.session.user,
                                            requisiciones: requisiciones,
                                            usuarios: usuarios,
                                            titulo: "Requisiciones",
                                            criterios: [
                                                {
                                                    val: "area",
                                                    name: "Área"
                                                },
                                                {
                                                    val: "modulo",
                                                    name: "Módulo"
                                                },
                                                {
                                                    val: "responsable",
                                                    name: "Responsable"
                                                },
                                                {
                                                    val: "solicita",
                                                    name: "Solicita"
                                                },
                                                {
                                                    val: "estatus",
                                                    name: "Estatus"
                                                },
                                                {
                                                    val: "fecha",
                                                    name: "Fecha"
                                                },
                                                {
                                                    val: "fechas",
                                                    name: "Fechas"
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
                                            url: nombre_pdf
                                        });
                                    });
                                }
                            });
                        } else if (solicitud.session.user.permisos == "supervisor"){ // REVISAR BIEN QUE MOSTRARA
                            Requisiciones.find( function(error, requisiciones){
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        respuesta.render("Requisiciones/requisiciones", {
                                            user: solicitud.session.user,
                                            requisiciones: requisiciones,
                                            usuarios: usuarios,
                                            titulo: "Requisiciones",
                                            criterios: [
                                                {
                                                    val: "area",
                                                    name: "Área"
                                                },
                                                {
                                                    val: "modulo",
                                                    name: "Módulo"
                                                },
                                                {
                                                    val: "responsable",
                                                    name: "Responsable"
                                                },
                                                {
                                                    val: "solicita",
                                                    name: "Solicita"
                                                },
                                                {
                                                    val: "estatus",
                                                    name: "Estatus"
                                                },
                                                {
                                                    val: "fecha",
                                                    name: "Fecha"
                                                },
                                                {
                                                    val: "fechas",
                                                    name: "Fechas"
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
                                            url: nombre_pdf
                                        });
                                    });
                                }
                            });
                        }
                    }
                });
            }
        };
    },
    reqFechas: function(solicitud, respuesta){
        
    },
    xls: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch      
            var columna = solicitud.body.criterio;
            var nombre_xls = '';
            var titulo = '';

            if(columna == 'fecha'){
                busqueda = solicitud.body.fecha;
                especial = true;
                nombre_xls = 'requisicionesFecha.xlsx';
                titulo = 'Fecha ';

                Requisiciones.find({ "fecha": solicitud.body.responsable} , (error, requis) =>{
                    if(error){
                        console.log(error);
                    } else {
                        var codigosRequis = [];

                        requis.forEach( req =>{
                            codigosRequis.push(req.id);
                        });

                        ArticulosRequisiciones.find({"codigoRequisicion":  { $in: codigosRequis }}, (error, articulos) => {
                            if(error){
                                console.log(error);
                            } else {
                                Requisiciones.populate( articulos, { path: 'codigoRequisicion'}, (error, articulos) =>{
                                    if(error) {
                                        console.log(error);
                                    } else {
                                        if (solicitud.session.user.permisos == "compras"){
                                            Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == 'developer' || solicitud.session.user.permisos == "admin") {
                                            Requisiciones.find( function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, busqueda, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "usuario"){
                                            Requisiciones.find({ "solicita": solicitud.session.user.nombre } , function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "owner"){
                                            Requisiciones.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "supervisor"){ // REVISAR BIEN QUE MOSTRARA
                                            Requisiciones.find( function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });

            } else if (columna == 'area'){
                busqueda = solicitud.body.area;
                nombre_xls = 'requisicionesArea.xlsx';
                titulo = 'Área ';

                Requisiciones.find({ "area": solicitud.body.area} , (error, requis) =>{
                    if(error){
                        console.log(error);
                    } else {
                        var codigosRequis = [];

                        requis.forEach( req =>{
                            codigosRequis.push(req.id);
                        });

                        ArticulosRequisiciones.find({"codigoRequisicion":  { $in: codigosRequis }}, (error, articulos) => {
                            if(error){
                                console.log(error);
                            } else {
                                Requisiciones.populate( articulos, { path: 'codigoRequisicion'}, (error, articulos) =>{
                                    if(error) {
                                        console.log(error);
                                    } else {
                                        if (solicitud.session.user.permisos == "compras"){
                                            Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == 'developer' || solicitud.session.user.permisos == "admin") {
                                            Requisiciones.find( function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, busqueda, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "usuario"){
                                            Requisiciones.find({ "solicita": solicitud.session.user.nombre } , function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "owner"){
                                            Requisiciones.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "supervisor"){ // REVISAR BIEN QUE MOSTRARA
                                            Requisiciones.find( function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            } else if (columna == 'modulo'){
                busqueda = solicitud.body.modulo;
                nombre_xls = 'requisicionesModulo.xlsx';
                titulo = 'Módulo ';

                Requisiciones.find({ "modulo": solicitud.body.modulo} , (error, requis) =>{
                    if(error){
                        console.log(error);
                    } else {
                        var codigosRequis = [];

                        requis.forEach( req =>{
                            codigosRequis.push(req.id);
                        });

                        ArticulosRequisiciones.find({"codigoRequisicion":  { $in: codigosRequis }}, (error, articulos) => {
                            if(error){
                                console.log(error);
                            } else {
                                Requisiciones.populate( articulos, { path: 'codigoRequisicion'}, (error, articulos) =>{
                                    if(error) {
                                        console.log(error);
                                    } else {
                                        if (solicitud.session.user.permisos == "compras"){
                                            Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == 'developer' || solicitud.session.user.permisos == "admin") {
                                            Requisiciones.find( function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, busqueda, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "usuario"){
                                            Requisiciones.find({ "solicita": solicitud.session.user.nombre } , function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "owner"){
                                            Requisiciones.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "supervisor"){ // REVISAR BIEN QUE MOSTRARA
                                            Requisiciones.find( function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
                
            } else if (columna == 'responsable'){
                busqueda = solicitud.body.responsable;
                nombre_xls = 'requisicionesResponsable.xlsx';
                titulo = 'Responsable ';

                
            } else if (columna == 'solicita'){
                busqueda = solicitud.body.solicitante;
                nombre_xls = 'requisicionesSolicitante.xlsx';
                titulo = 'Solicitante ';

                Requisiciones.find({ "solicita": solicitud.body.solicitante} , (error, requis) =>{
                    if(error){
                        console.log(error);
                    } else {
                        var codigosRequis = [];

                        requis.forEach( req =>{
                            codigosRequis.push(req.id);
                        });

                        ArticulosRequisiciones.find({"codigoRequisicion":  { $in: codigosRequis }}, (error, articulos) => {
                            if(error){
                                console.log(error);
                            } else {
                                Requisiciones.populate( articulos, { path: 'codigoRequisicion'}, (error, articulos) =>{
                                    if(error) {
                                        console.log(error);
                                    } else {
                                        if (solicitud.session.user.permisos == "compras"){
                                            Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == 'developer' || solicitud.session.user.permisos == "admin") {
                                            Requisiciones.find( function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, busqueda, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "usuario"){
                                            Requisiciones.find({ "solicita": solicitud.session.user.nombre } , function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "owner"){
                                            Requisiciones.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "supervisor"){ // REVISAR BIEN QUE MOSTRARA
                                            Requisiciones.find( function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            } else if (columna == 'fechas'){


                Requisiciones.find({ "responsable": solicitud.body.responsable} , (error, requis) =>{
                    if(error){
                        console.log(error);
                    } else {
                        var codigosRequis = [];

                        requis.forEach( req =>{
                            codigosRequis.push(req.id);
                        });

                        ArticulosRequisiciones.find({"codigoRequisicion":  { $in: codigosRequis }}, (error, articulos) => {
                            if(error){
                                console.log(error);
                            } else {
                                Requisiciones.populate( articulos, { path: 'codigoRequisicion'}, (error, articulos) =>{
                                    if(error) {
                                        console.log(error);
                                    } else {
                                        if (solicitud.session.user.permisos == "compras"){
                                            Requisiciones.find({ "estatus": {$in:['Autorizada','Compra parcial']}}, function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == 'developer' || solicitud.session.user.permisos == "admin") {
                                            Requisiciones.find( function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, busqueda, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "usuario"){
                                            Requisiciones.find({ "solicita": solicitud.session.user.nombre } , function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "owner"){
                                            Requisiciones.find({ "responsable": solicitud.session.user._id } , function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        } else if (solicitud.session.user.permisos == "supervisor"){ // REVISAR BIEN QUE MOSTRARA
                                            Requisiciones.find( function(error, requisiciones){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        respuesta.render("Requisiciones/requisiciones", {
                                                            user: solicitud.session.user,
                                                            requisiciones: requisiciones,
                                                            usuarios: usuarios,
                                                            titulo: "Requisiciones",
                                                            criterios: [
                                                                {
                                                                    val: "area",
                                                                    name: "Área"
                                                                },
                                                                {
                                                                    val: "modulo",
                                                                    name: "Módulo"
                                                                },
                                                                {
                                                                    val: "responsable",
                                                                    name: "Responsable"
                                                                },
                                                                {
                                                                    val: "solicita",
                                                                    name: "Solicita"
                                                                },
                                                                {
                                                                    val: "estatus",
                                                                    name: "Estatus"
                                                                },
                                                                {
                                                                    val: "fecha",
                                                                    name: "Fecha"
                                                                },
                                                                {
                                                                    val: "fechas",
                                                                    name: "Fechas"
                                                                }
                                                            ],
                                                            ruta: "requisiciones",
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
                                                            url: generateXLS(articulos, titulo, nombre_xls)
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        };
    }
}

function generateXLS(data, title, subtitle,xls_name){
    var options = {
        filename:  file_path + xls_name ,
        useStyles: true,
        useSharedStrings: true
    };

    console.log(xls_name);

    var wb = new Excel.stream.xlsx.WorkbookWriter(options);

    wb.creator = 'Llaos Web 2.0';
    wb.created = new Date();

    var ws = wb.addWorksheet('Reporte');

    // TITULO
    ws.mergeCells('A1:G1');
    ws.getCell('D1').value = "REPORTE REQUISICIÓNES POR " + title.toUpperCase();
    ws.getCell('D1').font = {
        name: "Roboto", 
        size: 12,  
        bold: true,
        horizontal: 'center'
    };   
    ws.getCell('D1').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'83909c'}
    };
    ws.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };

    // SUBTITULO
    ws.mergeCells('A2:G2');
    ws.getCell('D2').value = 'LLAOS ACUACULTURA S.A. DE C.V.';
    ws.getCell('D2').font = {
        name: "Roboto", 
        size: 12,  
        bold: true,
        horizontal: 'center'
    };
    ws.getCell('D2').alignment = { vertical: 'middle', horizontal: 'center' };   

    // CICLO + AÑO
    ws.getCell('A4').value = title;
    ws.getCell('A4').font = {
        name: "Roboto", 
        size: 12,  
        bold: true,
        horizontal: 'center'
    }; 
    ws.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('A4').border = {
        top: {style:'thick', color: {argb:'#FFFFFF'}},
        left: {style:'thick', color: {argb:'#FFFFFF'}},
        right: {style:'thick', color: {argb:'#FFFFFF'}},
        bottom: {style:'thick', color: {argb:'#FFFFFF'}},
    };
    ws.getCell('A4').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'83909c'}
    };

    ws.getCell('B4').value = subtitle;
    ws.getCell('B4').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('B4').border = {
        top: {style:'thick', color: {argb:'#FFFFFF'}},
        left: {style:'thick', color: {argb:'#FFFFFF'}},
        right: {style:'thick', color: {argb:'#FFFFFF'}},
        bottom: {style:'thick', color: {argb:'#FFFFFF'}},
    };
    ws.getCell('B4').font = {
        name: "Roboto", 
        size: 12,  
        //bold: true,
        horizontal: 'center'
    };

    ws.getCell('F4').value = 'Fecha ';
    ws.getCell('F4').alignment = { vertical: 'middle', horizontal: 'center' };   
    ws.getCell('F4').border = {
        top: {style:'thick', color: {argb:'#FFFFFF'}},
        left: {style:'thick', color: {argb:'#FFFFFF'}},
        right: {style:'thick', color: {argb:'#FFFFFF'}},
        bottom: {style:'thick', color: {argb:'#FFFFFF'}},
    };
    ws.getCell('F4').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'83909c'}
    };
    ws.getCell('F4').font = {
        name: "Roboto", 
        size: 12,  
        bold: true,
        horizontal: 'center'
    }; 

    ws.getCell('G4').value = FechaHora.obtenerfecha();
    ws.getCell('G4').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('G4').border = {
        top: {style:'thick', color: {argb:'#FFFFFF'}},
        left: {style:'thick', color: {argb:'#FFFFFF'}},
        right: {style:'thick', color: {argb:'#FFFFFF'}},
        bottom: {style:'thick', color: {argb:'#FFFFFF'}},
    };
    ws.getCell('G4').font = {
        name: "Roboto", 
        size: 12,  
        //bold: true,
        horizontal: 'center'
    };

    // ENCABEZADOS DE LA TABLA
    ws.getCell('A8').value = 'Cantidad';
    ws.getCell('A8').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('A8').border = {
        top: {style:'thick', color: {argb:'#FFFFFF'}},
        left: {style:'thick', color: {argb:'#FFFFFF'}},
        bottom: {style:'thick', color: {argb:'#FFFFFF'}},
    };

    ws.getCell('B8').value = 'Unidad';
    ws.getCell('B8').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('B8').border = {
        top: {style:'thick', color: {argb:'#FFFFFF'}},
        bottom: {style:'thick', color: {argb:'#FFFFFF'}},
    }

    ws.getCell('C8').value = 'Descripción';
    ws.getCell('C8').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('C8').border = {
        top: {style:'thick', color: {argb:'#FFFFFF'}},
        bottom: {style:'thick', color: {argb:'#FFFFFF'}},
    }

    ws.getCell('D8').value = 'Solicitante';
    ws.getCell('D8').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('D8').border = { 
        top: {style:'thick', color: {argb:'#FFFFFF'}},
        bottom: {style:'thick', color: {argb:'#FFFFFF'}},
    };
    

    ws.getCell('E8').value = 'Urgencia';
    ws.getCell('E8').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('E8').border = { 
        top: {style:'thick', color: {argb:'#FFFFFF'}},
        bottom: {style:'thick', color: {argb:'#FFFFFF'}},
    };

    ws.getCell('F8').value = 'Requisición';
    ws.getCell('F8').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('F8').border = { 
        top: {style:'thick', color: {argb:'#FFFFFF'}},
        bottom: {style:'thick', color: {argb:'#FFFFFF'}},
    };

    ws.getCell('G8').value = 'Fecha';
    ws.getCell('G8').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('G8').border = {
        top: {style:'thick', color: {argb:'#FFFFFF'}},
        right: {style:'thick', color: {argb:'#FFFFFF'}},
        bottom: {style:'thick', color: {argb:'#FFFFFF'}},
    };

    ws.getRow(8).eachCell( (cell) => {
        cell.font = { name: "Roboto", size: 12, color: {argb: '000000'} };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.fill = {
            type: "pattern",
	        pattern: "solid",
            fgColor:{argb:'83909c'},
            bgColor:{argb:'000000'}
        };
    });
    
    ws.columns = [
        {  key: 'cantidad', width: 10},
        {  key: 'unidad', width: 24, style: { numFmt: '#,##'}},
        {  key: 'descripcion', width: 40, style: { numFmt: '#,##'}},
        {  key: 'solicitante', width: 24, style: { numFmt: '#,##'}},
        {  key: 'urgencia', width: 12, style: { numFmt: '#,##'}},
        {  key: 'requisicion', width: 10, style: { numFmt: '#,##'}},
        {  key: 'fecha', width: 12 , style: { numFmt: 'dd/mm/yyyy' } },
    ];

    data.forEach( function(d){
        let row = ws.addRow(
            {   cantidad: d.cantidad, 
                unidad: d.unidad, 
                descripcion: d.descripcion,  
                solicitante: d.codigoRequisicion.solicita, 
                urgencia: d.estatus, 
                requisicion: d.codigoRequisicion.codigoRequi, 
                fecha: d.codigoRequisicion.fecha
            }
        );

        row.eachCell( (cell) => {
            cell.font = { name: "Roboto", size: 12};
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.border = {
                bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                left: {style:'thin', color: {argb:'#FFFFFF'}},
                top: {style:'thin', color: {argb:'#FFFFFF'}},
                right: {style:'thin', color: {argb:'#FFFFFF'}}
            };
        });
    });

    wb.commit().then( function(){
        console.log("XLS terminado.")
    });

    return xls_name;
}
