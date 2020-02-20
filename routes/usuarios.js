var mongoose = require('mongoose');
    Usuarios = mongoose.model('Usuarios');
    UnidadesNegocios = mongoose.model('UnidadesNegocio');
    Modulos = mongoose.model('Modulos');
    
module.exports = {//HAcen falta try-catch a los metodos
    //Método para obtener todos los usuarios
    todos: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            Usuarios.find( function(error, usuarios){
                if(error){
                    console.log(error)
                } else {
                    respuesta.render("Sistemas/Usuarios/Usuarios",{ 
                        user: solicitud.session.user,
                        usuarios: usuarios,
                        titulo: "Usuarios",
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
                        ruta: "usuarios"
                    });
                }
            });
        };
    },
    // Mostrar agregar un nuevo usuario
    nuevo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            Usuarios.find( function(error, usuarios){
                if(error){
                    console.log(error)
                } else {
                    UnidadesNegocios.find( (error, unidades) => {
                        if(error){
                            console.log(error);
                        } else {
                            Modulos.find({"codigo": {$ne: "NLL"}}, (error, modulos) => {
                                if(error) {
                                    console.log(error);
                                } else {
                                    respuesta.render("Sistemas/Usuarios/Usuario",{
                                        user: solicitud.session.user,
                                        titulo: "Usuarios",
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
                                        ruta: "usuarios",
                                        usuarios: usuarios,
                                        modulos: modulos,
                                        unidades_negocios: unidades
                                    });
                                }
                            }).sort({ nombre : 1});
                        }
                    });
                }
            });
        };
    },
    // Mostrar edición de usuario
    editar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            Usuarios.findOne({"_id": solicitud.params.id}, function(error,usuario){
                if(error){
                    console.log(error);
                } else {
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error)
                        } else {
                            UnidadesNegocios.find( (error, unidades) => {
                                if(error){
                                    console.log(error);
                                } else {
                                    Modulos.find({"codigo": {$ne: "NLL"}}, (error, modulos) => {
                                        if(error) {
                                            console.log(error);
                                        } else {
                                            respuesta.render("Sistemas/Usuarios/editar",
                                                {
                                                    user: solicitud.session.user,
                                                    usr: usuario,
                                                    titulo: "Usuarios",
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
                                                    ruta: "usuarios",
                                                    usuarios: usuarios,
                                                    modulos: modulos,
                                                    unidades_negocios: unidades
                                                }
                                            );
                                        }
                                    }).sort({ nombre : 1});
                                }
                            });
                        }
                    });
                }
            });
        };
    },
    // Guardar usuario en bd
    guardar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            var usuario = new Usuarios(solicitud.body);

            usuario.save(function(error){
                if(error){
                    console.log(error);
                }else{
                    respuesta.json({
                        estatus: 'Guardado'
                    });
                }
            });
        };
    },
    // Actualizar usuario en bd
    actualizar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            console.log(solicitud.body);

            Usuarios.updateOne({"_id": solicitud.params.id}, solicitud.body, function(error){
                if(error){
                    console.log(error);
                } else {
                    respuesta.json({
                        estatus: 'Actualizado'
                    });
                }
            });
        };
    },
    // Eliminar usuario de bd
    eliminar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            Usuarios.deleteOne({"_id": solicitud.params.id}, function(error){
                if(error){
                    console.log(error);
                } else {
                    respuesta.redirect("/usuarios");
                }
            });
        };
    }
}