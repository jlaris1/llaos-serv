var mongoose = require('mongoose');
    Usuarios = mongoose.model('Usuarios');
    
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
                        usuarios: usuarios
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
                                    usuarios: usuarios
                                }
                            );
                        }
                    });
                }
            });
        };
    },
    // Guardar usuario en bd
    guardarUsuario: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            var autorizador = '';

            if (solicitud.body.autoriza == 'on'){
                autorizador = true;
            } else {
                autorizador = false;
            }

            var data = {
                nombre: solicitud.body.nombre,
                correo: solicitud.body.correo,
                usuario: solicitud.body.usuario,
                password: solicitud.body.password,
                nacimiento: solicitud.body.nacimiento,
                numero_nomina: solicitud.body.numero_nomina,
                empresa: solicitud.body.empresa,
                unidad_negocio: solicitud.body.unidad_negocio,
                permisos: solicitud.body.permisos,
                autorizador: autorizador
            }

            var usuario = new Usuarios(data);

            usuario.save(function(error){
                if(error){
                    console.log(error);
                }else{
                    Usuarios.find( function(error, usuarios){
                        if(error){
        
                        } else {
                            respuesta.render("Sistemas/Usuarios/usuarios",
                                { 
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
                                }
                            );
                        }
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
            var autorizador;

            if(solicitud.body.autoriza){
                autorizador = true;
            } else {
                autorizador = false;
            }


            var data = {
                nombre: solicitud.body.nombre,
                correo: solicitud.body.correo,
                usuario: solicitud.body.usuario,
                password: solicitud.body.password,
                nacimiento: solicitud.body.nacimiento,
                numero_nomina: solicitud.body.numero_nomina,
                empresa: solicitud.body.empresa,
                unidad_negocio: solicitud.body.unidad_negocio,
                permisos: solicitud.body.permisos,
                autorizador: autorizador
            }

            Usuarios.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(error);
                } else {
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render("Sistemas/Usuarios/Usuarios",
                                {
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
                                }
                            );
                        }
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
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render("Sistemas/Usuarios/Usuarios",
                                {
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
                                }
                            );
                        }
                    });
                }
            });
        };
    }
}