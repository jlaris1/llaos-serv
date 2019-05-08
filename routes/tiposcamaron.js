var mongoose = require('mongoose');
    TiposCamaron = mongoose.model('TiposCamaron');
    
module.exports = {//HAcen falta try-catch a los metodos
    //Método para obtener todos los usuarios
    nuevo: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else {
            respuesta.render("Administracion/planta/tiposcamaron/nuevo",
                {
                    user: solicitud.session.user
                }
            );
        }
    },
    guardar: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else {

            if(solicitud.body.talla == 'otra'){
                solicitud.body.talla = solicitud.body.talla_otro;
            }

            if(solicitud.body.presentacion == 'otra'){
                solicitud.body.presentacion = solicitud.body.presentacion_otro;
            }

            var data = {
                nombre : solicitud.body.nombre,
                talla : solicitud.body.talla,
                presentacion : solicitud.body.presentacion,
                cantidadMaster: '0',
                almacen: solicitud.body.almacen,
                pesoMaster: '0',
                totalKgs: '0'
            }
            
            var tipoCamaron = new TiposCamaron(data);

            tipoCamaron.save( function(error){
                if(error){
                    console.log(error);
                } else {

                    TiposCamaron.find( function(error, tiposCamaron){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render("Administracion/planta/tiposcamaron/tiposcamaron",
                                {   
                                    user: solicitud.session.user,
                                    tiposCamaron: tiposCamaron
                                } 
                            );
                        }
                    });
                }
            });
        }
    },
    editar: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else { 
            TiposCamaron.findById({"_id": solicitud.params.id}, function(error, tipoCamaron){
                if(error){
                    console.log(error);
                } else {
                    respuesta.render("Administracion/planta/tiposcamaron/editar",
                        {
                            user: solicitud.session.user,
                            tipoCamaron: tipoCamaron
                        }
                    );
                }
            });
        }
    },
    editarInv: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else { 
            TiposCamaron.findById({"_id": solicitud.params.id}, function(error, tipoCamaron){
                if(error){
                    console.log(error);
                } else {
                    respuesta.render("Administracion/planta/tiposcamaron/editarInventario",
                        {
                            user: solicitud.session.user,
                            tipoCamaron: tipoCamaron
                        }
                    );
                }
            });
        }
    },
    ver: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else { 
            TiposCamaron.findById({"_id": solicitud.params.id}, function(error, tipoCamaron){
                if(error){
                    console.log(error);
                } else {
                    respuesta.render("Administracion/planta/tiposcamaron/ver",
                        {
                            user: solicitud.session.user,
                            tipoCamaron: tipoCamaron
                        }
                    );
                }
            });
        }
    },
    eliminar: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else { 
            TiposCamaron.deleteOne({"_id": solicitud.params.id}, function(error){
                if(error){
                    console.log(error);
                } else {
                    TiposCamaron.find( function(error, tiposCamaron){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render("Administracion/planta/tiposcamaron/tiposcamaron",
                                {   
                                    user: solicitud.session.user,
                                    tiposCamaron: tiposCamaron
                                } 
                            );
                        }
                    });    
                }
            })
        }
    },
    actualizar: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else { 
            var data = {
                nombre : solicitud.body.nombre,
                talla : solicitud.body.talla,
                almacen: solicitud.body.almacen,
                presentacion : solicitud.body.presentacion
            }

            console.log(data);

            TiposCamaron.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(error);
                } else {
                    TiposCamaron.find( function(error, tiposCamaron){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render("Administracion/planta/tiposcamaron/tiposcamaron",
                                {   
                                    user: solicitud.session.user,
                                    tiposCamaron: tiposCamaron
                                } 
                            );
                        }
                    });
                }
            });
        }
    },
    actualizarInv: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else { 
            var data = {
                nombre : solicitud.body.nombre,
                talla : solicitud.body.talla,
                almacen: solicitud.body.almacen,
                presentacion : solicitud.body.presentacion,
                cantidadMaster: solicitud.body.cantidadMaster,
                totalKgs: solicitud.body.totalKgs
            }

            console.log(data);

            TiposCamaron.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(error);
                } else {
                    TiposCamaron.find( function(error, tiposCamaron){
                        if(error){
                            console.log(error);
                        } else {
                            TiposCamaron.find({"totalKgs": {$gte:1}}, function(error, tiposCamaron){
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            var tallas = [
                                                { talla:  "16/20" },
                                                { talla:  "20/30" },
                                                { talla:  "21/25" },
                                                { talla:  "26/30" },
                                                { talla:  "31/35" },
                                                { talla:  "36/40" },
                                                { talla:  "40/50" },
                                                { talla:  "41/50" },
                                                { talla:  "51/60" },
                                                { talla:  "61/70" },
                                                { talla:  "71/90" },
                                                { talla:  "91/110" },
                                                { talla:  "Rezagas" }
                                            ];
                        
                                            var presentaciones = [
                                                { presentacion: "Frizado 20 kgs" },
                                                { presentacion: "Top Open 40lbs" },
                                                { presentacion: "IQF 10 x 4" }
                                            ]
                        
                                            respuesta.render("Administracion/planta/inventariocamaron/inventarios",
                                                {   
                                                    user: solicitud.session.user,
                                                    tiposCamaron: tiposCamaron,
                                                    tallas:  JSON.stringify(tallas),
                                                    presentaciones:  JSON.stringify(presentaciones),
                                                    usuarios: usuarios
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
    todos: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else { 
            TiposCamaron.find( function(error, tiposCamaron){
                if(error){
                    console.log(error);
                } else {
                    respuesta.render("Administracion/planta/tiposcamaron/tiposcamaron",
                        {   
                            user: solicitud.session.user,
                            tiposCamaron: tiposCamaron
                        } 
                    );
                }
            });
        }
    }
}

function tallaCam(talla){
    switch(talla) {
        case "16/20":
            return "16/20"
        case "21/25":
            return "21/25"
        case "26/30":
            return "26/30"
        case "31/35":
            return "31/35"
        case "36/40":
            return "36/40"
        case "41/50":
            return "41/50"
        case "51/60":
            return "51/60"
        case "61/70":
            return "61/70"
        case "71/90":
            return "71/90"
        default:
            return "otra"
    }
}

function presentacionCam(presentacion){
    switch(presentacion) {
        case "Frizado 20 kgs":
            return "Frizado 20 kgs"
        case "Top Open 4lbs":
            return "Top Open 4lbs"
        case "IQF 10 x 4":
            return "IQF 10 x 4"
        default:
            return "otra"
    }
}

                            