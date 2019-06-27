var mongoose = require('mongoose');
    TiposCamaron = mongoose.model('TiposCamaron');
    EntradasCamaron = mongoose.model('EntradasInventariosCamaron');
    SalidasCamaron = mongoose.model('SalidasInventariosCamaron');
    LogEntradas = mongoose.model('LogEntradaInventarioCamaron');
    LogSalidas = mongoose.model('LogSalidaInventarioCamaron');
    FechaHora = require('./fechahora');
    zf = require('./zfill');
    nodemailer = require('nodemailer');
	pdf = require('pdfkit');
    
module.exports = {//HAcen falta try-catch a los metodos
    //Método para obtener todos los usuarios
    todos: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else { 
            TiposCamaron.find({"totalKgs": {$gte:1}}, function(error, tipos){
                if(error){
                    console.log(error);
                } else {
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else {
                            var tallas = [
                                { talla:  "16/20" },
                                { talla:  "20/30" },
                                { talla:  "21/25" },
                                { talla:  "26/30" },
                                { talla:  "31/35" },
                                { talla:  "36/40" },
                                { talla:  "40/50" },
                                { talla:  "41/50" },
                                { talla:  "51/60" },
                                { talla:  "61/70" },
                                { talla:  "71/90" },
                                { talla:  "91/110" },
                                { talla:  "Rezagas" }
                            ];
        
                            var presentaciones = [
                                { presentacion: "Frizado 20 kgs" },
                                { presentacion: "Top Open 40lbs" },
                                { presentacion: "IQF 10 x 4" }
                            ]
                            
                            respuesta.render("Administracion/Planta/InventarioCamaron/all",
                                {   
                                    user: solicitud.session.user,
                                    tiposCamaron: tipos,
                                    tallas:  JSON.stringify(tallas),
                                    presentaciones:  JSON.stringify(presentaciones),
                                    titulo: "Inventarios camarón",
                                    criterios: [
                                        {
                                            val: 1,
                                            name: "Remitente"
                                        },
                                        {
                                            val: 2,
                                            name: "Destinatario"
                                        },
                                        {
                                            val: 3,
                                            name: "Almacén"
                                        },
                                        {
                                            val: 4,
                                            name: "Bodega"
                                        },
                                        {
                                            val: 5,
                                            name: "Talla"
                                        },
                                        {
                                            val: 6,
                                            name: "Presentación"
                                        },
                                        {
                                            val: 7,
                                            name: "Tarima"
                                        },
                                        {
                                            val: 8,
                                            name: "Lote de Producción"
                                        },
                                        {
                                            val: 9,
                                            name: "Código Producto"
                                        },
                                        {
                                            val: 10,
                                            name: "Cantidad Master"
                                        },
                                        {
                                            val: 11,
                                            name: "Peso Master"
                                        },
                                        {
                                            val: 12,
                                            name: "Fecha"
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
                                    ruta: "inventarioscamaron"
                                } 
                            );
                        }
                    });
                }
            });
        }
    },
    entrada: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else {
            TiposCamaron.find( function(error, tipos){
                if(error){
                    console.log(error);
                } else {
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render("Administracion/planta/inventariocamaron/entradas/entrada", 
                                {
                                    user: solicitud.session.user,
                                    tipos: tipos,
                                    entrada: {
                                        id: '',
                                        folio: 'ENT00000',
                                        remitente: '',
                                        referencia: '',
                                        destinatario: '',
                                        fecha: '',
                                        hora: '',
                                        total_master: '0.00',
                                        total_kgs: '0.00',
                                        total_lbs: '0.00',
                                        observaciones: '',
                                        almacenista: '',
                                        almacen: '',
                                        articulos: []
                                    },
                                    titulo: "Inventarios camarón",
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
                                    ruta: "inventarioscamaron"
                                }
                            );
                        }
                    });
                }
            });
        }
    },
    salida: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else { 
            TiposCamaron.find({totalKgs: { $gte: 1 } }, function(error, tipos){
                if(error){
                    console.log(error);
                } else {
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render("Administracion/planta/inventariocamaron/salidas/salida", 
                                {
                                    user: solicitud.session.user,
                                    tipos: tipos,
                                    salida: 
                                        {   
                                            id: '',
                                            folio: 'SAL00000',
                                            remitente: '',
                                            referencia: '',
                                            destinatario: '',
                                            fecha: '',
                                            hora: '',
                                            total_master: '0.00',
                                            total_kgs: '0.00',
                                            total_lbs: '0.00',
                                            observaciones: '',
                                            almacenista: '',
                                            almacen: '',
                                            articulos: []
                                        },
                                    titulo: "Inventarios camarón",
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
                                    ruta: "inventarioscamaron"
                                }
                            );
                        }
                    });
                }
            });
        }
    },
    entradas: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else { 
            EntradasCamaron.find( function(error, entradas){
                if(error){
                    console.log(error);
                } else {
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render("Administracion/planta/inventariocamaron/entradas/entradas", 
                                {
                                    user: solicitud.session.user,
                                    entradas: entradas,
                                    url: '',
                                    titulo: "Inventarios camarón",
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
                                    ruta: "inventarioscamaron"
                                }
                            );
                        }
                    });
                }
            });
        }
    },
    salidas: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else { 
            SalidasCamaron.find( function(error, salidas){
                if(error){
                    console.log(error);
                } else {
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.render("Administracion/planta/inventariocamaron/salidas/salidas", 
                                {
                                    user: solicitud.session.user,
                                    salidas: salidas,
                                    url: '',
                                    titulo: "Inventarios camarón",
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
                                    ruta: "inventarioscamaron"
                                }
                            );
                        }
                    });
                }
            });
        }
    },
    buscar: function(solicitud, respuesta){
        // No existe entrada
        if(solicitud.body.codigo == 'undefined'){
            // Buscar por talla
            if(solicitud.body.criterio == 'talla'){
                TiposCamaron.find({"talla": solicitud.body.buscar}, function(error, tipos){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            if(error){
                                console.log(error);
                            } else {
                                respuesta.render("Administracion/planta/inventariocamaron/entradas/editar",
                                    {
                                        user: solicitud.session.user,
                                        tipos: tipos,
                                        tCamaron: '',
                                        entrada: '',
                                        entradas: '',
                                        titulo: "Inventarios camarón",
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
                                        ruta: "inventarioscamaron"
                                    }
                                );
                            }
                        });
                    }
                });
            // Buscar por presentacion
            } else {
                TiposCamaron.find({"presentacion": solicitud.body.buscar}, function(error, tipos){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            if(error){
                                console.log(error);
                            } else {
                                respuesta.render("Administracion/planta/inventariocamaron/salidas/editar",
                                    {
                                        user: solicitud.session.user,
                                        tipos: tipos,
                                        tCamaron: '',
                                        entrada: '',
                                        entradas: '',
                                        titulo: "Inventarios camarón",
                                        criterios: [
                                            {
                                                val: "",
                                                name: ""
                                            },
                                        ],
                                        usuarios: usuarios,
                                        ruta: "inventarioscamaron"
                                    }
                                );
                            }
                        });
                    }
                });
            }
        // Existe entrada
        } else {
            // Buscar por talla
            if(solicitud.body.criterio == 'talla'){
                TiposCamaron.find({"talla": solicitud.body.buscar}, function(error, tipos){
                    if(error){
                        console.log(error);
                    } else {
                        EntradasCamaron.findById({"_id": solicitud.body.codigo}, function(error, entrada){
                            if(error){
                                console.log(error);
                            } else {
                                ArticuloEntradaCamaron.find({"entrada": entrada.id}, function(error, entradas){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        Usuarios.find( function(error, usuarios){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                respuesta.render("Administracion/planta/inventariocamaron/entrada",
                                                    {
                                                        user: solicitud.session.user,
                                                        tipos: tipos,
                                                        tCamaron: '',
                                                        entrada: entrada,
                                                        entradas: entradas,
                                                        titulo: "Inventarios camarón",
                                                        criterios: [
                                                            {
                                                                val: "",
                                                                name: ""
                                                            },
                                                        ],
                                                        usuarios: usuarios,
                                                        ruta: "inventarioscamaron"
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
            // Buscar por presentacion
            } else {
                TiposCamaron.find({"presentacion": solicitud.body.buscar}, function(error, tipos){
                    if(error){
                        console.log(error);
                    } else {
                        EntradasCamaron.findById({"_id": solicitud.body.codigo}, function(error, entradas){
                            if(error){
                                console.log(error);
                            } else {
                                ArticuloEntradaCamaron.find({"entrada": entrada.id}, function(error, entradas){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        Usuarios.find( function(error, usuarios){
                                            if(error){
                                                console.log(error);
                                            } else {
                                                respuesta.render("Administracion/planta/inventariocamaron/entrada",
                                                    {
                                                        user: solicitud.session.user,
                                                        tipos: tipos,
                                                        tCamaron: '',
                                                        entrada: entrada,
                                                        entradas: entradas,
                                                        titulo: "Inventarios camarón",
                                                        criterios: [
                                                            {
                                                                val: "",
                                                                name: ""
                                                            },
                                                        ],
                                                        usuarios: usuarios,
                                                        ruta: "inventarioscamaron"
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
        }
    },
    agregarEntrada: function(solicitud, respuesta){
        var articulos = JSON.parse(solicitud.body.entradas);
        var articulo = JSON.parse(solicitud.body.articulo);

        console.log(articulos);

        /*if(solicitud.body.codigo == ''){
            EntradasCamaron.find(function(error, entradas){
                if(error){
                    console.log(error);
                } else {
                    var folio = "ENT" +  zf.zfill( entradas.length + 1, 5);
        
                    var dataEntrada = {
                        folio: folio,
                        remitente: solicitud.body.remitente,
                        referencia: solicitud.body.referencia,
                        destinatario: solicitud.body.destinatario,
                        fecha: FechaHora.obtenerfecha(),
                        hora: FechaHora.obtenerhora(),
                        total_master: solicitud.body.totalMaster,
                        total_kgs: solicitud.body.totalKgs,
                        total_lbs: solicitud.body.totalLbs,
                        observaciones: solicitud.body.observaciones,
                        almacenista: solicitud.session.user.nombre,
                        almacen: solicitud.body.almacen,
                        articulos: articulos
                    }
        
                    entrada = new EntradasCamaron(dataEntrada);
        
                    entrada.save( function(error, et){
                        if(error){
                            console.log(error);
                        } else {
                                var idEnt = et._id;

                                TiposCamaron.findById({ "_id": articulo.tipoCamaron.trim()}, function(error, tipoCamaron){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        if(tipoCamaron.totalKgs == 'undefined' || tipoCamaron.totalKgs == 'NaN' || tipoCamaron.totalKgs == undefined){
                                            tipoCamaron.totalKgs = 0;
                                        }
            
                                        if(tipoCamaron.cantidadMaster == 'undefined' || tipoCamaron.cantidadMaster == 'NaN' || tipoCamaron.cantidadMaster == undefined){
                                            tipoCamaron.cantidadMaster = 0;
                                        }
            
                                        var dataUpd = {
                                            totalKgs: parseFloat(tipoCamaron.totalKgs) + parseFloat(articulo.total_kgs),
                                            cantidadMaster: parseFloat(tipoCamaron.cantidadMaster) + parseFloat(articulo.cantidad_master)
                                        }
            
                                        var dataLog = {
                                            idEntrada: idEnt,
                                            idTipoCam: tipoCamaron.id,
                                            cantidadMaster: articulo.cantidad_master,
                                            cantidadEntrada: parseFloat(articulo.total_kgs).toFixed(2),
                                            cantidadInventario: parseFloat(tipoCamaron.totalKgs).toFixed(2)
                                        }
            
                                        TiposCamaron.updateOne({"_id": tipoCamaron.id}, dataUpd, function(error){
                                            if(error){
                                                console.log(error);
                                            } else {
                    
                                                var logEntrada = new LogEntradas(dataLog);
            
                                                logEntrada.save( function(error){
                                                    if(error){
                                                        console.log(error);
                                                    } else {
                                                        TiposCamaron.find( function(error, tipos){
                                                            if(error){
                                                                console.log(error);
                                                            } else {
                                                                EntradasCamaron.findById({"_id": idEnt}, function(error, ent){
                                                                    if(error){
                                                                        console.log(error);
                                                                    } else {
                                                                        Usuarios.find( function(error, usuarios){
                                                                            if(error){
                                                                                console.log(error);
                                                                            } else {
                                                                                respuesta.render("Administracion/planta/inventariocamaron/entradas/entrada", 
                                                                                    {
                                                                                        user: solicitud.session.user,
                                                                                        tipos: tipos,
                                                                                        entrada: ent,
                                                                                        titulo: "Inventarios camarón",
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
                                                                                        ruta: "inventarioscamaron"
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
                                        })
                                    }
                                });
                        }
                    });
                } 
            });
        } else {
            var dataEntrada = {
                remitente: solicitud.body.remitente,
                referencia: solicitud.body.referencia,
                destinatario: solicitud.body.destinatario,
                total_master: solicitud.body.totalMaster,
                total_kgs: solicitud.body.totalKgs,
                total_lbs: solicitud.body.totalLbs,
                observaciones: solicitud.body.observaciones,
                almacenista: solicitud.session.user.nombre,
                articulos: articulos
            }
            
            EntradasCamaron.updateOne({"_id": solicitud.body.codigo}, dataEntrada, function(error){
                if(error){
                    console.log(error);
                } else {
                    TiposCamaron.findById({ "_id": articulo.tipoCamaron}, function(error, tipoCamaron){
                        if(error){
                            console.log(error);
                        } else {
                            if(tipoCamaron.totalKgs == 'undefined' || tipoCamaron.totalKgs == 'NaN' || tipoCamaron.totalKgs == undefined){
                                tipoCamaron.totalKgs = 0;
                            }

                            if(tipoCamaron.cantidadMaster == 'undefined' || tipoCamaron.cantidadMaster == 'NaN' || tipoCamaron.cantidadMaster == undefined){
                                tipoCamaron.cantidadMaster = 0;
                            }

                            var dataUpd = {
                                totalKgs: parseFloat(tipoCamaron.totalKgs) + parseFloat(articulo.total_kgs),
                                cantidadMaster: parseFloat(tipoCamaron.cantidadMaster) + parseFloat(articulo.cantidad_master)
                            }

                            var dataLog = {
                                idEntrada: solicitud.body.codigo,
                                idTipoCam: tipoCamaron.id,
                                cantidadMaster: articulo.cantidad_master,
                                cantidadEntrada: parseFloat(articulo.total_kgs).toFixed(2),
                                cantidadInventario: parseFloat(tipoCamaron.totalKgs).toFixed(2)
                            }

                            TiposCamaron.updateOne({"_id": tipoCamaron.id}, dataUpd, function(error, res){
                                if(error){
                                    console.log(error);
                                } else {
                                    var logEntrada = new LogEntradas(dataLog);

                                    logEntrada.save( function(error, res){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            TiposCamaron.find( function(error, tipos){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    EntradasCamaron.findById({"_id":  solicitud.body.codigo}, function(error, ent){
                                                        if(error){
                                                            console.log(error);
                                                        } else {
                                                            Usuarios.find( function(error, usuarios){
                                                                if(error){
                                                                    console.log(error);
                                                                } else {
                                                                    respuesta.render("Administracion/planta/inventariocamaron/entradas/entrada", 
                                                                        {
                                                                            user: solicitud.session.user,
                                                                            tipos: tipos,
                                                                            entrada: ent,
                                                                            titulo: "Inventarios camarón",
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
                                                                            ruta: "inventarioscamaron"
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
                            })
                        }
                    });
                }
            });
        }*/
    },
    agregarSalida: function(solicitud, respuesta){
        var articulos = JSON.parse(solicitud.body.salidas);
        var articulo = JSON.parse(solicitud.body.articulo);

        if(solicitud.body.codigo == ''){
            SalidasCamaron.find(function(error, salidas){
                if(error){
                    console.log(error);
                } else {
                    var folio = "SAL" +  zf.zfill( salidas.length + 1, 5);
        
                    var dataSalida = {
                        folio: folio,
                        remitente: solicitud.body.remitente,
                        referencia: solicitud.body.referencia,
                        destinatario: solicitud.body.destinatario,
                        fecha: FechaHora.obtenerfecha(),
                        hora: FechaHora.obtenerhora(),
                        total_master: solicitud.body.totalMaster,
                        total_kgs: solicitud.body.totalKgs,
                        total_lbs: solicitud.body.totalLbs,
                        observaciones: solicitud.body.observaciones,
                        almacenista: solicitud.session.user.nombre,
                        almacen: solicitud.body.almacen,
                        articulos: articulos
                    }
        
                    salida = new SalidasCamaron(dataSalida);
        
                    salida.save( function(error, sa){
                        if(error){
                            console.log(error);
                        } else {
                                var idSal = sa._id;

                                TiposCamaron.findById({ "_id": articulo.tipoCamaron.trim()}, function(error, tipoCamaron){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        if(tipoCamaron.totalKgs == 'undefined' || tipoCamaron.totalKgs == 'NaN' || tipoCamaron.totalKgs == undefined){
                                            tipoCamaron.totalKgs = 0;
                                        }
            
                                        if(tipoCamaron.cantidadMaster == 'undefined' || tipoCamaron.cantidadMaster == 'NaN' || tipoCamaron.cantidadMaster == undefined){
                                            tipoCamaron.cantidadMaster = 0;
                                        }
            
                                        var dataUpd = {
                                            totalKgs: parseFloat(tipoCamaron.totalKgs) - parseFloat(articulo.total_kgs),
                                            cantidadMaster: parseFloat(tipoCamaron.cantidadMaster) - parseFloat(articulo.cantidad_master)
                                        }
            
                                        var dataLog = {
                                            idSalida: idSal,
                                            idTipoCam: tipoCamaron.id,
                                            cantidadMaster: articulo.cantidad_master,
                                            cantidadEntrada: parseFloat(articulo.total_kgs).toFixed(2),
                                            cantidadInventario: parseFloat(tipoCamaron.totalKgs).toFixed(2)
                                        }
            
                                        TiposCamaron.updateOne({"_id": tipoCamaron.id}, dataUpd, function(error){
                                            if(error){
                                                console.log(error);
                                            } else {
                    
                                                var logSal = new LogSalidas(dataLog);
            
                                                logSal.save( function(error){
                                                    if(error){
                                                        console.log(error);
                                                    } else {
                                                        TiposCamaron.find( function(error, tipos){
                                                            if(error){
                                                                console.log(error);
                                                            } else {
                                                                SalidasCamaron.findById({"_id": idSal}, function(error, sal){
                                                                    if(error){
                                                                        console.log(error);
                                                                    } else {
                                                                        Usuarios.find( function(error, usuarios){
                                                                            if(error){
                                                                                console.log(error);
                                                                            } else {
                                                                                respuesta.render("Administracion/planta/inventariocamaron/salidas/salida", 
                                                                                    {
                                                                                        user: solicitud.session.user,
                                                                                        tipos: tipos,
                                                                                        salida: sal,
                                                                                        titulo: "Inventarios camarón",
                                                                                        criterios: [
                                                                                            {
                                                                                                val: "",
                                                                                                name: ""
                                                                                            },
                                                                                        ],
                                                                                        usuarios: usuarios,
                                                                                        ruta: "inventarioscamaron"
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
                                        })
                                    }
                                });
                        }
                    });
                } 
            });
        } else {
            var dataSalida = {
                remitente: solicitud.body.remitente,
                referencia: solicitud.body.referencia,
                destinatario: solicitud.body.destinatario,
                total_master: solicitud.body.totalMaster,
                total_kgs: solicitud.body.totalKgs,
                total_lbs: solicitud.body.totalLbs,
                observaciones: solicitud.body.observaciones,
                almacenista: solicitud.session.user.nombre,
                articulos: articulos
            }
            
            SalidasCamaron.updateOne({"_id": solicitud.body.codigo}, dataSalida, function(error){
                if(error){
                    console.log(error);
                } else {
                    TiposCamaron.findById({ "_id": articulo.tipoCamaron}, function(error, tipoCamaron){
                        if(error){
                            console.log(error);
                        } else {
                            if(tipoCamaron.totalKgs == 'undefined' || tipoCamaron.totalKgs == 'NaN' || tipoCamaron.totalKgs == undefined){
                                tipoCamaron.totalKgs = 0;
                            }

                            if(tipoCamaron.cantidadMaster == 'undefined' || tipoCamaron.cantidadMaster == 'NaN' || tipoCamaron.cantidadMaster == undefined){
                                tipoCamaron.cantidadMaster = 0;
                            }

                            var dataUpd = {
                                totalKgs: parseFloat(tipoCamaron.totalKgs) - parseFloat(articulo.total_kgs),
                                cantidadMaster: parseFloat(tipoCamaron.cantidadMaster) - parseFloat(articulo.cantidad_master)
                            }

                            var dataLog = {
                                idSalida: solicitud.body.codigo,
                                idTipoCam: tipoCamaron.id,
                                cantidadMaster: articulo.cantidad_master,
                                cantidadEntrada: parseFloat(articulo.total_kgs).toFixed(2),
                                cantidadInventario: parseFloat(tipoCamaron.totalKgs).toFixed(2)
                            }

                            TiposCamaron.updateOne({"_id": tipoCamaron.id}, dataUpd, function(error){
                                if(error){
                                    console.log(error);
                                } else {
                                    var logSalida = new LogSalidas(dataLog);

                                    logSalida.save( function(error){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            TiposCamaron.find( function(error, tipos){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    SalidasCamaron.findById({"_id":  solicitud.body.codigo}, function(error, sal){
                                                        if(error){
                                                            console.log(error);
                                                        } else {
                                                            Usuarios.find( function(error, usuarios){
                                                                if(error){
                                                                    console.log(error);
                                                                } else {
                                                                    respuesta.render("Administracion/planta/inventariocamaron/salidas/salida", 
                                                                        {
                                                                            user: solicitud.session.user,
                                                                            tipos: tipos,
                                                                            salida: sal,
                                                                            titulo: "Inventarios camarón",
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
                                                                            ruta: "inventarioscamaron"
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
                            })
                        }
                    });
                }
            });
        }
    },
    editarEntrada: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else {
            EntradasCamaron.findById({"_id": solicitud.params.id}, function(error, entrada){
                if(error){
                    console.log(error);
                } else {
                    TiposCamaron.find( function(error, tipos){
                        if(error){
                            console.log(error);
                        } else {
                            entrada.articulos = JSON.stringify(entrada.articulos);

                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else {
                                    respuesta.render("Administracion/planta/inventariocamaron/entradas/editar", 
                                        {
                                            user: solicitud.session.user,
                                            tipos: tipos,
                                            entrada: entrada,
                                            titulo: "Inventarios camarón",
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
                                            ruta: "inventarioscamaron"
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
    editarSalida: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else {
            SalidasCamaron.findById({"_id": solicitud.params.id}, function(error, salida){
                if(error){
                    console.log(error);
                } else {
                    TiposCamaron.find({totalKgs: { $gte: 1 } }, function(error, tipos){
                        if(error){
                            console.log(error);
                        } else { 
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else {
                                    respuesta.render("Administracion/planta/inventariocamaron/salidas/editar", 
                                        {
                                            user: solicitud.session.user,
                                            tipos: tipos,
                                            salida: salida,
                                            titulo: "Inventarios camarón",
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
                                            ruta: "inventarioscamaron"
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
    pdf: function(solicitud, respuesta){
        if(solicitud.session.user == 'undefined'){
            respuesta.redirect("/sesion-expirada");
        } else {      
            var lista = [];

            switch(solicitud.body.criterio) {
                case "1": /* REMITENTE */
                    LogEntradas.find( function(error, logEn){
                        if(error){
                            console.log(error);
                        } else {
                            EntradasCamaron.populate(logEn, {path: 'idEntrada'}, function(error, logEn){
                                if(error){
                                    console.log(error);
                                } else {
                                    TiposCamaron.populate(logEn, {path: 'idTipoCam'}, function(error, logEn){
                                        if(error){
                                            console.log(error);
                                        } else {

                                            logEn.forEach( function(lg){
                                                var obj = new Object();
                                                if(lg.idEntrada.remitente.toUpperCase() == solicitud.body.input.toUpperCase()){
                                                    obj.movimiento = 'Entrada';
                                                    obj.remitente = lg.idEntrada.remitente;
                                                    obj.destinatario = lg.idEntrada.destinatario;
                                                    obj.talla = lg.idTipoCam.talla;
                                                    obj.presentacion = lg.idTipoCam.presentacion;
                                                    obj.fecha = lg.idEntrada.fecha;
                                                    obj.cantidadMaster = lg.cantidadMaster;
                                                    obj.totalKgs = lg.cantidadEntrada;
                                                    obj.totalLbs = (parseFloat( lg.cantidadEntrada) * 2.20462).toFixed(2);
                                                    obj.inventarioAnterior = lg.cantidadInventario;
                                                    obj.inventarioNuevo = (parseFloat(lg.cantidadInventario) + parseFloat( lg.cantidadEntrada)).toFixed(2);
                                                    lista.push(obj);
                                                }
                                            });     

                                            LogSalidas.find( function(error,logSa){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    SalidasCamaron.populate(logSa, {path: 'idSalida'}, function(error, logSa){
                                                        if(error){
                                                            console.log(error);
                                                        } else {
                                                            TiposCamaron.populate(logSa, {path: 'idTipoCam'}, function(error, logSa){
                                                                if(error){
                                                                    console.log(error);
                                                                } else {
                        
                                                                    logSa.forEach( function(ls){ 
                                                                        var obj = new Object();
                                                                        console.log(ls);
                                                                        if(ls.idSalida.remitente.toUpperCase() == solicitud.body.input.toUpperCase()){
                                                                            obj.movimiento = 'Salida';
                                                                            obj.remitente = ls.idSalida.remitente;
                                                                            obj.destinatario = ls.idSalida.destinatario;
                                                                            obj.talla = ls.idTipoCam.talla;
                                                                            obj.presentacion = ls.idTipoCam.presentacion;
                                                                            obj.fecha = ls.idSalida.fecha;
                                                                            obj.cantidadMaster = ls.cantidadMaster;
                                                                            obj.totalKgs = ls.cantidadEntrada;
                                                                            obj.totalLbs = (parseFloat( ls.cantidadEntrada) * 2.20462).toFixed(2);
                                                                            obj.inventarioAnterior = ls.cantidadInventario;
                                                                            obj.inventarioNuevo = (parseFloat(ls.cantidadInventario) - parseFloat( ls.cantidadEntrada)).toFixed(2);
                                                                            lista.push(obj);
                                                                            console.log(obj);
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            })

                                            var tallas = [
                                                { talla:  "16/20" },
                                                { talla:  "20/30" },
                                                { talla:  "21/25" },
                                                { talla:  "26/30" },
                                                { talla:  "31/35" },
                                                { talla:  "36/40" },
                                                { talla:  "40/50" },
                                                { talla:  "41/50" },
                                                { talla:  "51/60" },
                                                { talla:  "61/70" },
                                                { talla:  "71/90" },
                                                { talla:  "91/110" },
                                                { talla:  "Rezagas" }
                                            ];
                        
                                            var presentaciones = [
                                                { presentacion: "Frizado 20 kgs" },
                                                { presentacion: "Top Open 40lbs" },
                                                { presentacion: "IQF 10 x 4" }
                                            ]
                                            
                                            TiposCamaron.find( function(error, tiposCamaron){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        if(error){
                                                            console.log(error);
                                                        } else {
                                                            Usuarios.find( function(error, usuarios){
                                                                if(error){
                                                                    console.log(error);
                                                                } else {
                                                                    respuesta.render("Administracion/planta/inventariocamaron/inventarios",
                                                                        {   
                                                                            user: solicitud.session.user,
                                                                            tiposCamaron: tiposCamaron,
                                                                            tallas:  JSON.stringify(tallas),
                                                                            presentaciones:  JSON.stringify(presentaciones),
                                                                            usuarios: usuarios,
                                                                            url: reportePdf('Remitente', solicitud.body.input, lista),
                                                                            titulo: "Inventarios camarón",
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
                                                                            ruta: "inventarioscamaron"
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
                    break;
                case "2": /* DESTINATARIO */ 
                    LogSalidas.find( function(error, logSl){
                        if(error){
                            console.log(error);
                        } else {
                            SalidasCamaron.populate(logSl, {path: 'idSalida'}, function(error, logSl){
                                if(error){
                                    console.log(error);
                                } else {
                                    TiposCamaron.populate(logSl, {path: 'idTipoCam'}, function(error, logSl){
                                        if(error){
                                            console.log(error);
                                        } else {

                                            logSl.forEach( function(lg){
                                                var obj = new Object();
                                                if(lg.idSalida.destinatario.toUpperCase() == solicitud.body.input.toUpperCase()){
                                                    obj.movimiento = 'Salida';
                                                    obj.remitente = lg.idSalida.remitente;
                                                    obj.destinatario = lg.idSalida.destinatario;
                                                    obj.talla = lg.idTipoCam.talla;
                                                    obj.presentacion = lg.idTipoCam.presentacion;
                                                    obj.fecha = lg.idSalida.fecha;
                                                    obj.cantidadMaster = lg.cantidadMaster;
                                                    obj.totalKgs = lg.cantidadEntrada;
                                                    obj.totalLbs = (parseFloat( lg.cantidadEntrada) * 2.20462).toFixed(2);
                                                    obj.inventarioAnterior = lg.cantidadInventario;
                                                    obj.inventarioNuevo = (parseFloat(lg.cantidadInventario) + parseFloat( lg.cantidadEntrada)).toFixed(2);
                                                    lista.push(obj);
                                                }
                                            });     

                                            var tallas = [
                                                { talla:  "16/20" },
                                                { talla:  "20/30" },
                                                { talla:  "21/25" },
                                                { talla:  "26/30" },
                                                { talla:  "31/35" },
                                                { talla:  "36/40" },
                                                { talla:  "40/50" },
                                                { talla:  "41/50" },
                                                { talla:  "51/60" },
                                                { talla:  "61/70" },
                                                { talla:  "71/90" },
                                                { talla:  "91/110" },
                                                { talla:  "Rezagas" }
                                            ];
                        
                                            var presentaciones = [
                                                { presentacion: "Frizado 20 kgs" },
                                                { presentacion: "Top Open 40lbs" },
                                                { presentacion: "IQF 10 x 4" }
                                            ]
                                            
                                            TiposCamaron.find( function(error, tiposCamaron){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        if(error){
                                                            console.log(error);
                                                        } else {
                                                            Usuarios.find( function(error, usuarios){
                                                                if(error){
                                                                    console.log(error);
                                                                } else {
                                                                    respuesta.render("Administracion/planta/inventariocamaron/inventarios",
                                                                        {   
                                                                            user: solicitud.session.user,
                                                                            tiposCamaron: tiposCamaron,
                                                                            tallas:  JSON.stringify(tallas),
                                                                            presentaciones:  JSON.stringify(presentaciones),
                                                                            usuarios: usuarios,
                                                                            url: reportePdf('Destinatario', solicitud.body.input, lista),
                                                                            titulo: "Inventarios camarón",
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
                                                                            ruta: "inventarioscamaron"
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
                case "3": /* BODEGA */
                    //code block
                    //break;
                case "4": /* TARIMA */
                    //code block
                    //break;
                case "5": /* TALLA */
                    //code block
                    //break;
                case "6": /* PRESENTACION */
                case "7": /* LOTE PRODUCCIÓN */
                case "8": /* CÓDIGO PRODUCCIÓN */
                case "9": /* CANTIDAD MASTER */
                case "10": /* PESO MASTER */
                case "11": /* FECHA */

                default:
                    //code block
            }
        } 
    },
    generarPdfEntrada: function(solicitud, respuesta){
        EntradasCamaron.findById({"_id": solicitud.params.id}, function(error, entrada){
            if(error){
                console.log(error);
            } else {
                var ruta_archivo = './files/InventariosCamaron/Entradas/'
                var nombre_archivo = entrada.folio + '.pdf';
                
                EntradasCamaron.find(function(error, entradas){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            if(error){
                                console.log(error);
                            } else {
                                respuesta.render("Administracion/planta/inventariocamaron/entradas/entradas", 
                                    {   
                                        user: solicitud.session.user,
                                        entradas: entradas,
                                        url: generarPdf("Entrada",  entrada.articulos, entrada, ruta_archivo, nombre_archivo, solicitud.session.user),
                                        titulo: "Inventarios camarón",
                                        criterios: [
                                            {
                                                val: "",
                                                name: ""
                                            },
                                        ],
                                        usuarios: usuarios,
                                        ruta: "inventarioscamaron"
                                    }
                                );
                            }
                        });
                    }
                });
            }
        });
    },
    generarPdfSalida: function(solicitud, respuesta){
        SalidasCamaron.findById({"_id": solicitud.params.id}, function(error, salida){
            if(error){
                console.log(error);
            } else {
                var ruta_archivo = './files/InventariosCamaron/Salidas/'
                var nombre_archivo = salida.folio + '.pdf';
                
                SalidasCamaron.find(function(error, salidas){
                    if(error){
                        console.log(error);
                    } else {
                        Usuarios.find( function(error, usuarios){
                            if(error){
                                console.log(error);
                            } else {
                                respuesta.render("Administracion/planta/inventariocamaron/salidas/salidas", 
                                    {   
                                        user: solicitud.session.user,
                                        salidas: salidas,
                                        url: generarPdf("Salida", salida.articulos, salida, ruta_archivo, nombre_archivo, solicitud.session.user),
                                        titulo: "Inventarios camarón",
                                        criterios: [
                                            {
                                                val: "",
                                                name: ""
                                            },
                                        ],
                                        usuarios: usuarios,
                                        ruta: "inventarioscamaron"
                                    }
                                );
                            }
                        });
                    }
                });
            }
        });
    }

}

function generarPdf(tipo, articulos, obj, ruta, nombre, usuario){
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
    .text( tipo + " Camarón",{ align: 'right' , width: 290})
    .text("Fecha: "+ FechaHora.obtenerfecha() + " " + FechaHora.obtenerhora(),{ align: 'right' , width: 290})
    
    // Serie de la orden I = insumos M = mantenimientos
    doc.font('fonts/Roboto-Black.ttf')
    .text("Referencia: " + obj.referencia, {align: 'right', width: 290})
    doc.font('fonts/Roboto-Regular.ttf')
    .fontSize(11)
    if(tipo == 'Entrada'){
        doc.text("Recibió: " + obj.almacenista, 200, 130, { align: 'right', width: 400}) 
    } else if(tipo == 'Salida'){
        doc.text("Entregó: " + obj.almacenista, 200, 130, { align: 'right', width: 400}) 
    } 

    // Cuadro orden de compra y orden número
    doc.font('fonts/Roboto-Regular.ttf')
    doc.lineWidth(25)
    doc.lineCap('butt')
    .moveTo(400, 160)
    .lineTo(600, 160)
    .stroke()

    doc.fontSize(12)
    .fill('white')
    .text("Folio", 485, 150)

    doc.polygon([401,170],[599,170],[599,195],[401,195])
    .lineWidth(2)
    .stroke()
    
    doc.fill('black')
    .font('fonts/Roboto-Black.ttf')
    doc.text(obj.folio, 395, 175, { align: 'center' , width: 200})

    // Datos de la empresa
    doc.fillColor('black')
    .font('fonts/Roboto-Regular.ttf')
    doc.text("Flavio Borquez #1603 A", 15, 140, { align: 'left', width: 200})
    .text("Col. Prados del Tepeyac", { align: 'left', width: 200})
    .text("C.P. 85150, Cd. Obregón, Sonora.", { align: 'left', width: 200})

    // Datos remitente
    doc.font('fonts/Roboto-Black.ttf')
    .text("Remitente", 15, 200, { align: 'left', width: 200})
    .font('fonts/Roboto-Regular.ttf')
    .text(obj.remitente, 15, 215, { align: 'left'})	

    // Datos destinatario
    doc.font('fonts/Roboto-Black.ttf')
    .text("Destinatario", 245, 200, { align: 'left', width: 200})
    .font('fonts/Roboto-Regular.ttf')
    .text( obj.destinatario, { align: 'left', width: 800})	

    // Encabezados tabla
    doc.lineWidth(25)
    doc.lineCap('butt')
    .fillColor("blue")
    .moveTo(15, 250)
    .lineTo(600, 250)
    .stroke()

    // Títulos encabezados
    doc.fontSize(10)
    .fill('white')
    .text("Bodega", 17, 241, {align: 'center', width: 45})
    .text("# Tarima", 59, 241,  {align: 'center', width: 80})
    .text("Talla",121, 241, {align: 'center', width: 80})
    .text("Lote Producción",183, 236, {align: 'center', width: 70})
    .text("Código Producto",255, 236, {align: 'center', width: 70})
    .text("Cantidad Master",320, 236, {align: 'center', width: 70})
    .text("Peso Master",400, 236, {align: 'center', width: 50})
    .text("Total Kgs",461, 241, {align: 'center', width: 45})
    .text("Presentación",520, 241, {align: 'center', width: 80})

    // Contenido
    var y = 250
    var oPage = false;

    articulos.forEach(function(art) {
        y += 15;

        if( y == 625){
            doc.addPage()
            y = 40;
            oPage = true;
        }

        doc.fillColor('black')
        .fontSize(10)
        .text(art.bod.trim(), 17, y, {align: 'center', width: 45})
        .text(art.tarima.trim(), 59, y,  {align: 'center', width: 80})
        .text(ltrim(rtrim(art.talla)), 121, y, {align: 'center', width: 80})
        .text(ltrim(rtrim(art.lote_prod)), 183, y, {align: 'center', width: 70})
        .text(ltrim(rtrim(art.codigo_prod)), 255, y, {align: 'center', width: 70})
        .text(ltrim(rtrim(art.cantidad_master)), 320, y, {align: 'center', width: 70})
        .text(ltrim(rtrim(art.peso_master)), 400, y, {align: 'center', width: 50})
        .text(ltrim(rtrim(art.total_kgs)), 461, y, {align: 'center', width: 45})
        .text(ltrim(rtrim(art.presentacion)), 520, y, {align: 'center', width: 80})
    });
                    
    if(oPage == true){
        doc.rect(15, y + 25, 585, 3)
        .fill('black')

        // Conciciones / Observaciones / Comentarios
        doc.font('fonts/Roboto-Black.ttf')
        .text("Condiciones / Observaciones / Comentarios", 15, y + 30, { align: 'left', width: 300 })
        .font('fonts/Roboto-Regular.ttf')    
        .text("Total Master: " + obj.total_master, 250, y + 30, { align: 'left', width: 120 })
        .text("Total Kgs: " + obj.total_kgs, 380, y + 30, { align: 'left', width: 120 })
        .text("Total Lbs: " + obj.total_lbs, 500, y + 30, { align: 'left', width: 120 })
        .text(obj.observaciones, 15, y + 40 , { align: 'left', width: 480 })
    
        if(tipo == 'Salida'){
            // Firmas
            doc.rect(55, y + 120, 168, 2)
            .fill('black')
            .text("AUTORIZÓ", 119, y + 130)

            .rect(238, y + 120, 168, 2)
            .fill('black')
            .text("ENTREGÓ", 302, y + 130)

            .rect(421, y + 120, 168, 2)
            .fill('black')
            .text("CLIENTE", 485, y + 130)
        }

    } else {
        // División productos y totales
        doc.rect(15, 635, 585, 2)
        .fill('black')

        // Conciciones / Observaciones / Comentarios
        doc.font('fonts/Roboto-Black.ttf')
        .text("Condiciones / Observaciones / Comentarios", 15, 640, { align: 'left', width: 300 })
        .font('fonts/Roboto-Regular.ttf')    
        .text("Total Master: " + obj.total_master, 250, 640, { align: 'left', width: 120 })
        .text("Total Kgs: " + obj.total_kgs, 380, 640, { align: 'left', width: 120 })
        .text("Total Lbs: " + obj.total_lbs, 500, 640, { align: 'left', width: 120 })
        .text(obj.observaciones, 15, 655, { align: 'left', width: 480 })
        
        if(tipo == 'Salida'){
            // Firmas
            doc.lineWidth(1)
            .lineCap('butt')
            .moveTo(55, 700)
            .lineTo(223, 700)
            .stroke()
            .text("AUTORIZÓ", 119, 705)

            .lineCap('butt')
            .moveTo(238, 700)
            .lineTo(406, 700)
            .stroke()
            .text("ENTREGÓ", 302, 705)

            .lineCap('butt')
            .moveTo(421, 700)
            .lineTo(589, 700)
            .stroke()
            .text("CLIENTE", 485, 705)
        }

    }

    doc.pipe(fs.createWriteStream(ruta + nombre)).on('finish', function (){
        console.log('PDF closed');
    });

    // Finalize PDF file
    doc.end();
    
    return nombre;
}

function reportePdf(titulo, subtitulo, articulos){
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
    .text('REPORTE INVENTARIOS POR ' + titulo.toUpperCase(), { align: 'right', width: 290 })
    
    // Nombre formato, fecha y hora de creación
    doc.font('fonts/Roboto-Regular.ttf')
    .fontSize(14)
    .text(titulo + ": "+ subtitulo.toUpperCase(), { align: 'right' , width: 290})  
    .text("Fecha: "+ FechaHora.obtenerfecha() + " " + FechaHora.obtenerhora(),{ align: 'right' , width: 290})
                                                                                                    
    // Encabezados tabla
    doc.lineWidth(25)
    doc.lineCap('butt')
    .fillColor("blue")
    .moveTo(15, 150)
    .lineTo(780, 150)
    .stroke()
    
    doc.fontSize(10)
    .fill('white')
    .text("Movimiento", 10, 142, {align: 'center', width: 70})
    .text("Remitente", 85, 142,  {align: 'center', width: 100})
    .text("Destinatario", 185, 142, {align: 'center', width: 100})
    .text("Talla", 275, 142, {align: 'center', width: 50})
    .text("Presentación", 325, 142, {align: 'center', width: 60})
    .text("Fecha", 400, 142, {align: 'center', width: 50})
    .text("Cant. Master", 445, 142, {align: 'center', width: 80})
    .text("Total Kgs", 510, 142, {align: 'center', width: 80})
    .text("Total Lbs", 570, 142, {align: 'center', width: 80})
    .text("Inven. Ant", 635, 142, {align: 'center', width: 80})
    .text("Inven. Nvo", 700, 142, {align: 'center', width: 80})
    
    // Llenado de tabla
    var y = 155;

    articulos.forEach( function(art) {             
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
            .text('REPORTE POR ' + titulo.toUpperCase(), { align: 'right', width: 290 })

            // Nombre formato, fecha y hora de creación
            doc.font('fonts/Roboto-Regular.ttf')
            .fontSize(14)
            .text(titulo + ": "+ subtitulo.toUpperCase(),{ align: 'right' , width: 290})  
            .text("Fecha: "+ FechaHora.obtenerfecha() + " " + FechaHora.obtenerhora(),{ align: 'right' , width: 290})
                                
            // Encabezados tabla
            doc.lineWidth(25)
            doc.lineCap('butt')
            .fillColor("blue")
            .moveTo(15, 150)
            .lineTo(780, 150)
            .stroke()
        
            doc.fontSize(10)
            .fill('white')
            .text("Movimiento", 10, 142, {align: 'center', width: 70})
            .text("Remitente", 85, 142,  {align: 'center', width: 100})
            .text("Destinatario", 185, 142, {align: 'center', width: 100})
            .text("Talla", 275, 142, {align: 'center', width: 50})
            .text("Presentación", 325, 142, {align: 'center', width: 60})
            .text("Fecha", 400, 142, {align: 'center', width: 50})
            .text("Cant. Master", 445, 142, {align: 'center', width: 80})
            .text("Total Kgs", 510, 142, {align: 'center', width: 80})
            .text("Total Lbs", 570, 142, {align: 'center', width: 80})
            .text("Inven. Ant", 635, 142, {align: 'center', width: 80})
            .text("Inven. Nvo", 700, 142, {align: 'center', width: 80})
        }
            doc.fillColor('black')
            .text(art.movimiento, 15, y, {align: 'left', width: 70})
            .text(art.remitente, 85, y,  {align: 'left', width: 100})
            .text(art.destinatario, 185, y, {align: 'left', width: 100})
            .text(art.talla, 285, y, {align: 'left', width: 100})
            .text(art.presentacion, 325, y, {align: 'left', width: 100})
            .text(art.fecha, 400, y, {align: 'left', width: 100})
            .text(art.cantidadMaster, 445, y, {align: 'center', width: 80})
            .text(art.totalKgs, 510, y, {align: 'center', width: 80})
            .text(art.totalLbs, 570, y, {align: 'center', width: 80})
            .text(art.inventarioAnterior, 635, y, {align: 'center', width: 80})
            .text(art.inventarioNuevo, 700, y, {align: 'center', width: 80})
    });
                    
    // División productos y totales
    doc.lineWidth(2)
    doc.lineCap('butt')
    .moveTo(15, y + 15)
    .lineTo(780, y + 15)
    .stroke()
        
    // Creación del documento y guardado
    
    var nombre_archivo = './files/';
    var nombre_pdf = 'reporte'+titulo+'.pdf';
    
    console.log(nombre_archivo);
    
    doc.pipe(fs.createWriteStream(nombre_archivo+nombre_pdf)).on('finish', function (error){
        if(error){
            console.log(error);
        } else {
            console.log('PDF closed');
        }
    });     
    
    // Finalize PDF file
    doc.end();
}

function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}