var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    Zooplancton = mongoose.model('Zooplancton');
    Estanques = mongoose.model('Estanques');
    Modulos = mongoose.model('Modulos');
    chalk = require('chalk');

module.exports = {
    all: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            Zooplancton.find(function(error, mediciones){
                if(error){
                    console.log(error);
                } else {
                    Estanques.populate(mediciones, {path: 'estanque'}, function(error, mediciones){
                        Usuarios.find( function(error, usuarios){
                            if(error){
                                console.log(error);
                            } else { 
                                respuesta.render("Laboratorio/Zooplancton/all",
                                    {
                                        user: solicitud.session.user,
                                        mediciones: mediciones,
                                        titulo: "Zooplancton",
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
                                        ruta: "zooplancton"
                                    }
                                );
                            }
                        });
                    });
                }
            });
        };
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
                            respuesta.render("Laboratorio/Zooplancton/new",
                                {
                                    user: solicitud.session.user,
                                    modulos: modulos,
                                    modulo: solicitud.body.modulo,
                                    zooplancton: {
                                        nauplios: 0,
                                        nauplios_porcent: '',
                                        copepodos: 0,
                                        copepodos_porcent: '',
                                        rutiferos: 0,
                                        rutiferos_porcent: '',
                                        poliquetos: 0,
                                        poliquetos_porcent: '',
                                        otros: 0,
                                        otros_porcent: '',
                                        total_organismos: 0,
                                        fecha: new Date,
                                        biologo: ''
                                    },
                                    estanques: {},
                                    titulo: "Zooplancton",
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
                                    ruta: "zooplancton"
                                }
                            );
                        }
                    });
                }
            });
        };
    },
    edit: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            Zooplancton.findById({ "_id": solicitud.params.id }, function(error, zooplancton){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.populate(zooplancton, {path: 'estanque'}, function(error, zooplancton){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Modulos.populate(zooplancton.estanque, {path: 'modulo'}, function(error, estanque){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    zooplancton.estanque = estanque;

                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Laboratorio/Zooplancton/edit", 
                                                {
                                                    user: solicitud.session.user,
                                                    zooplancton: zooplancton,
                                                    titulo: "Zooplancton",
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
                                                    ruta: "zooplancton"
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
                nauplios: solicitud.body.nauplios,
                nauplios_porcent: ((parseInt(solicitud.body.nauplios) / parseInt(solicitud.body.total)) * 100).toFixed(2),
                copepodos: solicitud.body.copepodos,
                copepodos_porcent: ((parseInt(solicitud.body.copepodos) / parseInt(solicitud.body.total)) * 100).toFixed(2),
                rutiferos: solicitud.body.rutiferos,
                rutiferos_porcent: ((parseInt(solicitud.body.rutiferos) / parseInt(solicitud.body.total)) * 100).toFixed(2),
                poliquetos: solicitud.body.poliquetos,
                poliquetos_porcent: ((parseInt(solicitud.body.poliquetos) / parseInt(solicitud.body.total)) * 100).toFixed(2),
                otros: solicitud.body.otros,
                otros_porcent: ((parseInt(solicitud.body.otros) / parseInt(solicitud.body.total)) * 100).toFixed(2),
                total_organismos: solicitud.body.total,
                estanque: solicitud.body.estanque,
                fecha: new Date( fecha.getTime() + Math.abs(fecha.getTimezoneOffset()*60000)),
                hora: FechaHora.obtenerhora(),
                biologo: solicitud.session.user.nombre
            }

            var zooplancton = new Zooplancton(data);

            zooplancton.save(function(error){
                if(error){
                    console.log(error);
                }else{
                    Usuarios.find( function(error, usuarios){
                        if(error){
        
                        } else {
                            respuesta.redirect("/zooplancton/all");
                        }
                    });	
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
                nauplios: solicitud.body.nauplios,
                nauplios_porcent: ((parseInt(solicitud.body.nauplios) / parseInt(solicitud.body.total)) * 100).toFixed(2),
                copepodos: solicitud.body.copepodos,
                copepodos_porcent: ((parseInt(solicitud.body.copepodos) / parseInt(solicitud.body.total)) * 100).toFixed(2),
                rutiferos: solicitud.body.rutiferos,
                rutiferos_porcent: ((parseInt(solicitud.body.rutiferos) / parseInt(solicitud.body.total)) * 100).toFixed(2),
                poliquetos: solicitud.body.poliquetos,
                poliquetos_porcent: ((parseInt(solicitud.body.poliquetos) / parseInt(solicitud.body.total)) * 100).toFixed(2),
                otros: solicitud.body.otros,
                otros_porcent: ((parseInt(solicitud.body.otros) / parseInt(solicitud.body.total)) * 100).toFixed(2),
                total_organismos: solicitud.body.total,
                fecha: new Date( fecha.getTime() + Math.abs(fecha.getTimezoneOffset()*60000)),
                hora: FechaHora.obtenerhora(),
                biologo: solicitud.session.user.nombre
            }

            Zooplancton.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.redirect('/zooplancton/all');
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
                                    respuesta.render('Laboratorio/Zooplancton/new', {
                                        user: solicitud.session.user,
                                        modulos: modulos,
                                        modulo: solicitud.body.modulo,
                                        zooplancton: {
                                            nauplios: 0,
                                            nauplios_porcent: '',
                                            copepodos: 0,
                                            copepodos_porcent: '',
                                            rutiferos: 0,
                                            rutiferos_porcent: '',
                                            poliquetos: 0,
                                            poliquetos_porcent: '',
                                            otros: 0,
                                            otros_porcent: '',
                                            total_organismos: 0,
                                            fecha: new Date,
                                            biologo: ''
                                        },
                                        estanques: estanques,
                                        titulo: "Zooplancton",
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
                                        ruta: "zooplancton"
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