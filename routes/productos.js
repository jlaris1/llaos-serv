var mongoose = require('mongoose');
    Productos = mongoose.model('Productos');
    Proveedores = mongoose.model('Proveedores');
    FechaHora = require('./fechahora');
    UnidadesNegocio = mongoose.model('UnidadesNegocio');
    Categorias = mongoose.model('Categorias');

module.exports = {
    //Método para obtener todos los productos
    todos: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Usuarios.find( function(error, usuarios){
                if(error){
                    console.log(error);
                } else {
                    respuesta.render("Productos/productos",{
                        user: solicitud.session.user,
                        titulo: "Productos",
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
                        ruta: "productos"
                    });
                }
            });
        };
    },
    all: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Productos.find(function (error, productos){
                if(error){
                    console.log(error);
                }else{
                    Proveedores.populate(productos, {path: 'proveedor'}, function(error, productos){
                        if(error){
                            console.log(error);
                        }else{
                            productos.forEach( function(prod){
                                if(prod.moneda == 'undefined'){
                                    prod.moneda = '';
                                }

                                if(prod.cantidad == 'undefined'){
                                    prod.cantidad = '0';
                                }

                                if(prod.orden == 'undefined'){
                                    prod.orden = '';
                                }
                                
                                if(prod.factura == 'undefined'){
                                    prod.factura = '';
                                }

                                if(prod.maximo == 'undefined'){
                                    prod.maximo = '0';
                                }

                                if(prod.minimo == 'undefined'){
                                    prod.minimo = '0';
                                }

                                if(prod.almacen == 'undefined'){
                                    prod.almacen = '';
                                }
                            });
                            
                            respuesta.json(productos);
                        }
                    });
                }
            });	
        };
    },
    //Mostrar agregar un nuevo producto
    nuevo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Proveedores.find( function(error, proveedores){
                if(error){
                    console.log(error);
                }else{
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else {
                            UnidadesNegocio.find( (error, unidadesNegocio) => {
                                if(error){
                                    console.log(error);
                                } else {
                                    Categorias.find((error, categorias) => {
                                        if(error){
                                            console.log(error);
                                        } else {
                                            respuesta.render("Productos/producto", {
                                                user: solicitud.session.user,
                                                proveedores: proveedores,
                                                categorias: categorias,
                                                unidadesNegocio: unidadesNegocio,
                                                titulo: "Productos",
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
                                                ruta: "productos"
                                            });
                                        }
                                    });
                                }
                            })
                        }
                    });
                }
            });
        };
    },
    // Mostrar edición de producto
    editar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Productos.findById({"_id":solicitud.params.id}, function(error, producto){
                if(error){
                    console.log(error);
                }else{
                    if(solicitud.session.user === undefined){
                        respuesta.redirect("/");
                    }else{
                        Proveedores.find( function(error, proveedores){
                            if(error){
                                console.log(error);
                            } else {
                                Usuarios.find( function(error, usuarios){
                                    if(error){
                                        console.log(error);
                                    } else { 
                                        Categorias.find((error, categorias) => {
                                            if(error){
                                                console.log(error);
                                            } else {
                                                respuesta.render("Productos/editar",{
                                                    user: solicitud.session.user,
                                                    proveedores: proveedores, 
                                                    categorias: categorias,
                                                    producto: producto,
                                                    titulo: "Productos",
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
                                                    ruta: "productos"
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        };
    },
    // Guardar nuevo producto a bd
    guardar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var eIva = '';
                
            console.log(solicitud.body.exentoiva);

            if(solicitud.body.exentoiva != 'on')	{
                eIva = true;
            } else {
                eIva = false;
            }
                
            var data = {
                codigo: solicitud.body.codigo,
                unidad: solicitud.body.unidad,
                nombre: solicitud.body.nombre,
                descripcion: solicitud.body.descripcion,
                precioUnitario: solicitud.body.precioUnitario,
                exentoiva: eIva,
                iva: solicitud.body.iva,
                precioNeto: solicitud.body.precioNeto,
                proveedor: solicitud.body.proveedor,
                moneda: solicitud.body.moneda,
                fecha: FechaHora.obtenerfecha(),
                cantidad: solicitud.body.cantidad,
                minimo: solicitud.body.minimo,
                maximo: solicitud.body.maximo,
                orden: '',
                factura: '',
                almacen: solicitud.body.almacen,
                lugar: '',
                categoria: solicitud.body.categoria
            }

            console.log(data);

            var producto = new Productos(data);

            producto.save(function(error){
                if(error){
                    console.log(error);
                }else{
                    respuesta.redirect("/productos");
                }
            });
        };
    },
    actualizar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var eIva = '';
                
            if(solicitud.body.exentoiva != 'on')	{
                eIva = true;
            } else {
                eIva = false;
            }

            console.log("Valor en body: " + solicitud.body.exentoiva);
            console.log("Valor excento iva: " + eIva);

            var data = {
                codigo: solicitud.body.codigo,
                unidad: solicitud.body.unidad,
                nombre: solicitud.body.nombre,
                descripcion: solicitud.body.descripcion,
                precioUnitario: solicitud.body.precioUnitario,
                iva: solicitud.body.iva,
                exentoiva: eIva,
                precioNeto: solicitud.body.precioNeto,
                proveedor: solicitud.body.proveedor,
                moneda: solicitud.body.moneda,
                cantidad: solicitud.body.cantidad,
                minimo: solicitud.body.minimo,
                maximo: solicitud.body.maximo,
                almacen: solicitud.body.almacen,
                categoria: solicitud.body.categoria 
            };

            Productos.updateOne({"_id": solicitud.params.id}, data, function (error){
                if(error){
                    console.log(error);
                }else{
                    respuesta.redirect("/productos");
                }
            });
        };
    },
    eliminar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Productos.deleteOne({"_id": solicitud.params.id},function (error){
                if(error){
                    console.log(error);
                }else{
                    respuesta.redirect("/productos");
                }
            });
        };
    }
}