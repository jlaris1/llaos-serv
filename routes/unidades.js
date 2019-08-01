var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    Usuarios = mongoose.model('Usuarios');
    Tractores = mongoose.model('Tractor');
    Servicios = mongoose.model('Servicios');
    Camionetas = mongoose.model('Camioneta');
    Motores = mongoose.model('Motor');
    Bombas = mongoose.model('Bomba');
    Generadores = mongoose.model('Generador');
    TiposModulos = mongoose.model('TiposModulos');
    zf = require('./zfill');
    chalk = require('chalk');
    Excel = require('exceljs');

var file_path = './files/reports/unidades/';

module.exports = {
    // TRACTORES
    allT: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Tractores.find( (error, tractores) =>{
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Usuarios.find( (error, usuarios) => {
                        if(error){
                            console.log(error);
                            respuesta.send(401);
                        } else {
                            respuesta.render('Administracion/Unidades/Tractores/all', {
                                user: solicitud.session.user,
                                titulo: "Unidades",
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
                                ruta: "unidades",
                                tractores: tractores
                            });
                        }
                    });
                }
            });
        }
    },
    newT: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Usuarios.find( (error, usuarios) => {
                if(error){
                    console.log(error);
                } else {
                    respuesta.render('Administracion/Unidades/Tractores/new', {
                        user: solicitud.session.user,
                        usuarios: usuarios,
                        titulo: "Unidades",
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
                        ruta: "unidades"
                    });
                }
            });
        }
    },
    addT: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            var data = {
                codigo: solicitud.body.codigo,
                marca: solicitud.body.marca,
                año: solicitud.body.año,
                modelo: solicitud.body.modelo,
                llantas: solicitud.body.llantas,
                bateria_1: solicitud.body.bateria_1,
                bateria_2: solicitud.body.bateria_2,
                horometro: solicitud.body.horometro
            }

            var tractor = new Tractores(data);
        
            tractor.save( (error) => {
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.redirect('/unidades/tractor/all');
                }
            });
        }
    },
    editT: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 

        }
    },
    viewT: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Tractores.findById({"_id": solicitud.params.id}, (error, tractor) => {
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Servicios.find({"unidad": solicitud.params.id }, (error, servicios) => {
                        if(error){
                            console.log(chalk.bgRed(error));
                            respuesta.sendStatus(404).json({
                                "error": "Ocurrio un error al buscar los servicios para el tractor: " + tractor.modelo
                            });
                        } else {
                            Usuarios.find( (error, usuarios) => {
                                if(error){
                                    console.log(error);
                                } else {
                                    respuesta.render('Administracion/Unidades/Tractores/view', {
                                        user: solicitud.session.user,
                                        tractor: tractor,
                                        usuarios: usuarios,
                                        servicios: servicios,
                                        titulo: "Unidades",
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
                                        ruta: "unidades"
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    deleteT: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 

        }
    },
    // CAMIONETAS
    // MOTOS
    // MOTORES
    // BOMBAS
    // GENERADORES
    // SERVICIOS
    allS: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Servicios.find( (error, servicios) =>{
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Tractores.populate( servicios, {path: 'unidad'}, (error, servicios) => {
                        if(error){
                            console.log(chalk.bgRed(error))
                            respuesta.send(417);
                        } else {
                            Usuarios.find( (error, usuarios) => {
                                if(error){
                                    console.log(error);
                                    respuesta.send(401);
                                } else {
                                    respuesta.render('Administracion/Unidades/Servicios/all', {
                                        user: solicitud.session.user,
                                        titulo: "Servicios",
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
                                        ruta: "servicios",
                                        servicios: servicios
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    newS: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Tractores.find( (error, tractores) =>{
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Usuarios.find( (error, usuarios) => {
                        if(error){
                            console.log(error);
                            respuesta.send(401);
                        } else {
                            respuesta.render('Administracion/Unidades/Servicios/new', {
                                user: solicitud.session.user,
                                titulo: "Servicios",
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
                                ruta: "servicios",
                                tractores: tractores
                            });
                        }
                    });
                }
            });
        }
    },
    addS: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Servicios.find( (error, servicios) =>{
                if(error){
                    console.log(chalk.bgRed(error));
                    respuesta.sendStatus(501);
                } else {
                    
                    var data = {
                        codigo: 'SERV' + zf.zfill( servicios.length + 1, 5),
                        unidad: solicitud.body.tractor,
                        registro: new Date,
                        tipo: solicitud.body.tipo_serv,
                        llantas: solicitud.body.llantas,
                        bateria_1: solicitud.body.bateria_1,
                        bateria_2: solicitud.body.bateria_2,
                        arranque: solicitud.body.arranque,
                        fecha_arranque: solicitud.body.fecha_arr,
                        alternador: solicitud.body.alternador,
                        fecha_alternador: solicitud.body.fecha_alt,
                        otro: solicitud.body.otro_input,
                        fecha_otro: solicitud.body.fecha_otr,
                        horometro: solicitud.body.horometro,
                        fallas: solicitud.body.fallas
                    }
        
                    console.log(data);
        
                    var servicio = new Servicios(data);
        
                    servicio.save( (error) => {
                        if(error){
                            console.log(chalk.bgRed(error));
                            respuesta.sendStatus(501)
                        } else {
        
                            var data = {
                                estatus: solicitud.body.estatus,
                                llantas: solicitud.body.llantas,
                                bateria_1: solicitud.body.bateria_1,
                                bateria_2: solicitud.body.bateria_2,
                                horometro: solicitud.body.horometro,
                            }
        
                            Tractores.updateOne({"_id": solicitud.body.tractor}, data ,(error) => {
                                if(error){
                                    console.log(error);
                                    respuesta.sendStatus(417)
                                } else {
                                    respuesta.redirect('all');
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    viewS: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Servicios.findById({ "_id": solicitud.params.id }, (error, servicios) =>{
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    var unidad = "Tractores";

                    unidad.populate( servicios, {path: 'unidad'}, (error, servicios) => {
                        if(error){
                            console.log(chalk.bgRed(error))
                            respuesta.send(417);
                        } else {
                            Usuarios.find( (error, usuarios) => {
                                if(error){
                                    console.log(error);
                                    respuesta.send(401);
                                } else {
                                    respuesta.render('Administracion/Unidades/Servicios/all', {
                                        user: solicitud.session.user,
                                        titulo: "Unidades",
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
                                        ruta: "unidades",
                                        servicios: servicios
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    }

}