var mongoose = require('mongoose');
    Inventarios = mongoose.model('Inventarios');
    EntradaInventarios = mongoose.model('EntradaInventarios');
    SalidaInventarios = mongoose.model('SalidaInventarios');
    FechaHora = require('./fechahora');
    Productos = mongoose.model('Productos');
    Modulos = mongoose.model('Modulos'); 
    Estanques = mongoose.model('Estanques');
    OrdenSalida = mongoose.model('OrdenSalida');
    UnidadesNegocio = mongoose.model('UnidadesNegocio');
    zf = require('./zfill');
    chalk = require('chalk');

    // RUTA PARA REPORTES
    var file_path = './files/reports/inventarios/';

module.exports = {
    // Abrir inventario de granja
    inventarioGranja: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch   
            Inventarios.find( {"cantidad": {$gte:1}}, function(error, articulos){
                if(error){
                    consolo.log(error);
                } else {
                    Productos.find( {"cantidad": {$gte:1}}, function(error, productos){
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
                                                            val: "salidas",
                                                            name: "Salidas"
                                                        },
                                                        {
                                                            val: "entradas",
                                                            name: "Entradas"
                                                        },
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
            Usuarios.find( function(error, usuarios){
                if(error){
                    console.log(error);
                } else { 
                    Productos.find((error, productos) => {
                        if(error){
                            console.log(error);
                        } else {
                            Modulos.find({"codigo": {$ne: "NLL"}}, (error, modulos) => {
                                if(error){
                                    console.log(error);
                                } else {
                                    OrdenSalida.find( (error, ordSalida) => {
                                        if(error){
                                            console.log(error);
                                        } else {
                                            respuesta.render("Inventarios/salida_nueva", 
                                                {
                                                    codigo: '',
                                                    user: solicitud.session.user,
                                                    piscinas: {},
                                                    modulos: modulos,
                                                    articulos_salida: {},
                                                    numeroOrden: zf.zfill(ordSalida.length + 1, 6),
                                                    productos: productos,
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
                                    })
                                }
                            }).sort({ nombre : 1});
                        }
                    }).sort({ nombre : 1});
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
            // Agregar al find que busque por unidad para hacer generico estó.
            OrdenSalida.find( (error, ordenes_salida) => {
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Modulos.populate(ordenes_salida, { path: 'modulo'}, (error, ordenes_salida) => {
                        if(error) {
                            console.log(chalk.bgRed(error));
                        } else {
                            Estanques.populate( ordenes_salida, { path: 'piscina'}, (error, ordenes_salida) => {
                                if(error) {
                                    console.log(chalk.bgRed(error));
                                } else {
                                    Usuarios.find( (error, usuarios) => {
                                        if(error) {
                                            console.log(chalk.bgRed(error));
                                        } else {
                                            UnidadesNegocio.populate(ordenes_salida, {path: 'lugar_unidad'}, (error, ordenes_salida) => {
                                                if(error) {
                                                    console.log(chalk.bgRed(error));
                                                } else {
                                                    Usuarios.populate(ordenes_salida, {path: 'solicita'} ,(error, ordenes_salida) => {
                                                        if(error) {
                                                            console.log(chalk.bgRed(error));
                                                        } else {
                                                            respuesta.render('Inventarios/salidas', {
                                                                user: solicitud.session.user,
                                                                ordenes_salida: ordenes_salida,
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
                            });
                        }
                    });
                }
            });
        };
    },
    find: (solicitud, respuesta) => {
        Estanques.find({$and: [{'modulo': solicitud.params.modulo}, {'codigo': {$ne: 'NLL'}}]}, (error, piscinas) => {
            if(error){
                console.log(chalk.bgRed(error));
            } else {
                respuesta.json(piscinas);                           
            }
        }).sort({ codigo : 1});
    },
    registrarNuevaSalida: (solicitud, respuesta) =>{
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{  
            //console.log(solicitud.body);

            if(solicitud.body.modulo == ""){
                solicitud.body.modulo = null;
            }

            if(solicitud.body.piscina == ""){
                solicitud.body.piscina = null;
            }

            var ordenSalida = new OrdenSalida(solicitud.body)

            ordenSalida.save( (error, ordSalida)=>{
                if(error){
                    console.log(error);
                } else {
                    for (let i = 0; i < solicitud.body.articulos.length; i++) {
                        Productos.findOne({"_id": solicitud.body.articulos[i].articulo.id}, (error, producto) => {
                            if(error){
                                console.log(error);
                            } else {
                                //console.log(producto);
        
                                if(producto.cantidad == NaN){
                                    producto.cantidad = 0;
                                    cantidad = 0;
                                }
        
                                var data = {
                                    cantidad: parseFloat(producto.cantidad).toFixed(2) - parseFloat(parseFloat(solicitud.body.articulos[i].articulo.cantidad)),
                                    lugar: solicitud.body.lugar_almacen
                                }
        
                                Productos.updateOne({"_id": producto.id}, data, (error) => {
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else {
                                        if(i == solicitud.body.articulos.length - 1){
                                            respuesta.json(
                                                {
                                                    estatus: 'Guardada',
                                                    habilitarImpresion: true,
                                                    idOrden: ordSalida.id
                                                }
                                            );
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    },
    imprimirOrdenSalida: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{ 
            respuesta.json({
                url: generatePDF(solicitud.body),
                impreso: true,
                estatus: 'Generada'
            });

            /*OrdenSalida.updateOne({"id": solicitud.body.id}, (error)=>{
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.json({
                        impreso: true,
                        estatus: 'Generada'
                    });
                }
            });*/
        }
    },
    finalizar: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{ 
            var data = {
                estatus: 'Finalizada'
            }

            console.log(solicitud.body);

            OrdenSalida.updateOne({"_id": solicitud.body.id}, data, (error) => {
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.json({
                        finalizo: true,
                        estatus: 'Finalizada'
                    });
                }
            });
        }
    },
    verOrdenSalida: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{ 
            OrdenSalida.findOne({"_id": solicitud.params.id}, (error, orden_salida) => {
                if(error) {
                    console.log(chalk.bgRed(error));
                } else {
                    UnidadesNegocio.populate(orden_salida, {path: 'lugar_unidad'}, (error, orden_salida) => {
                        if(error) {
                            console.log(chalk.bgRed(error));
                        } else {
                            Usuarios.populate(orden_salida, {path: 'solicita'}, (error, orden_salida) => {
                                if(error) { 
                                    console.log(chalk.bgRed(error));
                                } else {
                                    Usuarios.find( (error, usuarios) => {
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Inventarios/ver_salida",{
                                                user: solicitud.session.user,
                                                usuarios: usuarios,
                                                orden_salida: orden_salida,
                                                titulo: "Orden Salida",
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
                                                ruta: "salidas"
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
    xls: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{ 
            OrdenSalida.find( (error, salidas) => {
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Modulos.populate(salidas, {path: 'modulo'}, (error, salidas) =>{
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Estanques.populate(salidas, {path: 'piscina'}, (error, salidas) => {
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    UnidadesNegocio.populate(salidas, {path: 'lugar_unidad'}, (error, salidas) => {
                                        if(error){
                                            console.log(chalk.bgRed(error));
                                        } else {
                                            Usuarios.populate(salidas, {path: 'solicita'}, (error, salidas) => {
                                                if(error){
                                                    console.log(chalk.bgRed(error));
                                                } else {
                                                    title =  'Reporte de Salidas';    
                                                    xls_name = 'reporte_inventarios_salidas.xlsx';     
                                                    excelReport(salidas, title, xls_name);
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
    }
}

function generatePDF(data){
    // CONSTRUIR PDF
    doc = new pdf({
        // Establecer tamaño de hoja
        size: [230,1200],
    });

    var file_path = './files/salidas/';
    var pdf_name = 'orden_salida_'+data.numero_orden+'.pdf'
    
    // Logo empresa
    doc.image('./public/imgs/logo llaos.jpg', 65, 5 ,{width: 100})
    
    // Nombre empresa y rfc
    doc.font('fonts/Roboto-Black.ttf')
    .fontSize(14)
    .text('ORDEN SALIDA', 67, 52, { width: 100 })
    .text('No. #' + data.numero_orden , 140, 70, {width: 100 })
    

    // Nombre formato, fecha y hora de creación
    doc.font('fonts/Roboto-Regular.ttf')
    .fontSize(11)
    .text("Fecha: "+ FechaHora.obtenerfecha() + " " + FechaHora.obtenerhora(), 5, 90, { align: 'left' , width: 200})
                                                                                                   
    // Encabezados tabla
    doc.lineWidth(25)
    doc.lineCap('butt')
    .fillColor("blue")
    .moveTo(0, 130)
    .lineTo(240, 130)
    .stroke()
    
    
    doc.fontSize(11)
    .fill('white')
    .text("Cant.", 5, 122, {align: 'center', width: 30})
    .text("Código", 40, 122,  {align: 'center', width: 60})
    .text("Desc", 100, 122, {align: 'center', width: 140})

    var y = 130;

    // Llenado de datos
    doc.fillColor('black')
    .fontSize(10)

    data.articulos.forEach( (articulo) =>{
        y += 10;

        doc.text(articulo.articulo.cantidad, 5, y, {align: 'left', width: 30, height: 20   })
        .text(articulo.articulo.codigo, 40, y,  {align: 'left', width: 60, height: 20 })
        .text(articulo.articulo.descripcion, 100, y, {align: 'left', width: 120, height: 20 })
    });

    // Final de artículos salida
     doc.lineWidth(2)
     doc.lineCap('butt')
     .moveTo(0, y + 15)
     .lineTo(240, y + 15)
     .stroke()

    // Nombre y firma del solicitante
    doc.lineWidth(1)
    doc.lineCap('butt')
    .moveTo(10, y + 55)
    .lineTo(220, y + 55)
    .stroke()
    .fontSize(11)

    //data.solicita,
    .text(data.solicita,5, y + 55, {align: 'center', width: 225})

    //  Consentimiento
     doc.font('fonts/Roboto-Regular.ttf')
     .fontSize(9)
     .text('* Doy mi consentimiento que todo lo solicitado en la orden fue requerido y me fue entregado. Para los efectos que esto puediera ocasionar', 5, y + 115, {align: 'center', width: 225})

    // Nota final
    .font('fonts/Roboto-Black.ttf')
    .text('Generado en automático por Sistema Llaos 2.0 - ' + new Date().getFullYear(), 5, y + 175, {align: 'center', width: 225})




    doc.pipe(fs.createWriteStream(file_path+pdf_name)).on('finish', function (error){
        if(error){
            console.log(error);
        } else {
            console.log('PDF closed');
        }
    });     
    
    // Finalize PDF file
    doc.end(); 

    return pdf_name;
}

function excelReport(data){
    var options = {
        filename:  file_path + '/' + xls_name ,
        useStyles: true,
        useSharedStrings: true
    };

    console.log(xls_name);

    var wb = new Excel.stream.xlsx.WorkbookWriter(options);

    wb.creator = 'Llaos Web 2.0';
    wb.created = new Date();

    var ws = wb.addWorksheet('Reporte');

    // TITULO
    ws.mergeCells('A1:L1');
    ws.getCell('E1').value = title;
    ws.getCell('E1').font = {
        name: "Roboto", 
        size: 12,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };   
    ws.getCell('E1').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'000000'}
    };
    ws.getCell('E1').alignment = { vertical: 'middle', horizontal: 'center' };
    //ws.getCell('E1').height = 25;

    // SUBTITULO
    ws.mergeCells('A2:L2');
    ws.getCell('E2').value = 'LLAOS ACUACULTURA S.A. DE C.V.';
    ws.getCell('E2').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('E2').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('E2').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'000000'},
    };  

    ws.getRow(5).values = ['Código', 'Descripción', 'Unidad', 'Cantidad', 'Almacen', 'Unidad Negocio', 'Salida No.', 'Solicitó', 'Área', 'Módulo', 'Piscina','Fecha'];

    /**** ESTILOS DE ENCABEZADOS */
        ws.getCell('A5').font = { name: "Roboto", size: 12, color: {argb: 'FFFFFF'}};
        ws.getCell('A5').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('A5').numFmt = '0.00';
        ws.getCell('A5').border = {
            bottom: {style:'thin', color: {argb:'#FFF'}},
            left: {style:'thin', color: {argb:'#FFF'}},
            top: {style:'thin', color: {argb:'#FFF'}},
            right: {style:'thin', color: {argb:'#FFF'}}
        };
        ws.getCell('A5').fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb:'000000'},
        };

        ws.getCell('B5').font = { name: "Roboto", size: 12, color: {argb: 'FFFFFF'}};
        ws.getCell('B5').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('B5').border = {
            bottom: {style:'thin', color: {argb:'#FFF'}},
            left: {style:'thin', color: {argb:'#FFF'}},
            top: {style:'thin', color: {argb:'#FFF'}},
            right: {style:'thin', color: {argb:'#FFF'}}
        };
        ws.getCell('B5').fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb:'000000'},
        };

        ws.getCell('C5').font = { name: "Roboto", size: 12, color: {argb: 'FFFFFF'}};
        ws.getCell('C5').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('C5').numFmt = '0.00';
        ws.getCell('C5').border = {
            bottom: {style:'thin', color: {argb:'#FFF'}},
            left: {style:'thin', color: {argb:'#FFF'}},
            top: {style:'thin', color: {argb:'#FFF'}},
            right: {style:'thin', color: {argb:'#FFF'}}
        };
        ws.getCell('C5').fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb:'000000'},
        };

        ws.getCell('D5').font = { name: "Roboto", size: 12, color: {argb: 'FFFFFF'}};
        ws.getCell('D5').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('D5').numFmt = '0.00';
        ws.getCell('D5').border = {
            bottom: {style:'thin', color: {argb:'#FFF'}},
            left: {style:'thin', color: {argb:'#FFF'}},
            top: {style:'thin', color: {argb:'#FFF'}},
            right: {style:'thin', color: {argb:'#FFF'}}
        };
        ws.getCell('D5').fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb:'000000'},
        };

        ws.getCell('E5').font = { name: "Roboto", size: 12, color: {argb: 'FFFFFF'}};
        ws.getCell('E5').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('E5').numFmt = '0.00';
        ws.getCell('E5').border = {
            bottom: {style:'thin', color: {argb:'#FFF'}},
            left: {style:'thin', color: {argb:'#FFF'}},
            top: {style:'thin', color: {argb:'#FFF'}},
            right: {style:'thin', color: {argb:'#FFF'}}
        };
        ws.getCell('E5').fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb:'000000'},
        };

        ws.getCell('F5').font = { name: "Roboto", size: 12, color: {argb: 'FFFFFF'}};
        ws.getCell('F5').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('F5').numFmt = '0.00';
        ws.getCell('F5').border = {
            bottom: {style:'thin', color: {argb:'#FFF'}},
            left: {style:'thin', color: {argb:'#FFF'}},
            top: {style:'thin', color: {argb:'#FFF'}},
            right: {style:'thin', color: {argb:'#FFF'}}
        };
        ws.getCell('F5').fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb:'000000'},
        };

        ws.getCell('G5').font = { name: "Roboto", size: 12, color: {argb: 'FFFFFF'}};
        ws.getCell('G5').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('G5').numFmt = '0.00';
        ws.getCell('G5').border = {
            bottom: {style:'thin', color: {argb:'#FFF'}},
            left: {style:'thin', color: {argb:'#FFF'}},
            top: {style:'thin', color: {argb:'#FFF'}},
            right: {style:'thin', color: {argb:'#FFF'}}
        };
        ws.getCell('G5').fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb:'000000'},
        };

        ws.getCell('H5').font = { name: "Roboto", size: 12, color: {argb: 'FFFFFF'}};
        ws.getCell('H5').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('H5').numFmt = '0.00';
        ws.getCell('H5').border = {
            bottom: {style:'thin', color: {argb:'#FFF'}},
            left: {style:'thin', color: {argb:'#FFF'}},
            top: {style:'thin', color: {argb:'#FFF'}},
            right: {style:'thin', color: {argb:'#FFF'}}
        };
        ws.getCell('H5').fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb:'000000'},
        };

        ws.getCell('I5').font = { name: "Roboto", size: 12, color: {argb: 'FFFFFF'}};
        ws.getCell('I5').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('I5').numFmt = '0.00';
        ws.getCell('I5').border = {
            bottom: {style:'thin', color: {argb:'#FFF'}},
            left: {style:'thin', color: {argb:'#FFF'}},
            top: {style:'thin', color: {argb:'#FFF'}},
            right: {style:'thin', color: {argb:'#FFF'}}
        };
        ws.getCell('I5').fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb:'000000'},
        };

        ws.getCell('J5').font = { name: "Roboto", size: 12, color: {argb: 'FFFFFF'}};
        ws.getCell('J5').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('J5').numFmt = '0.00';
        ws.getCell('J5').border = {
            bottom: {style:'thin', color: {argb:'#FFF'}},
            left: {style:'thin', color: {argb:'#FFF'}},
            top: {style:'thin', color: {argb:'#FFF'}},
            right: {style:'thin', color: {argb:'#FFF'}}
        };
        ws.getCell('J5').fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb:'000000'},
        };

        ws.getCell('K5').font = { name: "Roboto", size: 12, color: {argb: 'FFFFFF'}};
        ws.getCell('K5').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('K5').numFmt = '0.00';
        ws.getCell('K5').border = {
            bottom: {style:'thin', color: {argb:'#FFF'}},
            left: {style:'thin', color: {argb:'#FFF'}},
            top: {style:'thin', color: {argb:'#FFF'}},
            right: {style:'thin', color: {argb:'#FFF'}}
        };
        ws.getCell('K5').fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb:'000000'},
        };

        ws.getCell('L5').font = { name: "Roboto", size: 12, color: {argb: 'FFFFFF'}};
        ws.getCell('L5').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('L5').numFmt = '0.00';
        ws.getCell('L5').border = {
            bottom: {style:'thin', color: {argb:'#FFF'}},
            left: {style:'thin', color: {argb:'#FFF'}},
            top: {style:'thin', color: {argb:'#FFF'}},
            right: {style:'thin', color: {argb:'#FFF'}}
        };
        ws.getCell('L5').fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb:'000000'},
        };
    /*********************/

    ws.columns = [
        { key: 'codigo'},
        { key: 'descripcion'},
        { key: 'unidad'},
        { key: 'cantidad'},
        { key: 'almacen'},
        { key: 'unidad_neg'},
        { key: 'no_salida'},
        { key: 'solicito'},
        { key: 'area'},
        { key: 'modulo'},
        { key: 'piscina'},
        { key: 'fecha'},
    ]

    for(let i = 0; i <= data.length - 1; i++){
        for(let j = 0; j <= data[i].articulos.length -1; j++){
            ws.addRow(
                {   
                    codigo: data[i].articulos[j].articulo.codigo,
                    descripcion: data[i].articulos[j].articulo.descripcion,
                    unidad: data[i].articulos[j].articulo.unidad,
                    cantidad: parseFloat(data[i].articulos[j].articulo.cantidad).toFixed(2),
                    almacen: data[i].lugar_almacen,
                    unidad_neg: data[i].lugar_unidad.nombre,
                    no_salida: data[i].numero_orden,
                    solicito: data[i].solicita.nombre, 
                    area: data[i].area,
                    modulo: data[i].modulo != null ? data[i].modulo.nombre : "",
                    piscina: data[i].piscina != null ? data[i].piscina.codigo : "",
                    fecha: data[i].registro,
                }
            );
        } 
    }

    ws.autoFilter = {
        from: 'A5',
        to: 'L5',
    };

    wb.commit().then( function(){
        console.log("XLS terminado.")
        return xls_name;
    });
}