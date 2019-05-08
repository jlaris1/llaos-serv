var mongoose = require('mongoose'),
    Proveedores = mongoose.model('Proveedores');
    FechaHora = require('./fechahora');

module.exports = {
    //Método para obtener todos los proveedores
    todos: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Proveedores.find( function(error, proveedores) {
                respuesta.render("Proveedores/proveedores", {
                    user: solicitud.session.user,
                    proveedores: proveedores
                });
            });
        };
    },
    // Mostrar agregar un nuevo proveedor
    nuevo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            respuesta.render("Proveedores/proveedor", 
            {
                user: solicitud.session.user
            });
        };
    },
    // Redireccionar al view editar proveedor
    editar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Proveedores.findOne({"_id":solicitud.params.id}, function(error, proveedor){
                if(error){
                    console.log(error);
                }else{
                    if(solicitud.session.user === undefined){
                        respuesta.redirect("/");
                    }else{
                        //if(solicitud.session.user.permisos === undefined){
                            respuesta.render("Proveedores/editar",{
                                user: solicitud.session.user, 
                                proveedor: proveedor,
                                //permisos: 'usuario'
                            });
                        /*}else{
                            respuesta.render("producto/editar",{
                                user: solicitud.session.user, 
                                producto: producto,
                                //permisos: solicitud.session.user.permisos
                            });
                        }*/
                    }
                }
            });
        };
    },
    // Registro de nuevo proveedor en bd
    guardarProveedor: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var data = {
                codigo: solicitud.body.codigo,
                tipoEmpresa: solicitud.body.tipoEmpresa,
                rfc: solicitud.body.rfc,
                nombreEmpresa: solicitud.body.nombreEmpresa,
                razonSocial: solicitud.body.razonSocial,
                curp: solicitud.body.curp,
                direccion: solicitud.body.direccion,
                tipoPago: solicitud.body.tipoPago,
                telefono: solicitud.body.telefono,
                nombreVendedor: solicitud.body.nombreVendedor,
                celular: solicitud.body.celular,
                correo: solicitud.body.correo,
                correo_empresa: solicitud.body.correo_empresa,
                banco: solicitud.body.banco,
                cuenta: solicitud.body.cuenta,
                clabe: solicitud.body.clabe
            }		

            var proveedor = new Proveedores(data);

            proveedor.save( function(error){
                if(error){
                    console.log(error);
                }else{
                    respuesta.redirect("/proveedores");
                }
            });
        };
    },
    //Actualizar proveedor en bd
    actualizar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var data = {
                codigo: solicitud.body.codigo,
                tipoEmpresa: solicitud.body.tipoEmpresa,
                rfc: solicitud.body.rfc,
                nombreEmpresa: solicitud.body.nombreEmpresa,
                razonSocial: solicitud.body.razonSocial,
                curp: solicitud.body.curp,
                direccion: solicitud.body.direccion,
                tipoPago: solicitud.body.tipoPago,
                telefono: solicitud.body.telefono,
                nombreVendedor: solicitud.body.nombreVendedor,
                celular: solicitud.body.celular,
                correo: solicitud.body.correo,
                correo_empresa: solicitud.body.correo_empresa,
                banco: solicitud.body.banco,
                cuenta: solicitud.body.cuenta,
                clabe: solicitud.body.clabe
            };

            Proveedores.updateOne({"_id": solicitud.params.id}, data, function (error){
                if(error){
                    console.log(error);
                }else{
                    respuesta.redirect("/proveedores");
                }
            });
        };
    },
    eliminar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Proveedores.deleteOne({"_id": solicitud.params.id},function (error){
                if(error){
                    console.log(error);
                }else{
                    respuesta.redirect("/proveedores");
                }
            });
        };
    }
}