var mongoose = require('mongoose');
    Puestos = mongoose.model('Puestos');

module.exports = {
    // Método para mostrar todos los puestos
    todos: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Puestos.find( function(error, puestos) {
                Usuarios.find( function(error, usuarios){
                    if(error){
                        console.log(error);
                    } else { 
                        respuesta.render("Puestos/puestos", {
                            user: solicitud.session.user,
                            puestos: puestos,
                            titulo: "Puestos",
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
                            ruta: "puestos"
                        });
                    }
                });
            });
        };
    },
    // Método para mostrar la pantalla de nuevo puesto
    nuevo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Puestos.find( function(error, puestos) {
                Usuarios.find( function(error, usuarios){
                    if(error){
                        console.log(error);
                    } else { 
                        respuesta.render("Puestos/puesto", {
                            user: solicitud.session.user,
                            puestos: puestos,
                            titulo: "Puestos",
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
                            ruta: "puestos"
                        });
                    }
                });
            });
        };
    },
    // Método para guardar nuevo puesto
    guardarPuesto: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            var auxCono = [];
            var conocimientos = [];
            var indexCono = 0;
            auxCono = solicitud.body.listaConos.split(",");
            for(i=0; i<auxCono.length;i++){
                if(auxCono[i]){
                    conocimientos[indexCono++]=auxCono[i];
                }
            };

            var auxExp = [];
            var experiencia = [];
            var indexExp = 0;
            auxExp = solicitud.body.listaExps.split(",");
            for(i=0; i<auxExp.length;i++){
                if(auxExp[i]){
                    experiencia[indexExp++]=auxExp[i];
                }
            };

            var auxComp = [];
            var competencias = [];
            var indexComp = 0;
            auxComp = solicitud.body.listaComps.split(",");
            for(i=0; i<auxComp.length;i++){
                if(auxComp[i]){
                    competencias[indexComp++]=auxComp[i];
                }
            };
            
            var auxAct = [];
            var actividades = [];
            var indexAct = 0;
            auxAct = solicitud.body.listaActs.split(",");
            for(i=0; i<auxAct.length;i++){
                if(auxAct[i]){
                    actividades[indexAct++]=auxAct[i];
                }
            };

            var data = {
                posicion: solicitud.body.posicion,
                reporta: solicitud.body.reporta,
                supervisa: solicitud.body.supervisa,
                objetivo: solicitud.body.objetivo,
                idiomas: solicitud.body.idiomas,
                formacion: solicitud.body.formacion,
                vacante: solicitud.body.vacante,
                conocimientos: conocimientos,
                experiencia: experiencia,
                competencias: competencias,
                actividades: actividades,//responsabilidades
                estado: "Activo" 
            };

            var puesto = new Puestos(data);

            puesto.save( function(error){
                if(error){
                    console.log(error);
                }else{
                    respuesta.redirect("/puestos");
                };
            });
        };
    },
    // Método para mostrar la pantalla Editar puesto
    editar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Puestos.findById({"_id":solicitud.params.id}, function(error, puesto){
                if(error){
                    console.log(error);
                }else{
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else { 
                            respuesta.render("Puestos/editar",{
                                user: solicitud.session.user,
                                puesto: puesto,
                                titulo: "Puestos",
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
                                ruta: "puestos"
                            });
                        }
                    });
                };
            });
        };
    },
    // Método para actualizar el puesto
    actualizar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            var auxCono = [];
            var conocimientos = [];
            var indexCono = 0;
            auxCono = solicitud.body.listaConos.split(",");
            for(i=0; i<auxCono.length;i++){
                if(auxCono[i]){
                    conocimientos[indexCono++]=auxCono[i];
                }
            };

            var auxExp = [];
            var experiencia = [];
            var indexExp = 0;
            auxExp = solicitud.body.listaExps.split(",");
            for(i=0; i<auxExp.length;i++){
                if(auxExp[i]){
                    experiencia[indexExp++]=auxExp[i];
                }
            };

            var auxComp = [];
            var competencias = [];
            var indexComp = 0;
            auxComp = solicitud.body.listaComps.split(",");
            for(i=0; i<auxComp.length;i++){
                if(auxComp[i]){
                    competencias[indexComp++]=auxComp[i];
                }
            };
            
            var auxAct = [];
            var actividades = [];
            var indexAct = 0;
            auxAct = solicitud.body.listaActs.split(",");
            for(i=0; i<auxAct.length;i++){
                if(auxAct[i]){
                    actividades[indexAct++]=auxAct[i];
                }
            };

            var data = {
                posicion: solicitud.body.posicion,
                reporta: solicitud.body.reporta,
                supervisa: solicitud.body.supervisa,
                objetivo: solicitud.body.objetivo,
                idiomas: solicitud.body.idiomas,
                formacion: solicitud.body.formacion,
                vacante: solicitud.body.vacante,
                conocimientos: conocimientos,
                experiencia: experiencia,
                competencias: competencias,
                actividades: actividades,//responsabilidades
            };

            Puestos.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(error);
                }else{
                    respuesta.redirect("/puestos");
                };
            });
        };
    },
    // Método para dar de baja el puesto
    baja: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            var data = {
                estado: "Baja"
            };

            Puestos.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(error);
                }else{
                    respuesta.redirect("/puestos");
                };
            });
        };
    },
    // Método para ver la información del puesto
    ver: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Puestos.findById({"_id":solicitud.params.id}, function(error, puesto){
                if(error){
                    console.log(error);
                }else{
                    if(solicitud.session.user === undefined){
                        respuesta.redirect("/");
                    }else{
                        Usuarios.find( function(error, usuarios){
                            if(error){
                                console.log(error);
                            } else { 
                                respuesta.render("Puestos/detalles",{
                                    user: solicitud.session.user,
                                    puesto: puesto,
                                    titulo: "Puestos",
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
                                    ruta: "puestos"
                                });
                            }
                        });
                    };
                };
            });
        }
    }
}