var mongoose = require('mongoose');
    Cotizaciones = mongoose.model('Cotizaciones');
    ArticulosCotizaciones = mongoose.model('ArticulosCotizaciones');
    Proveedores = mongoose.model('Proveedores');
    FechaHora = require('./fechahora');
    fmon = require('./formatmoney');
    nodemailer = require('nodemailer');
	pdf = require('pdfkit');
	fs = require('fs');
    fileUpload = require('express-fileupload');
    zf = require('./zfill');

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
    // Mostrar todas la cotizaciones
    todas: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Cotizaciones.find( function(error, cotizaciones){
                if(error){
                    console.log(error);
                } else {
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render("Externos/Cotizaciones/cotizaciones",{
                                user: solicitud.session.user,
                                cotizaciones: cotizaciones,
                                titulo: "Cotizaciones",
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
                                ruta: "cotizaciones"
                            });
                        }
                    });
                };
            });
        };
    },
    // Crar nueva cotización
    nueva: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Usuarios.find( function(error, usuarios){
                if(error){
                    console.log(error);
                } else {
                    respuesta.render("Externos/Cotizaciones/cotizacion",{
                        user: solicitud.session.user,
                        articulos: {},
                        cotizacion: '',
                        subtotal: '',
                        iva: '',
                        total: '',
                        codigo_cot: '',
                        proveedor: '',
                        vigencia: '',
                        observaciones: '',
                        moneda: '',
                        tipoCambio: '',
                        titulo: "Cotizaciones",
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
                        ruta: "cotizaciones"
                    });
                }
            });
        };
    },
    // Agregar articulo a cotización
    agregarArticulo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            if (solicitud.body.codigo_id === undefined || solicitud.body.codigo_id == null || solicitud.body.codigo_id == ''){
                var dataCot = {
                    codigo: solicitud.body.codigo_cotizacion,
                    proveedor: solicitud.body.proveedor,
                    subtotal: '0.00',
                    iva: '0.00',
                    total: '0.00',
                    estatus: 'Nueva',
                    fecha: FechaHora.obtenerfecha(),
                    hora: FechaHora.obtenerhora(),
                    vigencia: solicitud.body.vigencia,
                    observaciones: solicitud.body.observaciones,
                    moneda: solicitud.body.moneda,
                    tipoCambio: solicitud.body.tipoCambio,
                    banco: solicitud.body.banco,
                    cuenta: solicitud.body.cuenta,
                    clabe: solicitud.body.clabe
                }
    
                var cotizacion = new Cotizaciones(dataCot);
    
                cotizacion.save( function(error, coti){
                    if(error){
                        console.log(error);
                    } else {
                        var data = {
                            codigo: solicitud.body.codigo,
                            cotizacion: coti.id,
                            cantidad: solicitud.body.cantidad,
                            unidad: solicitud.body.unidad,
                            descripcion: solicitud.body.descripcion,
                            precioUnitario: solicitud.body.precioUnitario,
                            iva: solicitud.body.iva,
                            precioNeto: solicitud.body.importe,
                            tiempoEntrega: solicitud.body.tiempoEntrega
                        }
            
                        var articuloCotizacion = new ArticulosCotizaciones(data);
            
                        articuloCotizacion.save( function(error) {
                            if(error){
                                console.log(error);
                            } else {
                                ArticulosCotizaciones.find({"cotizacion": coti.id}, function(error, articulos){
                                    if(erorr){
                                        console.log(error);
                                    } else {
                                        Usuarios.find( function(error, usuarios){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                respuesta.render("Externos/Cotizaciones/cotizacion",
                                                    {
                                                        user: solicitud.session.user,
                                                        articulos: articulos,
                                                        cotizacion: coti.id,
                                                        codigo_cot: coti.codigo,
                                                        subtotal: parseFloat(solicitud.body.precioUnitario * solicitud.body.cantidad).toFixed(2),
                                                        iva: parseFloat(solicitud.body.iva).toFixed(2),
                                                        total: parseFloat(solicitud.body.importe).toFixed(2),
                                                        proveedor: solicitud.body.proveedor,
                                                        vigencia: solicitud.body.vigencia,
                                                        observaciones: solicitud.body.observaciones,
                                                        titulo: "Cotizaciones",
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
                                                        ruta: "cotizaciones"
                                                    }
                                                );
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                var data = {
                    codigo: solicitud.body.codigo,
                    cotizacion: solicitud.body.codigo_id,
                    cantidad: solicitud.body.cantidad,
                    unidad: solicitud.body.unidad,
                    descripcion: solicitud.body.descripcion,
                    precioUnitario: solicitud.body.precioUnitario,
                    iva: solicitud.body.iva,
                    precioNeto: solicitud.body.importe,
                    tiempoEntrega: solicitud.body.tiempoEntrega
                }
    
                var articuloCotizacion = new ArticulosCotizaciones(data);
    
                articuloCotizacion.save( function(error) {
                    if(error){
                        console.log(error);
                    } else {
                        ArticulosCotizaciones.find({"cotizacion": solicitud.body.codigo_id}, function(error, articulos){
                            
                            var subtotal = 0.00;
                            var iva = 0.00;
                            var total = 0.00;
                            
                            articulos.forEach( function(art) {
                                subtotal = parseFloat(subtotal) + parseFloat(parseFloat(art.cantidad) * parseFloat(art.precioUnitario));
                                iva = parseFloat(iva) + parseFloat(parseFloat(art.cantidad) * parseFloat(art.iva));
                                total = parseFloat(total) + parseFloat(parseFloat(art.cantidad) * parseFloat(art.precioNeto));
                            });
    
                            var updTotales = {
                                subtotal: parseFloat(subtotal).toFixed(2),
                                iva: parseFloat(iva).toFixed(2),
                                total: parseFloat(total).toFixed(2)
                            }
                    
                            Cotizaciones.updateOne({"_id": solicitud.body.codigo_id}, updTotales, function(error, cot){
                                if(error){
                                    console.log(error);
                                } else {
                                    Cotizaciones.findById({"_id": solicitud.body.codigo_id}, function(error, coti){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            Usuarios.find( function(error, usuarios){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    respuesta.render("Externos/Cotizaciones/cotizacion",
                                                        {
                                                            user: solicitud.session.user,
                                                            articulos: articulos,
                                                            cotizacion: coti.id,
                                                            codigo_cot: coti.codigo,
                                                            subtotal: parseFloat(coti.subtotal).toFixed(2),
                                                            iva: parseFloat(coti.iva).toFixed(2) ,
                                                            total:parseFloat(coti.total).toFixed(2),
                                                            proveedor: solicitud.body.proveedor,
                                                            vigencia: solicitud.body.vigencia,
                                                            observaciones: solicitud.body.observaciones,
                                                            titulo: "Cotizaciones",
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
                                                            ruta: "cotizaciones"
                                                        }
                                                    );
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        })
                    }
                });
            }
        };
    },
    // Enviar cotización 
    enviar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Cotizaciones.findById({"_id": solicitud.params.id}, function(error, cotizacion){
                if(error){
                    consolo.log(error);
                } else {
                    // ENVIAR CORRREO
                    var mailOptions = {
                        from: 'Llaos Sist 1.0 <sistema@llaos.com>',
                        to: "flopez@llaos.com", //jparrilla@llaos.com
                        //cc: "jcuamea@llaos.com",
                        subject: 'Cotización COT-' + cotizacion.codigo,
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
                                                                                                                "	Cotizaciones" +
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
                                                                                        "	Estimado Deparamento de compras :" +
                                                                                        "</td>" +
                                                                                    "</tr>" +
                                                                                    "<tr>" +
                                                                                        "<td class='bodycopy'>" +
                                                                                        "	El proveedor de <strong> " + cotizacion.proveedor + " </strong> acaba de realizar" +
                                                                                        "	una cotizacion en el sistema con el código <strong> COT-" + cotizacion.codigo + "</strong> misma que esta adjunta a este" +
                                                                                        " 	correo, la cual ya ha sido revisada y cotizada por completo tal como fue solicitada, para que tome en cosideración"+
                                                                                        " 	todo lo que en ella se encuentre y se programe con tiempo para generar la orden de compra y programar envios.."+
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
                            {
                                fileName: 'COT-' + cotizacion.codigo + '.pdf',
                                path: './files/COT-' + cotizacion.codigo + '.pdf',
                                cid: 'unique@pdf'
                            },
                        ]
                    }

                    smtpTransport.sendMail(mailOptions, function(error,res){
                        if(error){
                            console.log(error);
                        }else{
                            console.log(res);

                            var updCot = {
                                estatus: "Enviada"
                            }
                
                            Cotizaciones.updateOne({"_id": solicitud.params.id}, updCot, function(error){
                                if(error){
                                    console.log(error);
                                } else {
                                    if( solicitud.params.tipo == 1){
                                        Cotizaciones.findById({"_id": solicitud.body.codigo_id}, function(error, coti){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                ArticulosCotizaciones.find({"cotizacion": coti.id}, function(error, articulos){
                                                    if(error){
                                                        console.log(error);
                                                    } else {
                                                        Usuarios.find( function(error, usuarios){
                                                            if(error){
                                                                console.log(error);
                                                            } else {
                                                                respuesta.render("Externos/Cotizaciones/cotizacion",
                                                                    {
                                                                        user: solicitud.session.user,
                                                                        articulos: articulos,
                                                                        cotizacion: coti.id,
                                                                        codigo_cot: coti.codigo,
                                                                        subtotal: parseFloat(coti.subtotal).toFixed(2),
                                                                        iva: parseFloat(coti.iva).toFixed(2) ,
                                                                        total:parseFloat(coti.total).toFixed(2),
                                                                        proveedor: solicitud.body.proveedor,
                                                                        vigencia: solicitud.body.vigencia,
                                                                        observaciones: solicitud.body.observaciones,
                                                                        titulo: "Cotizaciones",
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
                                                                        ruta: "cotizaciones"
                                                                    }
                                                                );
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        
                                        Cotizaciones.find( function(error, cotizaciones){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Usuarios.find( function(error, usuarios){
                                                    if(error){
                                                        console.log(error);
                                                    } else {
                                                        respuesta.render("Externos/Cotizaciones/cotizaciones",
                                                            {
                                                                user: solicitud.session.user,
                                                                cotizaciones: cotizaciones,
                                                                titulo: "Cotizaciones",
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
                                                                ruta: "cotizaciones"
                                                            }
                                                        );
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });

                            console.log("Correo enviado!")
                        }
                        smtpTransport.close();
                    });
                }
            });
        };
    },
    // Generar pdf de cotización
    pdfCotizacion:  function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Cotizaciones.findById({"_id": solicitud.params.id}, function(error, cotizacion){
                if(error){
                    //console.log(error);
                } else {
                    //console.log(cotizacion);
                    ArticulosCotizaciones.find({"cotizacion": cotizacion.id}, function(error, articulos){
                        if(error){
                            console.log(error);
                        } else {
                            // Crear el documento
                            doc = new pdf({
                                // Establecer tamaño de hoja
                                size: 'letter'
                            });
                        
                            // Logo empresa
                            doc.image('./public/imgs/logo.png', 5, 40,{width: 200})
                            
                            // Nombre empresa y rfc
                            doc.font('fonts/Roboto-Black.ttf')
                            .fontSize(14)
                            .text( cotizacion.proveedor, 310, 40, { align: 'right', width: 290 })
                            
                            // Nombre formato, fecha y hora de creación
                            doc.font('fonts/Roboto-Regular.ttf')
                            .fontSize(14)
                            .text("Cotización",{ align: 'right' , width: 290})
                            .text("Fecha: "+ FechaHora.obtenerfecha() + " - Hora: " + FechaHora.obtenerhora(),{ align: 'right' , width: 290})
                            
                            // Serie de la orden I = insumos M = mantenimientos
                            doc.font('fonts/Roboto-Black.ttf')
                            .text("Cot: " + cotizacion.codigo, {align: 'right', width: 290});

                            // Cuadro orden de compra y orden número
                            doc.font('fonts/Roboto-Regular.ttf')
                            doc.lineWidth(25)
                            doc.lineCap('butt')
                            .fillColor("blue")
                            .moveTo(400, 160)
                            .lineTo(600, 160)
                            .stroke()
                        
                            doc.fontSize(12)
                            .fill('white')
                            .text("No. Cotización", 460, 150)
                        
                            doc.polygon([401,170],[599,170],[599,195],[401,195])
                            .lineWidth(2)
                            .stroke()
                            
                            doc.fill('black')
                            doc.text(cotizacion.id, 395, 175, { align: 'center' , width: 200})
                        
                            // Datos de la empresa
                            doc.fillColor('black')
                            doc.text("Flavio Borquez #1603 A", 15, 140, { align: 'left', width: 200})
                            .text("Col. Prados del Tepeyac", { align: 'left', width: 200})
                            .text("C.P. 85150, Cd. Obregón, Sonora.", { align: 'left', width: 200})
                        
                            // Datos de la cotización
                            doc.font('fonts/Roboto-Black.ttf')
                            .text("Vigencia", 15, 210, { align: 'left', width: 200})
                            .text("Moneda", 95, 210, { align: 'left', width: 200})

                            if (cotizacion.tipoCambio != ""){
                                doc.text("Tipo de Cambio", 165, 210, { align: 'left', width: 200})
                                .font('fonts/Roboto-Regular.ttf')
                                .text( cotizacion.tipoCambio, 170, 225, { align: 'left'})
                            }
                            
                            doc.font('fonts/Roboto-Regular.ttf')
                            .text( cotizacion.vigencia, 20, 225,  { align: 'left'})
                            .text( cotizacion.moneda, 100, 225, { align: 'left'})
                            .text( cotizacion.tipoCambio, 170, 225, { align: 'left'})

                            // Encabezados tabla
                            doc.lineWidth(25)
                            doc.lineCap('butt')
                            .fillColor("blue")
                            .moveTo(15, 280)
                            .lineTo(600, 280)
                            .stroke()
                        
                            doc.fontSize(12)
                            .fill('white')
                            .text("Cant", 17, 270, {align: 'center', width: 45})
                            .text("Codigo", 59, 270,  {align: 'center', width: 70})
                            .text("Descripción",109, 270, {align: 'center', width: 250})
                            .text("Unidad",389, 270, {align: 'center', width: 45})
                            .text("Tiemp. Ent",454, 270, {align: 'center', width: 80})
                            .text("Importe",529, 270, {align: 'center', width: 80})
                        
                            // Llenado de tabla
                            var y = 280,
                                subtotal = 0.00,
                                iva = 0.00,
                                total = 0.00;

                            articulos.forEach( function(art) {
                                y += 15;
                                doc.fillColor('black')
                                .text(art.cantidad, 17, y, {align: 'center', width: 45})
                                .text(art.codigo, 59, y,  {align: 'center', width: 70})
                                .text(art.descripcion, 134, y, {align: 'left', width: 250})
                                .text(art.unidad, 389, y, {align: 'center', width: 45})
                                .text(art.tiempoEntrega, 454, y, {align: 'center', width: 80})
                                .text(fmon.FormatMoney(true,parseFloat(art.precioNeto)), 529, y, {align: 'center', width: 80})

                                subtotal += parseFloat(art.precioUnitario);
                                iva += parseFloat(art.iva);
                                total += parseFloat(art.precioNeto);
                            });
                                            
                            // División productos y totales
                            doc.lineWidth(2)
                            doc.lineCap('butt')
                            .moveTo(15, 665)
                            .lineTo(600, 665)
                            .stroke()

                            // Conciciones / Observaciones / Comentarios
                            doc.font('fonts/Roboto-Black.ttf')
                            .text("Conciciones / Observaciones / Comentarios", 15, 670, { align: 'left', width: 400 })
                            doc.font('fonts/Roboto-Regular.ttf')
                            .text(cotizacion.observaciones, 20, 685, { align: 'left', width: 480 })
                            
                            // Subtotal, IVA y total
                            doc.font('fonts/Roboto-Black.ttf')
                            .text("Subtotal", 440, 670, { align: 'right', width: 80 })
                            .text("IVA", 440, 685, { align: 'right', width: 80 })
                            .text("Total", 440, 700, { align: 'right', width: 80 })

                            doc.font('fonts/Roboto-Regular.ttf')
                            .text(fmon.FormatMoney(true,subtotal), 520, 670, { align: 'right', width: 80 })
                            .text(fmon.FormatMoney(true,iva), 520, 685, { align: 'right', width: 80 })
                            .text(fmon.FormatMoney(true,total), 520, 700, { align: 'right', width: 80 })
                        
                            // Creación del documento y guardado

                            var nombre_archivo = './files/COT-' + cotizacion.codigo + '.pdf';
                            
                            //console.log(nombre_archivo);

                            doc.pipe(fs.createWriteStream(nombre_archivo)).on('finish', function (){
                                console.log('PDF closed');
                            });
                        
                            // Finalize PDF file
                            doc.end();

                            var cotUpd = {
                                estatus: "Generada"
                            }

                            Cotizaciones.updateOne({"_id": solicitud.params.id}, cotUpd, function(error){
                                if(error){
                                    console.log(error);
                                } else {
                                    console.log("Update cotización correcta");
                                }
                            });

                            if(solicitud.params.tipo == 1){
                                Cotizaciones.find( function(error, cotizaciones){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        Usuarios.find( function(error, usuarios){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                respuesta.render("Externos/Cotizaciones/cotizaciones",
                                                    {
                                                        user: solicitud.session.user,
                                                        cotizaciones: cotizaciones,
                                                        titulo: "Cotizaciones",
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
                                                        ruta: "cotizaciones"
                                                    }
                                                );
                                            }   
                                        });
                                    }
                                });
                            } else {
                                Cotizaciones.findById({"_id": solicitud.body.codigo_id}, function(error, coti){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        ArticulosCotizaciones.find({"cotizacion": coti.id}, function(error, articulos){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Usuarios.find( function(error, usuarios){
                                                    if(error){
                                                        console.log(error);
                                                    } else {
                                                        respuesta.render("Externos/Cotizaciones/cotizacion",
                                                            {
                                                                user: solicitud.session.user,
                                                                articulos: articulos,
                                                                cotizacion: coti.id,
                                                                codigo_cot: coti.codigo,
                                                                subtotal: parseFloat(coti.subtotal).toFixed(2),
                                                                iva: parseFloat(coti.iva).toFixed(2) ,
                                                                total:parseFloat(coti.total).toFixed(2),
                                                                proveedor: solicitud.body.proveedor,
                                                                vigencia: solicitud.body.vigencia,
                                                                observaciones: solicitud.body.observaciones,
                                                                titulo: "Cotizaciones",
                                                                criterios: [
                                                                    {
                                                                        val: "",
                                                                        name: ""
                                                                    },
                                                                ],
                                                                usuarios: usuarios,
                                                                ruta: "cotizaciones"
                                                            }
                                                        );
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }

                        }
                    });
                }
            });
        };
    },
    // Convertir cotización en orden de compra
    convertirCotizacionAOrden: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Cotizaciones.findById({"_id": solicitud.params.id}, function(error, cotizacion){
                if(error){
                    console.log(error);
                } else {
                    Proveedores.find({"nombreEmpresa": cotizacion.empresa}, function(error, proveedor){
                        if(error){
                            console.log(error);
                        } else {
                            
                            if(proveedor.length > 0){

                                var cantOrd = 0;
                                var serie = '';

                                Cotizaciones.find( function(error, cotizaciones){
                                    if(error){
                                        console.log(error);
                                    } else {	
                                        cantOrd = cotizaciones.length;
                                    }
                                });
                                                                        
                                // J. Parrilla
                                if( solicitud.session.user.numero_nomina == 305 || solicitud.session.user.permisos == 'developer'){
                                    serie = 'M-' + zf.zfill(cantOrd, 5);
                                // J. Cuamea
                                } else if (solicitud.session.user.numero_nomina == 306) {
                                    serie = 'I-' + zf.zfill(cantOrd, 5);
                                }

                                var dataOrd = {
                                    proveedor: proveedor.id,
                                    fecha: FechaHora.obtenerfecha(),
                                    hora: FechaHora.obtenerhora(),
                                    subtotal: cotizacion.subtotal,
                                    iva: cotizacion.iva,
                                    total: cotizacion.total,
                                    serie: serie,
                                    estatus: 'Nueva'
                                }

                                var ord = new Ordenes(dataOrd);

                                ord.save( function(error, orden){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        ArticulosCotizaciones.find({"cotizacion": cotizacion.id}, function(error, articulos){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                articulos.forEach( function(art){

                                                    var dataArt = {
                                                        cantidad: art.cantidad,
                                                        unidad: art.unidad,
                                                        codigo: art.codigo,
                                                        producto: art.descripcion,
                                                        descripcion: art.descripcion,
                                                        precio_unitario: art.precioUnitario,
                                                        iva: art.iva,
                                                        importe: art.precioNeto,
                                                        orden: String
                                                    }

                                                    var arti = new ArticulosOrdenes(dataArt);

                                                    arti.save( function(error){
                                                        if(error){
                                                            console.log(error);
                                                        }
                                                    });
                                                });
                                            }
                                        });
                                    }
                                });

                                var updCot = {
                                    estatus: "Orden"
                                }
                    
                                Cotizaciones.updateOne({"_id": solicitud.params.id}, updCot, function(error){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        Cotizaciones.find( function(error, cotizaciones){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Usuarios.find( function(error, usuarios){
                                                    if(error){
                                                        console.log(error);
                                                    } else {
                                                        respuesta.render("Externos/Cotizaciones/cotizaciones",
                                                            {
                                                                user: solicitud.session.user,
                                                                cotizaciones: cotizaciones,
                                                                titulo: "Cotizaciones",
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
                                                                ruta: "cotizaciones"
                                                            }
                                                        );
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });										
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        respuesta.render("Externos/Cotizaciones/error_proveedor",
                                            {
                                                user: solicitud.session.user,
                                                titulo: "Cotizaciones",
                                                criterios: [
                                                    {
                                                        val: "",
                                                        name: ""
                                                    },
                                                ],
                                                usuarios: usuarios,
                                                ruta: "cotizaciones"
                                            }
                                        );
                                    }
                                });
                            }
                        }
                    });
                }
            });
        };
    },
    // Eliminar articulo de cotización
    eliminarArticulo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            ArticulosCotizaciones.deleteOne({"_id": solicitud.params.id}, function(error){
                if(error){
                    console.log(error);
                } else {
                    Cotizaciones.findById({"_id": solicitud.params.id_cot}, function(error, cotizacion){
                        if(error){
                            console.log(error);
                        } else {
                            ArticulosCotizaciones.find({"cotizacion": cotizacion.id}, function(error, articulos){
                                if(error){
                                    console.log(error);
                                } else {
                                    var subtotal = 0.00;
                                    var iva = 0.00;
                                    var total = 0.00;
                                    
                                    articulos.forEach( function(art) {
                                        subtotal = parseFloat(subtotal) + parseFloat(parseFloat(art.cantidad) * parseFloat(art.precioUnitario));
                                        iva = parseFloat(iva) + parseFloat(parseFloat(art.cantidad) * parseFloat(art.iva));
                                        total = parseFloat(total) + parseFloat(parseFloat(art.cantidad) * parseFloat(art.precioNeto));
                                    });

                                    var updTotales = {
                                        subtotal: parseFloat(subtotal).toFixed(2),
                                        iva: parseFloat(iva).toFixed(2),
                                        total: parseFloat(total).toFixed(2)
                                    }
                            
                                    Cotizaciones.updateOne({"_id": cotizacion.id}, updTotales, function(error, cot){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            Cotizaciones.findById({"_id": cotizacion.id}, function(error, coti){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        if(error){
                                                            console.log(error);
                                                        } else {
                                                            respuesta.render("Externos/Cotizaciones/cotizacion",
                                                                {
                                                                    user: solicitud.session.user,
                                                                    articulos: articulos,
                                                                    cotizacion: coti.id,
                                                                    codigo_cot: coti.codigo,
                                                                    subtotal: parseFloat(coti.subtotal).toFixed(2),
                                                                    iva: parseFloat(coti.iva).toFixed(2) ,
                                                                    total:parseFloat(coti.total).toFixed(2),
                                                                    proveedor: solicitud.body.proveedor,
                                                                    titulo: "Cotizaciones",
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
                                                                    ruta: "cotizaciones"
                                                                }
                                                            );
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
        };
    },
    // Eliminar cotización
    eliminarCotizacion: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Cotizaciones.deleteOne({"_id": solicitud.params.id}, function(error){
                if(error){
                    console.log(error);
                } else {
                    Cotizaciones.find( function(error, cotizaciones){
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else {
                                    respuesta.render("Externos/Cotizaciones/cotizaciones",
                                        {
                                            user: solicitud.session.user,
                                            cotizaciones: cotizaciones,
                                            titulo: "Cotizaciones",
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
                                            ruta: "cotizaciones"
                                        }
                                    );
                                }
                            });
                        }
                    });
                }
            });
        };
    },
    // Cancelar cotización
    cancelar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var updCot = {
                estatus: "Cancelada"
            }

            Cotizaciones.updateOne({"_id": solicitud.params.id}, updCot, function(error){
                if(error){
                    console.log(error);
                } else {
                    Cotizaciones.find( function(error, cotizaciones){
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else {
                                    respuesta.render("Externos/Cotizaciones/cotizaciones",
                                        {
                                            user: solicitud.session.user,
                                            cotizaciones: cotizaciones,
                                            titulo: "Cotizaciones",
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
                                            ruta: "cotizaciones"
                                        }
                                    );
                                }
                            });
                        }
                    });
                }
            });
        };
    },
    // Pagar cotización
    pagar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var updCot = {
                estatus: "Pagada"
            }

            Cotizaciones.updateOne({"_id": solicitud.params.id}, updCot, function(error){
                if(error){
                    console.log(error);
                } else {
                    Cotizaciones.find( function(error, cotizaciones){
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else {
                                    respuesta.render("Externos/Cotizaciones/cotizaciones",
                                        {
                                            user: solicitud.session.user,
                                            cotizaciones: cotizaciones,
                                            titulo: "Cotizaciones",
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
                                            ruta: "cotizaciones"
                                        }
                                    );
                                }
                            });
                        }
                    });
                }
            });
        };
    },
    // Cotizaciones solo nuevas
    soloNuevas: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Cotizaciones.find({"estatus": "Nueva"}, function(error, cotizaciones){
                if(error){
                    console.log(error);
                } else {
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render("Externos/Cotizaciones/cotizaciones",
                                {
                                    user: solicitud.session.user,
                                    cotizaciones: cotizaciones,
                                    titulo: "Cotizaciones",
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
                                    ruta: "cotizaciones"
                                }
                            );
                        }
                    });
                }
            });
        }
    }
}