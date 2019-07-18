var mongoose = require('mongoose');
    ObjectId = mongoose.Schema.ObjectId;
    Ordenes = mongoose.model('Ordenes');
    OrdenesOld = mongoose.model('OrdenesOld');
    ArticulosOrdenes = mongoose.model('ArticulosOrdenes');
    ArticulosEnRuta = mongoose.model('ArticulosRuta');
    Proveedores = mongoose.model('Proveedores');
    Productos = mongoose.model('Productos');
    OrdenesRuta = mongoose.model('OrdenRuta');
    FechaHora = require('./fechahora');
    fmon = require('./formatmoney');
    zf = require('./zfill');
    nodemailer = require('nodemailer');
	pdf = require('pdfkit');
	fs = require('fs');
    fileUpload = require('express-fileupload');
    
    // Variables de conexión para envio de correo
	var smtpTransport = nodemailer.createTransport({
		host: 'mail.llaos.com',
		port: 465,
		secure: true,
		auth: {
			user: 'sistema@llaos.com',
			pass: '@Llaos2018'
		},
		tls: {
			rejectUnauthorized: false
		}
	});

module.exports = {
    // Ver todas las ordenes
    todas: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Ordenes.find( function(error, ordenes){
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
                                    respuesta.render("Compras/ordenes/ordenes",
                                        {
                                            user: solicitud.session.user,
                                            orders: ordenes,
                                            proveedores: proveedores,
                                            titulo: "Órdenes",
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
                                            ruta: "ordenes"
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
    olds: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            OrdenesOld.find( function(error, ordenes){
                if(error){
                    console.log(error);
                } else {
                    console.log(ordenes.length);
                    
                    Proveedores.find( function(error, proveedores){
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else {
                                    respuesta.render("Compras/ordenes/ordenesold",
                                        {
                                            user: solicitud.session.user,
                                            orders: ordenes,
                                            proveedores: proveedores,
                                            titulo: "Órdenes",
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
                                            ruta: "ordenes"
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
    // Nueva Orden de compra
    nueva: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Proveedores.find(function(error, proveedores){
                if(error){
                    console.log(error);
                } else {
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else { 
                            respuesta.render("Compras/ordenes/orden", {
                                user: solicitud.session.user,
                                busca: '',
                                criterio: '',
                                products: {},
                                articulos: {},
                                orden: '',
                                proveedores: proveedores,
                                proveedor: '',
                                serie: 'S-00000',
                                tipoCambio: '00.00',
                                comentario: '',
                                titulo: "Órdenes",
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
                                ruta: "ordenes"
                            });
                        }
                    });
                }
            }).sort({ nombreEmpresa : 1});
        };
    },
    // Buscar productos por criterio de búsqueda
    buscar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            if(solicitud.body.codigo === 'undefined' || solicitud.body.codigo == null || solicitud.body.codigo == '') {
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
                                            respuesta.render("Compras/ordenes/orden", {
                                                user: solicitud.session.user,
                                                busca: solicitud.body.buscar,
                                                criterio: solicitud.body.criterio,
                                                products: productos,
                                                proveedores: proveedores,
                                                articulos: {},
                                                orden: undefined,
                                                proveedor: solicitud.body.prov,
                                                serie: 'S-00000',
                                                req: {
                                                    uso: solicitud.body.uso
                                                },
                                                tipoCambio: solicitud.body.tCam,
                                                comentario: solicitud.body.comen,
                                                incluyeIVA: solicitud.body.iIVA,
                                                titulo: "Órdenes",
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
                                                ruta: "ordenes"
                                            });
                                        }
                                    });
                                }
                            }).sort({ nombreEmpresa : 1});
                        }
                    });
                } else if(solicitud.body.criterio == "nombre") {
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
                                            respuesta.render("Compras/ordenes/orden", {
                                                user: solicitud.session.user,
                                                busca: solicitud.body.buscar,
                                                criterio: solicitud.body.criterio,
                                                products: productos,
                                                proveedores: proveedores,
                                                articulos: {},
                                                orden: undefined,
                                                proveedor: solicitud.body.prov,
                                                serie: 'S-00000',
                                                tipoCambio: solicitud.body.tCam,
                                                comentario: solicitud.body.comen,
                                                incluyeIVA: solicitud.body.iIVA,
                                                titulo: "Órdenes",
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
                                                ruta: "ordenes"
                                            });
                                        }
                                    });
                                }
                            }).sort({ nombreEmpresa : 1});
                        }
                    });
                }
            } else {
                if(solicitud.body.criterio == "codigo"){
                    Productos.find( { "codigo": solicitud.body.buscar}, function(error, productos){
                        if(error){
                            console.log(error);
                        } else {
                            Proveedores.find( function(error, proveedores){
                                if(error){
                                    console.log(error);
                                } else {
                                    ArticulosOrdenes.find({"orden": solicitud.body.codigo}, function(error, articulos){
                                        if(error){
                                            console.log(error);
                                        }else{
                                            Ordenes.findById({"_id": solicitud.body.codigo}, function(error, orden){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    if(solicitud.params.tipo == 1) {
                                                        Usuarios.find( function(error, usuarios){
                                                            if(error){
                                                                console.log(error);
                                                            } else { 
                                                                respuesta.render("Compras/ordenes/orden", {
                                                                    user: solicitud.session.user,
                                                                    busca: solicitud.body.buscar,
                                                                    criterio: solicitud.body.criterio,
                                                                    products: productos,
                                                                    proveedores: proveedores,
                                                                    articulos: articulos,
                                                                    orden: orden.id,
                                                                    proveedores: proveedores,
                                                                    proveedor: orden.proveedor,
                                                                    serie: orden.serie,
                                                                    articulo: {},
                                                                    comentario: orden.comentarios,
                                                                    estatus: orden.estatus,
                                                                    tipoCambio: orden.tipoCambio,
                                                                    incluyeIVA: solicitud.body.iIVA,
                                                                    titulo: "Órdenes",
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
                                                                    ruta: "ordenes"
                                                                });
                                                            }
                                                        });
                                                    } else if(solicitud.params.tipo == 2) {
                                                        Usuarios.find( function(error, usuarios){
                                                            if(error){
                                                                console.log(error);
                                                            } else { 
                                                                respuesta.render("Compras/ordenes/editar", {
                                                                    user: solicitud.session.user,
                                                                    busca: solicitud.body.buscar,
                                                                    criterio: solicitud.body.criterio,
                                                                    products: productos,
                                                                    proveedores: proveedores,
                                                                    articulos: articulos,
                                                                    orden: orden.id,
                                                                    proveedores: proveedores,
                                                                    proveedor: orden.proveedor,
                                                                    serie: orden.serie,
                                                                    articulo: {
                                                                        cantidad: 1.00,
                                                                        requisicion: 'REQ00000'
                                                                    },
                                                                    comentario: orden.comentarios,
                                                                    estatus: orden.estatus,
                                                                    tipoCambio: orden.tipoCambio,
                                                                    incluyeIVA: solicitud.body.iIVA,
                                                                    titulo: "Órdenes",
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
                                                                    ruta: "ordenes"
                                                                });
                                                            }
                                                        });
                                                    }	
                                                }
                                            });
                                        }
                                    });
                                }
                            }).sort({ nombreEmpresa : 1});
                        }
                    });
                } else if(solicitud.body.criterio == "nombre") {
                    Productos.find( { "nombre": { '$regex': solicitud.body.buscar, $options: "i"}}, function(error, productos){
                        if(error){
                            console.log(error);
                        } else {
                            Proveedores.find( function(error, proveedores){
                                if(error){
                                    console.log(error);
                                } else {
                                    ArticulosOrdenes.find({"orden": solicitud.body.codigo}, function(error, articulos){
                                        if(error){
                                            console.log(error);
                                        }else{
                                            Ordenes.findById({"_id": solicitud.body.codigo}, function(error, orden){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    if(solicitud.params.tipo == 1) {
                                                        Usuarios.find( function(error, usuarios){
                                                            if(error){
                                                                console.log(error);
                                                            } else { 
                                                                respuesta.render("Compras/ordenes/orden", {
                                                                    user: solicitud.session.user,
                                                                    busca: solicitud.body.buscar,
                                                                    criterio: solicitud.body.criterio,
                                                                    products: productos,
                                                                    proveedores: proveedores,
                                                                    articulos: articulos,
                                                                    orden: orden.id,
                                                                    proveedores: proveedores,
                                                                    proveedor: orden.proveedor,
                                                                    serie: orden.serie,
                                                                    articulo: {},
                                                                    comentario: orden.comentarios,
                                                                    estatus: orden.estatus,
                                                                    tipoCambio: orden.tipoCambio,
                                                                    incluyeIVA: solicitud.body.iIVA,
                                                                    titulo: "Órdenes",
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
                                                                    ruta: "ordenes"
                                                                });
                                                            }
                                                        });
                                                    } else if(solicitud.params.tipo == 2) {
                                                        Usuarios.find( function(error, usuarios){
                                                            if(error){
                                                                console.log(error);
                                                            } else { 
                                                                respuesta.render("Compras/ordenes/editar", {
                                                                    user: solicitud.session.user,
                                                                    busca: solicitud.body.buscar,
                                                                    criterio: solicitud.body.criterio,
                                                                    products: productos,
                                                                    proveedores: proveedores,
                                                                    articulos: articulos,
                                                                    orden: orden.id,
                                                                    proveedores: proveedores,
                                                                    proveedor: orden.proveedor,
                                                                    serie: orden.serie,
                                                                    articulo: {
                                                                        cantidad: 1.00,
                                                                        requisicion: 'REQ00000'
                                                                    },
                                                                    comentario: orden.comentarios,
                                                                    estatus: orden.estatus,
                                                                    tipoCambio: orden.tipoCambio,
                                                                    incluyeIVA: solicitud.body.iIVA,
                                                                    titulo: "Órdenes",
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
                                                                    ruta: "ordenes"
                                                                });
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            }).sort({ nombreEmpresa : 1});
                        }
                    });
                }
            };
        };
    },
    // Agregar producto a artículo en orden de compra
    agregarArticuloOrden: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var existe,
                subtotal = 0.000,
                iva = 0.000,
                total = 0.000;

            //console.log(solicitud.params.id_orden);
            var incluyeIVA = '';

            if (solicitud.body.incluyeIVA == 'on'){
                incluyeIVA = true;
            } else {
                incluyeIVA = false;
            }    

            // Orden nueva
            if(solicitud.params.id_orden === 'undefined' || solicitud.params.id_orden == null){
                console.log(" Nueva orden");
                var serie_orden;

                Ordenes.find( function(error, orders){
                    if(error){
                        console.log(error);
                    } else {
                        if(solicitud.session.user.numero_nomina == 304) {
                            serie_orden = "M-" + zf.zfill(orders.length + 1, 5);
                        } else if(solicitud.session.user.numero_nomina == 305){
                            serie_orden = "I-" + zf.zfill(orders.length + 1, 5);
                        } else if(solicitud.session.user.permisos == 'developer'){
                            serie_orden = "D-" + zf.zfill(orders.length + 1, 5);
                        }    

                        var dataOrd = {
                            proveedor: solicitud.body.proveedor,
                            fecha: new Date(),
                            hora: FechaHora.obtenerhora(),
                            subtotal: '0.000',
                            iva: '0.000',
                            total: '0.000',
                            serie: serie_orden,
                            estatus: 'Nueva',
                            comentarios: solicitud.body.comentario,
                            tipoCambio: solicitud.body.tipoCambio,
                            incluyeIVA: incluyeIVA
                        }
        
                        console.log(dataOrd);

                        var orden = new Ordenes(dataOrd);
        
                        orden.save( function(error, ord){
                            if(error){
                                console.log(error);
                            } else {
                                Productos.findById({"_id": solicitud.params.id}, function(error, producto){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        ArticulosOrdenes.findOne({ $and: [ {"orden": ord.id},{"codigo": producto.codigo} ]}, function(error, arti){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                if(arti != null){
                                                    var updCant = {
                                                        cantidad: parseFloat(parseFloat(arti.cantidad) + parseFloat(solicitud.body.cantidad)).toFixed(2)
                                                    }

                                                    ArticulosOrdenes.updateOne({"_id": arti.id}, updCant, function(error){
                                                        if(error){
                                                            console.log(error);
                                                        } else {
                                                            ArticulosOrdenes.find({"orden": ord.id}, function(error, artOrd){
                                                                artOrd.forEach( function(art) {
                                                                    subtotal = parseFloat(subtotal) + parseFloat(art.precio_unitario);
                                                                    iva = parseFloat(iva) + parseFloat(art.iva);
                                                                    total = parseFloat(total) + parseFloat(art.importe);
                                                                }); 
                                                            
                                                                var dataUpd = {
                                                                    subtotal: subtotal.toFixed(3),
                                                                    iva: iva.toFixed(3),
                                                                    total: total.toFixed(3)
                                                                }
                    
                                                                Ordenes.updateOne({"_id": ord.id}, dataUpd, function(error){
                                                                    if(error){
                                                                        console.log(error);
                                                                    }else{
                                                                        ArticulosOrdenes.find({"orden": ord.id}, function(error, articulos){
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
                                                                                                respuesta.render("Compras/ordenes/orden", {
                                                                                                    user: solicitud.session.user,
                                                                                                    busca: '',
                                                                                                    criterio: '',
                                                                                                    products: {},
                                                                                                    orden: ord.id,
                                                                                                    articulos: articulos,
                                                                                                    subtotal: subtotal.toFixed(3),
                                                                                                    iva: iva.toFixed(3),
                                                                                                    total: total.toFixed(3),
                                                                                                    proveedores: proveedores,
                                                                                                    proveedor: solicitud.body.proveedor,
                                                                                                    comentario: solicitud.body.comentario,
                                                                                                    moneda: producto.moneda,
                                                                                                    tipoCambio: solicitud.body.tipoCambio,
                                                                                                    incluyeIVA: incluyeIVA,
                                                                                                    titulo: "Órdenes",
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
                                                                                                    ruta: "ordenes"
                                                                                                });
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }).sort({ nombreEmpresa : 1});
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            });	
                                                        }
                                                    })
                                                } else {

                                                    var importe = 0.000,
                                                        ivaArt = 0.000,
                                                        pUnitario = 0.000;
                                                    
                                                    pUnitario = parseFloat(parseFloat(producto.precioUnitario) * parseFloat(solicitud.body.cantidad))
                                                    importe =  parseFloat(parseFloat(producto.precioNeto) * parseFloat(solicitud.body.cantidad))
                                                    ivaArt = parseFloat(parseFloat(producto.iva) * parseFloat(solicitud.body.cantidad));

                                                    var dataO = {
                                                        cantidad: parseFloat(solicitud.body.cantidad).toFixed(2),
                                                        unidad: producto.unidad,
                                                        codigo: producto.codigo,
                                                        producto: producto.nombre,
                                                        descripcion: producto.descripcion,
                                                        precio_unitario: pUnitario.toFixed(3),
                                                        importe: importe.toFixed(3),
                                                        iva: ivaArt.toFixed(3),
                                                        orden: ord.id,
                                                        requisicion: solicitud.body.codigoRequi,
                                                        moneda: producto.moneda
                                                    }		
                                        
                                                    var articuloOrden = new ArticulosOrdenes(dataO);
                                            
                                                    console.log(dataO);

                                                    articuloOrden.save( function(error){
                                                        if(error){
                                                            console.log(error);
                                                        }else{
                                                            ArticulosOrdenes.find({"orden": ord.id}, function(error, artOrd){
                                                                artOrd.forEach( function(art) {
                                                                    subtotal = parseFloat(subtotal) + parseFloat(art.precio_unitario);
                                                                    iva = parseFloat(iva) + parseFloat(art.iva);
                                                                    total = parseFloat(total) + parseFloat(art.importe);
                                                                }); 
                                                            
                                                                var dataUpd = {
                                                                    subtotal: subtotal.toFixed(3),
                                                                    iva: (parseFloat(subtotal) * .16).toFixed(3) ,
                                                                    total: (parseFloat(subtotal) +  (parseFloat(subtotal) * .16)).toFixed(3)
                                                                }

                                                                console.log(dataUpd);
                    
                                                                Ordenes.updateOne({"_id": ord.id}, dataUpd, function(error){
                                                                    if(error){
                                                                        console.log(error);
                                                                    }else{
                                                                        ArticulosOrdenes.find({"orden": ord.id}, function(error, articulos){
                                                                            if(error){
                                                                                console.log(error);
                                                                            } else {
                                                                                Proveedores.find( function(error, proveedores){
                                                                                    if(error){
                                                                                        console.log(error);
                                                                                    } else {
                                                                                        Ordenes.findById({"_id": ord.id}, function(error, orden){
                                                                                            if(error){
                                                                                                console.log(error);
                                                                                            } else {
                                                                                                Usuarios.find( function(error, usuarios){
                                                                                                    if(error){
                                                                                                        console.log(error);
                                                                                                    } else { 
                                                                                                        respuesta.render("Compras/ordenes/orden", {
                                                                                                            user: solicitud.session.user,
                                                                                                            busca: '',
                                                                                                            criterio: '',
                                                                                                            products: {},
                                                                                                            orden: ord.id,
                                                                                                            articulos: articulos,
                                                                                                            subtotal: subtotal.toFixed(3),
                                                                                                            iva: dataUpd.iva,
                                                                                                            total: dataUpd.total,
                                                                                                            proveedores: proveedores,
                                                                                                            proveedor: solicitud.body.proveedor,
                                                                                                            comentario: solicitud.body.comentario,
                                                                                                            articulo: {},
                                                                                                            estatus: "Nueva",
                                                                                                            serie: serie_orden,
                                                                                                            moneda: producto.moneda,
                                                                                                            tipoCambio: solicitud.body.tipoCambio,
                                                                                                            incluyeIVA: ord.incluyeIVA,
                                                                                                            titulo: "Órdenes",
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
                                                                                                            ruta: "ordenes"
                                                                                                        });
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        })
                                                                                        
                                                                                    }
                                                                                }).sort({ nombreEmpresa : 1});
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            });	
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                console.log(" Existe orden");
                Productos.findById({"_id": solicitud.params.id}, function(error, producto){
                    if(error){
                        console.log(error);
                    } else {					
                        ArticulosOrdenes.findOne({ $and: [ {"orden": solicitud.params.id_orden},{"codigo": producto.codigo} ]}, function(error, arti){
                            if(error){
                                console.log(error);
                            } else {
                                
                                if(arti != null){

                                    var importe = 0.000,
                                        ivaArt = 0.000,
                                        pUnitario = 0.000;
                                    
                                    pUnitario = parseFloat(parseFloat(producto.precioUnitario) * parseFloat(parseFloat(arti.cantidad ) + parseFloat(solicitud.body.cantidad)));
                                    importe =  parseFloat(parseFloat(producto.precioNeto) * parseFloat(parseFloat(arti.cantidad ) + parseFloat(solicitud.body.cantidad)));
                                    ivaArt = parseFloat(parseFloat(producto.iva) * parseFloat(parseFloat(arti.cantidad ) + parseFloat(solicitud.body.cantidad)));

                                    var updCant = {
                                        cantidad: parseFloat(parseFloat(arti.cantidad) + parseFloat(solicitud.body.cantidad)).toFixed(2),
                                        precio_unitario: pUnitario.toFixed(3),
                                        importe: importe.toFixed(3),
                                        iva: iva.toFixed(3),
                                        tipoCambio: solicitud.body.tipoCambio,
                                        comentario: solicitud.body.comentario
                                    }

                                    ArticulosOrdenes.updateOne({"_id": arti.id}, updCant, function(error){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            ArticulosOrdenes.find({"orden": solicitud.params.id_orden}, function(error, artOrd){
                                                artOrd.forEach( function(art) {
                                                    subtotal = parseFloat(subtotal) + parseFloat(art.precio_unitario);
                                                    iva = parseFloat(iva) + parseFloat(art.iva);
                                                    total = parseFloat(total) + parseFloat(art.importe);
                                                }); 						
            
                                                var dataOrdUpd = {
                                                    subtotal: subtotal.toFixed(3),
                                                    iva: (parseFloat(subtotal) * .16).toFixed(3) ,
                                                    total: (parseFloat(subtotal) +  (parseFloat(subtotal) * .16)).toFixed(3)
                                                }
                                               
                                                console.log(dataOrdUpd);

                                                Ordenes.updateOne({"_id": solicitud.params.id_orden}, dataOrdUpd, function(error){
                                                    if(error){
                                                        console.log(error);
                                                    }else{
                                                        ArticulosOrdenes.find({"orden": solicitud.params.id_orden}, function(error, articulos){
                                                            if(error){
                                                                console.log(error);
                                                            } else {
                                                                Proveedores.find( function(error, proveedores){
                                                                    if(error){
                                                                        console.log(error);
                                                                    } else {
                                                                        Ordenes.findById({"_id": solicitud.params.id_orden}, function(error, orden){
                                                                            if(error){
                                                                                console.log(error);
                                                                            } else {
                                                                                Usuarios.find( function(error, usuarios){
                                                                                    if(error){
                                                                                        console.log(error);
                                                                                    } else { 
                                                                                        respuesta.render("Compras/ordenes/orden", {
                                                                                            user: solicitud.session.user,
                                                                                            busca: '',
                                                                                            criterio: '',
                                                                                            products: {},
                                                                                            orden: solicitud.params.id_orden,
                                                                                            articulos: articulos,
                                                                                            subtotal: parseFloat(orden.subtotal).toFixed(3),
                                                                                            iva: parseFloat(orden.iva).toFixed(3),
                                                                                            total: parseFloat(orden.total).toFixed(3),
                                                                                            proveedores: proveedores,
                                                                                            proveedor: solicitud.body.proveedor,
                                                                                            comentario: solicitud.body.comentario,
                                                                                            articulo: {},
                                                                                            estatus: orden.estatus,
                                                                                            serie: orden.serie,
                                                                                            moneda: producto.moneda,
                                                                                            tipoCambio: solicitud.body.tipoCambio,
                                                                                            incluyeIVA: orden.incluyeIVA,
                                                                                            titulo: "Órdenes",
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
                                                                                            ruta: "ordenes"
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                        })
                                                                    }
                                                                }).sort({ nombreEmpresa : 1});
                                                            }
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    });
                                } else {
                                    var importe = 0.000,
                                        ivaArt = 0.000,
                                        pUnitario = 0.000;
                                    
                                    pUnitario = parseFloat(parseFloat(producto.precioUnitario) * parseFloat(solicitud.body.cantidad));
                                    importe =  parseFloat(parseFloat(producto.precioNeto) * parseFloat(solicitud.body.cantidad));
                                    ivaArt = parseFloat(parseFloat(producto.iva) * parseFloat(solicitud.body.cantidad));


                                    var data = {
                                        cantidad: solicitud.body.cantidad,
                                        unidad: producto.unidad,
                                        codigo: producto.codigo,
                                        producto: producto.nombre,
                                        descripcion: producto.descripcion,
                                        precio_unitario: pUnitario.toFixed(3),
                                        importe: importe.toFixed(3),
                                        iva: ivaArt.toFixed(3),
                                        orden: solicitud.params.id_orden,
                                        requisicion: solicitud.body.codigoRequi,
                                        moneda: producto.moneda
                                    }		
                        
                                    var articuloOrden = new ArticulosOrdenes(data);
                            
                                    articuloOrden.save( function(error){
                                        if(error){
                                            console.log(error);
                                        }else{
                                            ArticulosOrdenes.find({"orden": solicitud.params.id_orden}, function(error, artOrd){
                                                artOrd.forEach( function(art) {
                                                    subtotal = parseFloat(subtotal) + parseFloat(art.precio_unitario);
                                                    iva = parseFloat(iva) +parseFloat(art.iva);
                                                    total = parseFloat(total) + parseFloat(art.importe);
                                                }); 						
                                                
                                                if(parseFloat(producto.iva) == 0){
                                                    var ivaExcento = parseFloat(0).toFixed(3);

                                                    var dataOrdUpd = {
                                                        subtotal: subtotal.toFixed(3),
                                                        iva: ivaExcento,
                                                        total: (parseFloat(subtotal) +  (parseFloat(subtotal) * .16)).toFixed(3)
                                                    }
                                                } else {
                                                    var dataOrdUpd = {
                                                        subtotal: subtotal.toFixed(3),
                                                        iva: (parseFloat(subtotal) * .16).toFixed(3) ,
                                                        total: (parseFloat(subtotal) +  (parseFloat(subtotal) * .16)).toFixed(3)
                                                    }
                                                }

                                                console.log(dataOrdUpd);
                                
                                                Ordenes.updateOne({"_id": solicitud.params.id_orden}, dataOrdUpd, function(error){
                                                    if(error){
                                                        console.log(error);
                                                    }else{
                                                        ArticulosOrdenes.find({"orden": solicitud.params.id_orden}, function(error, articulos){
                                                            if(error){
                                                                console.log(error);
                                                            } else {
                                                                Proveedores.find( function(error, proveedores){
                                                                    if(error){
                                                                        console.log(error);
                                                                    } else {
                                                                        Ordenes.findById({"_id": solicitud.params.id_orden}, function(error, orden){
                                                                            if(error){
                                                                                console.log(error);
                                                                            } else {
                                                                                Usuarios.find( function(error, usuarios){
                                                                                    if(error){
                                                                                        console.log(error);
                                                                                    } else { 
                                                                                        respuesta.render("Compras/ordenes/orden", {
                                                                                            user: solicitud.session.user,
                                                                                            busca: '',
                                                                                            criterio: '',
                                                                                            products: {},
                                                                                            orden: solicitud.params.id_orden,
                                                                                            articulos: articulos,
                                                                                            subtotal: parseFloat(orden.subtotal).toFixed(3),
                                                                                            iva: parseFloat(orden.iva).toFixed(3),
                                                                                            total: parseFloat(orden.total).toFixed(3),
                                                                                            proveedores: proveedores,
                                                                                            proveedor: solicitud.body.proveedor,
                                                                                            comentario: solicitud.body.comentario,
                                                                                            estatus: orden.estatus,
                                                                                            serie: orden.serie,
                                                                                            moneda: producto.moneda,
                                                                                            tipoCambio: solicitud.body.tipoCambio,
                                                                                            incluyeIVA: orden.incluyeIVA,
                                                                                            titulo: "Órdenes",
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
                                                                                            ruta: "ordenes"
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                }).sort({ nombreEmpresa : 1});
                                                            }
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    });
                                }
                            }
                        })
                    }
                });
            };
        };
    },
    // Crear pdf de orden de compra
    pdfOrdenCompra: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Ordenes.findById({"_id": solicitud.params.id}, function(error, orden){
                if(error){
                    console.log(error);
                } else {
                    ArticulosOrdenes.find({"orden": orden.id}, function(error, articulos){
                        if(error){
                            console.log(error);
                        } else {

                            //console.log(orden);

                            Proveedores.findById({"_id": orden.proveedor}, function(error, proveedor){
                                if(error){
                                    console.log(error);
                                } else {
                                    // Crear el documento
                                    doc = new pdf({
                                        // Establecer tamaño de hoja
                                        size: 'letter'
                                    });
                                
                                    // Logo empresa
                                    doc.image('./public/imgs/logo.png', 5, 40,{width: 200})
                                    
                                    // Nombre empresa y rfc
                                    doc.font('fonts/Roboto-Black.ttf')
                                    .fontSize(14)
                                    .text('LLAOS ACUACULTURA S.A. de C.V.', 310, 40, { align: 'right', width: 290 })
                                    .text('LAC040819TN1', { align: 'right', width: 290 })
                                    
                                    // Nombre formato, fecha y hora de creación
                                    doc.font('fonts/Roboto-Regular.ttf')
                                    .fontSize(14)
                                    .text("Orden de Compra",{ align: 'right' , width: 290})
                                    .text("Fecha: "+ FechaHora.obtenerfecha() + " - Hora: " + FechaHora.obtenerhora(),{ align: 'right' , width: 290})
                                    
                                    // Serie de la orden I = insumos M = mantenimientos
                                    doc.font('fonts/Roboto-Black.ttf')
                                    .text("No. Orden: " + orden.serie, {align: 'right', width: 290});

                                    // Cuadro orden de compra y orden número
                                    doc.font('fonts/Roboto-Regular.ttf')
                                    doc.lineWidth(25)
                                    doc.lineCap('butt')
                                    //.fillColor("blue")
                                    .strokeColor("color(2,5,134)")
                                    .moveTo(400, 160)
                                    .lineTo(600, 160)
                                    .stroke()
                                
                                    doc.fontSize(12)
                                    .fill('white')
                                    .text("Serie", 470, 150)
                                
                                    doc.polygon([401,170],[599,170],[599,195],[401,195])
                                    .lineWidth(2)
                                    .stroke()
                                    
                                    doc.fill('black')
                                    doc.text(orden.id, 395, 175, { align: 'center' , width: 200})
                                
                                    // Datos de la empresa
                                    doc.fillColor('black')
                                    doc.text("Flavio Borquez #1603 A", 15, 140, { align: 'left', width: 200})
                                    .text("Col. Prados del Tepeyac", { align: 'left', width: 200})
                                    .text("C.P. 85150, Cd. Obregón, Sonora.", { align: 'left', width: 200})
                                
                                // Datos de la moneda
                                    doc.font('fonts/Roboto-Black.ttf')
                                    .text("Moneda", 15, 210, { align: 'left', width: 200})	

                                    // Datos del proveedor
                                    doc.font('fonts/Roboto-Black.ttf')
                                    .text("Proveedor", 185, 210, { align: 'left', width: 200})
                                    .font('fonts/Roboto-Regular.ttf')
                                    .text( proveedor.codigo  + " - " + proveedor.nombreEmpresa, { align: 'left', width: 800})	
                                
                                    // Encabezados tabla
                                    doc.lineWidth(25)
                                    doc.lineCap('butt')
                                    .fillColor("blue")
                                    .moveTo(15, 280)
                                    .lineTo(600, 280)
                                    .stroke()
                                
                                    doc.fontSize(12)
                                    .fill('white')
                                    .text("Cant", 17, 270, {align: 'center', width: 45})
                                    .text("Codigo", 59, 270,  {align: 'center', width: 70})
                                    .text("Descripción",109, 270, {align: 'center', width: 250})
                                    .text("Unidad",389, 270, {align: 'center', width: 45})
                                    .text("P. Unitario",454, 270, {align: 'center', width: 80})
                                    .text("Importe",529, 270, {align: 'center', width: 80})
                                
                                    // Llenado de tabla
                                    var y = 280
                                        mon = false;

                                    var iva = 0;

                                    articulos.forEach( function(art) {
                                        y += 15;

                                        if (mon == false){
                                            doc.fillColor('black')
                                            .font('fonts/Roboto-Regular.ttf')
                                            .text( art.moneda, 20, 225, { align: 'left'})
                                            .font('fonts/Roboto-Black.ttf')
                                            .text("Tipo Cambio (Al Día)", 65, 210)
                                            .font('fonts/Roboto-Regular.ttf')
                                            .text(orden.tipoCambio, 65, 225)
                                            mon = true;
                                            
                                        }

                                        var pU = (parseFloat(art.precio_unitario) / parseFloat(art.cantidad)).toFixed(3);

                                        doc.fillColor('black')
                                        .fontSize(10)
                                        .text(parseFloat(art.cantidad).toFixed(3), 17, y, {align: 'center', width: 45})
                                        .fontSize(12)
                                        .text(art.codigo, 59, y,  {align: 'center', height: 15, width: 70})
                                        .text(art.producto, 134, y, {align: 'left', height: 15, width: 250})
                                        .text(art.unidad, 389, y, {align: 'center', width: 65})
                                        .text(fmon.FormatMoney(true,parseFloat(pU)), 454, y, {align: 'center', width: 80})
                                        .text(fmon.FormatMoney(true,parseFloat(art.precio_unitario)), 529, y, {align: 'center', width: 80})
                                        
                                        iva += parseFloat(art.iva); 
                                    
                                    });
                                                
                                    console.log(iva);

                                    //if(orden.incluyeIVA == true){
                                        orden.subtotal = parseFloat(orden.subtotal).toFixed(3);
                                        orden.iva = parseFloat(iva).toFixed(3);
                                        orden.total = parseFloat(parseFloat(orden.subtotal) + parseFloat(orden.iva)).toFixed(3);
                                    /*} else {
                                        orden.iva = 0.00;
                                        orden.total = parseFloat(orden.subtotal).toFixed(3);
                                    }*/

                                    // División productos y totales
                                    doc.lineWidth(2)
                                    doc.lineCap('butt')
                                    .moveTo(15, 665)
                                    .lineTo(600, 665)
                                    .stroke()
                                    
                                    // Conciciones / Observaciones / Comentarios
                                    doc.font('fonts/Roboto-Black.ttf')
                                    .text("Condiciones / Observaciones / Comentarios", 15, 670, { align: 'left', width: 400 })
                                    doc.font('fonts/Roboto-Regular.ttf')
                                    .text(orden.comentarios, 20, 685, { align: 'left', width: 480 })

                                    // Subtotal, IVA y total
                                    doc.text("Subtotal", 440, 670, { align: 'right', width: 80 })
                                    .text("$ " + orden.subtotal, 520, 670, { align: 'right', width: 80 })
                                    .text("IVA", 440, 685, { align: 'right', width: 80 })
                                    .text("$ " + orden.iva, 520, 685, { align: 'right', width: 80 })
                                    .text("Total", 440, 700, { align: 'right', width: 80 })
                                    .text("$ " + orden.total, 520, 700, { align: 'right', width: 80 })
                                
                                    // Creación del documento y guardado

                                    var nombre_archivo = './files/';
                                    var nombre_pdf = orden.serie + '.pdf'

                                    doc.pipe(fs.createWriteStream(nombre_archivo+nombre_pdf)).on('finish', function (){
                                        console.log('PDF closed');
                                    });
                                
                                    // Finalize PDF file
                                    doc.end();

                                    var updSta = {
                                        estatus: 'Generada',
                                        iva: orden.iva,
                                        total: orden.total        
                                    }

                                    Ordenes.updateOne({"_id": orden.id}, updSta, function(error){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            console.log("Update estatus correcto!")
                                        }
                                    });

                                    //Finalización del get

                                    // Si se generea desde bandeja de ordenes
                                    if(solicitud.params.tipo == 1){
                                        Ordenes.find( function(error, ordenes){
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
                                                                respuesta.render("Compras/ordenes/ordenes",
                                                                    {
                                                                        user: solicitud.session.user,
                                                                        orders: ordenes,
                                                                        proveedores: proveedores,
                                                                        url: nombre_pdf,
                                                                        titulo: "Órdenes",
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
                                                                        ruta: "ordenes"
                                                                    }
                                                                );
                                                            }
                                                        });
                                                    }
                                                }).sort({ nombreEmpresa : 1});
                                            }
                                        });
                                    // Si se genera desde nueva orden
                                    } else if(solicitud.params.tipo == 2){
                                        Proveedores.find( function(error, proveedores){
                                            if(error){
                                                console.log(error)
                                            } else {
                                                Ordenes.findOne({"_id": orden.id}, function(error, ord){
                                                    if(error){
                                                        console.log(error);
                                                    } else {
                                                        Usuarios.find( function(error, usuarios){
                                                            if(error){
                                                                console.log(error);
                                                            } else { 
                                                                respuesta.render("Compras/ordenes/orden", {
                                                                    user: solicitud.session.user,
                                                                    busca: '',
                                                                    criterio: '',
                                                                    products: {},
                                                                    orden: ord.id,
                                                                    articulos: articulos,
                                                                    subtotal: ord.subtotal,
                                                                    iva: ord.iva,
                                                                    total: ord.total,
                                                                    proveedores: proveedores,
                                                                    proveedor: ord.proveedor,
                                                                    serie: ord.serie,
                                                                    comentario: ord.comentarios,
                                                                    estatus: ord.estatus,
                                                                    url: nombre_pdf,
                                                                    incluyeIVA: ord.incluyeIVA,
                                                                    titulo: "Órdenes",
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
                                                                    ruta: "ordenes"
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        }).sort({ nombreEmpresa : 1});
                                    // si se genera desde editar orden
                                    } else if(solicitud.params.tipo == 3){
                                        Ordenes.find({"_id": orden.id}, function(error, ord){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                Usuarios.find( function(error, usuarios){
                                                    if(error){
                                                        console.log(error);
                                                    } else { 
                                                        respuesta.render("Compras/ordenes/editar", {
                                                            user: solicitud.session.user,
                                                            busca: '',
                                                            criterio: '',
                                                            products: {},
                                                            articulos: articulos,
                                                            orden: ord.id,
                                                            proveedores: proveedores,
                                                            proveedor: ord.proveedor,
                                                            subtotal: ord.subtotal,
                                                            iva: ord.iva,
                                                            total: ord.total,
                                                            estatus: ord.estatus,
                                                            serie: ord.serie,
                                                            articulo: {},
                                                            comentario: ord.comentarios,
                                                            url: nombre_pdf,
                                                            titulo: "Órdenes",
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
                                                            ruta: "ordenes"
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });
        };    
    },
    // Enviar correo al proveedor con la orden de compra
    enviarCorreoProveedor: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Ordenes.findById({"_id": solicitud.params.id}, function(error, orden){
                if(error){
                    console.log(error);
                } else {
                    Proveedores.findById({"_id": orden.proveedor}, function(error, proveedor){
                        var mailOptions = {
                            from: 'Llaos Sist 1.0 <sistema@llaos.com>',
                            to: proveedor.correo_empresa,
                            subject: 'Orden de compra ' + orden.serie,
                            html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
                                        "<html xmlns='http://www.w3.org/1999/xhtml'>" +
                                            "<head>" +
                                                "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />" +
                                                "<title>Requisiciones LLaos 1.0</title>" +
                                                "<style type='text/css'>" +
                                                    "body {margin: 0; padding: 0; min-width: 100%!important;}" +
                                                    ".content {width: 100%; max-width: 600px;}" +
                                                    "@media only screen and (min-device-width: 601px) {" +
                                                    "	.content {width: 600px !important;}" +
                                                    "	.header {padding: 40px 30px 20px 30px;}" +
                                                    "}" +
                                                    "@media only screen and (min-device-width: 601px) {" +
                                                    "	.content {width: 600px !important;}" +
                                                    "	.col425 {width: 425px!important;}" +
                                                    "	.col380 {width: 380px!important;}" +
                                                    "}" +
                                                    "@media only screen and (max-width: 550px), screen and (max-device-width: 550px) {" +
                                                    "	body[yahoo] .buttonwrapper {background-color: transparent!important;}" +
                                                    "	body[yahoo] .button a {background-color: #e05443; padding: 15px 15px 13px!important; display: block!important;}" +
                                                    "}" +
                                                    ".col425 {width: 425px!important;}" +
                                                    ".subhead {font-size: 15px; color: #ffffff; font-family: sans-serif; letter-spacing: 10px;}" +
                                                    ".h1 {font-size: 33px; line-height: 38px; font-weight: bold;}" +
                                                    ".h1, .h2, .bodycopy {color: #153643; font-family: sans-serif;}" +
                                                    ".innerpadding {padding: 30px 30px 30px 30px; text-align: justify;}" +
                                                    ".borderbottom {border-bottom: 1px solid #f2eeed; text-align: justify;}" +
                                                    ".h2 {padding: 0 0 15px 0; font-size: 24px; line-height: 28px; font-weight: bold;}" +
                                                    ".bodycopy {font-size: 16px; line-height: 22px;  text-align: justify;}" +
                                                    ".button {text-align: center; font-size: 18px; font-family: sans-serif; font-weight: bold; padding: 0 30px 0 30px;}" +
                                                    ".button a {color: #ffffff; text-decoration: none;}" +
                                                    ".footer {padding: 20px 30px 15px 30px;}" +
                                                    ".footercopy {font-family: sans-serif; font-size: 14px; color: #ffffff;}" +
                                                    ".footercopy a {color: #ffffff; text-decoration: underline;}" +
                                                "</style>" +
                                            "</head>" +
                                            "<body yahoo bgcolor='#f6f8f1'>" +
                                                "<table width='100%' bgcolor='#f6f8f1' border='0' cellpadding='0' cellspacing='0'>" +
                                                    "<tr>" +
                                                        "<td>" +
                                                            "<!--[if (gte mso 9)|(IE)]>" +
                                                            "<table width='600' align='center' cellpadding='0' cellspacing='0' border='0'>" +
                                                                "<tr>" +
                                                                    "<td>" +
                                                                        "<![endif]-->" +
                                                                        "<table class='content' align='center' cellpadding='0' cellspacing='0' border='0'>" +
                                                                            "<!-- HEADER -->" +
                                                                            "<tr>" +
                                                                                "<td class='header' bgcolor='#c7d8a7'>" +
                                                                                    "<table width='70' align='left' border='0' cellpadding='0' cellspacing='0'>" +
                                                                                        "<tr>" +
                                                                                            "<td height='70' style='padding: 0 20px 20px 0;'>" +
                                                                                                "<img src='cid:unique@headerMail' width='70' height='70' border='0' alt='' / >" +
                                                                                            "</td>" +
                                                                                        "</tr>" +
                                                                                    "</table>" +
                                                                                    "<!--[if (gte mso 9)|(IE)]>" +
                                                                                    "<table width='425' align='left' cellpadding='0' cellspacing='0' border='0'>" +
                                                                                        "<tr>" +
                                                                                            "<td>" +
                                                                                            "<![endif]-->" +
                                                                                                "<table class='col425' align='left' border='0' cellpadding='0' cellspacing='0' style='width: 100%; max-width: 425px;'>" +
                                                                                                    "<tr>" +
                                                                                                        "<td height='70'>" +
                                                                                                            "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                                                "<tr>" +
                                                                                                                    "<td class='subhead' style='padding: 0 0 0 3px;'>" +
                                                                                                                    "	LLAOS 1.0" +
                                                                                                                    "</td>" +
                                                                                                                "</tr>" +
                                                                                                                "<tr>" +
                                                                                                                    "<td class='h1' style='padding: 5px 0 0 0;'>" +
                                                                                                                    "	Ordenes de Compra" +
                                                                                                                    "</td>" +
                                                                                                                "</tr>" +
                                                                                                            "</table>" +
                                                                                                        "</td>" +
                                                                                                    "</tr>" +
                                                                                                "</table>" + 
                                                                                            "<!--[if (gte mso 9)|(IE)]>" +
                                                                                            "</td>" +
                                                                                        "</tr>" +
                                                                                    "</table>" +
                                                                                    "<![endif]-->" +
                                                                                "</td>" +
                                                                            "</tr>" +
                                                                            "<!-- CONTENIDO 1 -->" +
                                                                            "<tr>" +
                                                                                "<td class='innerpadding borderbottom'>" +
                                                                                    "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                        "<tr>" +
                                                                                            "<td class='h2'>" +
                                                                                            "	Estimado "+ proveedor.nombreEmpresa +" :" +
                                                                                            "</td>" +
                                                                                        "</tr>" +
                                                                                        "<tr>" +
                                                                                            "<td class='bodycopy'>" +
                                                                                            "	El departamento de compras de <strong> Llaos Acuacultura S.A. de C.V. </strong> acaba de realizar" +
                                                                                            "	una orden de compra con el código <strong>" + orden.serie + "</strong> misma que esta adjunta a este" +
                                                                                            " 	correo, la cual ya ha sido debidamente autorizada, y se solicita surtir por completo la misma, al "+
                                                                                            " 	personal que la empresa autorizar recoger los articulos."+
                                                                                            "</td>" +
                                                                                        "</tr>" +
                                                                                    "</table>" +
                                                                                "</td>" +
                                                                            "</tr>" +
                                                                            "<!-- CONTENIDO 3 -->" +
                                                                            "<tr>" +
                                                                                "<td class='innerpadding borderbottom'>" +
                                                                                "	Este correo ha sido generado en automático por el sistema" +
                                                                                "	llaos 1.0, no responda al mismo ya que no tendrá respuesta" +
                                                                                "	alguna, si usted no es un usuario que autoriza Requisiciones" +
                                                                                "	favor de reportar el insidente al departamento de sistemas." +
                                                                                "<br>" +
                                                                                "<br>" +
                                                                                "	Cualquier problema para abrir la requisición o el sistema" +
                                                                                "	favor de reportar al departamento de sistemas." +
                                                                                "</td>" +
                                                                            "</tr>" +
                                                                            "<!-- FOOTER -->" +
                                                                            "<tr>" +
                                                                                "<td class='footer' bgcolor='#44525f'>" +
                                                                                    "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                        "<tr>" +
                                                                                            "<td align='center' class='footercopy'>" +
                                                                                            "	&reg; Llaos Acuacultura S.A. de C.V. " + new Date().getFullYear() + 
                                                                                            "</td>" +
                                                                                        "</tr>" +
                                                                                    "</table>" +
                                                                                "</td>" +
                                                                            "</tr>" +
                                                                        "</table>" +
                                                                        "<!--[if (gte mso 9)|(IE)]>" +
                                                                    "</td>" +
                                                                "</tr>" +
                                                            "</table>" +
                                                            "<![endif]-->" +
                                                        "</td>" +
                                                    "</tr>" +
                                                "</table>" +
                                            "</body>" +
                                        "</html>",
                            attachments:[
                                {
                                    fileName: 'mail.png',
                                    path: './public/imgs/mail.png',
                                    cid: 'unique@headerMail'
                                },
                                {
                                    fileName: orden.serie + '.pdf',
                                    path: './files/' + orden.serie + '.pdf',
                                    cid: 'unique@pdf'
                                },
                            ]
                        }

                        smtpTransport.sendMail(mailOptions, function(error,res){
                            if(error){
                                console.log(error);
                            }else{
                                //console.log(res);

                                var updSta = {
                                    estatus: 'Enviada'
                                }

                                Ordenes.updateOne({"_id": orden.id}, updSta, function(error){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        console.log("Update estatus correcto!")
                                    }
                                });
                                
                                // Si se envia orden desde bandeja de ordenes
                                if(solicitud.params.tipo == 1){
                                    respuesta.redirect('/ordenes');                                
                                // Si se envia orden desde nueva orden
                                } else if(solicitud.params.tipo == 2){
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Compras/ordenes/enviada", {
                                                user: solicitud.session.user,
                                                titulo: "Órdenes",
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
                                                ruta: "ordenes"
                                            });
                                        }
                                    });
                                }	
                                
                                console.log("Correo enviado!")
                            }
                            smtpTransport.close();
                        });
                    });
                }
            });
        };
    },
    // Eliminar artículo de orden de compra
    eliminarArticuloOrden: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            ArticulosOrdenes.deleteOne({"_id": solicitud.params.id}, function(error){
                if(error){
                    console.log(error);
                } else {
                    Proveedores.find( function(error, proveedores){
                        if(error){
                            console.log(error);
                        } else {
                            ArticulosOrdenes.find({"orden": solicitud.params.id_orden}, function(error, articulos){
                                if(error){
                                    console.log(error);
                                } else {
                                    var subtotal = 0,
                                        iva = 0,
                                        total = 0;

                                    articulos.forEach( function(art) {
                                        subtotal = parseFloat(subtotal) + parseFloat(art.precio_unitario);
                                        iva = parseFloat(iva) + parseFloat(art.iva);
                                        total = parseFloat(total) + parseFloat(art.importe);
                                    }); 						

                                    var dataOrdUpd = {
                                        subtotal: subtotal,
                                        iva: iva,
                                        total: total
                                    }
                    
                                    Ordenes.updateOne({"_id": solicitud.params.id_orden}, dataOrdUpd, function(error, ord){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            Ordenes.findById({"_id": solicitud.params.id_orden}, function(error, ord){
                                                if(error){
                                                    console.log(error);
                                                } else { 
                                                    if(solicitud.params.tipo == 1){
                                                        Usuarios.find( function(error, usuarios){
                                                            if(error){
                                                                console.log(error);
                                                            } else { 
                                                                respuesta.render("Compras/ordenes/orden", {
                                                                    user: solicitud.session.user,
                                                                    busca: '',
                                                                    criterio: '',
                                                                    products: {},
                                                                    orden: ord.id,
                                                                    articulo: {},
                                                                    articulos: articulos,
                                                                    subtotal: ord.subtotal,
                                                                    iva: ord.iva,
                                                                    total: ord.total,
                                                                    proveedores: proveedores,
                                                                    proveedor: ord.proveedor,
                                                                    serie: ord.serie,
                                                                    comentario: ord.comentarios,
                                                                    estatus: ord.estatus
                                                                });
                                                            }
                                                        });
                                                    } else if (solicitud.params.tipo == 2){
                                                        Usuarios.find( function(error, usuarios){
                                                            if(error){
                                                                console.log(error);
                                                            } else { 
                                                                respuesta.render("Compras/ordenes/editar", {
                                                                    user: solicitud.session.user,
                                                                    busca: '',
                                                                    criterio: '',
                                                                    products: {},
                                                                    orden: ord.id,
                                                                    articulo: {},
                                                                    articulos: articulos,
                                                                    subtotal: ord.subtotal,
                                                                    iva: ord.iva,
                                                                    total: ord.total,
                                                                    proveedores: proveedores,
                                                                    proveedor: ord.proveedor,
                                                                    serie: ord.serie,
                                                                    comentario: ord.comentarios,
                                                                    estatus: ord.estatus,
                                                                    titulo: "Órdenes",
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
                                                                    ruta: "ordenes"
                                                                });
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    });
                                        
                                }
                            });
                        }
                    }).sort({ nombreEmpresa : 1});
                }
            });
        };
    },
    // Cancelar orden de compra
    cancelarOrden: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var data = {
                estatus: 'Cancelada'
            }

            Ordenes.updateOne({"_id": solicitud.params.id}, data,function(error){
                if(error){
                    console.log(error);
                } else{
                    Ordenes.find( function(error, ordenes){
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
                                            respuesta.render("Compras/ordenes/ordenes",
                                                {
                                                    user: solicitud.session.user,
                                                    orders: ordenes,
                                                    proveedores: proveedores,
                                                    titulo: "Órdenes",
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
                                                    ruta: "ordenes"
                                                }
                                            );
                                        }
                                    });
                                }
                            }).sort({ nombreEmpresa : 1});
                        }
                    });
                }
            });
        };
    },
    // Eliminar orden de compra
    eliminarOrden: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Ordenes.deleteOne({"_id": solicitud.params.id}, function(error){
                if(error){
                    console.log(error);
                } else {
                    Ordenes.find( function(error, ordenes){
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
                                            respuesta.render("Compras/ordenes/ordenes",
                                                {
                                                    user: solicitud.session.user,
                                                    orders: ordenes,
                                                    proveedores: proveedores,
                                                    titulo: "Órdenes",
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
                                                    ruta: "ordenes"
                                                }
                                            );
                                        }
                                    });
                                }
                            }).sort({ nombreEmpresa : 1});
                        }
                    });
                }
            });
        };
    },
    //Ver orden de compra
    verOrden: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Ordenes.findById({"_id": solicitud.params.id}, function(error, orden){
                if(error){
                    console.log(error);
                } else {
                    ArticulosOrdenes.find({"orden": orden.id}, function(error, articulos){
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
                                            respuesta.render("Compras/ordenes/ver", {
                                                user: solicitud.session.user,
                                                busca: '',
                                                criterio: '',
                                                products: {},
                                                articulos: articulos,
                                                orden: orden.id,
                                                proveedores: proveedores,
                                                proveedor: orden.proveedor,
                                                subtotal: orden.subtotal,
                                                iva: orden.iva,
                                                total: orden.total,
                                                serie: orden.serie,
                                                comentario: orden.comentarios,
                                                estatus: orden.estatus,
                                                tipoCambio: orden.tipoCambio,
                                                titulo: "Órdenes",
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
                                                ruta: "ordenes"
                                            });
                                        }
                                    });
                                }
                            }).sort({ nombreEmpresa : 1});
                        }
                    });
                }
            });			
        };
    },
    // Editar orden de compra
    editarOrden: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Ordenes.findById({"_id": solicitud.params.id}, function(error, orden){
                if(error){
                    console.log(error);
                } else {
                    ArticulosOrdenes.find({"orden": orden.id}, function(error, articulos){
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
                                            respuesta.render("Compras/ordenes/editar", {
                                                user: solicitud.session.user,
                                                busca: '',
                                                criterio: '',
                                                products: {},
                                                articulos: articulos,
                                                orden: orden.id,
                                                proveedores: proveedores,
                                                proveedor: orden.proveedor,
                                                subtotal: orden.subtotal,
                                                iva: orden.iva,
                                                total: orden.total,
                                                estatus: orden.estatus,
                                                serie: orden.serie,
                                                articulo: {
                                                    cantidad: 1.00,
                                                    requisicion: 'REQ00000'
                                                },
                                                comentario: orden.comentarios,
                                                tipoCambio: orden.tipoCambio,
                                                incluyeIVA: orden.incluyeIVA,
                                                titulo: "Órdenes",
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
                                                ruta: "ordenes"
                                            });
                                        }
                                    });
                                }
                            }).sort({ nombreEmpresa : 1});
                        }
                    });
                }
            });			
        };
    },
    // Editar artículo de orden
    editarArticuloOrden: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Ordenes.findById({"_id": solicitud.params.id_ord}, function(error, orden){
                if(error){
                    console.log(error);
                } else {
                    ArticulosOrdenes.findById({"_id": solicitud.params.id}, function(error, articulo){
                        if(error){
                            console.log(error);
                        } else {
                            Proveedores.find( function(error, proveedores){
                                if(error){
                                    console.log(error);
                                } else {
                                    ArticulosOrdenes.find({"orden": orden.id}, function(error, articulos){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            Usuarios.find( function(error, usuarios){
                                                if(error){
                                                    console.log(error);
                                                } else { 
                                                    respuesta.render("Compras/ordenes/editar", {
                                                        user: solicitud.session.user,
                                                        busca: '',
                                                        criterio: '',
                                                        products: {},
                                                        articulos: articulos,
                                                        orden: orden.id,
                                                        proveedores: proveedores,
                                                        proveedor: orden.proveedor,
                                                        subtotal: orden.subtotal,
                                                        iva: orden.iva,
                                                        total: orden.total,
                                                        estatus: orden.estatus,
                                                        serie: orden.serie,
                                                        articulo: articulo,
                                                        comentario: orden.comentarios,
                                                        titulo: "Órdenes",
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
                                                        ruta: "ordenes"
                                                    });
                                                }
                                            });
                                        }
                                    });	
                                }
                            }).sort({ nombreEmpresa : 1});
                        }
                    });
                }
            });
        };
    },
    // Ordenes solo nuevas
    ordenesNuevas: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            Ordenes.find( {"estatus": "Nueva"} , function(error, ordenes){
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
                                    respuesta.render("Compras/ordenes/ordenes",
                                        {
                                            user: solicitud.session.user,
                                            orders: ordenes,
                                            proveedores: proveedores,
                                            titulo: "Órdenes",
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
                                            ruta: "ordenes"
                                        }
                                    );
                                }
                            });
                        }
                    }).sort({ nombreEmpresa : 1});
                }
            });
        };
    },
    // Actualizar datos de orden
    actualizarOrden: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch

            var incluyeIVA = '';
            var iva  = 0.00;
            var total = 0.00;
            var subtotal = 0.00;

            if (solicitud.body.incluyeIVA == 'on'){
                incluyeIVA = true;
            } else {
                incluyeIVA = false;
            } 

            var ordUpd = {};

            Ordenes.findById({"_id": solicitud.params.id}, function(error, orden){
                if(error){
                    console.log(error);
                } else {

                    if(incluyeIVA == true){
                        subtotal = parseFloat(orden.subtotal).toFixed(3);
                        iva = parseFloat(parseFloat(orden.subtotal) * 0.16).toFixed(3);
                        total = parseFloat(parseFloat(orden.subtotal) * parseFloat(iva)).toFixed(3);
                    } else {
                        subtotal = parseFloat(orden.subtotal).toFixed(3);
                        iva = 0.00;
                        total = parseFloat(orden.subtotal).toFixed(3);
                    }

                    var ordUpd = {
                        proveedor: solicitud.body.proveedor,
                        comentarios: solicitud.body.comentario,
                        tipoCambio: solicitud.body.tipoCambio,
                        incluyeIVA: incluyeIVA,
                        iva: iva,
                        total: total
                    }

                    console.log(ordUpd);

            Ordenes.updateOne( {"_id": solicitud.params.id}, ordUpd, function(error){
                if(error){
                    console.log(error);
                }else {
                    Proveedores.find( function(error, proveedores){
                        if(error){
                            console.log(error);
                        } else {
                            ArticulosOrdenes.find({"orden": solicitud.params.id}, function(error, articulos){
                                if(error){
                                    console.log(error);
                                } else {
                                    Ordenes.findById({"_id": solicitud.params.id}, function(error, ord){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            Usuarios.find( function(error, usuarios){
                                                if(error){
                                                    console.log(error);
                                                } else { 
                                                    respuesta.render("Compras/ordenes/editar", {
                                                        user: solicitud.session.user,
                                                        busca: '',
                                                        criterio: '',
                                                        products: {},
                                                        orden: ord.id,
                                                        articulos: articulos,
                                                        subtotal: ord.subtotal,
                                                        iva: ord.iva,
                                                        total: ord.total,
                                                        proveedores: proveedores,
                                                        proveedor: ord.proveedor,
                                                        articulo: {},
                                                        estatus: ord.estatus,
                                                        serie: ord.serie,
                                                        comentario: ord.comentarios,
                                                        tipoCambio: ord.tipoCambio,
                                                        incluyeIVA: incluyeIVA,
                                                        titulo: "Órdenes",
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
                                                        ruta: "ordenes"
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }).sort({ nombreEmpresa : 1});
                }
            })
                }
            });
        };
    },
    // Actualizar artículo de una orden
    actualizarArticuloOrden: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var subtotal = 0.00,
                iva = 0.00,
                total = 0.00,
                precioUnitario = 0.00,
                precioNeto = 0.00,
                ivaArt = 0.00;
            
            ArticulosOrdenes.findById({"_id": solicitud.params.id}, function(error, articulo){
                if(error){
                    console.log(error);
                } else {
                    
                    precioUnitario = parseFloat(articulo.precio_unitario) / parseFloat(articulo.cantidad);
                    precioNeto = parseFloat(solicitud.body.cantidad) * parseFloat(precioUnitario);
                    ivaArt = parseFloat(precioNeto) * 0.16;

                    var updArt = {
                        cantidad: solicitud.body.cantidad,
                        requisicion: solicitud.body.codigoRequi,
                        precio_unitario: precioNeto,
                        importe: precioNeto + ivaArt,
                        iva: ivaArt
                    }

                    //console.log(updArt);

                    ArticulosOrdenes.updateOne({"_id": solicitud.params.id}, updArt, function(error){
                        if(error){
                            console.log(error);
                        } else {
                            Proveedores.find( function(error, proveedores){
                                if(error){
                                    console.log(error);
                                } else {
                                    ArticulosOrdenes.find({"orden": articulo.orden}, function(error, articulos){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            articulos.forEach( function(art) {
                                                subtotal = parseFloat(subtotal) + parseFloat(art.precio_unitario);
                                                iva = parseFloat(iva) +parseFloat(art.iva);
                                                total = parseFloat(total) + parseFloat(art.importe);
                                            }); 
                                            
                                            var updOrd = {
                                                subtotal: subtotal,
                                                iva: iva,
                                                total: total
                                            }											

                                            Ordenes.updateOne({"_id": articulo.orden}, updOrd, function(error){
                                                if(error){
                                                    console.log(error);
                                                } else {

                                                    Ordenes.findById({"_id": articulo.orden}, function(error, ord){
                                                        if(error){
                                                            console.log(error);
                                                        } else {
                                                            Usuarios.find( function(error, usuarios){
                                                                if(error){
                                                                    console.log(error);
                                                                } else { 
                                                                    respuesta.render("Compras/ordenes/editar", {
                                                                        user: solicitud.session.user,
                                                                        busca: '',
                                                                        criterio: '',
                                                                        products: {},
                                                                        orden: ord.id,
                                                                        articulos: articulos,
                                                                        subtotal: ord.subtotal,
                                                                        iva: ord.iva,
                                                                        total: ord.total,
                                                                        proveedores: proveedores,
                                                                        proveedor: ord.proveedor,
                                                                        articulo: {},
                                                                        estatus: ord.estatus,
                                                                        serie: ord.serie,
                                                                        comentario: ord.comentarios,
                                                                        titulo: "Órdenes",
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
                                                                        ruta: "ordenes"
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
                            }).sort({ nombreEmpresa : 1});
                        }
                    });
                }
            });
        };
    },
    // Actualizar orden a estatus en ruta a granja
    ordenEnRuta: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var data = {
                estatus: "En Ruta"
            }

            Ordenes.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(error);
                } else {
                    Ordenes.updateOne({"_id": solicitud.params.id}, data, function(error){
                        if(error){
                            console.log(error);
                        } else {
                            Ordenes.find( function(error, ordenes){
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
                                                    respuesta.render("Compras/ordenes/ordenes",
                                                        {
                                                            user: solicitud.session.user,
                                                            orders: ordenes,
                                                            proveedores: proveedores,
                                                            titulo: "Órdenes",
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
                                                            ruta: "ordenes"
                                                        }
                                                    );
                                                }
                                            });
                                        }
                                    }).sort({ nombreEmpresa : 1});
                                }
                            });
                        }
                    });
                }
            });
        };
    },
    // Cerrar orden
    cerrarOrden: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            var data = {
                estatus: "Cerrada"
            }

            Ordenes.updateOne({"_id": solicitud.params.id}, data, function(error){
                if(error){
                    console.log(error);
                } else {
                    Ordenes.find( function(error, ordenes){
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
                                            respuesta.render("Compras/ordenes/ordenes",
                                                {
                                                    user: solicitud.session.user,
                                                    orders: ordenes,
                                                    proveedores: proveedores,
                                                    titulo: "Órdenes",
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
                                                    ruta: "ordenes"
                                                }
                                            );
                                        }
                                    });
                                }
                            }).sort({ nombreEmpresa : 1});
                        }
                    });
                }
            });
        };
    },
    // Mostrar enviar ordenes en ruta a granja
    ordenesEnRuta: (solicitud, respuesta) => {
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
                            respuesta.render("Compras/ordenes/enruta",
                                {
                                    user: solicitud.session.user,
                                    ordenes: {},
                                    folio: '00000',
                                    unidad: '',
                                    chofer: '',
                                    busca: '',
                                    articulosRuta: {},
                                    proveedores: proveedores,
                                    titulo: "Órdenes",
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
                                    ruta: "ordenes"
                                }
                            );
                        }
                    });
                }
            }).sort({ nombreEmpresa : 1});          
        };
    },
    buscarOrdenes: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            if(solicitud.body.codigo === 'undefined' || solicitud.body.codigo == null){
                if(solicitud.body.criterio == 'Serie'){
                    console.log(solicitud.body.buscar);
                    Ordenes.find({"serie": solicitud.body.buscar}, function(error, ordenes){
                        if(error){
                            console.log(error);
                        } else {
                            Proveedores.find( function(error, proveedores){
                                if(error){
                                    console.log(error);
                                } else {    
        
                                    ordenes.forEach( function(ord){
                                        proveedores.forEach( function(prov){
                                            if(ord.proveedor == prov.id){
                                                ord.proveedor = prov.nombreEmpresa;
                                            }
                                        });
                                    });

                                    Proveedores.find( function(error, proveedores){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            Usuarios.find( function(error, usuarios){
                                                if(error){
                                                    console.log(error);
                                                } else { 
                                                    respuesta.render("Compras/ordenes/enruta",
                                                        {
                                                            user: solicitud.session.user,
                                                            ordenes: ordenes,
                                                            folio: '00000',
                                                            unidad: '',
                                                            chofer: '',
                                                            articulosRuta: {},
                                                            proveedores: proveedores,
                                                            titulo: "Órdenes",
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
                                                            ruta: "ordenes"
                                                        }
                                                    );
                                                }
                                            });
                                        }
                                    }).sort({ nombreEmpresa : 1});
                                }
                            }).sort({ nombreEmpresa : 1});
                        }
                    });
                } else if (solicitud.body.criterio == 'Proveedor'){
                    console.log(solicitud.body.proveedor);

                    Ordenes.find({ $and:[{"proveedor": solicitud.body.proveedor},{ "estatus": "Generada"}]}, function(error, ordenes){
                        if(error){
                            console.log(error);
                        } else {
                            Proveedores.populate(ordenes, {path: "proveedor"}, function(error, ordenes){
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
                                                    respuesta.render("Compras/ordenes/enruta",
                                                        {
                                                            estatus: '',
                                                            user: solicitud.session.user,
                                                            ordenes: ordenes,
                                                            folio: '00000',
                                                            unidad: '',
                                                            chofer: '',
                                                            articulosRuta: {},
                                                            proveedor: solicitud.body.proveedor,
                                                            proveedores: proveedores,
                                                            titulo: "Órdenes",
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
                                                            ruta: "ordenes"
                                                        }
                                                    );
                                                }
                                            });
                                        }
                                    }).sort({ nombreEmpresa : 1});
                                }
                            });
                        }
                    });
                }
            }else{
                console.log("Existe orden ruta");
                OrdenesRuta.findById({"_id": solicitud.body.codigo}, function(error, ordenRuta){
                    if(error){
                        console.log(error);
                    } else {
                        ArticulosEnRuta.find({"ordenRuta": ordenRuta.id}, function(error, articulosRuta){
                            if(error){
                                console.log(error);
                            } else {
                                if(solicitud.body.criterio == 'Serie'){
                                    Ordenes.find({"serie": solicitud.body.buscar}, function(error, ordenes){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            Proveedores.find( function(error, proveedores){
                                                if(error){
                                                    console.log(error);
                                                } else {    
                        
                                                    ordenes.forEach( function(ord){
                                                        proveedores.forEach( function(prov){
                                                            if(ord.proveedor == prov.id){
                                                                ord.proveedor = prov.nombreEmpresa;
                                                            }
                                                        });
                                                    });
                        
                                                    Proveedores.find( function(error, proveedores){
                                                        if(error){
                                                            console.log(error);
                                                        } else {
                                                            Usuarios.find( function(error, usuarios){
                                                                if(error){
                                                                    console.log(error);
                                                                } else { 
                                                                    respuesta.render("Compras/ordenes/enruta",
                                                                        {
                                                                            user: solicitud.session.user,
                                                                            ordenes: ordenes,
                                                                            unidad: ordenRuta.unidad,
                                                                            chofer: ordenRuta.chofer,
                                                                            articulosRuta: articulosRuta,
                                                                            codigo: ordenRuta.id,
                                                                            folio: ordenRuta.codigo,
                                                                            proveedores: proveedores,
                                                                            estatus: '',
                                                                            titulo: "Órdenes",
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
                                                                            ruta: "ordenes"
                                                                        }
                                                                    );
                                                                }
                                                            });
                                                        }
                                                    }).sort({ nombreEmpresa : 1});
                                                }
                                            }).sort({ nombreEmpresa : 1});
                                        }
                                    });
                                } else if (solicitud.body.criterio == 'Proveedor'){
                                    Proveedores.findById({"_id": solicitud.body.proveedor}, function(error, proveedor){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            Ordenes.find({$and:[{"proveedor": proveedor.id},{"estatus": "Enviada"}]}, function(error, ordenes){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    
                                                    ordenes.forEach( function(ord){
                                                        ord.proveedor = proveedor.nombreEmpresa;
                                                        ord.total = fmon.FormatMoney(true, parseFloat(ord.total));
                                                    });

                                                    Proveedores.find( function(error, proveedores){
                                                        if(error){
                                                            console.log(error);
                                                        } else {
                                                            Usuarios.find( function(error, usuarios){
                                                                if(error){
                                                                    console.log(error);
                                                                } else { 
                                                                    respuesta.render("Compras/ordenes/enruta",
                                                                        {
                                                                            user: solicitud.session.user,
                                                                            ordenes: ordenes,
                                                                            estatus: '',
                                                                            unidad: ordenRuta.unidad,
                                                                            chofer: ordenRuta.chofer,
                                                                            articulosRuta: articulosRuta,
                                                                            codigo: ordenRuta.id,
                                                                            folio: ordenRuta.codigo,
                                                                            proveedores: proveedores,
                                                                            titulo: "Órdenes",
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
                                                                            ruta: "ordenes"
                                                                        }
                                                                    );
                                                                }
                                                            });
                                                        }
                                                    }).sort({ nombreEmpresa : 1});
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        })
                    }
                })
            };
        };
    },
    agregarOrdenEnRuta: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            // Si no existe la orden ruta
            if(solicitud.body.codigo === 'undefined' || solicitud.body.codigo == null){
                Ordenes.findById({"_id": solicitud.params.id}, function(error, orden){
                    if(error){
                        console.log(error);
                    } else {
                        var codRut = 0;
        
                        OrdenesRuta.find( function(error, ordRuta){
                            if(error){
                                console.log(error);
                            } else {
                                codRut = ordRuta.length + 1;
        
                                var dataOr = {
                                    codigo: zf.zfill(codRut,5),
                                    chofer: solicitud.body.chofer,
                                    unidad: solicitud.body.unidad,
                                    fecha: new Date(),
                                    hora: FechaHora.obtenerhora(),
                                    subtotal: orden.subtotal,
                                    iva: orden.iva,
                                    total: orden.total,
                                    estatus: 'Nueva'
                                }
                        
                                var ordenRuta = new OrdenesRuta(dataOr);
                    
                                ordenRuta.save( function(error, ordRut){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        ArticulosOrdenes.find({"orden": orden.id}, function(error, articulos){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                articulos.forEach( function(art){
                                                    var data = {
                                                        cantidad: art.cantidad,
                                                        unidad: art.unidad,
                                                        codigo: art.codigo,
                                                        descripcion: art.producto,
                                                        orden: art.orden,
                                                        proveedor: orden.proveedor,
                                                        ordenRuta: ordRut.id,
                                                        requisicion: art.requisicion
                                                    }
                        
                                                    var artRuta = new ArticulosEnRuta(data);
                            
                                                    artRuta.save( function(error, artRut){
                                                        if(error){
                                                            console.log(error);
                                                        } else {
                                                            //console.log(artRut.id);
                                                        }
                                                    });
                                                });
        
                                                OrdenesRuta.findById({"_id": ordRut.id}, function(error, oRuta){
                                                    if(error){
                                                        console.log(error);
                                                    } else {
                                                        ArticulosEnRuta.find({"ordenRuta": oRuta.id}, function(error, articulosEnRuta){
                                                            if(error){
                                                                console.log(error);
                                                            } else {
                                                                Ordenes.populate(articulosEnRuta, {path: "orden"}, function(error, articulosEnRuta){
                                                                    if(error){
                                                                        console.log(error);
                                                                    } else {
                                                                        Proveedores.populate(articulosEnRuta, {path: "proveedor"}, function(error, articulosEnRuta){
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
                                                                                                respuesta.render("Compras/ordenes/enruta",
                                                                                                    {
                                                                                                        codigo: oRuta.id,
                                                                                                        folio: oRuta.codigo,
                                                                                                        user: solicitud.session.user,
                                                                                                        ordenes: {},
                                                                                                        estatus: 'Nueva',
                                                                                                        unidad: solicitud.body.unidad,
                                                                                                        chofer: solicitud.body.chofer,
                                                                                                        articulosRuta: articulosEnRuta,
                                                                                                        proveedores: proveedores,
                                                                                                        titulo: "Órdenes",
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
                                                                                                        ruta: "ordenes"
                                                                                                    }
                                                                                                ); 
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }).sort({ nombreEmpresa : 1}); 
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
                            }
                        });
                    }
                });
            // Si existe la orden ruta    
            } else {
                Ordenes.findById({"_id": solicitud.params.id}, function(error, orden){
                    if(error){
                        console.log(error);
                    } else {
                        ArticulosOrdenes.find({"orden": orden.id}, function(error, articulos){
                            if(error){
                                console.log(error);
                            } else {
                                articulos.forEach( function(art){
                                    var data = {
                                        cantidad: art.cantidad,
                                        unidad: art.unidad,
                                        codigo: art.codigo,
                                        descripcion: art.producto,
                                        orden: art.orden,
                                        proveedor: orden.proveedor,
                                        ordenRuta: solicitud.body.codigo,
                                        requisicion: art.requisicion
                                    }

                                    var artRuta = new ArticulosEnRuta(data);

                                    artRuta.save( function(error, artRut){
                                        if(error){
                                            console.log(error);
                                        }
                                    });
                                });

                                OrdenesRuta.findById({"_id": solicitud.body.codigo}, function(error, oRuta){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        var subtotal = 0.00,
                                            iva = 0.00,
                                            total = 0.00;

                                            subtotal = parseFloat(orden.subtotal) + parseFloat(oRuta.subtotal);
                                            iva = parseFloat(orden.iva) + parseFloat(oRuta.iva);
                                            total = parseFloat(orden.total) + parseFloat(oRuta.total);

                                        var dataOrd = {
                                            subtotal: subtotal.toFixed(2),
                                            iva: iva.toFixed(2),
                                            total: total.toFixed(2),
                                        }

                                        //console.log(dataOrd);

                                        OrdenesRuta.updateOne({"_id": oRuta.id}, dataOrd, function(error,ordR){
                                            if(error){
                                                console.log(error);
                                            } else {

                                                //console.log(ordR);

                                                ArticulosEnRuta.find({"ordenRuta": oRuta.id}, function(error, articulosEnRuta){
                                                    if(error){
                                                        console.log(error);
                                                    } else {
                                                        Ordenes.populate(articulosEnRuta, {path: "orden"}, function(error, articulosEnRuta){
                                                            if(error){
                                                                console.log(error);
                                                            } else {
                                                                Proveedores.populate(articulosEnRuta, {path: "proveedor"}, function(error, articulosEnRuta){
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
                                                                                        respuesta.render("Compras/ordenes/enruta",
                                                                                            {
                                                                                                codigo: oRuta.id,
                                                                                                folio: oRuta.codigo,
                                                                                                user: solicitud.session.user,
                                                                                                ordenes: {},
                                                                                                unidad: oRuta.unidad,
                                                                                                chofer: oRuta.chofer,
                                                                                                articulosRuta: articulosEnRuta,
                                                                                                proveedores: proveedores,
                                                                                                titulo: "Órdenes",
                                                                                                estatus: 'Nueva',
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
                                                                                                ruta: "ordenes"
                                                                                            }
                                                                                        ); 
                                                                                    }
                                                                                });
                                                                            }
                                                                        }).sort({ nombreEmpresa : 1});                                                                
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
                    }
                });
            };
        };
    },
    pdfOrdenRuta: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            OrdenesRuta.findById({"_id": solicitud.params.id}, function(error, oRuta){
                if(error){
                    console.log(error);
                } else {    
                    ArticulosEnRuta.find({"ordenRuta": oRuta.id}, function(error, articulos){
                        if(error){
                            console.log(error);
                        } else {
                            Ordenes.populate(articulos, {path: "orden"}, function(error, articulos){
                                if(error){
                                    console.log(error);
                                } else {
                                    Proveedores.populate(articulos, {path: "proveedor"}, function(error, articulos){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            // Crear el documento
                                            doc = new pdf({
                                                // Establecer tamaño de hoja
                                                size: 'letter',
                                                layout: 'landscape'
                                            });
                                        
                                            // Logo empresa
                                            doc.image('./public/imgs/logo.png', 5, 40,{width: 200})
                                            
                                            // Nombre empresa y rfc
                                            doc.font('fonts/Roboto-Black.ttf')
                                            .fontSize(14)
                                            .text('LLAOS ACUACULTURA S.A. de C.V.', 480, 40, { align: 'right', width: 290 })
                                            .text('LISTADO DE ENVIO DE PRODUCTOS', { align: 'right', width: 290 })
                                            .text('Folio: ' + oRuta.codigo, { align: 'right', width: 290 })

                                            // Nombre formato, fecha y hora de creación
                                            doc.font('fonts/Roboto-Regular.ttf')
                                            .fontSize(14)
                                            .text("Fecha: "+ FechaHora.obtenerfecha() + " - Hora: " + FechaHora.obtenerhora(),{ align: 'right' , width: 290})
                                                                                                                                            
                                            // Encabezados tabla
                                            doc.lineWidth(25)
                                            doc.lineCap('butt')
                                            .fillColor("blue")
                                            .moveTo(15, 150)
                                            .lineTo(780, 150)
                                            .stroke()
                                        
                                            doc.fontSize(10)
                                            .fill('white')
                                            .text("Cant", 17, 140, {align: 'center', width: 45})
                                            .text("Unidad", 49, 140,  {align: 'center', width: 70})
                                            .text("Descripción",69, 140, {align: 'center', width: 250})
                                            .text("Orden",319, 140, {align: 'center', width: 100})
                                            .text("Requisición",304, 140, {align: 'center', width: 380})
                                            .text("Fecha",709, 140, {align: 'center', width: 80})
                                
                                            // Llenado de tabla
                                            var y = 155;
                                            var total = 0;

                                            articulos.forEach( function(art) {
                                                total = total + 1;
                                                y += 10;

                                                if (y > 525){
                                                    y = 165;

                                                    doc.addPage()

                                                    // Logo empresa
                                                    doc.image('./public/imgs/logo.png', 5, 40,{width: 200})
                                                    
                                                    // Nombre empresa y rfc
                                                    doc.font('fonts/Roboto-Black.ttf')
                                                    .fontSize(14)
                                                    .text('LLAOS ACUACULTURA S.A. de C.V.', 480, 40, { align: 'right', width: 290 })
                                                    .text('LISTADO DE ENVIO DE PRODUCTOS', { align: 'right', width: 290 })
                                                    .text("Folio: " + oRuta.codigo, { align: 'right', width: 290 }) 
                                                    
                                                    // Nombre formato, fecha y hora de creación
                                                    doc.font('fonts/Roboto-Regular.ttf')
                                                    .fontSize(14)
                                                    .text("Fecha: "+ FechaHora.obtenerfecha() + " - Hora: " + FechaHora.obtenerhora(),{ align: 'right' , width: 290})
                                                    
                                                    // Encabezados tabla
                                                    doc.lineWidth(25)
                                                    doc.lineCap('butt')
                                                    .fillColor("blue")
                                                    .moveTo(15, 150)
                                                    .lineTo(780, 150)
                                                    .stroke()
                                                
                                                    doc.fontSize(10)
                                                    .fill('white')
                                                    .text("Cant", 17, 140, {align: 'center', width: 45})
                                                    .text("Unidad", 49, 140,  {align: 'center', width: 70})
                                                    .text("Descripción",69, 140, {align: 'center', width: 250})
                                                    .text("Orden",319, 140, {align: 'center', width: 100})
                                                    .text("Requisición",304, 140, {align: 'center', width: 380})
                                                    .text("Fecha",709, 140, {align: 'center', width: 80})
                                                }
                                                    doc.fillColor('black')
                                                    .text(parseFloat(art.cantidad).toFixed(2), 10, y, {align: 'center', width: 45})
                                                    .text(art.unidad, 49, y,  {align: 'center', height: 15, width: 70})
                                                    .text(art.descripcion, 124, y, {align: 'left', height: 15, width: 300})
                                                    .text(art.orden.serie, 295, y, {align: 'center', width: 150})
                                                    .text(art.orden.comentarios, 414, y, {height: 15, width: 300})
                                                    .text(FechaHora.obtenerfecha(), 709, y, {align: 'center', width: 80})
                                            });
                                                            
                                            // División productos y totales
                                            doc.lineWidth(2)
                                            doc.lineCap('butt')
                                            .moveTo(15, y + 15)
                                            .lineTo(780, y + 15)
                                            .stroke()
                                            
                                            // Conciciones / Observaciones / Comentarios
                                            doc.font('fonts/Roboto-Black.ttf')
                                            .text("No. artículos enviados: " + total, 15, y + 15, { align: 'left', width: 400 })
                                            .text("Total: " + fmon.FormatMoney(true, parseFloat(oRuta.total)), 480, y + 15, { align: 'right', width: 290 })

                                            // Creación del documento y guardado

                                            var nombre_archivo = './files/';
                                            var nombre_pdf = 'ordenRuta' + oRuta.codigo + '.pdf';

                                            //console.log(nombre_archivo);

                                            doc.pipe(fs.createWriteStream(nombre_archivo+nombre_pdf)).on('finish', function (error){
                                                if(error){
                                                    console.log(error);
                                                } else {

                                                    var dataOrd = {
                                                        estatus: 'Generada'
                                                    }

                                                    OrdenesRuta.updateOne({"_id": oRuta.id}, dataOrd, function(error){
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
                                                                            respuesta.render("Compras/ordenes/enruta",
                                                                                {
                                                                                    codigo: oRuta.id,
                                                                                    folio: oRuta.codigo,
                                                                                    user: solicitud.session.user,
                                                                                    ordenes: {},
                                                                                    unidad: oRuta.unidad,
                                                                                    chofer: oRuta.chofer,
                                                                                    articulosRuta: articulos,
                                                                                    url: nombre_pdf,
                                                                                    proveedores: proveedores,
                                                                                    titulo: "Órdenes",
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
                                                                                    ruta: "ordenes"
                                                                                }
                                                                            );
                                                                        }
                                                                    });
                                                                }
                                                            }).sort({ nombreEmpresa : 1});
                                                            console.log('PDF closed & Actualizada!');
                                                        }
                                                    });
                                                }
                                            });     
                                        
                                            // Finalize PDF file
                                            doc.end();
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
    enviarOrdenRuta: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{//Agregar try-catch
            OrdenesRuta.findById({"_id": solicitud.params.id }, function(error, oRuta){
                if(error){
                    console.log(error);
                } else {
                    var mailOptions = {
                        from: 'Llaos Sist 1.0 <sistema@llaos.com>',
                        //to: 'flopez@llaos.com',
                        to: 'davilar@llaos.com',
                        cc: 'jcuamea@llaos.com',
                        bcc: 'flopez@llaos.com',
                        subject: 'Ordenes en Ruta ' + oRuta.codigo,
                        html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
                                    "<html xmlns='http://www.w3.org/1999/xhtml'>" +
                                        "<head>" +
                                            "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />" +
                                            "<title>Requisiciones LLaos 1.0</title>" +
                                            "<style type='text/css'>" +
                                                "body {margin: 0; padding: 0; min-width: 100%!important;}" +
                                                ".content {width: 100%; max-width: 600px;}" +
                                                "@media only screen and (min-device-width: 601px) {" +
                                                "	.content {width: 600px !important;}" +
                                                "	.header {padding: 40px 30px 20px 30px;}" +
                                                "}" +
                                                "@media only screen and (min-device-width: 601px) {" +
                                                "	.content {width: 600px !important;}" +
                                                "	.col425 {width: 425px!important;}" +
                                                "	.col380 {width: 380px!important;}" +
                                                "}" +
                                                "@media only screen and (max-width: 550px), screen and (max-device-width: 550px) {" +
                                                "	body[yahoo] .buttonwrapper {background-color: transparent!important;}" +
                                                "	body[yahoo] .button a {background-color: #e05443; padding: 15px 15px 13px!important; display: block!important;}" +
                                                "}" +
                                                ".col425 {width: 425px!important;}" +
                                                ".subhead {font-size: 15px; color: #ffffff; font-family: sans-serif; letter-spacing: 10px;}" +
                                                ".h1 {font-size: 33px; line-height: 38px; font-weight: bold;}" +
                                                ".h1, .h2, .bodycopy {color: #153643; font-family: sans-serif;}" +
                                                ".innerpadding {padding: 30px 30px 30px 30px; text-align: justify;}" +
                                                ".borderbottom {border-bottom: 1px solid #f2eeed; text-align: justify;}" +
                                                ".h2 {padding: 0 0 15px 0; font-size: 24px; line-height: 28px; font-weight: bold;}" +
                                                ".bodycopy {font-size: 16px; line-height: 22px;  text-align: justify;}" +
                                                ".button {text-align: center; font-size: 18px; font-family: sans-serif; font-weight: bold; padding: 0 30px 0 30px;}" +
                                                ".button a {color: #ffffff; text-decoration: none;}" +
                                                ".footer {padding: 20px 30px 15px 30px;}" +
                                                ".footercopy {font-family: sans-serif; font-size: 14px; color: #ffffff;}" +
                                                ".footercopy a {color: #ffffff; text-decoration: underline;}" +
                                            "</style>" +
                                        "</head>" +
                                        "<body yahoo bgcolor='#f6f8f1'>" +
                                            "<table width='100%' bgcolor='#f6f8f1' border='0' cellpadding='0' cellspacing='0'>" +
                                                "<tr>" +
                                                    "<td>" +
                                                        "<!--[if (gte mso 9)|(IE)]>" +
                                                        "<table width='600' align='center' cellpadding='0' cellspacing='0' border='0'>" +
                                                            "<tr>" +
                                                                "<td>" +
                                                                    "<![endif]-->" +
                                                                    "<table class='content' align='center' cellpadding='0' cellspacing='0' border='0'>" +
                                                                        "<!-- HEADER -->" +
                                                                        "<tr>" +
                                                                            "<td class='header' bgcolor='#c7d8a7'>" +
                                                                                "<table width='70' align='left' border='0' cellpadding='0' cellspacing='0'>" +
                                                                                    "<tr>" +
                                                                                        "<td height='70' style='padding: 0 20px 20px 0;'>" +
                                                                                            "<img src='cid:unique@headerMail' width='70' height='70' border='0' alt='' / >" +
                                                                                        "</td>" +
                                                                                    "</tr>" +
                                                                                "</table>" +
                                                                                "<!--[if (gte mso 9)|(IE)]>" +
                                                                                "<table width='425' align='left' cellpadding='0' cellspacing='0' border='0'>" +
                                                                                    "<tr>" +
                                                                                        "<td>" +
                                                                                        "<![endif]-->" +
                                                                                            "<table class='col425' align='left' border='0' cellpadding='0' cellspacing='0' style='width: 100%; max-width: 425px;'>" +
                                                                                                "<tr>" +
                                                                                                    "<td height='70'>" +
                                                                                                        "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                                            "<tr>" +
                                                                                                                "<td class='subhead' style='padding: 0 0 0 3px;'>" +
                                                                                                                "	LLAOS 1.0" +
                                                                                                                "</td>" +
                                                                                                            "</tr>" +
                                                                                                            "<tr>" +
                                                                                                                "<td class='h1' style='padding: 5px 0 0 0;'>" +
                                                                                                                "	Ordenes en Ruta" +
                                                                                                                "</td>" +
                                                                                                            "</tr>" +
                                                                                                        "</table>" +
                                                                                                    "</td>" +
                                                                                                "</tr>" +
                                                                                            "</table>" + 
                                                                                        "<!--[if (gte mso 9)|(IE)]>" +
                                                                                        "</td>" +
                                                                                    "</tr>" +
                                                                                "</table>" +
                                                                                "<![endif]-->" +
                                                                            "</td>" +
                                                                        "</tr>" +
                                                                        "<!-- CONTENIDO 1 -->" +
                                                                        "<tr>" +
                                                                            "<td class='innerpadding borderbottom'>" +
                                                                                "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                    "<tr>" +
                                                                                        "<td class='h2'>" +
                                                                                        "	Estimado Usuario:" +
                                                                                        "</td>" +
                                                                                    "</tr>" +
                                                                                    "<tr>" +
                                                                                        "<td class='bodycopy'>" +
                                                                                        "   El Departamento de Logística en conjunto con el Departamento de Compras ha enviado a granja " + 
                                                                                        "   la unidad <strong>" + oRuta.unidad + "</strong> la cual es manejada por el operador <strong>" + oRuta.chofer + "</strong> la unidad " +
                                                                                        "   estará en un aproximado de <strong> 1:30 hrs </strong> en su destino, favor de tener todo preparado para su recibimiento."  +
                                                                                        "</td>" +
                                                                                    "</tr>" +
                                                                                "</table>" +
                                                                            "</td>" +
                                                                        "</tr>" +
                                                                        "<!-- CONTENIDO 3 -->" +
                                                                        "<tr>" +
                                                                            "<td class='innerpadding borderbottom'>" +
                                                                            "	Este correo ha sido generado en automático por el sistema" +
                                                                            "	llaos 1.0, no responda al mismo ya que no tendrá respuesta" +
                                                                            "	alguna, si usted no es un usuario que autoriza Requisiciones" +
                                                                            "	favor de reportar el insidente al departamento de sistemas." +
                                                                            "<br>" +
                                                                            "<br>" +
                                                                            "	Cualquier problema para abrir la requisición o el sistema" +
                                                                            "	favor de reportar al Departamento de Sistemas." +
                                                                            "</td>" +
                                                                        "</tr>" +
                                                                        "<!-- FOOTER -->" +
                                                                        "<tr>" +
                                                                            "<td class='footer' bgcolor='#44525f'>" +
                                                                                "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                    "<tr>" +
                                                                                        "<td align='center' class='footercopy'>" +
                                                                                        "	&reg; Llaos Acuacultura S.A. de C.V. " + new Date().getFullYear() + 
                                                                                        "</td>" +
                                                                                    "</tr>" +
                                                                                "</table>" +
                                                                            "</td>" +
                                                                        "</tr>" +
                                                                    "</table>" +
                                                                    "<!--[if (gte mso 9)|(IE)]>" +
                                                                "</td>" +
                                                            "</tr>" +
                                                        "</table>" +
                                                        "<![endif]-->" +
                                                    "</td>" +
                                                "</tr>" +
                                            "</table>" +
                                        "</body>" +
                                    "</html>",
                        attachments:[
                            {
                                fileName: 'mail.png',
                                path: './public/imgs/mail.png',
                                cid: 'unique@headerMail'
                            },
                            {
                                fileName: oRuta.codigo + '.pdf',
                                path: './files/ordenRuta' + oRuta.codigo + '.pdf',
                                cid: 'unique@pdf'
                            },
                        ]
                    }

                    smtpTransport.sendMail(mailOptions, function(error,res){
                        if(error){
                            console.log(error);
                        }else{
                            //console.log(res);

                            var updSta = {
                                estatus: 'En Ruta'
                            }

                            OrdenesRuta.updateOne({"_id": oRuta.id}, updSta, function(error){
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            respuesta.render("Compras/ordenes/enviadaGen",
                                                {
                                                    user: solicitud.session.user,
                                                    titulo: 'Orden en Ruta enviada',
                                                    estatus: 'Correctamente',
                                                    msg: 'El viaje esta en ruta, solo queda esperar que reciban los productos.',
                                                    nota: 'Es necesario revisar que todo llegue bien , ' +
                                                        ' favor de revisarlo con el Administrador de Granja.',
                                                    titulo: "Órdenes",
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
                                                    ruta: "ordenes"
                                                }
                                            );
                                        }
                                    });
                                }
                            });
                                                        
                            console.log("Correo enviado!");
                        }
                        smtpTransport.close();
                    });
                }
            });
        };
    },
    eliminarArticuloOrdenRuta: (solicitud, respuesta) => {
        ArticulosEnRuta.deleteOne({"_id": solicitud.params.id}, function(error){
            if(error){
                console.log(error);
            } else {
                OrdenesRuta.findById({"_id": solicitud.params.id_oRuta}, function(error, oRuta){
                    if(error){
                        console.log(error);
                    } else {
                        ArticulosEnRuta.find({"ordenRuta": oRuta.id}, function(error, articulosEnRuta){
                            if(error){
                                console.log(error);
                            } else {
                                Ordenes.populate(articulosEnRuta, {path: "orden"}, function(error, articulosEnRuta){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        Proveedores.populate(articulosEnRuta, {path: "proveedor"}, function(error, articulosEnRuta){
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
                                                                respuesta.render("Compras/ordenes/enruta",
                                                                    {
                                                                        codigo: oRuta.id,
                                                                        folio: oRuta.codigo,
                                                                        user: solicitud.session.user,
                                                                        ordenes: {},
                                                                        unidad: oRuta.unidad,
                                                                        chofer: oRuta.chofer,
                                                                        articulosRuta: articulosEnRuta,
                                                                        proveedores: proveedores,
                                                                        titulo: "Órdenes",
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
                                                                        ruta: "ordenes"
                                                                    }
                                                                ); 
                                                            }
                                                        });
                                                    }
                                                }).sort({ nombreEmpresa : 1}); 
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
    },
    ordenesEnRutaBandeja: (solicitud, respuesta) => {
        OrdenesRuta.find( function(error, oRutas){
            if(solicitud.session.user === undefined){
                respuesta.redirect("/sesion-expirada");
            }else{//Agregar try-catch
                Usuarios.find( function(error, usuarios){
                    if(error){
                        console.log(error);
                    } else { 
                        respuesta.render("Compras/ordenes/ordenesruta", {
                            user: solicitud.session.user,
                            ordersRuta: oRutas,
                            titulo: "Órdenes",
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
                            ruta: "ordenes"
                        });
                    }
                });
            }
        })
    },
    ordenRutaDetalles: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{
            OrdenesRuta.findById({"_id": solicitud.params.id}, function(error, oRuta){
                if(error){
                    console.log(error);
                } else {
                    ArticulosEnRuta.find({"ordenRuta": oRuta.id}, function(error, articulosEnRuta){
                        if(error){
                            console.log(error);
                        } else {
                            Ordenes.populate(articulosEnRuta, {path: "orden"}, function(error, articulosEnRuta){
                                if(error){
                                    console.log(error);
                                } else {
                                    Proveedores.populate(articulosEnRuta, {path: "proveedor"}, function(error, articulosEnRuta){
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
                                                            respuesta.render("Compras/ordenes/verordenruta", 
                                                                {
                                                                    user: solicitud.session.user,
                                                                    oRuta: oRuta,
                                                                    articulosRuta: articulosEnRuta,
                                                                    titulo: "Órdenes",
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
                                                                    ruta: "ordenes"
                                                                }
                                                            );
                                                        }
                                                    });
                                                }
                                            }) 
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
    ordenRutaEntrada: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{ 
            OrdenesRuta.findById({"_id": solicitud.params.id}, function(error, oRuta){
                if(error){
                    console.log(error);
                } else {
                    ArticulosEnRuta.find({"ordenRuta": oRuta.id}, function(error, articulosEnRuta){
                        if(error){
                            console.log(error);
                        } else {
                            Ordenes.populate(articulosEnRuta, {path: "orden"}, function(error, articulosEnRuta){
                                if(error){
                                    console.log(error);
                                } else {
                                    Proveedores.populate(articulosEnRuta, {path: "proveedor"}, function(error, articulosEnRuta){
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
                                                            ArticulosEnRuta.find({"ordenRuta": oRuta.id}, function(error, articulos){
                                                                if(error){
                                                                    console.log(error);
                                                                } else { 
                                                                    respuesta.render("Compras/ordenes/entradaordenruta", 
                                                                {
                                                                    user: solicitud.session.user,
                                                                    oRuta: oRuta,
                                                                    proveedores: proveedores,
                                                                    articulos: articulos,
                                                                    articulosRuta: articulosEnRuta,
                                                                    titulo: "Órdenes",
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
                                                                    ruta: "ordenes"
                                                                }
                                                            );
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            }) 
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
    entradaOrdenRuta: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{ 
           
            var articulos = JSON.parse(solicitud.body.articulos);

            if(solicitud.body.return > 0){
                var articulos_fuera = JSON.parse(solicitud.body.articulos_fuera);
            }
            

            Ordenes.populate(articulos, {path: 'orden'}, (error, articulos) => {
                if(error){
                    console.log(error);
                } else {
                   // console.log(articulos);    
                    
                    articulos.forEach( (art) => {
                        //console.log(art.id);
                        
                        Productos.findOne({"codigo": art.codigo}, (error, producto) => {
                            if(error){
                                console.log(error);
                            } else {
                                //console.log(producto);

                                if(producto.cantidad == NaN){
                                    producto.cantidad = 0;
                                }

                                var data = {
                                    cantidad: parseFloat(parseFloat(art.cantidad) + parseFloat(producto.cantidad)).toFixed(2),
                                    orden: art.orden.serie
                                }

                                Productos.updateOne({"_id": producto.id}, data, (error, arti) => {
                                    if(error){
                                        console.log(error);
                                    } else {
                                        console.log(arti);
                                    }
                                });
                            }
                        });
                    });

                    if(solicitud.body.return > 0){
                        var contenidoTabla = "";

                        console.log(articulos_fuera);

                        Ordenes.populate(articulos_fuera, {path: 'orden'}, (error, articulos_fuera) => {
                            if(error){
                                console.log(error);
                            } else { 
                                articulos_fuera.forEach( (af) => {
                                    contenidoTabla += "<tr>" + 
                                            "<td>" +  parseFloat(af.cantidad).toFixed(3) + "</td>" +
                                            "<td>" +  af.unidad + "</td>" +
                                            "<td>" +  af.codigo + "</td>" +
                                            "<td>" +  af.descripcion + "</td>" +
                                            "<td>" +  af.orden.serie + "</td>" +
                                    "</tr>" 
                                });

                                var mailOptions = {
                                    from: 'Llaos Sist 1.0 <sistema@llaos.com>',
                                    to: 'javier.rappaz@gmail.com',
                                    //to: 'davilar@llaos.com',
                                    //cc: 'jcuamea@llaos.com,jparrilla@llaos.com',
                                    //bcc: 'flopez@llaos.com',
                                    subject: 'Artículos no encontrados en orden en ruta ' + solicitud.body.orden_ruta,
                                    html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
                                                "<html xmlns='http://www.w3.org/1999/xhtml'>" +
                                                    "<head>" +
                                                        "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />" +
                                                        "<title>Requisiciones LLaos 1.0</title>" +
                                                        "<style type='text/css'>" +
                                                            "body {margin: 0; padding: 0; min-width: 100%!important;}" +
                                                            ".content {width: 100%; max-width: 600px;}" +
                                                            "@media only screen and (min-device-width: 601px) {" +
                                                            "	.content {width: 600px !important;}" +
                                                            "	.header {padding: 40px 30px 20px 30px;}" +
                                                            "}" +
                                                            "@media only screen and (min-device-width: 601px) {" +
                                                            "	.content {width: 600px !important;}" +
                                                            "	.col425 {width: 425px!important;}" +
                                                            "	.col380 {width: 380px!important;}" +
                                                            "}" +
                                                            "@media only screen and (max-width: 550px), screen and (max-device-width: 550px) {" +
                                                            "	body[yahoo] .buttonwrapper {background-color: transparent!important;}" +
                                                            "	body[yahoo] .button a {background-color: #e05443; padding: 15px 15px 13px!important; display: block!important;}" +
                                                            "}" +
                                                            ".col425 {width: 425px!important;}" +
                                                            ".subhead {font-size: 15px; color: #ffffff; font-family: sans-serif; letter-spacing: 10px;}" +
                                                            ".h1 {font-size: 33px; line-height: 38px; font-weight: bold;}" +
                                                            ".h1, .h2, .bodycopy {color: #153643; font-family: sans-serif;}" +
                                                            ".innerpadding {padding: 30px 30px 30px 30px; text-align: justify;}" +
                                                            ".borderbottom {border-bottom: 1px solid #f2eeed; text-align: justify;}" +
                                                            ".h2 {padding: 0 0 15px 0; font-size: 24px; line-height: 28px; font-weight: bold;}" +
                                                            ".bodycopy {font-size: 16px; line-height: 22px;  text-align: justify;}" +
                                                            ".button {text-align: center; font-size: 18px; font-family: sans-serif; font-weight: bold; padding: 0 30px 0 30px;}" +
                                                            ".button a {color: #ffffff; text-decoration: none;}" +
                                                            ".footer {padding: 20px 30px 15px 30px;}" +
                                                            ".footercopy {font-family: sans-serif; font-size: 14px; color: #ffffff;}" +
                                                            ".footercopy a {color: #ffffff; text-decoration: underline;}" +
                                                        "</style>" +
                                                    "</head>" +
                                                    "<body yahoo bgcolor='#f6f8f1'>" +
                                                        "<table width='100%' bgcolor='#f6f8f1' border='0' cellpadding='0' cellspacing='0'>" +
                                                            "<tr>" +
                                                                "<td>" +
                                                                    "<!--[if (gte mso 9)|(IE)]>" +
                                                                    "<table width='600' align='center' cellpadding='0' cellspacing='0' border='0'>" +
                                                                        "<tr>" +
                                                                            "<td>" +
                                                                                "<![endif]-->" +
                                                                                "<table class='content' align='center' cellpadding='0' cellspacing='0' border='0'>" +
                                                                                    "<!-- HEADER -->" +
                                                                                    "<tr>" +
                                                                                        "<td class='header' bgcolor='#c7d8a7'>" +
                                                                                            "<table width='70' align='left' border='0' cellpadding='0' cellspacing='0'>" +
                                                                                                "<tr>" +
                                                                                                    "<td height='70' style='padding: 0 20px 20px 0;'>" +
                                                                                                        "<img src='cid:unique@headerMail' width='70' height='70' border='0' alt='' / >" +
                                                                                                    "</td>" +
                                                                                                "</tr>" +
                                                                                            "</table>" +
                                                                                            "<!--[if (gte mso 9)|(IE)]>" +
                                                                                            "<table width='425' align='left' cellpadding='0' cellspacing='0' border='0'>" +
                                                                                                "<tr>" +
                                                                                                    "<td>" +
                                                                                                    "<![endif]-->" +
                                                                                                        "<table class='col425' align='left' border='0' cellpadding='0' cellspacing='0' style='width: 100%; max-width: 425px;'>" +
                                                                                                            "<tr>" +
                                                                                                                "<td height='70'>" +
                                                                                                                    "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                                                        "<tr>" +
                                                                                                                            "<td class='subhead' style='padding: 0 0 0 3px;'>" +
                                                                                                                            "	LLAOS 2.0" +
                                                                                                                            "</td>" +
                                                                                                                        "</tr>" +
                                                                                                                        "<tr>" +
                                                                                                                            "<td class='h1' style='padding: 5px 0 0 0;'>" +
                                                                                                                            "	Ordenes en Ruta" +
                                                                                                                            "</td>" +
                                                                                                                        "</tr>" +
                                                                                                                    "</table>" +
                                                                                                                "</td>" +
                                                                                                            "</tr>" +
                                                                                                        "</table>" + 
                                                                                                    "<!--[if (gte mso 9)|(IE)]>" +
                                                                                                    "</td>" +
                                                                                                "</tr>" +
                                                                                            "</table>" +
                                                                                            "<![endif]-->" +
                                                                                        "</td>" +
                                                                                    "</tr>" +
                                                                                    "<!-- CONTENIDO 1 -->" +
                                                                                    "<tr>" +
                                                                                        "<td class='innerpadding borderbottom'>" +
                                                                                            "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                                "<tr>" +
                                                                                                    "<td class='h2'>" +
                                                                                                    "	Estimado Usuario:" +
                                                                                                    "</td>" +
                                                                                                "</tr>" +
                                                                                                "<tr>" +
                                                                                                    "<td class='bodycopy'>" +
                                                                                                    "   El área de almacen en Granja realizó la entrada de los artículos enviado en la orden en ruta " + solicitud.body.orden_ruta + ", " + 
                                                                                                    "   encontrando inconsistencias en la misma ya que los siguientes artículos no venían dentreo de la unidad." +
                                                                                                    "</td>" +
                                                                                                "</tr>" +
                                                                                            "</table>" +
                                                                                        "</td>" +
                                                                                    "</tr>" +
                                                                                    "<tr>" +
                                                                                        "<td class='innerpadding borderbottom'>" +
                                                                                            "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                                "<tr>" +
                                                                                                    "<th> Cantidad </th>" +
                                                                                                    "<th> Unidad </th>" +
                                                                                                    "<th> Código </th>" +
                                                                                                    "<th> Descripción </th>" +
                                                                                                    "<th> Orden </th>" +
                                                                                                "</tr>" +
                                                                                                contenidoTabla +
                                                                                            "</table>" +
                                                                                        "</td>" +
                                                                                    "</tr>" +
                                                                                    "<!-- CONTENIDO 3 -->" +
                                                                                    "<tr>" +
                                                                                        "<td class='innerpadding borderbottom'>" +
                                                                                        "	Este correo ha sido generado en automático por el sistema" +
                                                                                        "	llaos 1.0, no responda al mismo ya que no tendrá respuesta" +
                                                                                        "	alguna, si usted no es un usuario que autoriza Requisiciones" +
                                                                                        "	favor de reportar el insidente al departamento de sistemas." +
                                                                                        "<br>" +
                                                                                        "<br>" +
                                                                                        "	Cualquier problema con el sistema" +
                                                                                        "	favor de reportar al Departamento de Sistemas." +
                                                                                        "</td>" +
                                                                                    "</tr>" +
                                                                                    "<!-- FOOTER -->" +
                                                                                    "<tr>" +
                                                                                        "<td class='footer' bgcolor='#44525f'>" +
                                                                                            "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                                                                                                "<tr>" +
                                                                                                    "<td align='center' class='footercopy'>" +
                                                                                                    "	&reg; Llaos Acuacultura S.A. de C.V. " + new Date().getFullYear() + 
                                                                                                    "</td>" +
                                                                                                "</tr>" +
                                                                                            "</table>" +
                                                                                        "</td>" +
                                                                                    "</tr>" +
                                                                                "</table>" +
                                                                                "<!--[if (gte mso 9)|(IE)]>" +
                                                                            "</td>" +
                                                                        "</tr>" +
                                                                    "</table>" +
                                                                    "<![endif]-->" +
                                                                "</td>" +
                                                            "</tr>" +
                                                        "</table>" +
                                                    "</body>" +
                                                "</html>",
                                    attachments:[
                                        {
                                            fileName: 'mail.png',
                                            path: './public/imgs/mail.png',
                                            cid: 'unique@headerMail'
                                        }
                                    ]
                                }
        
                                smtpTransport.sendMail(mailOptions, function(error,res){
                                    if(error){
                                        console.log(error);
                                    }else{
                                        console.log("Correo enviado!");
                                        respuesta.redirect('/ordenes/ordenesruta');
                                    }
                                    smtpTransport.close();
                                });
                            }
                        });
                    } else {
                        respuesta.redirect('/ordenes/ordenesruta');
                    }
                }
            });
        }
    },
    cerrarOrdenRuta: function(solicitud, respuesta){
        var data = {
            estatus: "Cerrada"
        }

        OrdenesRuta.updateOne({"_id": solicitud.params.id}, data,function(error){
            if(error){
                console.log(error);
            } else {
                respuesta.redirect("/ordenes/enruta");
            }
        })
    }

}