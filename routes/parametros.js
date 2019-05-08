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
                })
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
                    respuesta.redirect('/parametros/all');
                }
            });
        }
    }
}