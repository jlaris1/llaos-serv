var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    Fitoplancton = mongoose.model('Fitoplancton');
    Estanques = mongoose.model('Estanques');
    Modulos = mongoose.model('Modulos');
    TiposModulos = mongoose.model('TiposModulos');
    chalk = require('chalk');

module.exports = {
    all: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            Fitoplancton.find( function(error, fitoplancton){
                if(error){
                    console.log(error);
                } else {
                    Estanques.populate( fitoplancton, {path: 'estanque'}, function(error, fitoplancton){
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else { 
                                    respuesta.render("Laboratorio/Fitoplancton/all",
                                        {
                                            user: solicitud.session.user,
                                            fitoplancton: fitoplancton,
                                            titulo: "Fitoplancton",
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
                                            ruta: "fitoplancton"
                                        }
                                    );
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    new: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            Modulos.find( function(error, modulos){
                if(error){
                    console.log(error);
                } else {
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else { 
                            respuesta.render('Laboratorio/Fitoplancton/new', 
                                {
                                    user: solicitud.session.user,
                                    modulos: modulos,
                                    estanques: {},
                                    fitoplancton: {
                                        diatomeas: 0,
                                        cianofitas: 0,
                                        clorofitas: 0,
                                        dinoflagelados: 0,
                                        flagelados: 0,
                                        diatomeas_porcent: '',
                                        cianofitas_porcent: '',
                                        clorofitas_porcent: '',
                                        dinoflagelados_porcent: '',
                                        flagelados_porcent: '',
                                        total_cel_ml: 0,
                                    },
                                    titulo: "Fitoplancton",
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
                                    ruta: "fitoplancton"
                                }
                            );
                        }
                    });
                }
            });
        }
    },
    edit: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            Fitoplancton.findById({ "_id": solicitud.params.id }, function(error, fitoplancton){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.populate(fitoplancton, {path: 'estanque'}, function(error, fitoplancton){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Modulos.populate(fitoplancton.estanque, {path: 'modulo'}, function(error, estanque){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    fitoplancton.estanque = estanque;

                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Laboratorio/Fitoplancton/edit", 
                                                {
                                                    user: solicitud.session.user,
                                                    fitoplancton: fitoplancton,
                                                    titulo: "Fitoplancton",
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
                                                    ruta: "fitoplancton"
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
    },
    add: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            var fecha = new Date(solicitud.body.fecha);

            var data = {
                diatomeas: solicitud.body.diatomeas,
                cianofitas: solicitud.body.cianofitas,
                clorofitas: solicitud.body.clorofitas,
                dinoflagelados: solicitud.body.dinoflagelados,
                flagelados: solicitud.body.flagelados,
                diatomeas_porcent: ((parseFloat(solicitud.body.diatomeas) / parseFloat(solicitud.body.total)) * 100).toFixed(2),
                cianofitas_porcent: ((parseFloat(solicitud.body.cianofitas) / parseFloat(solicitud.body.total)) * 100).toFixed(2),
                clorofitas_porcent: ((parseFloat(solicitud.body.clorofitas) / parseFloat(solicitud.body.total)) * 100).toFixed(2),
                dinoflagelados_porcent: ((parseFloat(solicitud.body.dinoflagelados) / parseFloat(solicitud.body.total)) * 100).toFixed(2),
                flagelados_porcent: ((parseFloat(solicitud.body.flagelados) / parseFloat(solicitud.body.total)) * 100).toFixed(2),
                total_cel_ml: solicitud.body.total,
                estanque: solicitud.body.estanque,
                fecha: new Date( fecha.getTime() + Math.abs(fecha.getTimezoneOffset()*60000)),
            };

            var fito = new Fitoplancton(data);

            fito.save( function(error){
                if(error){
                    console.log(error);
                } else {
                    respuesta.redirect('/fitoplancton/all');
                }
            });
        }
    },
    update: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            var fecha = new Date(solicitud.body.fecha);

            var data = {
                diatomeas: solicitud.body.diatomeas,
                cianofitas: solicitud.body.cianofitas,
                clorofitas: solicitud.body.clorofitas,
                dinoflagelados: solicitud.body.dinoflagelados,
                flagelados: solicitud.body.flagelados,
                diatomeas_porcent: ((parseFloat(solicitud.body.diatomeas) / parseFloat(solicitud.body.total)) * 100).toFixed(2),
                cianofitas_porcent: ((parseFloat(solicitud.body.cianofitas) / parseFloat(solicitud.body.total)) * 100).toFixed(2),
                clorofitas_porcent: ((parseFloat(solicitud.body.clorofitas) / parseFloat(solicitud.body.total)) * 100).toFixed(2),
                dinoflagelados_porcent: ((parseFloat(solicitud.body.dinoflagelados) / parseFloat(solicitud.body.total)) * 100).toFixed(2),
                flagelados_porcent: ((parseFloat(solicitud.body.flagelados) / parseFloat(solicitud.body.total)) * 100).toFixed(2),
                total_cel_ml: solicitud.body.total,
                fecha: new Date( fecha.getTime() + Math.abs(fecha.getTimezoneOffset()*60000)),
            };

            Fitoplancton.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.redirect('/fitoplancton/all');
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
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else { 
                                    respuesta.render('Laboratorio/Fitoplancton/new', {
                                        user: solicitud.session.user,
                                        modulos: modulos,
                                        modulo: solicitud.body.modulo,
                                        fitoplancton: {
                                            diatomeas: 0,
                                            cianofitas: 0,
                                            clorofitas: 0,
                                            dinoflagelados: 0,
                                            flagelados: 0,
                                            diatomeas_porcent: '',
                                            cianofitas_porcent: '',
                                            clorofitas_porcent: '',
                                            dinoflagelados_porcent: '',
                                            flagelados_porcent: '',
                                            total_cel_ml: 0,
                                        },
                                        estanques: estanques,
                                        titulo: "Fitoplancton",
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
                                        ruta: "fitoplancton"
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