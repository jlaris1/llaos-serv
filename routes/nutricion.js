var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    Estanques = mongoose.model('Estanques');
    Modulos = mongoose.model('Modulos');
    Nutricion = mongoose.model('Nutricion');
    TiposModulos = mongoose.model('TiposModulos');
    Usuarios = mongoose.model('Usuarios');
    chalk = require('chalk');

module.exports = {
    all: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Nutricion.find( function(error, nutricion){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.populate(nutricion, {path: 'estanque'}, function(error, nutricion){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Usuarios.populate(nutricion, { path: 'charolero'}, function(error, nutricion){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    respuesta.render('Nutricion/all',
                                        {
                                            user: solicitud.session.user,
                                            nutricion: nutricion
                                        }
                                    );
                                }
                            });
                        }
                    })
                }
            })
        } 
    },
    new: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            Modulos.find( function(error, modulos){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.render('Nutricion/new',
                        {
                            user: solicitud.session.user,
                            modulos: modulos,
                            estanques: {},
                            nutricion: {
                                charola_1: 0,
                                charola_2: 0,
                                charola_3: 0,
                                charola_4: 0,
                                charola_5: 0,
                                charola_6: 0,
                                suma: 0,
                                codigo_racion: 0
                            }
                        }
                    );
                }
            });
        }
    },
    find: function(solicitud, respuesta){
        Estanques.find({"modulo": solicitud.body.modulo}, function(error, estanques){
            if(error){
                console.log(chalk.bgRed(error));
            } else {
                Modulos.find( function(error, modulos){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        respuesta.render("Nutricion/new", 
                            {
                                user: solicitud.session.user,
                                modulos: modulos,
                                estanques: estanques,
                                modulo: solicitud.body.modulo,
                                nutricion: {
                                    charola_1: 0,
                                    charola_2: 0,
                                    charola_3: 0,
                                    charola_4: 0,
                                    charola_5: 0,
                                    charola_6: 0,
                                    suma: 0,
                                    codigo_racion: 0
                                }
                            }
                        );
                    }
                });
            }
        });
    },
    add: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            var fecha = new Date();

            var data = {
                charola_1: solicitud.body.charola_1,
                charola_2: solicitud.body.charola_2,
                charola_3: solicitud.body.charola_3,
                charola_4: solicitud.body.charola_4,
                charola_5: solicitud.body.charola_5,
                charola_6: solicitud.body.charola_6,
                suma: solicitud.body.suma,
                codigo_racion: (parseFloat(solicitud.body.codigo_racion)).toFixed(2),
                estanque: solicitud.body.estanque,
                fecha: new Date( fecha.getTime() + Math.abs(fecha.getTimezoneOffset()*60000)),
                hora: FechaHora.obtenerhora(),
                charolero: solicitud.session.user._id
            }

            console.log(chalk.bgGreen(data));

            nutricion = new Nutricion(data);

            nutricion.save( function(error){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.redirect('/nutricion/all');
                }
            })
        }
    }
}