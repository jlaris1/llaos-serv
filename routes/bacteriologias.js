var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    Bacteriologias = mongoose.model('Bacteriologias');
    Estanques = mongoose.model('Estanques');
    Laboratorios = mongoose.model('Laboratorios');
    Modulos = mongoose.model('Modulos');
    TiposModulos = mongoose.model('TiposModulos');
    chalk = require('chalk');

module.exports = {
    all: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Bacteriologias.find( function(error, mediciones){
                if(error){
                    console.log(error);
                } else {
                    Estanques.populate(mediciones, {path: 'estanque'}, function(error, mediciones){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Laboratorios.populate(mediciones, {path: 'lab_origen'}, function(error, mediciones){
                                if(error){
                                    console.log(chalk.bgRed);
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(chalk.bgRed(error));
                                        } else {
                                            respuesta.render('Laboratorio/Bacteriologia/all', {
                                                user: solicitud.session.user,
                                                mediciones: mediciones,
                                                titulo: "Bacteriología",
                                                criterios: [
                                                    {
                                                        val: "modulo",
                                                        name: "Módulo"
                                                    },
                                                    {
                                                        val: "estanque",
                                                        name: "Piscina"
                                                    },
                                                    {
                                                        val: "fecha_reali",
                                                        name: "Fecha Realizado"
                                                    },
                                                    {
                                                        val: "fechas_reali",
                                                        name: "Fechas Realizado"
                                                    },
                                                    {
                                                        val: "fecha_siemb",
                                                        name: "Fecha Siembra"
                                                    },
                                                    {
                                                        val: "Fechas_siemb",
                                                        name: "Fechas Siembra"
                                                    },
                                                ],
                                                usuarios: usuarios,
                                                ruta: "bacteriologia"
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
    },
    new: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Modulos.find( function(error, modulos){
                if(error){
                    console.log(error);
                } else {
                    Laboratorios.find( function(error, laboratorios){
                        if(error){
                            console.log(error);
                        } else { 
                            respuesta.render('Laboratorio/Bacteriologia/new', {
                                user: solicitud.session.user,
                                modulos: modulos,
                                bacteriologia: {
                                    agua_ca: 0,
                                    agua_cv: 0,
                                    mac_larva_ca: 0,
                                    mac_larva_cv: 0,
                                    hepato_ca: 0,
                                    hepato_cv: 0
                                },
                                estanques: {},
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
                                ruta: "bacteriologia",
                                laboratorios: laboratorios
                            });
                        }
                    });
                }
            });
        }
    },
    add: function(solicitud, respuesta){    
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            var fecha = new Date(solicitud.body.fecha);
            var fechaSiembra = new Date(solicitud.body.fecha_siembra);

            var data = {
                agua_ca: solicitud.body.agua_ca,
                agua_cv: solicitud.body.agua_cv,
                mac_larva_ca: solicitud.body.mac_larva_ca,
                mac_larva_cv: solicitud.body.mac_larva_cv,
                hepato_ca: solicitud.body.hepato_ca,
                hepato_cv: solicitud.body.hepato_cv,
                estanque: solicitud.body.estanque,
                fecha: new Date( fecha.getTime() + Math.abs(fecha.getTimezoneOffset()*60000)), 
                fecha_siembra: new Date( fechaSiembra.getTime() + Math.abs(fechaSiembra.getTimezoneOffset()*60000)), 
                lab_origen: solicitud.body.laboratorio
            }

            console.log(chalk.bgGreen(data));

            var bacteriologia = new Bacteriologias(data);

            bacteriologia.save( function(error){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.redirect('/bacteriologia/all');
                }
            });
        }
    },
    find: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Modulos.find( function(error, modulos){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.find({"modulo": solicitud.body.modulo}, function(error, estanques){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Laboratorios.find( function(error, laboratorios){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    respuesta.render('Laboratorio/Bacteriologia/new', {
                                        user: solicitud.session.user,
                                        modulos: modulos,
                                        modulo: solicitud.body.modulo,
                                        bacteriologia: {
                                            agua_ca: 0,
                                            agua_cv: 0,
                                            mac_larva_ca: 0,
                                            mac_larva_cv: 0,
                                            hepato_ca: 0,
                                            hepato_cv: 0
                                        },
                                        estanques: estanques,
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
                                        ruta: "bacteriologia",
                                        laboratorios: laboratorios
                                    });
                                }
                            });
                        }
                    }).sort({ codigo : 1});
                }
            });
        }
    }
}