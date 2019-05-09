var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    NutrientesToxDiario = mongoose.model('NutrientesToxDiario');
    NutrientesToxSemanal = mongoose.model('NutrientesToxSemanal');
    Estanques = mongoose.model('Estanques');
    Modulos = mongoose.model('Modulos');
    TiposModulos = mongoose.model('TiposModulos');

module.exports = {
    allD: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            NutrientesToxDiario.find(function(error, mediciones){
                if(error){
                    console.log(error);
                } else {
                    Estanques.populate(mediciones, {path: 'estanque'}, function(error, mediciones){
                        respuesta.render("Laboratorio/NutrientesTox/Diario/all",
                            {
                                user: solicitud.session.user,
                                mediciones: mediciones
                            }
                        );
                    });
                }
            });
        };
    },
    newD: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            Modulos.find( function(error, modulos){
                if(error){
                    console.log(error);
                } else {
                    respuesta.render("Laboratorio/NutrientesTox/Diario/new",
                        {
                            user: solicitud.session.user,
                            modulos: modulos,
                            estanques: {},
                            nutrientes: {
                                amonia: 0,
                                alcalinidad_CaCO3: 0,
                                alcalinidad_HCO3: 0,
                                alcalinidad_CO3: 0,
                                nitrito_N: 0,
                                nitrito_NO3: 0,
                                TAN: 0,
                                fecha: new Date,
                                observaciones: ''
                            },
                        }
                    );
                }
            });
        };
    },
    addD: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            var fecha = new Date(solicitud.body.fecha);

            var data = {
                amonia: solicitud.body.amonia,
                alcalinidad_CaCO3: solicitud.body.alcalinidad_CaCO3,
                alcalinidad_HCO3: solicitud.body.alcalinidad_HCO3,
                alcalinidad_CO3: solicitud.body.alcalinidad_CO3,
                nitrito_N: solicitud.body.nitrito_N,
                nitrito_NO3: solicitud.body.nitrito_NO3,
                TAN: solicitud.body.TAN,
                estanque: solicitud.body.estanque,
                fecha: new Date( fecha.getTime() + Math.abs(fecha.getTimezoneOffset()*60000)),
                observaciones: solicitud.body.observaciones
            }

            var nutrientestox = new NutrientesToxDiario(data);

            nutrientestox.save(function(error){
                if(error){
                    console.log(error);
                }else{
                    Usuarios.find( function(error, usuarios){
                        if(error){
        
                        } else {
                            respuesta.redirect("/nutrientestox/diario/all");
                        }
                    });	
                }
            }); 
        }
    },
    findD: function(solicitud, respuesta){
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
                            respuesta.render('Laboratorio/NutrientesTox/Diario/new', {
                                user: solicitud.session.user,
                                modulos: modulos,
                                modulo: solicitud.body.modulo,
                                nutrientes: {
                                    amonia: 0,
                                    alcalinidad_CaCO3: 0,
                                    alcalinidad_HCO3: 0,
                                    alcalinidad_CO3: 0,
                                    nitrito_N: 0,
                                    nitrito_NO3: 0,
                                    TAN: 0,
                                    fecha: new Date,
                                    observaciones: ''
                                },
                                estanques: estanques,
                            });
                        }
                    }).sort({ codigo : 1});
                }
            });
        }
    },
    allS: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            NutrientesToxSemanal.find(function(error, mediciones){
                if(error){
                    console.log(error);
                } else {
                    Estanques.populate(mediciones, {path: 'estanque'}, function(error, mediciones){
                        respuesta.render("Laboratorio/NutrientesTox/Semanal/all",
                            {
                                user: solicitud.session.user,
                                mediciones: mediciones
                            }
                        );
                    });
                }
            });
        };
    },
    newS: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            Modulos.find( function(error, modulos){
                if(error){
                    console.log(error);
                } else {
                    respuesta.render("Laboratorio/NutrientesTox/Semanal/new",
                        {
                            user: solicitud.session.user,
                            modulos: modulos,
                            estanques: {},
                            nutrientes: {
                                amonia: 0,
                                nitrito_N: 0,
                                nitrito_NO3: 0,
                                alcalinidad_CaCO3: 0,
                                alcalinidad_HCO3: 0,
                                alcalinidad_CO3: 0,
                                dureza: 0,
                                dureza_CaCO3: 0,
                                dureza_Ca: 0,
                                silice_SiO2: 0,
                                silice_Si: 0,
                                nitrato_N: 0,
                                nitrato_NO3: 0,
                                fosfato_PO4: 0,
                                fosfato_P: 0,
                                potasio: 0,
                                magnecio_Mg: 0,
                                magnecio_CaCO3: 0,
                                balance_Ca: 0,
                                balance_Mg: 0,
                                balance_K: 0,
                                fecha: new Date,
                                observaciones: ''
                            },
                        }
                    );
                }
            });
        }
    },
    addS: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            var fecha = new Date(solicitud.body.fecha);
            
            var data = {
                amonia: solicitud.body.amonia,
                nitrito_N: solicitud.body.nitrito_N,
                nitrito_NO3: solicitud.body.nitrito_NO3,
                alcalinidad_CaCO3: solicitud.body.alcalinidad_CaCO3,
                alcalinidad_HCO3: solicitud.body.alcalinidad_HCO3,
                alcalinidad_CO3: solicitud.body.alcalinidad_CO3,
                dureza: solicitud.body.dureza,
                dureza_CaCO3: solicitud.body.dureza_CaCO3,
                dureza_Ca: solicitud.body.dureza_Ca,
                silice_SiO2: solicitud.body.silice_SiO2,
                silice_Si: solicitud.body.silice_Si,
                nitrato_N: solicitud.body.nitrato_N,
                nitrato_NO3: solicitud.body.nitrato_NO3,
                fosfato_PO4: solicitud.body.fosfato_PO4,
                fosfato_P: solicitud.body.fosfato_P,
                potasio: solicitud.body.potasio,
                magnecio_Mg: solicitud.body.magnecio_Mg,
                magnecio_CaCO3: solicitud.body.magnecio_CaCO3,
                balance_Ca: solicitud.body.balance_Ca,
                balance_Mg: solicitud.body.balance_Mg,
                balance_K: solicitud.body.balance_K,
                estanque: solicitud.body.estanque,
                fecha: new Date( fecha.getTime() + Math.abs(fecha.getTimezoneOffset()*60000)),
                observaciones: solicitud.body.observaciones,
            }

            console.log(data);

            var nutrientestoxSem = new NutrientesToxSemanal(data);

            nutrientestoxSem.save( function(error){
                if(error){
                    console.log(error);
                } else {
                    Usuarios.find( function(error, usuarios){
                        if(error){
        
                        } else {
                            respuesta.redirect("/nutrientestox/semanal/all");
                        }
                    });	
                }
            });
        }
    },
    findS: function(solicitud, respuesta){
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
                            respuesta.render('Laboratorio/NutrientesTox/Semanal/new', {
                                user: solicitud.session.user,
                                modulos: modulos,
                                modulo: solicitud.body.modulo,
                                nutrientes: {
                                    amonia: 0,
                                    nitrito_N: 0,
                                    nitrito_NO3: 0,
                                    alcalinidad_CaCO3: 0,
                                    alcalinidad_HCO3: 0,
                                    alcalinidad_CO3: 0,
                                    dureza: 0,
                                    dureza_CaCO3: 0,
                                    dureza_Ca: 0,
                                    silice_SiO2: 0,
                                    silice_Si: 0,
                                    nitrato_N: 0,
                                    nitrato_NO3: 0,
                                    fosfato_PO4: 0,
                                    fosfato_P: 0,
                                    potasio: 0,
                                    magnecio_Mg: 0,
                                    magnecio_CaCO3: 0,
                                    balance_Ca: 0,
                                    balance_Mg: 0,
                                    balance_K: 0,
                                    fecha: new Date,
                                    observaciones: ''
                                },
                                estanques: estanques,
                            });
                        }
                    }).sort({ codigo : 1});
                }
            });
        }
    }
}