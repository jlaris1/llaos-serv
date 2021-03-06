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

                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Inventarios/inventario",
                                                {
                                                    user: solicitud.session.user,
                                                    articulos: articulos,
                                                    proveedores: proveedores,
                                                    productos: productos,
                                                    lugar: 'Granja',
                                                    titulo: "Inventarios",
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
                                                    ruta: "inventarios"
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

                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Inventarios/inventario",
                                                {
                                                    user: solicitud.session.user,
                                                    articulos: articulos,
                                                    proveedores: proveedores,
                                                    productos: productos,
                                                    lugar: 'Planta',
                                                    titulo: "Inventarios",
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
                                                    ruta: "inventarios"
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

                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Inventarios/inventario",
                                                {
                                                    user: solicitud.session.user,
                                                    articulos: articulos,
                                                    proveedores: proveedores,
                                                    productos: productos,
                                                    lugar: 'Oficina',
                                                    titulo: "Inventarios",
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
                                                    ruta: "inventarios"
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
    // Agregar nuevo artículo para almacen
    agregarArticuloAlmacen: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Usuarios.find( function(error, usuarios){
                if(error){
                    console.log(error);
                } else { 
                    respuesta.render("Inventarios/articulo",{
                        user: solicitud.session.user,
                        products: {},
                        titulo: "Inventarios",
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
                        ruta: "inventarios"
                    });
                }
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
                                Usuarios.find( function(error, usuarios){
                                    if(error){
                                        console.log(error);
                                    } else { 
                                        respuesta.render("Granja/Inventarios/articulo", {
                                            user: solicitud.session.user,
                                            busca: solicitud.body.buscar,
                                            criterio: solicitud.body.criterio,
                                            products: productos,
                                            proveedores: proveedores,
                                            titulo: "Inventarios",
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
                                            ruta: "inventarios"
                                        });
                                    }
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
                                Usuarios.find( function(error, usuarios){
                                    if(error){
                                        console.log(error);
                                    } else { 
                                        respuesta.render("Granja/Inventarios/articulo", {
                                            user: solicitud.session.user,
                                            busca: solicitud.body.buscar,
                                            criterio: solicitud.body.criterio,
                                            products: productos,
                                            proveedores: proveedores,
                                            titulo: "Inventarios",
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
                                            ruta: "inventarios"
                                        });
                                    }
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
                    Usuarios.find( function(error, usuarios){
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
                                    lugar: "", /*/**  Aquí será necesario hacer algo para los diferentes lugares: granja llaos, banamichi, planta, oficina*/
                                    titulo: "Inventarios",
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
                                    ruta: "inventarios"
                                }
                            );
                        }
                    });
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
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else { 
                                    respuesta.render("Inventarios/entrada",{
                                        codigo: '',
                                        user: solicitud.session.user,
                                        producto: producto,
                                        productos: {},
                                        proveedores: proveedores,
                                        lugar: solicitud.session.user.unidad_negocio,
                                        titulo: "Inventarios",
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
                                        ruta: "inventarios"
                                    });
                                }
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
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else { 
                            respuesta.render("Inventarios/salida_nueva", 
                                {
                                    codigo: '',
                                    user: solicitud.session.user,
                                    articulo: {},
                                    articulos: {},
                                    articulos_salida: {},
                                    proveedores: proveedores,
                                    titulo: "Inventarios",
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
                                    ruta: "inventarios"
                                }
                            );
                        }
                    });  
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
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else { 
                                    respuesta.render("Inventarios/salida", 
                                        {
                                            codigo: '',
                                            user: solicitud.session.user,
                                            producto: producto,
                                            productos: {},
                                            proveedores: proveedores,
                                            titulo: "Inventarios",
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
                                            ruta: "inventarios"
                                        }
                                    );
                                }
                            });
                        }
                    });
                }
            });
        };
    },
    //Buscar artículo
    buscarArticulo: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            if(solicitud.body.criterio == "codigo"){
                Productos.findOne( { "codigo": solicitud.body.codigo }, function(error, articulo){
                    if(error){
                        console.log(error);
                    } else {
                        Proveedores.find( function(error, proveedores){
                            if(error){
                                console.log(error);
                            } else {
                                if(solicitud.params.tipo == 1) {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Inventarios/entrada", 
                                                {
                                                    codigo: solicitud.body.codigo,
                                                    user: solicitud.session.user,
                                                    producto: articulo,
                                                    productos: {},
                                                    proveedores: proveedores,
                                                    lugar: solicitud.session.user.unidad_negocio,
                                                    titulo: "Inventarios",
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
                                                    ruta: "inventarios"
                                                }
                                            );
                                        }
                                    });
                                } else if(solicitud.params.tipo == 2) {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Inventarios/salida_nueva", 
                                                {
                                                    codigo: solicitud.body.codigo,
                                                    user: solicitud.session.user,
                                                    articulo: articulo,
                                                    articulos: {},
                                                    articulos_salida: {},
                                                    proveedores: proveedores,
                                                    lugar: solicitud.session.user.unidad_negocio.nombre,
                                                    titulo: "Inventarios",
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
                                                    ruta: "inventarios"
                                                }
                                            );
                                        }
                                    });
                                }	
                            }
                        });
                    }
                });
            } else if(solicitud.body.criterio == "nombre"){
                Productos.find( { "nombre": { '$regex': solicitud.body.codigo, $options: "i"}}, function(error, articulos){
                    if(error){
                        console.log(error);
                    } else {
                        if(tipo == 1){
                            Proveedores.find( function(error, proveedores){
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Inventarios/entrada", 
                                                {
                                                    codigo: solicitud.body.codigo,
                                                    user: solicitud.session.user,
                                                    producto: {},
                                                    productos: articulos,
                                                    proveedores: proveedores,
                                                    lugar: solicitud.session.user.unidad_negocio,
                                                    titulo: "Inventarios",
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
                                                    ruta: "inventarios"	
                                                }
                                            );
                                        }
                                    });
                                }
                            });
                        } else if(tipo == 2){
                            console.log(articulos);
                            Proveedores.find( function(error, proveedores){
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Inventarios/salida_nueva", 
                                                {
                                                    codigo: solicitud.body.codigo,
                                                    user: solicitud.session.user,
                                                    producto: {},
                                                    articulos: articulos,
                                                    articulo_salida: {},
                                                    proveedores: proveedores,
                                                    lugar: solicitud.session.user.unidad_negocio,
                                                    titulo: "Inventarios",
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
                                                    ruta: "inventarios"	
                                                }
                                            );
                                        }
                                    });
                                }
                            });
                        }
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
                                                                        Usuarios.find( function(error, usuarios){
                                                                            if(error){
                                                                                console.log(error);
                                                                            } else { 
                                                                                respuesta.render("Inventarios/entradas",
                                                                                    {
                                                                                        user: solicitud.session.user,
                                                                                        entradas: entradas,
                                                                                        lugar: solicitud.session.user.unidad_negocio,
                                                                                        titulo: "Inventarios",
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
                                                                                        ruta: "inventarios"
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
                                producto:solicitud.params.id_prod,
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
                                                    Usuarios.find( function(error, usuarios){
                                                        if(error){
                                                            console.log(error);
                                                        } else { 
                                                            respuesta.render("Inventarios/salidas",
                                                                {
                                                                    user: solicitud.session.user,
                                                                    salidas: salidas,
                                                                    lugar: solicitud.session.user.unidad_negocio,
                                                                    titulo: "Inventarios",
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
                                                                    ruta: "inventarios"
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
                    Productos.populate( entradas, {path: 'producto'} ,function(error, entradas){
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else { 
                                    respuesta.render("Inventarios/entradas",
                                        {
                                            user: solicitud.session.user,
                                            entradas: entradas,
                                            lugar: solicitud.session.user.unidad_negocio,
                                            titulo: "Inventarios",
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
                                            ruta: "inventarios"
                                        }
                                    );
                                }
                            });
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
                    Productos.populate( salidas, {path: 'producto'} ,function(error, salidas){
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else { 
                                    respuesta.render("Inventarios/salidas",
                                        {
                                            user: solicitud.session.user,
                                            salidas: salidas,
                                            lugar: solicitud.session.user.unidad_negocio,
                                            titulo: "Inventarios",
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
                                            ruta: "inventarios"
                                        }
                                    );
                                }
                            });
                        }
                    });
                }
            });
        };
    }
}