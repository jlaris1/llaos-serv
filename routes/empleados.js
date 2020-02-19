var mongoose = require('mongoose'),
    Empleados = mongoose.model('Empleados'),
    Puestos = mongoose.model('Puestos'),
    FechaHora = require('./fechahora'),
    FormatMoney = require('./formatmoney'),
    NumeroLetras = require('./numeroletras'),
	path = require('path'),
    fs = require('fs');

    // Variables de conexión para envio de correo
	var smtpTransport = nodemailer.createTransport({
		host: 'mail.llaos.com',
		port: 465,
		secure: true,
		auth: {
			user: 'sistema@llaos.com',
			pass: '@SisWeb_2020!a'
		},
		tls: {
			rejectUnauthorized: false
		}
    });
    
    //var pagina_sistema = 'http://llaos.ddns.net:3000/';
    var pagina_sistema = 'https://https://35.236.72.196:3000/';
    var pagina_prueba = 'http://localhost:3000/'

module.exports = {
    // Método para obtener todos los empleados
    todos: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            
            Empleados.find( function(error, empleados) {
                Puestos.populate(empleados, {path: 'puesto'}, function(error, empleados){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            if(error){
                                console.log(error);
                            } else { 
                                respuesta.render("Empleados/empleados", {
                                    user: solicitud.session.user,
                                    empleados: empleados,
                                    titulo: "Empleados",
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
                                    ruta: "empleados"
                                });
                            } 
                        });
                    }
                });
            });
        };
    },
    // Método para mostrar el alta de personal/empleados
    nuevo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Puestos.find( function(error, puestos) {
                Usuarios.find( function(error, usuarios){
                    if(error){
                        console.log(error);
                    } else { 
                        respuesta.render("Empleados/empleado", {
                            user: solicitud.session.user,
                            puestos: puestos,
                            titulo: "Empleados",
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
                            ruta: "empleados"
                        });
                    } 
                });
            });
        };
    },
    // Método para guardar al empleado en la bd
    guardarEmpleado: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Puestos.findById({ "_id":solicitud.body.puesto }, function(error, puesto) {
                var infonavit = '';
                if (solicitud.body.tiene_infonavit == 'on'){
                    infonavit = true;
                } else {
                    infonavit = false;
                };

                var data = {
                    numero: solicitud.body.numero,
                    fingreso: solicitud.body.fingreso,
                    duracion_contrato: solicitud.body.duracion_contrato,
                    hora_entrada: solicitud.body.hora_entrada,
                    hora_salida: solicitud.body.hora_salida,
                    puesto: solicitud.body.puesto,
                    jefe_directo: solicitud.body.jefe_directo,
                    area: puesto,
                    modulo: solicitud.body.modulo,
                    apoyo_transporte: solicitud.body.apoyo_transporte,
                    sueldo_diario: solicitud.body.sueldo_diario,
                    tipo_sueldo: solicitud.body.tipo_sueldo,
                    apoyo_sueldo: solicitud.body.apoyo_sueldo,
                    //
                    nombre: solicitud.body.nombre,
                    sexo: solicitud.body.sexo,
                    estado_civil: solicitud.body.estado_civil,
                    nss: solicitud.body.nss,
                    umf: solicitud.body.umf,
                    rfc: solicitud.body.rfc,
                    curp: solicitud.body.curp,
                    nacionalidad: solicitud.body.nacionalidad,
                    lugar_nacimiento: solicitud.body.lugar_nacimiento,
                    edad: solicitud.body.edad,
                    fnacimiento: solicitud.body.fnacimiento,
                    chk_albanil: solicitud.body.chk_albanil,
                    chk_carpintero: solicitud.body.chk_carpintero,
                    chk_chofer: solicitud.body.chk_chofer,
                    chk_electricista: solicitud.body.chk_electricista,
                    chk_guardia: solicitud.body.chk_guardia,
                    chk_herrero: solicitud.body.chk_herrero,
                    chk_mecanico: solicitud.body.chk_mecanico,
                    chk_plomero: solicitud.body.chk_plomero,
                    chk_soldador: solicitud.body.chk_soldador,
                    chk_velador: solicitud.body.chk_velador,
                    chk_otro: solicitud.body.chk_otro,
                    otro_habilidad: solicitud.body.otro_habilidad,
                    //
                    nombre_emergencia: solicitud.body.nombre_emergencia,
                    parentesco_emergencia: solicitud.body.parentesco_emergencia,
                    telefono_emergencia: solicitud.body.telefono_emergencia,
                    //
                    direccion: solicitud.body.direccion,
                    colonia: solicitud.body.colonia,
                    estado: solicitud.body.estado,
                    del_mun: solicitud.body.del_mun,
                    cp: solicitud.body.cp,
                    telefono: solicitud.body.telefono,
                    celular: solicitud.body.celular,
                    correo: solicitud.body.correo,
                    tiene_infonavit: infonavit,
                    numero_credito: solicitud.body.numero_credito,
                    factor_descuento: solicitud.body.factor_descuento,
                    observaciones: solicitud.body.observaciones,
                    //
                    estatus: "Nuevo"
                };

                var empleado = new Empleados(data);

                empleado.save( function(error){
                    if(error){
                        console.log(error);
                    }else{
                        Usuarios.find( function(error, usuarios){
                            if(error){
                                console.log(error);
                            } else { 
                                respuesta.render("Empleados/documentacion", {
                                    user: solicitud.session.user,
                                    empleado: empleado,
                                    puesto: puesto,
                                    titulo: "Alta de Personal - Documentación",
                                    titulo: "Empleados",
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
                                    ruta: "empleados"
                                });
                            } 
                        });
                    };
                });
            });           
        };
    },
    // Método para mostrar la edición de empleados
    editar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Empleados.findById({"_id":solicitud.params.id}, function(error, empleado){
                if(error){
                    console.log(error);
                }else{
                    Puestos.find(function(error, puestos){
                    if(error){
                        console.log(error);
                    } else {
                        if(solicitud.session.user === undefined){
                            respuesta.redirect("/");
                        }else{
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else { 
                                    respuesta.render("Empleados/editar",{
                                        user: solicitud.session.user,
                                        empleado: empleado,
                                        puestos: puestos,
                                        titulo: "Empleados",
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
                                        ruta: "empleados"
                                    });
                                } 
                            });           
                        };
                    };
                });
                };
            });
        };
    },
    // Método para actualizar los datos del empleado en bd
    actualizar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Puestos.findById({ "_id":solicitud.body.puesto }, function(error, puesto) {
                var infonavit = '';
                if (solicitud.body.tiene_infonavit == 'on'){
                    infonavit = true;
                }else{
                    infonavit = false;
                };

                var data = {
                    numero: solicitud.body.numero,
                    fingreso: solicitud.body.fingreso,
                    duracion_contrato: solicitud.body.duracion_contrato,
                    hora_entrada: solicitud.body.hora_entrada,
                    hora_salida: solicitud.body.hora_salida,
                    puesto: solicitud.body.puesto,
                    jefe_directo: solicitud.body.jefe_directo,
                    area: solicitud.body.area,
                    modulo: solicitud.body.modulo,
                    apoyo_transporte: solicitud.body.apoyo_transporte,
                    sueldo_diario: solicitud.body.sueldo_diario,
                    tipo_sueldo: solicitud.body.tipo_sueldo,
                    apoyo_sueldo: solicitud.body.apoyo_sueldo,
                    //
                    nombre: solicitud.body.nombre,
                    sexo: solicitud.body.sexo,
                    estado_civil: solicitud.body.estado_civil,
                    nss: solicitud.body.nss,
                    umf: solicitud.body.umf,
                    rfc: solicitud.body.rfc,
                    curp: solicitud.body.curp,
                    nacionalidad: solicitud.body.nacionalidad,
                    lugar_nacimiento: solicitud.body.lugar_nacimiento,
                    edad: solicitud.body.edad,
                    fnacimiento: solicitud.body.fnacimiento,
                    chk_albanil: solicitud.body.chk_albanil,
                    chk_carpintero: solicitud.body.chk_carpintero,
                    chk_chofer: solicitud.body.chk_chofer,
                    chk_electricista: solicitud.body.chk_electricista,
                    chk_guardia: solicitud.body.chk_guardia,
                    chk_herrero: solicitud.body.chk_herrero,
                    chk_mecanico: solicitud.body.chk_mecanico,
                    chk_plomero: solicitud.body.chk_plomero,
                    chk_soldador: solicitud.body.chk_soldador,
                    chk_velador: solicitud.body.chk_velador,
                    chk_otro: solicitud.body.chk_otro,
                    otro_habilidad: solicitud.body.otro_habilidad,
                    //
                    nombre_emergencia: solicitud.body.nombre_emergencia,
                    parentesco_emergencia: solicitud.body.parentesco_emergencia,
                    telefono_emergencia: solicitud.body.telefono_emergencia,
                    //
                    direccion: solicitud.body.direccion,
                    colonia: solicitud.body.colonia,
                    estado: solicitud.body.estado,
                    del_mun: solicitud.body.del_mun,
                    cp: solicitud.body.cp,
                    telefono: solicitud.body.telefono,
                    celular: solicitud.body.celular,
                    correo: solicitud.body.correo,
                    tiene_infonavit: infonavit,
                    numero_credito: solicitud.body.numero_credito,
                    factor_descuento: solicitud.body.factor_descuento,
                    observaciones: solicitud.body.observaciones
                };

                Empleados.updateOne({"_id": solicitud.params.id}, data, function(error){
                    if(error){
                        //console.log(error);
                    }else{
                        Empleados.findById({"_id":solicitud.params.id}, function(error, empleado){
                            if(error){
                                //console.log(error);
                            }else{
                                if(solicitud.session.user === undefined){
                                    respuesta.redirect("/");
                                }else{
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Empleados/documentacion",{
                                                user: solicitud.session.user,
                                                empleado: empleado,
                                                puesto: puesto,
                                                titulo: "Editar personal - Documentación",
                                                titulo: "Empleados",
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
                                                ruta: "empleados"
                                            });
                                        } 
                                    });           
                                };
                            };
                        });
                    };
                });
            });
        };
    },
    // Método para autorizar al empleado
    autorizar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var data = {
                estatus: "Autorizado"
            };

            Empleados.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(error);
                }else{
                    respuesta.redirect('/empleados');
                };
            });
        };
    },
    // Método para mostrar la baja de empleado
    baja: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Empleados.findById({"_id":solicitud.params.id}, function(error, empleado){
                if(error){
                    console.log(error);
                }else{
                    if(solicitud.session.user === undefined){
                        respuesta.redirect("/");
                    }else{           
                        Usuarios.find( function(error, usuarios){
                            if(error){
                                console.log(error);
                            } else { 
                                respuesta.render("Empleados/baja",{
                                    user: solicitud.session.user,
                                    empleado: empleado,
                                    titulo: "Empleados",
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
                                    ruta: "empleados"
                                });
                            } 
                        });
                    };
                };
            });
        };
    },
    // Método para subir la documentacion del empleado
    subirDocs: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            // Ruta destino de almacenamiento
            var carpeta = './files/Desarrollo Humano/Empleados/Altas';
            var carpetaEmpleado = '/'+solicitud.body.nomEmpleado;

            fs.mkdir(carpeta+carpetaEmpleado, function(err){
                if(err){
                    //console.log('ERROR: Falla detectada al crear la carpeta.', err);
                } else{// Carpeta creada
                    //Considerar hacer todo aqui
                    //console.log('Carpeta creada con éxito.');
                };
            });

            var rfcDoc 		= solicitud.files.rfc_doc;
            var actanaciDoc = solicitud.files.actanaci_doc;
            var credeDoc 	= solicitud.files.crede_doc;
            var curpDoc 	= solicitud.files.curp_doc;
            var nssDoc 		= solicitud.files.nss_doc;
            var cdomDoc 	= solicitud.files.cdom_doc;
            var solicitudDoc= solicitud.files.solicitud_doc;
            
            var rfcRuta         = '';              
            var actanaciRuta    = '';                   
            var credeRuta       = '';                 
            var curpRuta        = '';                   
            var nssRuta         = '';             
            var cdomRuta        = '';                   
            var solicitudRuta   = '';

            // Usar el metodo mv() para colocar cada archivo en algun lugar en el servidor 
            if(rfcDoc != undefined){
                rfcRuta = carpetaEmpleado+'/RFC'+path.extname(solicitud.files.rfc_doc.name);
                rfcDoc.mv(carpeta+rfcRuta, function(error){
                    if(error){
                        //Que hacer si hay error al subir....
                        return respuesta.status(500).send(error);
                    }else{
                        //console.log("RFC subido exitosamente");
                    }
                });
            }else{
                //console.log("No se halló archivo de RFC.");
            };
            //
            if(actanaciDoc != undefined){
                actanaciRuta = carpetaEmpleado+'/Acta Nacimiento'+path.extname(solicitud.files.actanaci_doc.name);
                actanaciDoc.mv(carpeta+actanaciRuta, function(error){
                    if(error){
                        return respuesta.status(500).send(error);
                    }else{
                        //console.log("Acta de nacimiento subido exitosamente");
                    }
                });
            }else{
                console.log("No se halló archivo de Acta de Nacimiento.");
            };
            //
            if(credeDoc != undefined){
                credeRuta = carpetaEmpleado+'/Credencial Elector'+path.extname(solicitud.files.crede_doc.name);
                credeDoc.mv(carpeta+credeRuta, function(error){
                    if(error){
                        return respuesta.status(500).send(error);
                    }else{
                        console.log("Credencial de Elector subido exitosamente");
                    }
                });
            }else{
                console.log("No se halló archivo de Credencial de Elector.");
            };
            //
            if(curpDoc != undefined){
                curpRuta = carpetaEmpleado+'/CURP'+path.extname(solicitud.files.curp_doc.name);
                curpDoc.mv(carpeta+curpRuta, function(error){
                    if(error){
                    return respuesta.status(500).send(error);
                    }else{
                        console.log("CURP subido exitosamente");
                    }                
                });
            }else{
                console.log("No se halló archivo de CURP.");
            };
            //
            if(nssDoc != undefined){
                nssRuta = carpetaEmpleado+'/NSS'+path.extname(solicitud.files.nss_doc.name);
                nssDoc.mv(carpeta+nssRuta, function(error){
                    if(error){
                        return respuesta.status(500).send(error);
                    }else{
                        console.log("NSS subido exitosamente");
                    }
                });
            }else{
                console.log("No se halló archivo de NSS.");
            };
            //
            if(cdomDoc != undefined){
                cdomRuta = carpetaEmpleado+'/Comprobante Domicilio'+path.extname(solicitud.files.cdom_doc.name);
                cdomDoc.mv(carpeta+cdomRuta, function(error){
                    if(error){
                        return respuesta.status(500).send(error);
                    }else{
                        console.log("Comprobante de domicilio subido exitosamente");
                    }
                });
            }else{
                console.log("No se halló archivo de Comprobante de domicilio.");
            };
            //
            if(solicitudDoc != undefined){
                solicitudRuta = carpetaEmpleado+'/Solicitud Empleado'+path.extname(solicitud.files.solicitud_doc.name);
                solicitudDoc.mv(carpeta+solicitudRuta, function(error){
                    if(error){
                        return respuesta.status(500).send(error);
                    }else{
                        console.log("Solicitud de Empleo subido exitosamente");
                    }
                });
            }else{
                console.log("No se halló archivo de Solicitud de empleo.");
            };

            var data = {
                rfcDoc_ruta: rfcRuta,
                actanaciDoc_ruta: actanaciRuta,
                credeDoc_ruta: credeRuta,
                curpDoc_ruta: curpRuta,
                nssDoc_ruta: nssRuta,
                cdomDoc_ruta: cdomRuta,
                solicitudDoc_ruta: solicitudRuta
            };

            Empleados.updateOne({"_id": solicitud.body.idempleado}, data, function(error){
                if(error){
                    console.log(error);
                }else{
                    Empleados.findById({"_id":solicitud.body.idempleado}, function(error, empleado){
                        if(error){
                            console.log(error);
                        }else{
                            Puestos.populate(empleado, {path: 'puesto'}, function(error, empleado){
                                if(solicitud.session.user === undefined){
                                    respuesta.redirect("/");
                                }else{//Cambiar el render por redirect y hacer un metodo para el render al que apuntara el redirect.
                                    
                                    var url = empleado.nombre.toUpperCase() + '/' + 'CONTRATO.pdf'
                                    
                                    pdfContratoEspecial(empleado.id);

                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Empleados/documentacion-resultado",{
                                                user: solicitud.session.user,
                                                empleado: empleado,
                                                url: url,
                                                titulo: "Empleados",
                                                criterios: [
                                                    {
                                                        val: "",
                                                        name: ""
                                                    },
                                                ],
                                                usuarios: usuarios,
                                                ruta: "empleados"
                                            });
                                        } 
                                    });
                                };
                            });
                        };
                    });
                };
            });
        };
    },
    pdfContrato: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Empleados.findById({"_id": solicitud.params.id}, function(error, empleado){
                if(error){
                    console.log(error);
                } else {
                    doc = new pdf({
                        // Establecer tamaño de hoja
                        size: 'letter',
                        margin_bottom: '0.05in',
                    });
                
                    // Logo empresa
                    doc.image('./public/imgs/logo.png', 5, 20, { width: 150, heigth: 87})
                    
                    doc.lineWidth(50)
                    .lineCap('butt')
                    .moveTo(160, 55)
                    .lineTo(615, 55)
                    .stroke()
        
        
                    // Nombre empresa y rfc
                    .font('fonts/Roboto-Black.ttf')
                    .fill('white')
                    .fontSize(12)
                    .text('CONTRATO INDIVIDUAL DE TRABAJO', 150, 45, { align: 'center', width: 290})
                    .text('TIEMPO DETERMINADO', 390, 45, { align: 'right', width: 200})
        
                    .fontSize(9)
        
                    // Parrafo # 
                    
                    var terminoContrato = FechaHora.sumarDias( new Date(empleado.fingreso) + 28);
                    var fechaContrato = "DEL " + FechaHora.obtenerFechaMesLetra() + " AL " + FechaHora.obtenerFechaEspecial(terminoContrato) + " ";

                    doc.fill('black')
                    .font('fonts/Roboto-Regular.ttf')
                    .text("CONTRATO INDIVIDUAL DE TRABAJO POR TIEMPO DETERMINADO ", 10, 91,  { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Black.ttf').text( fechaContrato, {continued: true}).font('fonts/Roboto-Regular.ttf').text("LA EMPRESA LLAOS ACUACULTURA SA DE CV, REPRESENTADA POR TANIA DEL ROSARIO LLANES CLARK Y " +
                    "POR LA OTRA ", {continued: true}).font('fonts/Roboto-Black.ttf').text( empleado.nombre + " ", {continued: true}).font('fonts/Roboto-Regular.ttf').text("QUIEN EN ADELANTE SE DESIGNARA “EL EMPLEADO”, " +
                    "AL TENOR DE LAS SIGUIENTES DECLARACIONES Y CLÁUSULAS")
        
                    // Daclaraciones
                    .font('fonts/Roboto-Black.ttf')
                    .text("D E C L A R A C I O N E S", 10 , 136, {align: 'center', width: 595})
        
                    // Parrafo # 2
                    .font('fonts/Roboto-Black.ttf')
                    .text("I.- LA EMPRESA ", 10, 154, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" es una Sociedad Anónima de Capital Variable, constituida conforme a las Leyes mexicanas " + 
                    "y que tiene su domicilio en la Ciudad de Obregón, Sonora, Calle FLAVIO BORQUEZ 1603-A, COLONIA PRADOS DEL " + 
                    "TEPEYAC, CD OBREGON  SONORA, C.P. 85150")
        
                    // Parrafo # 3
                    .font('fonts/Roboto-Black.ttf')
                    .text("II.- EL EMPLEADO ",  10, 181, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("declara ser de nacionalidad ", {continued: true}).font('fonts/Roboto-Black.ttf').text(empleado.nacionalidad + " ",{continued: true}).font('fonts/Roboto-Regular.ttf').text(
                    "de "  + empleado.edad + " años de edad, sexo ",{continued: true}).font('fonts/Roboto-Black.ttf').text( empleado.sexo + " ", {continued: true}).font('fonts/Roboto-Regular.ttf').text("estado civil ", {continued: true}).font('fonts/Roboto-Black.ttf').text( empleado.estado_civil + " ", {continued: true}).font('fonts/Roboto-Regular.ttf').text( 
                    "y con domicilio en ", {continued: true}).font('fonts/Roboto-Black.ttf').text( empleado.direccion + " " + empleado.colonia + ", " + empleado.del_mun + ", " + empleado.estado + " CP " + empleado.cp + " IDENTIFICADO CON LA CURP " + empleado.curp + "." )
        
                    // Parrafo # 4
                    .font('fonts/Roboto-Black.ttf')
                    .text("III.- LA EMPRESA ", 10, 213, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("declara que requiere los servicios de una persona que cuente con las competencias, capacidad, aptitud y " + 
                    "facultades para desempeñar en forma eficiente el PUESTO ", {continued: true}).font('fonts/Roboto-Black.ttf').text( empleado.puesto + ".")
        
                    // Parrafo # 5
                    .font('fonts/Roboto-Black.ttf')
                    .text("IV.- EL EMPLEADO ", 10, 235, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" declara que cuenta con las competencias profesionales, aptitudes y capacidad " +
                    "necesaria para el desempeño eficaz del puesto mencionado en la Declaración anterior.")
        
                    // Parrafo # 6
                    .text("Vistas las anteriores declaraciones, las partes otorgan lo que se contiene en las siguientes:", 10, 262,{ align: 'justify' , width: 595})
        
                    // Clausulas
                    .font('fonts/Roboto-Black.ttf')
                    .text("C L A U S U L A S", 10 , 280, {align: 'center', width: 595})
        
                    // Parrafo # 1
                    .font('fonts/Roboto-Black.ttf')
                    .text("PRIMERA.- LA EMPRESA ",10, 298, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" contrata los servicios personales del EMPLEADO por TIEMPO DETERMINADO DEL ", {continued: true}).font('fonts/Roboto-Black.ttf').text(
                    fechaContrato + " ", {continued: true}).font('fonts/Roboto-Regular.ttf').text(" para que los preste en el domicilio de la misma, " +
                    "ubicado en, o en alguna otra de las instalaciones que LA EMPRESA tenga al interior de la República " +
                    "Mexicana.")
        
                    // Parrafo # 2
                    .font('fonts/Roboto-Black.ttf')
                    .text("SEGUNDA.- EL EMPLEADO ",  10, 334, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" por razón del Puesto  a que se refiere el inciso III de la DECLARACIÓN, " +
                    "tendrá en forma enunciativa y no limitativa, las siguientes responsabilidades, propias y naturales " + 
                    "del mismo: ", {continued: true}).font('fonts/Roboto-Black.ttf').text( empleado.puesto + ".")
        
                    // Parrafo # 3
                    .font('fonts/Roboto-Black.ttf')
                    .text("TERCERA.- EL EMPLEADO ", 10, 361, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" se obliga a prestar sus servicios con la intensidad y esmero apropiados en la " +
                    "forma que LA EMPRESA le indique, ejecutando todas las actividades inherentes al PUESTO para el que se le " + 
                    "contrata y todas aquellas que sean propias del mismo, de acuerdo con el uso y la costumbre.")
                    
                    // Parrafo # 4
                    .font('fonts/Roboto-Black.ttf')
                    .text("CUARTA.- ", 10, 397, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" El presente Contrato Individual de Trabajo se celebra por TIEMPO DETERMINADO, sin embargo, " + 
                    "EL EMPLEADO deberá acreditar, en los términos de la Fracción I del Artículo 47 de la Ley Federal del " + 
                    "Trabajo, sus competencias profesionales, experiencia y facultades que ha declarado tener en relación al " + 
                    "objetivo del presente contrato y que le permitirán desempeñar el puesto antes referido, para tal efecto " +
                    "LA EMPRESA podrá rescindir este contrato sin ninguna responsabilidad cuando EL EMPLEADO no demuestre dichas " + 
                    "cualidades.")
        
                    // Parrafo # 5
                    .font('fonts/Roboto-Black.ttf')
                    .text("QUINTA.- ", 10, 451, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" La jornada diaria de trabajo será de ocho, siete y media, y siete horas, según se trate de " + 
                    "jornada diurna, mixta o nocturna. La distribución de las horas de trabajo durante la semana y las horas de " + 
                    "entrada y salida las determinará LA EMPRESA, sin perjuicio de que puedan modificarse en cualquier época por " + 
                    "la propia empresa según sus necesidades. LA EMPRESA podrá repartir las horas de trabajo en los días laborables " +
                    "de la semana, a fin de permitir al empleado el reposo del domingo o cualquier modalidad equivalente.")
        
                    var sueldo_mensual = 0.00;
                    var sueldo_letra = '';

                    if( empleado.tipo_sueldo == 'Semanal'){
                        sueldo_mensual =  empleado.apoyo_sueldo * 4;
                    } else if( empleado.tipo_sueldo == 'Quincenal'){
                        sueldo_mensual =  empleado.apoyo_sueldo * 2;
                    }
                        
                    sueldo_letra = NumeroLetras.numeroALetras(sueldo_mensual);
                    sueldo_mensual = FormatMoney.FormatMoney(true, sueldo_mensual);

                    // Parrafo # 6
                    doc.font('fonts/Roboto-Black.ttf')
                    .text("SEXTA.- ", 10, 505, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" El sueldo que se pagará al Empleado será de ", {continued: true}).font('fonts/Roboto-Black.ttf').text( sueldo_mensual + "(" + sueldo_letra + "M. N) ",{continued: true}).font('fonts/Roboto-Regular.ttf').text(" mensuales, " + 
                    "cuyo pago se realizará los días 15 y 30 de cada mes, en dicho sueldo está ya considerado el pago del séptimo día de cada semana. ")
        
                    .text("En este sentido, EL EMPLEADO manifiesta su consentimiento a LA EMPRESA, para que este pago sea realizado a través de transferencia " + 
                    "bancaria, en la cuenta que éste designe previa solicitud por escrito. Para tal efecto, El empleado tendrá hasta diez días naturales, a " + 
                    "partir de la fecha de pago, para manifestar o reclamar a LA EMPRESA, cualquier diferencia que haya detectado en su ingreso, al término del cual, " + 
                    "y de no haber existido observación alguna, el pago electrónico, se considera correcto para todos los efectos legales a que haya lugar, reconociendo " + 
                    "como prueba del pago el comprobante de depósito y/o transferencia bancaria correspondiente.", 
                    10, 532,{ align: 'justify' , width: 595})
                    
                    // Parrafo # 7
                    .font('fonts/Roboto-Black.ttf')
                    .text("SÉPTIMA.- ", 10, 595, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" Por cada seis días de trabajo EL EMPLEADO disfrutará de un día de descanso con goce de sueldo íntegro, encontrándose ya incluido en " + 
                    "el sueldo mensual en los términos de la Cláusula Sexta; si labora durante menor número de días a la semana, el pago correspondiente al día de " + 
                    "descanso semanal, será proporcional. ")
        
                    // Parrafo # 8
                    .font('fonts/Roboto-Black.ttf')
                    .text("OCTAVA.- ", 10, 631, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("Son días de descanso obligatorio con goce de sueldo los que señala el Artículo 74 de la Ley Federal del Trabajo y el Reglamento de " + 
                    "LA EMPRESA.")
        
                    // Parrafo # 9
                    .font('fonts/Roboto-Black.ttf')
                    .text("NOVENA.- ",  10, 658, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" Queda expresamente asentado que EL EMPLEADO no podrá laborar los días de descanso semanal, los días festivos y descansos obligatorios, " + 
                    "así como tiempo extraordinario, salvo po solicitud previa de LA EMPRESA. ")
        
                    //.text("PRUEBA", 10, 690, {width: 595})
        
                    // Parrafo # 10
                    .font('fonts/Roboto-Black.ttf')
                    .text("DÉCIMA.- EL EMPLEADO ", 10, 684, {continued: true,  align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" disfrutará de vacaciones, prima vacacional y aguinaldo, de acuerdo a la Ley Federal de Trabajo vigente, Si EL EMPLEADO no " + 
                    "tomara sus vacaciones dentro del período de dieciocho meses a partir de su fecha de aniversario en la empresa, prescribirá su derecho para disfrutarlas " + 
                    "sin responsabilidad para LA EMPRESA.")
        
                    // SEGUNDA PÁGINA
                    // OTRA PAGINA
                    .addPage()
        
                    // Parrafo # 11
                    .font('fonts/Roboto-Black.ttf')
                    .text("DÉCIMA PRIMERA.- ", 10, 41, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" Todo lo relacionado con riesgos y enfermedades profesionales se regirá por las disposiciones de la Ley del Seguro Social y en " +
                    "forma supletoria por la Ley Federal del Trabajo.")
        
                    // Parrafo # 12
                    .font('fonts/Roboto-Black.ttf')
                    .text("DÉCIMA SEGUNDA.- EL EMPLEADO ", 10, 68, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("manifiesta que ha leído en todas y cada una de sus partes el Reglamento del LA EMPRESA y expresa su aceptación al " + 
                    "mismo, estando de acuerdo en que éste le sea aplicado en los términos establecidos.")
        
                    // Parrafo # 13
                    .font('fonts/Roboto-Black.ttf')
                    .text("DÉCIMA TERCERA.- EL EMPLEADO ", 10, 95, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("se compromete a obedecer todas las órdenes que LA EMPRESA le dé en relación con el trabajo contratado. Así mismo EL " + 
                    "EMPLEADO está expresamente de acuerdo en que la prestación de sus servicios serán realizados en estricto apego a los procedimientos y normas establecidas en las áreas donde prestara sus servicios, de igual forma acepta someterse a los exámenes médicos que " + 
                    "periódicamente establezca 'EL PATRÓN' en los términos del artículo 134 fracción X de 'LA LEY', a fin de mantener en forma óptima sus facultades físicas e intelectuales, para el mejor desempeño de su funciones.")
        
                    // Parrafo # 14
                    .font('fonts/Roboto-Black.ttf')
                    .text("DÉCIMA CUARTA.- ", 10, 154, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("En el caso de que el trabajo contratado lleve consigo la utilización de Computadoras y sus correspondientes Programas, los cuales serán " + 
                    "proporcionados por LA EMPRESA, éstos serán considerados como herramientas de trabajo y EL EMPLEADO se compromete a utilizarlos única y exclusivamente para el desempeño de sus labores. EL EMPLEADO también se compromete a utilizar las Computadoras de LA EMPRESA " + 
                    "exclusivamente con Programas (Software) que hayan sido autorizados y proporcionados por esta última, quedando terminantemente prohibido su reproducción. La violación a esta Política será considerada como una falta de probidad del Empleado y/o desobediencia a las " + 
                    "órdenes de la propia EMPRESA, independientemente de la responsabilidad en que incurra EL EMPLEADO frente a terceros.")
        
                    // Parrafo # 15
                    .font('fonts/Roboto-Black.ttf')
                    .text("DÉCIMA QUINTA.- EL EMPLEADO ", 10, 226, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("cede en forma expresa a LA EMPRESA  los derechos derivados de la propiedad intelectual que pudiera el propio EMPLEADO haber " + 
                    "aportado en los programas de computación  y procesos de producción derivados de las funciones del trabajo desempeñado")
        
                    // Parrafo # 16
                    .font('fonts/Roboto-Black.ttf')
                    .text("DÉCIMA SEXTA.- EL EMPLEADO  ", 10, 253, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("será capacitado en los términos de los planes y programas establecidos o que se establezcan en LA EMPRESA, conforme a lo dispuesto " +
                    "por la Ley Federal del Trabajo y está obligado a participar en ellos.")
        
                    // Parrafo # 17
                    .font('fonts/Roboto-Black.ttf')
                    .text("DÉCIMA SEPTIMA.- EL EMPLEADO  ", 10, 280, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("manifiesta a LA EMPRESA, haber leído y comprendido ", {continued: true}).font('fonts/Roboto-Black.ttf').text("REGLAMENTO INTERNO ", {continued: true}).font('fonts/Roboto-Regular.ttf').text(
                    "así como ", {continued: true}).font('fonts/Roboto-Black.ttf').text("CODIGO DE CONDUCTA EMPRESARIAL ", {continued: true}).font('fonts/Roboto-Regular.ttf').text(", para lo cual, se compromete a garantizar y hacer cumplir, los más altos estándares de integridad en todas y cada una de las responsabilidades que le sean asignadas. " + 
                    "Sabiendo que ante cualquier duda en la ejecución, ésta debe ser previa y oportunamente consultada con su Jefe inmediato o con las áreas de Recursos Humanos.")
        
                    // Parrafo # 18
                    .font('fonts/Roboto-Regular.ttf')
                    .text("El presente Contrato Individual de Trabajo, se firma por duplicado, por ", 10, 334, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Black.ttf').text("LA EMPRESA ", {continued: true}).font('fonts/Roboto-Regular.ttf').text("y ", {continued: true}).font('fonts/Roboto-Black.ttf').text("EL EMPLEADO" , {continued: true}).font('fonts/Roboto-Regular.ttf').text(
                    "en la Ciudad de ", {continued: true}).font('fonts/Roboto-Black.ttf').text("OBREGON SONORA  ", {continued: true}).font('fonts/Roboto-Regular.ttf').text("al ", {continued: true}).font('fonts/Roboto-Black.ttf').text( FechaHora.obtenerFechaMesLetra + ".")
        
                    // Parrafo # 19
                    .font('fonts/Roboto-Regular.ttf')
                    .text("Para todos los efectos legales, se hace constar que la fecha de ingreso del EMPLEADO es a partir del ", 10, 361, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Black.ttf').text( FechaHora.obtenerFechaEspecial(empleado.fingreso) + "")
        
                    .lineWidth(2)
        
                    // FIRMA 1
                    .polygon([10,461],[300,461],[300,581],[10,581])
                    .stroke()
        
                    .font('fonts/Roboto-Black.ttf')
                    .text('LA EMPRESA', 10, 461, { width: 300, align: 'center'})
                    .text('REPRESENTANTE LEGAL', 10, 569, { width: 300, align: 'center'})
        
                    // FIRMA 2
                    .polygon([310,461],[600,461],[600,581],[310,581])
                    .stroke()
        
                    .text('EL EMPLEADO', 310, 461, {width: 300,  align: 'center'})
                    .text(empleado.nombre, 310, 569, { width: 300, align: 'center'})
        
                    // FIRMA 3
                    .polygon([10,591],[300,591],[300,711],[10,711])
                    .stroke()
        
                    .text('TESTIGO', 10, 591, { width: 300, align: 'center'})
        
                    // FIRMA 3
                    .polygon([310,591],[600,591],[600,711],[310,711])
                    .stroke()
        
                    .text('TESTIGO', 310, 591, { width: 300, align: 'center'})
        
        
                    // Creación del documento y guardado
                    var nombre_archivo = './files/';
                    var nombre_pdf = empleado.nombre.toUpperCase() + ' - CONTRATO.pdf';
        
                    //console.log(nombre_archivo);
        
                    doc.pipe(fs.createWriteStream(nombre_archivo+nombre_pdf)).on('finish', function (error){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.send("funciona!");
                        }
                    });     
                
                    // Finalize PDF file
                    doc.end();
                }
            });
        }
    },
    // Método para consultar información y documentación de un empleado
    verEmpleado: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Empleados.findById({"_id":solicitud.params.id}, function(error, empleado){
                if(error){
                    console.log(error);
                }else{
                    Puestos.populate(empleado, {path: 'puesto'}, function(error, empleado){
                        if(solicitud.session.user === undefined){
                            respuesta.redirect("/");
                        }else{
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else { 
                                    respuesta.render("Empleados/detalles-empleado",{
                                        user: solicitud.session.user,
                                        empleado: empleado,
                                        titulo: "Empleados",
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
                                        ruta: "empleados"
                                    });
                                } 
                            });
                        };
                    });
                };
            });
        }
    },
    verEmpleadoCorreo: function(solicitud, respuesta){
        Usuarios.findById({"_id": solicitud.params.id_User}, function(error, user){
            if(error){
                console.log(error);
            } else {

                solicitud.session.user = user;

                Empleados.findById({"_id":solicitud.params.id}, function(error, empleado){
                    if(error){
                        console.log(error);
                    }else{
                        Puestos.populate(empleado, {path: 'puesto'}, function(error, empleado){
                            if(solicitud.session.user === undefined){
                                respuesta.redirect("/");
                            }else{
                                Usuarios.find( function(error, usuarios){
                                    if(error){
                                        console.log(error);
                                    } else { 
                                        respuesta.render("Empleados/detalles-empleado",{
                                            user: solicitud.session.user,
                                            empleado: empleado,
                                            titulo: "Empleados",
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
                                            ruta: "empleados"
                                        });
                                    } 
                                });
                            };
                        });
                    };
                });
            }
        });
    },
    generarBaja: function(solicitud, respuesta){
        Empleados.findById({"_id": solicitud.body.idEmpleado}, function(error, empleado){
            if(error){
                console.log(error);
            } else {

                var data = {
                    estatus: "Baja"
                }

                Empleados.updateOne({"_id": empleado.id}, data, function(error){
                    if(error){
                        console.log(error);
                    } else {
                        respuesta.redirect("/Empleados/empleados");
                    }
                });
            }
        });
    },
    enviarAltaCorreo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Empleados.findById({"_id": solicitud.params.id}, function(error, empleado){
                if(error){
                    console.log(error);
                }else{
                    var ine, rfc, curp, comp_dom, acta_naci, nss, rev_orina;

                    if(empleado.rfcDoc_ruta != ''){
                        rfc = 'Si'
                    } else {
                        rfc = 'No'
                    }

                    if(empleado.actanaciDoc_ruta != ''){
                        acta_naci = 'Si'
                    } else {
                        acta_naci = 'No'
                    }

                    if(empleado.credeDoc_ruta != ''){
                        ine = 'Si'
                    } else {
                        ine = 'No'
                    }

                    if(empleado.curpDoc_ruta != ''){
                        curp = 'Si'
                    } else {
                        curp = 'No'
                    }

                    if(empleado.nssDoc_ruta != ''){
                        nss = 'Si'
                    } else {
                        nss = 'No'
                    }

                    if(empleado.cdomDoc_ruta != ''){
                        comp_dom = 'Si'
                    } else {
                        comp_dom = 'No'
                    }

                    rev_orina = 'Si';
                    
                    var mailOptions = {
                        from: 'Llaos Sist 1.0 <sistema@llaos.com>',
                        to: 'ssanchez@llaos.com',
                        cco: 'flopez@llaos.com,davilar@llaos.com',
                        //cc: ccorreo,
                        subject: 'Alta de Colaborador',
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
                                                ".table { text-align: center; font-size: 16x; background-color: white; text-align: left; border-collapse: collapse; width: 100%;}" +
                                                ".th, .td{ padding: 20px; font-size: 16x;}" +
                                                "thead{font-size: 16x; background-color: #246355; border-bottom: solid 5px #0F362D; color: white;}" +
                                                ".tr:nth-child(even){ background-color: #ddd;}" +
                                                ".tr:hover .td{ background-color: #369681; color: white;}"+
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
                                                                                                                "	Alta de Colaborador" +
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
                                                                                "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='tablecolor'>" +
                                                                                    "<tr>" +
                                                                                        "<td class='h2'>" +
                                                                                        "	Estimado Saulo Sánchez:" +
                                                                                        "</td>" +
                                                                                    "</tr>" +
                                                                                    "<tr>" +
                                                                                        "<td class='bodycopy'>" +
                                                                                            " Se acaba dar de alta en el sistema al colaborador <strong>" + empleado.nombre + "</strong>, del genero: <strong>" + empleado.sexo + "</strong>, cuenta con" +
                                                                                            " <strong>" + empleado.edad + "</strong> años, y tiene dirección en <strong>" + empleado.direccion + " " + empleado.colonia + " " + empleado.estado + " " +
                                                                                            " " + empleado.cp + "</strong>, fecha de nacimiento el <strong>" + empleado.fnacimiento + "</strong>, tiene el número de celular <strong>" + empleado.celular +  
                                                                                            "</strong> en caso de accidentes favor de contactar a <strong>" + empleado.nombre_emergencia + "</strong> al siguiente teléfono <strong>" + empleado.telefono_emergencia +
                                                                                            "</strong>"+
                                                                                        "</td>" +
                                                                                    "</tr>" +
                                                                                    "<br>"+
                                                                                    "<tr>" +
                                                                                        "<table class='table'" +
                                                                                            "<thead>"+
                                                                                                "<th class='th'> Subió </th>" +
                                                                                                "<th class='th'> Documento </th>" +
                                                                                                "<th class='th'> No. Documento </th>" +
                                                                                            "</thead>"+
                                                                                            "<tbody>"+
                                                                                                "<tr class='tr'>"+
                                                                                                    "<td class='td' style='text-align: center;'>"+ ine +"</td>"+
                                                                                                    "<td class='td'> Credecial de Elector </td>"+
                                                                                                    "<td class='td'></td>"+
                                                                                                "</tr>"+
                                                                                                "<tr class='tr'>"+
                                                                                                    "<td class='td' style='text-align: center;'>"+ curp +"</td>"+
                                                                                                    "<td class='td'> CURP </td>"+
                                                                                                    "<td class='td'><strong>"+ empleado.curp +"</strong></td>"+
                                                                                                "</tr>"+
                                                                                                "<tr class='tr'>"+
                                                                                                    "<td class='td' style='text-align: center;'>"+ rfc +"</td>"+
                                                                                                    "<td class='td'> RFC con homoclave (SAT) </td>"+
                                                                                                    "<td class='td'><strong>" + empleado.rfc + "</strong></td>"+
                                                                                                "</tr>"+
                                                                                                "<tr class='tr'>"+
                                                                                                    "<td class='td' style='text-align: center;'>"+ nss +"</td>"+
                                                                                                    "<td class='td'> Número de Afiliación (IMSS) </td>"+
                                                                                                    "<td class='td'><strong>" + empleado.nss + "</strong></td>"+
                                                                                                "</tr>"+
                                                                                                "<tr class='tr'>"+
                                                                                                    "<td class='td' style='text-align: center;'>"+ comp_dom +"</td>"+
                                                                                                    "<td class='td'> Comprobante de domicilio </td>"+
                                                                                                    "<td class='td'></td>"+
                                                                                                "</tr>"+
                                                                                                "<tr class='tr'>"+
                                                                                                    "<td class='td' style='text-align: center;'>"+ acta_naci +"</td>"+
                                                                                                    "<td class='td'> Acta de nacimiento </td>"+
                                                                                                    "<td class='td'></td>"+
                                                                                                "</tr>"+
                                                                                                "<tr class='tr'>"+
                                                                                                    "<td class='td' style='text-align: center;'>"+ rev_orina +"</td>"+
                                                                                                    "<td class='td'> Revisión de orina </td>"+
                                                                                                    "<td class='td'></td>"+
                                                                                                "</tr>"+
                                                                                            "</tbody>"+
                                                                                        "</table>"+
                                                                                    "</tr>" +
                                                                                    "<tr>" +
                                                                                        "<td style='padding: 20px 0 0 0;'>" +
                                                                                            "<table class='buttonwrapper' bgcolor='#e05443' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                                "<tr>" +
                                                                                                    "<td class='button' height='45'>" +
                                                                                                    "   <a href='" + pagina_sistema + "empleados/empleado/ver/" + empleado.id + "/5b3fc9ce2e6a322c5ce12c37'>Ver Colaborador</a>" +
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
                                                                            "	llaos 2.0, no responda al mismo ya que no tendrá respuesta" +
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
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else { 
                                    respuesta.render("Empleados/enviado",{
                                        user: solicitud.session.user,
                                        titulo: "Empleados",
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
                                        ruta: "empleados"
                                    });
                                } 
                            });                                    
                        }
                        smtpTransport.close();
                    });
                         
                }
            });
        };
    }
}

// ESTE ES EL QUE SE UTILIZA PARA GENERAR EL CONTRATO...
function pdfContratoEspecial(idempleado){
    Empleados.findById({"_id": idempleado}, function(error, empleado){
        if(error){
            console.log(error);
        } else {
            Puestos.populate(empleado, {path: 'puesto'}, function(error, empleado){
                var carpeta = './files/Desarrollo Humano/Empleados/Altas';
                var carpetaEmpleado = '/' + empleado.nombre.toUpperCase()  + '/' ;

                doc = new pdf({
                    // Establecer tamaño de hoja
                    size: 'letter',
                    margin_bottom: '0.05in',
                });
            
                // Logo empresa
                doc.image('./public/imgs/logo.png', 5, 20, { width: 150, heigth: 87})
                
                doc.lineWidth(50)
                .lineCap('butt')
                .moveTo(160, 55)
                .lineTo(615, 55)
                .stroke()


                // Nombre empresa y rfc
                .font('fonts/Roboto-Black.ttf')
                .fill('white')
                .fontSize(12)
                .text('CONTRATO INDIVIDUAL DE TRABAJO', 150, 45, { align: 'center', width: 290})
                .text('TIEMPO DETERMINADO', 390, 45, { align: 'right', width: 200})

                .fontSize(9)

                // Parrafo # 
                
                var terminoContrato = FechaHora.sumarDias(empleado.fingreso, 28);
                var fechaContrato = "DEL " +  FechaHora.obtenerFechaEspecial(empleado.fingreso) + " AL " + FechaHora.obtenerFechaEspecial(terminoContrato) + " ";
                console.log(fechaContrato);
                
                doc.fill('black')
                .font('fonts/Roboto-Regular.ttf')
                .text("CONTRATO INDIVIDUAL DE TRABAJO POR TIEMPO DETERMINADO ", 10, 91,  { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Black.ttf').text( fechaContrato, {continued: true}).font('fonts/Roboto-Regular.ttf').text("LA EMPRESA LLAOS ACUACULTURA SA DE CV, REPRESENTADA POR TANIA DEL ROSARIO LLANES CLARK Y " +
                "POR LA OTRA ", {continued: true}).font('fonts/Roboto-Black.ttf').text( empleado.nombre.toUpperCase() + " ", {continued: true}).font('fonts/Roboto-Regular.ttf').text("QUIEN EN ADELANTE SE DESIGNARA “EL EMPLEADO”, " +
                "AL TENOR DE LAS SIGUIENTES DECLARACIONES Y CLÁUSULAS")

                // Daclaraciones
                .font('fonts/Roboto-Black.ttf')
                .text("D E C L A R A C I O N E S", 10 , 136, {align: 'center', width: 595})

                // Parrafo # 2
                .font('fonts/Roboto-Black.ttf')
                .text("I.- LA EMPRESA ", 10, 154, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" es una Sociedad Anónima de Capital Variable, constituida conforme a las Leyes mexicanas " + 
                "y que tiene su domicilio en la Ciudad de Obregón, Sonora, Calle FLAVIO BORQUEZ 1603-A, COLONIA PRADOS DEL " + 
                "TEPEYAC, CD OBREGON  SONORA, C.P. 85150")

                // Parrafo # 3
                .font('fonts/Roboto-Black.ttf')
                .text("II.- EL EMPLEADO ",  10, 181, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("declara ser de nacionalidad ", {continued: true}).font('fonts/Roboto-Black.ttf').text(empleado.nacionalidad.toUpperCase() + " ",{continued: true}).font('fonts/Roboto-Regular.ttf').text(
                "de "  + empleado.edad + " años de edad, sexo ",{continued: true}).font('fonts/Roboto-Black.ttf').text( empleado.sexo.toUpperCase() + " ", {continued: true}).font('fonts/Roboto-Regular.ttf').text("estado civil ", {continued: true}).font('fonts/Roboto-Black.ttf').text( empleado.estado_civil.toUpperCase() + " ", {continued: true}).font('fonts/Roboto-Regular.ttf').text( 
                "y con domicilio en ", {continued: true}).font('fonts/Roboto-Black.ttf').text( empleado.direccion.toUpperCase() + " " + empleado.colonia.toUpperCase() + ", " + empleado.del_mun.toUpperCase() + ", " + empleado.estado.toUpperCase() + " CP " + empleado.cp + " IDENTIFICADO CON LA CURP " + empleado.curp.toUpperCase() + "." )

                // Parrafo # 4
                .font('fonts/Roboto-Black.ttf')
                .text("III.- LA EMPRESA ", 10, 213, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("declara que requiere los servicios de una persona que cuente con las competencias, capacidad, aptitud y " + 
                "facultades para desempeñar en forma eficiente el PUESTO ", {continued: true}).font('fonts/Roboto-Black.ttf').text( empleado.puesto.posicion.toUpperCase() + ".")

                // Parrafo # 5
                .font('fonts/Roboto-Black.ttf')
                .text("IV.- EL EMPLEADO ", 10, 235, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" declara que cuenta con las competencias profesionales, aptitudes y capacidad " +
                "necesaria para el desempeño eficaz del puesto mencionado en la Declaración anterior.")

                // Parrafo # 6
                .text("Vistas las anteriores declaraciones, las partes otorgan lo que se contiene en las siguientes:", 10, 262,{ align: 'justify' , width: 595})

                // Clausulas
                .font('fonts/Roboto-Black.ttf')
                .text("C L A U S U L A S", 10 , 280, {align: 'center', width: 595})

                // Parrafo # 1
                .font('fonts/Roboto-Black.ttf')
                .text("PRIMERA.- LA EMPRESA ",10, 298, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" contrata los servicios personales del EMPLEADO por TIEMPO DETERMINADO DEL ", {continued: true}).font('fonts/Roboto-Black.ttf').text(
                fechaContrato + " ", {continued: true}).font('fonts/Roboto-Regular.ttf').text(" para que los preste en el domicilio de la misma, " +
                "ubicado en, o en alguna otra de las instalaciones que LA EMPRESA tenga al interior de la República " +
                "Mexicana.")

                // Parrafo # 2
                .font('fonts/Roboto-Black.ttf')
                .text("SEGUNDA.- EL EMPLEADO ",  10, 334, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" por razón del Puesto  a que se refiere el inciso III de la DECLARACIÓN, " +
                "tendrá en forma enunciativa y no limitativa, las siguientes responsabilidades, propias y naturales " + 
                "del mismo: ", {continued: true}).font('fonts/Roboto-Black.ttf').text( empleado.puesto.posicion.toUpperCase() + ".")

                // Parrafo # 3
                .font('fonts/Roboto-Black.ttf')
                .text("TERCERA.- EL EMPLEADO ", 10, 361, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" se obliga a prestar sus servicios con la intensidad y esmero apropiados en la " +
                "forma que LA EMPRESA le indique, ejecutando todas las actividades inherentes al PUESTO para el que se le " + 
                "contrata y todas aquellas que sean propias del mismo, de acuerdo con el uso y la costumbre.")
                
                // Parrafo # 4
                .font('fonts/Roboto-Black.ttf')
                .text("CUARTA.- ", 10, 397, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" El presente Contrato Individual de Trabajo se celebra por TIEMPO DETERMINADO, sin embargo, " + 
                "EL EMPLEADO deberá acreditar, en los términos de la Fracción I del Artículo 47 de la Ley Federal del " + 
                "Trabajo, sus competencias profesionales, experiencia y facultades que ha declarado tener en relación al " + 
                "objetivo del presente contrato y que le permitirán desempeñar el puesto antes referido, para tal efecto " +
                "LA EMPRESA podrá rescindir este contrato sin ninguna responsabilidad cuando EL EMPLEADO no demuestre dichas " + 
                "cualidades.")

                // Parrafo # 5
                .font('fonts/Roboto-Black.ttf')
                .text("QUINTA.- ", 10, 451, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" La jornada diaria de trabajo será de ocho, siete y media, y siete horas, según se trate de " + 
                "jornada diurna, mixta o nocturna. La distribución de las horas de trabajo durante la semana y las horas de " + 
                "entrada y salida las determinará LA EMPRESA, sin perjuicio de que puedan modificarse en cualquier época por " + 
                "la propia empresa según sus necesidades. LA EMPRESA podrá repartir las horas de trabajo en los días laborables " +
                "de la semana, a fin de permitir al empleado el reposo del domingo o cualquier modalidad equivalente.")

                var sueldo_mensual = 0.00;
                var sueldo_letra = '';
                var leyenda1 = '';
                var leyenda2 = '';

                if( empleado.tipo_sueldo == 'Semanal'){
                    leyenda1 = 'Semanales';
                    leyenda2 = 'el día sábado de cada semana';
                    sueldo_mensual = empleado.apoyo_sueldo;
                } else if( empleado.tipo_sueldo == 'Quincenal'){
                    leyenda1 = 'Mensuales'
                    leyenda2 = 'los días 15 y 30 de cada mes'
                    sueldo_mensual =  empleado.apoyo_sueldo * 2;
                }
                    
                sueldo_letra = NumeroLetras.numeroALetras(sueldo_mensual);
                sueldo_mensual = FormatMoney.FormatMoney(true, parseFloat(sueldo_mensual));

                // Parrafo # 6
                doc.font('fonts/Roboto-Black.ttf')
                .text("SEXTA.- ", 10, 505, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" El sueldo que se pagará al Empleado será de ", {continued: true}).font('fonts/Roboto-Black.ttf').text( sueldo_mensual + " (" + sueldo_letra + " M. N) ",{continued: true}).font('fonts/Roboto-Regular.ttf').text( leyenda1 + ", " + 
                "cuyo pago se realizará " + leyenda2 + ", en dicho sueldo está ya considerado el pago del séptimo día de cada semana. En este sentido, EL EMPLEADO manifiesta su consentimiento a LA EMPRESA, para que este pago sea realizado a través de transferencia " + 
                "bancaria, en la cuenta que éste designe previa solicitud por escrito. Para tal efecto, El empleado tendrá hasta diez días naturales, a " + 
                "partir de la fecha de pago, para manifestar o reclamar a LA EMPRESA, cualquier diferencia que haya detectado en su ingreso, al término del cual, " + 
                "y de no haber existido observación alguna, el pago electrónico, se considera correcto para todos los efectos legales a que haya lugar, reconociendo " + 
                "como prueba del pago el comprobante de depósito y/o transferencia bancaria correspondiente.")
                
                // Parrafo # 7
                .font('fonts/Roboto-Black.ttf')
                .text("SÉPTIMA.- ", 10, 595, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" Por cada seis días de trabajo EL EMPLEADO disfrutará de un día de descanso con goce de sueldo íntegro, encontrándose ya incluido en " + 
                "el sueldo mensual en los términos de la Cláusula Sexta; si labora durante menor número de días a la semana, el pago correspondiente al día de " + 
                "descanso semanal, será proporcional. ")

                // Parrafo # 8
                .font('fonts/Roboto-Black.ttf')
                .text("OCTAVA.- ", 10, 631, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("Son días de descanso obligatorio con goce de sueldo los que señala el Artículo 74 de la Ley Federal del Trabajo y el Reglamento de " + 
                "LA EMPRESA.")

                // Parrafo # 9
                .font('fonts/Roboto-Black.ttf')
                .text("NOVENA.- ",  10, 658, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" Queda expresamente asentado que EL EMPLEADO no podrá laborar los días de descanso semanal, los días festivos y descansos obligatorios, " + 
                "así como tiempo extraordinario, salvo po solicitud previa de LA EMPRESA. ")

                //.text("PRUEBA", 10, 690, {width: 595})

                // Parrafo # 10
                .font('fonts/Roboto-Black.ttf')
                .text("DÉCIMA.- EL EMPLEADO ", 10, 684, {continued: true,  align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" disfrutará de vacaciones, prima vacacional y aguinaldo, de acuerdo a la Ley Federal de Trabajo vigente, Si EL EMPLEADO no " + 
                "tomara sus vacaciones dentro del período de dieciocho meses a partir de su fecha de aniversario en la empresa, prescribirá su derecho para disfrutarlas " + 
                "sin responsabilidad para LA EMPRESA.")

                // SEGUNDA PÁGINA
                // OTRA PAGINA
                .addPage()

                // Parrafo # 11
                .font('fonts/Roboto-Black.ttf')
                .text("DÉCIMA PRIMERA.- ", 10, 41, {continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text(" Todo lo relacionado con riesgos y enfermedades profesionales se regirá por las disposiciones de la Ley del Seguro Social y en " +
                "forma supletoria por la Ley Federal del Trabajo.")

                // Parrafo # 12
                .font('fonts/Roboto-Black.ttf')
                .text("DÉCIMA SEGUNDA.- EL EMPLEADO ", 10, 68, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("manifiesta que ha leído en todas y cada una de sus partes el Reglamento del LA EMPRESA y expresa su aceptación al " + 
                "mismo, estando de acuerdo en que éste le sea aplicado en los términos establecidos.")

                // Parrafo # 13
                .font('fonts/Roboto-Black.ttf')
                .text("DÉCIMA TERCERA.- EL EMPLEADO ", 10, 95, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("se compromete a obedecer todas las órdenes que LA EMPRESA le dé en relación con el trabajo contratado. Así mismo EL " + 
                "EMPLEADO está expresamente de acuerdo en que la prestación de sus servicios serán realizados en estricto apego a los procedimientos y normas establecidas en las áreas donde prestara sus servicios, de igual forma acepta someterse a los exámenes médicos que " + 
                "periódicamente establezca 'EL PATRÓN' en los términos del artículo 134 fracción X de 'LA LEY', a fin de mantener en forma óptima sus facultades físicas e intelectuales, para el mejor desempeño de su funciones.")

                // Parrafo # 14
                .font('fonts/Roboto-Black.ttf')
                .text("DÉCIMA CUARTA.- ", 10, 154, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("En el caso de que el trabajo contratado lleve consigo la utilización de Computadoras y sus correspondientes Programas, los cuales serán " + 
                "proporcionados por LA EMPRESA, éstos serán considerados como herramientas de trabajo y EL EMPLEADO se compromete a utilizarlos única y exclusivamente para el desempeño de sus labores. EL EMPLEADO también se compromete a utilizar las Computadoras de LA EMPRESA " + 
                "exclusivamente con Programas (Software) que hayan sido autorizados y proporcionados por esta última, quedando terminantemente prohibido su reproducción. La violación a esta Política será considerada como una falta de probidad del Empleado y/o desobediencia a las " + 
                "órdenes de la propia EMPRESA, independientemente de la responsabilidad en que incurra EL EMPLEADO frente a terceros.")

                // Parrafo # 15
                .font('fonts/Roboto-Black.ttf')
                .text("DÉCIMA QUINTA.- EL EMPLEADO ", 10, 226, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("cede en forma expresa a LA EMPRESA  los derechos derivados de la propiedad intelectual que pudiera el propio EMPLEADO haber " + 
                "aportado en los programas de computación  y procesos de producción derivados de las funciones del trabajo desempeñado")

                // Parrafo # 16
                .font('fonts/Roboto-Black.ttf')
                .text("DÉCIMA SEXTA.- EL EMPLEADO  ", 10, 253, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("será capacitado en los términos de los planes y programas establecidos o que se establezcan en LA EMPRESA, conforme a lo dispuesto " +
                "por la Ley Federal del Trabajo y está obligado a participar en ellos.")

                // Parrafo # 17
                .font('fonts/Roboto-Black.ttf')
                .text("DÉCIMA SEPTIMA.- EL EMPLEADO  ", 10, 280, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Regular.ttf').text("manifiesta a LA EMPRESA, haber leído y comprendido ", {continued: true}).font('fonts/Roboto-Black.ttf').text("REGLAMENTO INTERNO ", {continued: true}).font('fonts/Roboto-Regular.ttf').text(
                "así como ", {continued: true}).font('fonts/Roboto-Black.ttf').text("CODIGO DE CONDUCTA EMPRESARIAL ", {continued: true}).font('fonts/Roboto-Regular.ttf').text(", para lo cual, se compromete a garantizar y hacer cumplir, los más altos estándares de integridad en todas y cada una de las responsabilidades que le sean asignadas. " + 
                "Sabiendo que ante cualquier duda en la ejecución, ésta debe ser previa y oportunamente consultada con su Jefe inmediato o con las áreas de Recursos Humanos.")

                // Parrafo # 18
                .font('fonts/Roboto-Regular.ttf')
                .text("El presente Contrato Individual de Trabajo, se firma por duplicado, por ", 10, 334, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Black.ttf').text("LA EMPRESA ", {continued: true}).font('fonts/Roboto-Regular.ttf').text("y ", {continued: true}).font('fonts/Roboto-Black.ttf').text("EL EMPLEADO" , {continued: true}).font('fonts/Roboto-Regular.ttf').text(
                "en la Ciudad de ", {continued: true}).font('fonts/Roboto-Black.ttf').text("OBREGON SONORA  ", {continued: true}).font('fonts/Roboto-Regular.ttf').text("al ", {continued: true}).font('fonts/Roboto-Black.ttf').text( FechaHora.obtenerFechaMesLetra(FechaHora.obtenerfecha()) + ".")

                // Parrafo # 19
                .font('fonts/Roboto-Regular.ttf')
                .text("Para todos los efectos legales, se hace constar que la fecha de ingreso del EMPLEADO es a partir del ", 10, 361, { continued: true, align: 'justify' , width: 595}).font('fonts/Roboto-Black.ttf').text( FechaHora.obtenerFechaEspecial(empleado.fingreso) + "")

                .lineWidth(2)

                // FIRMA 1
                .polygon([10,461],[300,461],[300,581],[10,581])
                .stroke()

                .font('fonts/Roboto-Black.ttf')
                .text('LA EMPRESA', 10, 461, { width: 300, align: 'center'})
                .text('REPRESENTANTE LEGAL', 10, 569, { width: 300, align: 'center'})

                // FIRMA 2
                .polygon([310,461],[600,461],[600,581],[310,581])
                .stroke()

                .text('EL EMPLEADO', 310, 461, {width: 300,  align: 'center'})
                .text(empleado.nombre.toUpperCase(), 310, 569, { width: 300, align: 'center'})

                // FIRMA 3
                .polygon([10,591],[300,591],[300,711],[10,711])
                .stroke()

                .text('TESTIGO', 10, 591, { width: 300, align: 'center'})

                // FIRMA 3
                .polygon([310,591],[600,591],[600,711],[310,711])
                .stroke()

                .text('TESTIGO', 310, 591, { width: 300, align: 'center'})


                // Creación del documento y guardado
                var nombre_pdf = 'CONTRATO.pdf';
                var nombre_archivo = carpeta + carpetaEmpleado + nombre_pdf;

                doc.pipe(fs.createWriteStream(carpeta + carpetaEmpleado + nombre_pdf)).on('finish', function (error){
                    if(error){
                        console.log(error);
                    } else {
                        console.log(nombre_archivo);
                    }
                });     
            
                // Finalize PDF file
                doc.end();
            });
        };
    });
}

