var mongoose = require('mongoose');
    Inventarios = mongoose.model('Inventarios');
    EntradaInventarios = mongoose.model('EntradaInventarios');
    SalidaInventarios = mongoose.model('SalidaInventarios');
    FechaHora = require('./fechahora');

module.exports = {
    // Abrir inventario de granja
    inventarioGranja: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch   
            Inventarios.find( function(error, articulos){
                if(error){
                    consolo.log(error);
                } else {
                    Productos.find( function(error, productos){
                        if(error){
                            console.log(error);
                        } else {
                            Proveedores.find( function(error, proveedores){
                                if(error){
                                    console.log(error);
                                } else {

                                    productos.forEach( function(prod){
                                        if(prod.moneda == undefined){
                                            prod.moneda = '';
                                            console.log(prod.moneda);
                                        }
        
                                        if(prod.cantidad == undefined){
                                            prod.cantidad = '0';
                                        }
        
                                        if(prod.orden == undefined){
                                            prod.orden = '';
                                        }
                                        
                                        if(prod.factura == undefined){
                                            prod.factura = '';
                                        }
        
                                        if(prod.maximo == undefined){
                                            prod.maximo = '0';
                                        }
        
                                        if(prod.minimo == undefined){
                                            prod.minimo = '0';
                                        }
        
                                        if(prod.almacen == undefined){
                                            prod.almacen = '';
                                        }
                                    });

                                    respuesta.render("Inventarios/inventario",
                                        {
                                            user: solicitud.session.user,
                                            articulos: articulos,
                                            proveedores: proveedores,
                                            productos: productos,
                                            lugar: 'Granja'
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
    inventarioPlanta: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch   
            Inventarios.find( function(error, articulos){
                if(error){
                    consolo.log(error);
                } else {
                    Productos.find({"lugar": 'Planta'}, function(error, productos){
                        if(error){
                            console.log(error);
                        } else {
                            Proveedores.find( function(error, proveedores){
                                if(error){
                                    console.log(error);
                                } else {

                                    productos.forEach( function(prod){
                                        if(prod.moneda == undefined){
                                            prod.moneda = '';
                                            console.log(prod.moneda);
                                        }
        
                                        if(prod.cantidad == undefined){
                                            prod.cantidad = '0';
                                        }
        
                                        if(prod.orden == undefined){
                                            prod.orden = '';
                                        }
                                        
                                        if(prod.factura == undefined){
                                            prod.factura = '';
                                        }
        
                                        if(prod.maximo == undefined){
                                            prod.maximo = '0';
                                        }
        
                                        if(prod.minimo == undefined){
                                            prod.minimo = '0';
                                        }
        
                                        if(prod.almacen == undefined){
                                            prod.almacen = '';
                                        }
                                    });

                                    respuesta.render("Inventarios/inventario",
                                        {
                                            user: solicitud.session.user,
                                            articulos: articulos,
                                            proveedores: proveedores,
                                            productos: productos,
                                            lugar: 'Planta'
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
    inventarioOficina: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch   
            Inventarios.find( function(error, articulos){
                if(error){
                    consolo.log(error);
                } else {
                    Productos.find({"lugar": 'Matriz'}, function(error, productos){
                        if(error){
                            console.log(error);
                        } else {
                            Proveedores.find( function(error, proveedores){
                                if(error){
                                    console.log(error);
                                } else {

                                    productos.forEach( function(prod){
                                        if(prod.moneda == undefined){
                                            prod.moneda = '';
                                            console.log(prod.moneda);
                                        }
        
                                        if(prod.cantidad == undefined){
                                            prod.cantidad = '0';
                                        }
        
                                        if(prod.orden == undefined){
                                            prod.orden = '';
                                        }
                                        
                                        if(prod.factura == undefined){
                                            prod.factura = '';
                                        }
        
                                        if(prod.maximo == undefined){
                                            prod.maximo = '0';
                                        }
        
                                        if(prod.minimo == undefined){
                                            prod.minimo = '0';
                                        }
        
                                        if(prod.almacen == undefined){
                                            prod.almacen = '';
                                        }
                                    });

                                    respuesta.render("Inventarios/inventario",
                                        {
                                            user: solicitud.session.user,
                                            articulos: articulos,
                                            proveedores: proveedores,
                                            productos: productos,
                                            lugar: 'Oficina'
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
    // Agregar nuevo artículo para almacen
    agregarArticuloAlmacen: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            respuesta.render("Inventarios/articulo",{
                user: solicitud.session.user,
                products: {}
            });
        };
    },
    // Buscar producto -- revisar si no se usará..
    buscarProducto: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            if(solicitud.body.criterio == "codigo"){
                Productos.find( { "codigo": solicitud.body.buscar}, function(error, productos){
                    if(error){
                        console.log(error);
                    } else {
                        Proveedores.find( function(error, proveedores){
                            if(error){
                                console.log(error);
                            } else {
                                respuesta.render("Granja/Inventarios/articulo", {
                                    user: solicitud.session.user,
                                    busca: solicitud.body.buscar,
                                    criterio: solicitud.body.criterio,
                                    products: productos,
                                    proveedores: proveedores,
                                });
                            }
                        });
                    }
                });
            } else if (solicitud.body.criterio == "nombre"){
                Productos.find( { "nombre": { '$regex': solicitud.body.buscar, $options: "i"}}, function(error, productos){
                    if(error){
                        console.log(erro0r);
                    } else {
                        Proveedores.find( function(error, proveedores){
                            if(error){
                                console.log(error);
                            } else {
                                respuesta.render("Granja/Inventarios/articulo", {
                                    user: solicitud.session.user,
                                    busca: solicitud.body.buscar,
                                    criterio: solicitud.body.criterio,
                                    products: productos,
                                    proveedores: proveedores
                                });
                            }
                        });
                    }
                });
            };
        };
    },
    // Abrir entrada de artículo
    abrirEntradaArticulo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Proveedores.find( function(error, proveedores){
                if(error){
                    console.log(error);
                } else {
                    respuesta.render("Inventarios/entrada", 
                        {
                            codigo: '',
                            user: solicitud.session.user,
                            producto: {},
                            productos: {},
                            proveedores: proveedores,
                            lugar: solicitud.session.user.unidad_negocio
                        }
                    );
                }
            });
        };
    },
    // Abrir entrada de artículo
    entradaArticulo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Productos.findById({"_id": solicitud.params.id}, function(error, producto){
                if(error){
                    console.log(error);
                } else {
                    Proveedores.find( function(error, proveedores){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render("Inventarios/entrada",{
                                codigo: '',
                                user: solicitud.session.user,
                                producto: producto,
                                productos: {},
                                proveedores: proveedores,
                                lugar: solicitud.session.user.unidad_negocio
                            });
                        }
                    });
                }
            });
        }
    },
    // Abrir salida de artículo
    abrirSalidaArticulo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Proveedores.find( function(error, proveedores){
                if(error){
                    console.log(error);
                } else {
                    respuesta.render("Inventarios/salida", 
                        {
                            codigo: '',
                            user: solicitud.session.user,
                            producto: {},
                            productos: {},
                            proveedores: proveedores
                        }
                    );
                }
            });
        };
    },
    // Abrir salida de artículo
    salidaArticulo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Productos.findById({"_id": solicitud.params.id}, function(error, producto){
                if(error){
                    console.log(error);
                } else {
                    Proveedores.find( function(error, proveedores){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render("Inventarios/salida", 
                                {
                                    codigo: '',
                                    user: solicitud.session.user,
                                    producto: producto,
                                    productos: {},
                                    proveedores: proveedores
                                }
                            );
                        }
                    });
                }
            });
        };
    },
    //Buscar artículo
    buscarArticulo: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            if(solicitud.body.criterio == "codigo"){
                Productos.findOne( { "codigo": solicitud.body.codigo }, function(error, producto){
                    if(error){
                        console.log(error);
                    } else {
                        Proveedores.find( function(error, proveedores){
                            if(error){
                                console.log(error);
                            } else {
                                if(solicitud.params.tipo == 1) {
                                    respuesta.render("Inventarios/entrada", 
                                    {
                                        codigo: solicitud.body.codigo,
                                        user: solicitud.session.user,
                                        producto: producto,
                                        productos: {},
                                        proveedores: proveedores,
                                        lugar: solicitud.session.user.unidad_negocio
                                    }
                                );
                                } else if(solicitud.params.tipo == 2) {
                                    respuesta.render("Inventarios/salida", 
                                    {
                                        codigo: solicitud.body.codigo,
                                        user: solicitud.session.user,
                                        producto: producto,
                                        productos: {},
                                        proveedores: proveedores,
                                        lugar: solicitud.session.user.unidad_negocio
                                    }
                                );
                                }	
                                
                            }
                        });
                    }
                });
            } else if(solicitud.body.criterio == "nombre"){
                Productos.find( { "nombre": { '$regex': solicitud.body.codigo, $options: "i"}}, function(error, productos){
                    if(error){
                        console.log(error);
                    } else {
                        Proveedores.find( function(error, proveedores){
                            if(error){
                                console.log(error);
                            } else {
                                respuesta.render("Inventarios/entrada", 
                                    {
                                        codigo: solicitud.body.codigo,
                                        user: solicitud.session.user,
                                        producto: {},
                                        productos: productos,
                                        proveedores: proveedores,
                                        lugar: solicitud.session.user.unidad_negocio	
                                    }
                                );
                            }
                        });
                    }
                });
            };
        };
    },
    // Registrar entrada
    registrarEntrada: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Productos.findById({"_id": solicitud.params.id_prod}, function(error, producto){
                if(error){
                    console.log(error);
                } else {

                    //console.log(solicitud.body.cantidad);

                    if(producto.cantidad == 'undefined' || producto.cantidad == 'NaN'){
                        producto.cantidad = 0;
                    }
                
                    if(solicitud.body.factura == 'undefined' || solicitud.body.factura == ''){
                        solicitud.body.factura = 'NO FACT';
                    }

                    var cant = parseFloat(solicitud.body.cantidad) + parseFloat(producto.cantidad);

                    var updProd = {
                        cantidad: cant,
                        almacen: solicitud.body.almacen,
                        orden: solicitud.body.orden,
                        factura: solicitud.body.factura,
                        lugar: solicitud.body.lugar
                    }

                    console.log(updProd);

                    Productos.updateOne({"_id": producto.id}, updProd, function(error, prod){
                        if(error){
                            console.log(error);
                        } else {
                            var updOrd = {
                                factura: solicitud.body.factura
                            }

                            Ordenes.findOne({"serie": solicitud.body.orden}, function(error, orden){
                                if(error){
                                    console.log(error);
                                } else {
                                    if(orden != null || orden != undefined){
                                        Ordenes.updateOne({"_id": orden.id}, updOrd,function(error, ord){
                                            if(error){
                                                //console.log(error);

                                            } else {
        
                                                var data = {
                                                    producto: producto.id,
                                                    cantidad: cant,
                                                    orden: orden.serie,
                                                    factura: solicitud.body.factura,
                                                    fecha: FechaHora.obtenerfecha(),
                                                    hora: FechaHora.obtenerhora(),
                                                    usuario: solicitud.session.user.nombre,
                                                    lugar: solicitud.body.lugar,
                                                    almacen: solicitud.body.almacen
                                                }
        
                                                var entrada = new EntradaInventarios(data);
        
                                                entrada.save( function(error, entr){
                                                    if(error){
                                                        console.log(error);
                                                    } else {
                                                        EntradaInventarios.find( {"lugar": solicitud.session.user.unidad_negocio}, function(error, entradas){
                                                            if(error){
                                                                console.log(error);
                                                            } else {
                                                                Productos.find( function(error, productos){
                                                                    if(error){
                                                                        console.log(error);
                                                                    } else {
                                                                        for(var i=0; i < entradas.length; i ++){
                                                                            productos.forEach( function(producto){
                                                                                if(entradas[i].producto == producto.id){
                                                                                    entradas[i].producto = producto.nombre;
                                                                                }
                                                                            });					
                                                                        }
                                            
                                                                        respuesta.render("Inventarios/entradas",
                                                                            {
                                                                                user: solicitud.session.user,
                                                                                entradas: entradas,
                                                                                lugar: solicitud.session.user.unidad_negocio
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
                                    } else {
                                        console.log("No existe orden de compra");
                                    }

                                }
                            });
                        }
                    });
                }
            });
        };
    },
    // Registrar salida
    registrarSalida: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Productos.findById({"_id": solicitud.params.id_prod}, function(error, producto){
                if(error){
                    console.log(error);
                } else {

                    var cant = parseFloat(producto.cantidad) - parseFloat(solicitud.body.cantidad);

                    var updProd = {
                        cantidad: cant
                    }

                    Productos.updateOne({"_id": producto.id}, updProd, function(error, prod){
                        if(error){
                            console.log(error);
                        } else {
                            var data = {
                                producto: producto.id,
                                cantidad: solicitud.body.cantidad,
                                solicitante: solicitud.body.solicitante,
                                area: solicitud.body.area,
                                modulo: solicitud.body.modulo,
                                Estanque: solicitud.body.estanque,
                                usuario: solicitud.session.user.nombre,
                                fecha: FechaHora.obtenerfecha(),
                                hora: FechaHora.obtenerhora(),
                                lugar: solicitud.body.lugar
                            }

                            var salida = new SalidaInventarios(data);

                            salida.save( function(error, sali){
                                if(error){
                                    console.log(error);
                                } else {
                                    SalidaInventarios.find( {"lugar": solicitud.session.user.unidad_negocio}, function(error, salidas){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            Productos.find( function(error, productos){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    for(var i=0; i < salidas.length; i ++){
                                                        productos.forEach( function(producto){
                                                            if(salidas[i].producto == producto.id){
                                                                salidas[i].producto = producto.nombre;
                                                            }
                                                        });					
                                                    }
                        
                                                    respuesta.render("Inventarios/salidas",
                                                        {
                                                            user: solicitud.session.user,
                                                            salidas: salidas,
                                                            lugar: solicitud.session.user.unidad_negocio
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
            });
        };
    },
    abrirEntradas: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            EntradaInventarios.find( {"lugar": solicitud.session.user.unidad_negocio}, function(error, entradas){
                if(error){
                    console.log(error);
                } else {
                    Productos.find( function(error, productos){
                        if(error){
                            console.log(error);
                        } else {
                            for(var i=0; i < entradas.length; i ++){
                                productos.forEach( function(producto){
                                    if(entradas[i].producto == producto.id){
                                        entradas[i].producto = producto.nombre;
                                    }
                                });					
                            }

                            respuesta.render("Inventarios/entradas",
                                {
                                    user: solicitud.session.user,
                                    entradas: entradas,
                                    lugar: solicitud.session.user.unidad_negocio
                                }
                            );
                        }
                    });
                    
                    
                }
            });
        };
    },
    abrirSalidas: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            SalidaInventarios.find( {"lugar": solicitud.session.user.unidad_negocio}, function(error, salidas){
                if(error){
                    console.log(error);
                } else {
                    Productos.find( function(error, productos){
                        if(error){
                            console.log(error);
                        } else {
                            for(var i=0; i < salidas.length; i ++){
                                productos.forEach( function(producto){
                                    if(salidas[i].producto == producto.id){
                                        salidas[i].producto = producto.nombre;
                                    }
                                });					
                            }

                            respuesta.render("Inventarios/salidas",
                                {
                                    user: solicitud.session.user,
                                    salidas: salidas,
                                    lugar: solicitud.session.user.unidad_negocio
                                }
                            );
                        }
                    });
                }
            });
        };
    }
}