var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    Usuarios = mongoose.model('Usuarios');
    Tractores = mongoose.model('Tractor');
    Camionetas = mongoose.model('Camioneta');
    Motores = mongoose.model('Motor');
    Bombas = mongoose.model('Bomba');
    Generadores = mongoose.model('Generador');
    TiposModulos = mongoose.model('TiposModulos');
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
                    respuesta.render('Administracion/Unidades/Tractores/all', {
                        user: solicitud.session.user,
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
                        ruta: "unidades",
                        tractores: tractores
                    })
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
                    Usuarios.find( (error, usuarios) => {
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render('Administracion/Unidades/Tractores/new', {
                                user: solicitud.session.user,
                                tractor: tractor,
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
            });
        }
    },
    deleteT: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 

        }
    }
    // CAMIONETAS
    // MOTOS
    // MOTORES
    // BOMBAS
    // GENERADORES

}