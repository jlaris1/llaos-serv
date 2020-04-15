var mongoose = require('mongoose');
    Usuarios = mongoose.model('Usuarios');
    UnidadesNegocios = mongoose.model('UnidadesNegocio');
    Modulos = mongoose.model('Modulos');
    Areas = mongoose.model('Areas');
    historial = require('./historial');
    
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
                                    Areas.find((error, areas) => {
                                        if(error) {
                                            console.log(error);
                                        } else {
                                            respuesta.render("Sistemas/Usuarios/Usuario",{
                                                user: solicitud.session.user,
                                                areas: areas,
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

            usuario.save( (error) => {
                if(error){
                    console.log(error);
                }else{
                    /*********** AGREGAR AL HISTORIAL */
                        historial.save(
                            'shamrock',
                            'fa-user-plus',
                            'registro nuevo usuario en el sistema.',
                            solicitud.session.user._id
                        )
                    /******************************* */

                    respuesta.json({
                        estatus: 'Guardado'
                    });
                }
            });
        };
    },
    // Actualizar usuario en bd
    actualizar: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            Usuarios.updateOne({"_id": solicitud.params.id}, solicitud.body, (error) => {
                if(error){
                    console.log(error);
                } else {
                    /*********** AGREGAR AL HISTORIAL */
                    console.log(solicitud.session.user);

                        historial.save(
                            'shamrock',
                            'fa-user-edit',
                            'actualizó al usuario <small>' + solicitud.body.nombre + '.</small>',
                            solicitud.session.user._id
                        )                    
                    /******************************* */

                    respuesta.json({
                        estatus: 'Actualizado'
                    });
                }
            });
        };
    },
    // Eliminar usuario de bd
    eliminar: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            Usuarios.deleteOne({"_id": solicitud.params.id}, (error) => {
                if(error){
                    console.log(error);
                } else {
                    /*********** AGREGAR AL HISTORIAL */
                        historial.save(
                            'shamrock',
                            'fa-user-times',
                            ' eliminó al usuario ' + solicitud.params.id + ' .',
                            solicitud.session.user._id
                        )  
                    /******************************* */

                    respuesta.redirect("/usuarios");
                }
            });
        };
    },
    findAreas: (solicitud, respuesta) =>{
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            Areas.find({"unidad_negocio": solicitud.params.unidad}, (error, areas) =>{
                if(error){
                    console.log(error);
                } else {
                    Modulos.find({"unidad_negocio": solicitud.params.unidad}, (error, modulos) =>{
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.json({areas: areas, modulos: modulos});
                        }
                    });
                }
            });
        }
    }
}