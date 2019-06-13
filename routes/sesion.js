var mongoose = require('mongoose');
    Usuarios = mongoose.model('Usuarios');
    Cotizaciones = mongoose.model('Cotizaciones');
    Requisiciones = mongoose.model('Requisiciones');
    Ordenes = mongoose.model('Ordenes');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');

module.exports = {
    //Método root para solicitar inicio de sesión
    login: function (solicitud, respuesta){
        respuesta.render("new_login",{
        //respuesta.render("login",{
            msg: "Por favor inicie sesión."
        });
    },
    inicio: function (solicitud, respuesta){
        //Encerrar en secuencia try-catch
        Usuarios.findOne({"usuario": solicitud.body.user},function (error,usuario){
            if(error){//Error en cuestion de consulta, conexion,etc
                solicitud.session.error = error;
                respuesta.redirect("/error-inicio/"+solicitud.body.user);
            } else {
                if(!usuario){
                    respuesta.render("new_login",{
                        msg: "Error: no existe el usuario " + solicitud.body.user
                    });
                }else{
                    if(usuario.password == solicitud.body.pass){
                        solicitud.session.user = usuario;
                        respuesta.redirect('/home');
                    }else{
                        respuesta.render("new_login",{
                            msg: "Error: contraseña incorrecta."
                        });
                    }
                }
            }
        });
        //
    },
    //Método para cerrar sesión
    logoff: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            solicitud.session.user = undefined;
            respuesta.render("new_login",{
                msg: "Por favor inicie sesión."
            });
        };
    },
    home: function(solicitud, respuesta){
		if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{//Los if(error) deberan ser manejados con try-catch
			Requisiciones.find(function(error, requisiciones){
                if(error){//Errores despues de un find son errores de conexion, error al consultar, etc
                    var data = {
                        usuario: solicitud.session.user.usuario,
                        fecha: FechaHora.obtenerfecha(),
                        hora: FechaHora.obtenerhora(),
                        descripcion: 'Error al buscar requisiciones durante el inicio de sesión.',
                        error: error
                    };

                    var horror = new Errores(data);

                    horror.save(function(error){
                        if(error){
                            //console.log(error);
                            respuesta.redirect("/error-inesperado");
                        }
                    });

                } else {
                    Cotizaciones.find({"estatus": "Nueva"}, function(error, cotizaciones){
                        if(error){
                            //console.log(error);
                            var data = {
                                usuario: solicitud.session.user.usuario,
                                fecha: FechaHora.obtenerfecha(),
                                hora: FechaHora.obtenerhora(),
                                descripcion: 'Error al buscar cotizaciones nuevas durante el inicio de sesión.',
                                error: error
                            };

                            var horror = new Errores(data);
                            horror.save(function(error){
                                if(error){
                                    //console.log(error);
                                    respuesta.redirect("/error-inesperado");
                                }
                            });
                        } else {
                            Requisiciones.find({"estatus": "Cancelada"}, function(error, canceladas){
                                if(error){
                                    //console.log(error);
                                    var data = {
                                        usuario: solicitud.session.user.usuario,
                                        fecha: FechaHora.obtenerfecha(),
                                        hora: FechaHora.obtenerhora(),
                                        descripcion: 'Error al buscar requisiciones canceladas durante el inicio de sesión.',
                                        error: error
                                    };
    
                                    var horror = new Errores(data);
                                    horror.save(function(error){
                                        if(error){
                                            //console.log(error);
                                            respuesta.redirect("/error-inesperado");
                                        }
                                    });
                                } else {
                                    Ordenes.find({"estatus": "Nueva"}, function(error, ordenes){
                                        if(error){
                                            //console.log(error);
                                            var data = {
                                                usuario: solicitud.session.user.usuario,
                                                fecha: FechaHora.obtenerfecha(),
                                                hora: FechaHora.obtenerhora(),
                                                descripcion: 'Error al buscar requisiciones durante el inicio de sesión.',
                                                error: error
                                            };
            
                                            var horror = new Errores(data);
                                            horror.save(function(error){
                                                if(error){
                                                    //console.log(error);
                                                    respuesta.redirect("/error-inesperado");
                                                }
                                            });
                                        } else {
                                            // Después de un inicio de sesión exitoso,hacer las consultar, 
                                            // obtener errores y/o cantidades, se renderiza el index
                                            var reqLen=0;
                                            var cotLen=0;
                                            var ordLen=0;
                                            var canLen=0;

                                            if(requisiciones)
                                                reqLen = requisiciones.length
                                            if(cotizaciones)
                                                cotLen = cotizaciones.length
                                            if(ordenes)
                                                ordLen = ordenes.length
                                            if(canceladas)
                                                canLen = canceladas.length
                                            
                                            Usuarios.find( function(error, usuarios){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    respuesta.render("index",{ 
                                                        user: solicitud.session.user,
                                                        requisiciones: reqLen, 
                                                        cotizaciones: cotLen,
                                                        ordenes: ordLen,
                                                        canceladas: canLen,
                                                        criterios: {
                                                            val: "",
                                                            name: ""
                                                        }, 
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
                                                        usuarios: usuarios
                                                    });
                                                }
                                            });
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
    // Método para mostrar el login con mensaje de error
    expirada: function(solicitud, respuesta){
        respuesta.render("new_login",{
            msg: "Error: sesión caducada. Vuelva a iniciar sesión."
        });
    }
};