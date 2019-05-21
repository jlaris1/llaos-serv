var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    Parametros = mongoose.model('Parametros');
    Estanques = mongoose.model('Estanques');
    Modulos = mongoose.model('Modulos');
    Usuarios = mongoose.model('Usuarios');
    TiposModulos = mongoose.model('TiposModulos');
    chalk = require('chalk');

module.exports = {
    all: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Parametros.find( function(error, mediciones){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.populate(mediciones, {path: 'estanque'}, function(error, mediciones){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Usuarios.populate(mediciones, {path: 'parametrista'}, function(error, mediciones){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    respuesta.render('Parametros/all', {
                                        user: solicitud.session.user,
                                        mediciones: mediciones
                                    });
                                }
                            })
                        }
                    });
                }
            });
        }
    },
    find: function(solicitud, respuesta){
        Modulos.find( function(error, modulos){
            if(error){
                console.log(chalk.bgRed(error));
            } else {
                Estanques.find({'modulo': solicitud.body.modulo}, function(error, estanques){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        respuesta.render('Parametros/new', {
                            user: solicitud.session.user,
                            modulos: modulos,
                            modulo: solicitud.body.modulo, 
                            estanque: estanques[0],
                            siguiente_estanque: estanques[1],
                            estanques: estanques,
                            parametro: {
                                oxigeno: 0,
                                ph: 0,
                                salinidad: 0,
                                temperatura: 0,
                                nivel_agua: 0,
                            }
                        });
                    }
                }).sort({ codigo : 1});
            }
        });
    },
    new: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Modulos.find( function(error, modulos){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.render('Parametros/new', {
                        user: solicitud.session.user,
                        modulos: modulos,
                        modulo: '',
                        estanques: {},
                        parametro: {
                            oxigeno: 0,
                            ph: 0,
                            salinidad: 0,
                            temperatura: 0,
                            nivel_agua: 0,
                        },
                        siguiente_estanque: {
                            id: 0
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
            var data = {
                oxigeno: solicitud.body.oxigeno,
                ph: solicitud.body.ph,
                salinidad: solicitud.body.salinidad,
                temperatura: solicitud.body.temperatura,
                nivel_agua: solicitud.body.nivel_agua,
                estanque: solicitud.body.estanque,
                fecha: new Date,
                hora: FechaHora.obtenerhora(),
                parametrista: solicitud.session.user
            }

            console.log(chalk.bgGreen(data));

            var parametro = new Parametros(data);

            parametro.save( function(error){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Modulos.find( function(error, modulos){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Estanques.find({'modulo': solicitud.body.modu}, function(error, estanques){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
        
                                    var estanque = {};
                                    var siguiente_estanque  = {};
        
                                    for (let i = 0; i < estanques.length; i++) {
                                        if(estanques[i].id == solicitud.body.estanque ){
                                            estanque = estanques[i+1];
                                            siguiente_estanque = estanques[i+2];
                                        }
                                    }
        
                                    console.log(estanque);
                                    console.log(siguiente_estanque);
        
                                    respuesta.render('Parametros/new', {
                                        user: solicitud.session.user,
                                        modulos: modulos,
                                        modulo: solicitud.body.modu, 
                                        estanques: estanques,
                                        estanque: estanque,
                                        siguiente_estanque: siguiente_estanque,
                                        parametro: {
                                            oxigeno: 0,
                                            ph: 0,
                                            salinidad: 0,
                                            temperatura: 0,
                                            nivel_agua: 0,
                                        }
                                    });
                                }
                            }).sort({ codigo : 1});
                        }
                    });
                }
            });
        }
    },
    next: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Modulos.find( function(error, modulos){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.find({'modulo': solicitud.body.mod}, function(error, estanques){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {

                            var estanque = {};
                            var siguiente_estanque  = {};

                            for (let i = 0; i < estanques.length; i++) {
                                if(estanques[i].id == solicitud.body.estanque_siguiente ){
                                    estanque = estanques[i];
                                    siguiente_estanque = estanques[i+1];
                                }
                            }

                            console.log(estanque);
                            console.log(siguiente_estanque);

                            respuesta.render('Parametros/new', {
                                user: solicitud.session.user,
                                modulos: modulos,
                                modulo: solicitud.body.mod, 
                                estanques: estanques,
                                estanque: estanque,
                                siguiente_estanque: siguiente_estanque,
                                parametro: {
                                    oxigeno: 0,
                                    ph: 0,
                                    salinidad: 0,
                                    temperatura: 0,
                                    nivel_agua: 0,
                                }
                            });
                        }
                    }).sort({ codigo : 1});
                }
            });
        }
    }
}