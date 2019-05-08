var mongoose = require('mongoose');
    Estanques = mongoose.model('Estanques');
    Modulos = mongoose.model('Modulos');
    TiposModulos = mongoose.model('TiposModulos');
    chalk = require('chalk');

module.exports = {
    all: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{
            Estanques.find( function(error, estanques){
                if(error){
                    console.log(error);
                } else {
                    Modulos.populate(estanques, { path: 'modulo'}, function(error, estanques){
                        if(error){
                            console.log(error);
                        } else {
                            TiposModulos.populate(estanques, { path: 'tipo'}, function(error, estanques){
                                if(error){
                                    console.log(error);
                                } else {
                                    respuesta.render('Administracion/Granja/Estanques/all',
                                        {
                                            user: solicitud.session.user,
                                            estanques: estanques
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
                    TiposModulos.find( function(error, tiposModulos){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render('Administracion/Granja/Estanques/new',
                                {   
                                    user: solicitud.session.user,
                                    modulos: modulos,
                                    tiposModulos: tiposModulos
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
            
        }
    },
    delete: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{
            
        }
    },
    add: function(solicitud, respuesta){
        var locations = JSON.parse(solicitud.body.locations);

        var data = {
            codigo: solicitud.body.code,
            nombre: solicitud.body.name,
            modulo: solicitud.body.module,
            tipo: solicitud.body.type_module,
            pointer_x: solicitud.body.pointer_x,
            pointer_y: solicitud.body.pointer_y,
            marker_x: solicitud.body. marker_x,
            marker_y: solicitud.body.marker_y,
            locations: locations
        }

        console.log(data)

        var estanque = new Estanques(data);

        estanque.save( function(error){
            if(error){
                console.log(error);
            } else {
                respuesta.redirect('/estanque/all')
            }
        });
        

    },
    detail: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{
            Estanques.findById({"_id": solicitud.params.id }, function(error, estanque){
                if(error){
                    console.log(chalk.bgRed(error));
                }else{
                   // console.log(chalk.bgGreen(estanque));

                    Modulos.populate(estanque, { path: 'modulo'}, function(error, estanque){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            TiposModulos.populate(estanque, { path: 'tipo'}, function(error, estanque){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    var Locations = [];

                                    estanque.locations.forEach(element => {
                                        element.pointer.forEach(p => {
                                            Locations.push([p.x,p.y]);
                                        });
                                    });

                                    respuesta.render("Administracion/Granja/Estanques/detail",
                                        {
                                            user: solicitud.session.user,
                                            estanque: estanque,
                                            locations: Locations
                                        }
                                    )
                                }
                            });
                        }
                    });
                }
            })
        }
    }
}