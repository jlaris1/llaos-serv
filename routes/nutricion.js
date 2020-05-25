var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    Estanques = mongoose.model('Estanques');
    Modulos = mongoose.model('Modulos');
    Nutricion = mongoose.model('Nutricion');
    TiposModulos = mongoose.model('TiposModulos');
    Usuarios = mongoose.model('Usuarios');
    Productos = mongoose.model('Productos')
    chalk = require('chalk');
    historial = require('./historial');

var file_path = './files/reports/nutricion/';

module.exports = {
    all: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Nutricion.find( function(error, nutricion){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.populate(nutricion, {path: 'estanque'}, function(error, nutricion){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Usuarios.populate(nutricion, { path: 'charolero'}, function(error, nutricion){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            var piscinas = [];
                                            var charoleros = [];

                                            nutricion.forEach(function(n){
                                                if(piscinas.includes(n.estanque) == false){
                                                    piscinas.push(n.estanque);
                                                }

                                                if(charoleros.includes(n.charolero) == false){
                                                    charoleros.push(n.charolero);
                                                }
                                            });

                                            respuesta.render('Nutricion/all',
                                                {
                                                    user: solicitud.session.user,
                                                    nutricion: nutricion,
                                                    titulo: "Nutrición",
                                                    criterios: [
                                                        {
                                                            val: "piscina",
                                                            name: "Piscina"
                                                        },
                                                        {
                                                            val: "charolero",
                                                            name: "Charolero"
                                                        },
                                                        {
                                                            val: "fecha",
                                                            name: "Fecha"
                                                        },
                                                        {
                                                            val: "fechas",
                                                            name: "Fechas"
                                                        }
                                                    ],
                                                    usuarios: usuarios,
                                                    piscinas: piscinas,
                                                    charoleros: charoleros,
                                                    ruta: "nutricion"
                                                }
                                            );
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }).sort({fecha: -1});
        } 
    },
    new: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            Modulos.find( function(error, modulos){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Usuarios.find( function(error, usuarios){
                        if(error){
                            console.log(error);
                        } else { 
                            respuesta.render('Nutricion/new',
                                {
                                    user: solicitud.session.user,
                                    modulos: modulos,
                                    estanques: {},
                                    nutricion: {
                                        charola_1: 0,
                                        charola_2: 0,
                                        charola_3: 0,
                                        charola_4: 0,
                                        kg_racion: 0,
                                        porcent_ajuste: 0,
                                        suma: 0,
                                        codigo_racion: 0,
                                        siguiente_racion: 0
                                    },
                                    titulo: "Nutrición",
                                    criterios: [
                                        {
                                            val: "piscina",
                                            name: "Piscina"
                                        },
                                        {
                                            val: "charolero",
                                            name: "Charolero"
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
                                    ruta: "nutricion"
                                }
                            );
                        }
                    });
                }
            }).sort({codigo: 1});
        }
    },
    edit: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{ 
            Nutricion.findOne({"_id": solicitud.params.id}, (error, nutricion) => {
                if(error){
                    console.log(error);
                } else {
                    Estanques.populate(nutricion,{path: 'estanque'}, (error, nutricion) => {
                        if(error){
                            console.log(error);
                        } else {
                            Modulos.populate(nutricion, {path: 'estanque.modulo'}, (error, nutricion) => {
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.populate(nutricion, {path: 'charolero'}, (error, nutricion) => {
                                        if(error){
                                            console.log(error);
                                        } else {
                                            Usuarios.find( (error, usuarios) => {
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    respuesta.render('Nutricion/edit',
                                                    {   nutricion: nutricion , 
                                                        user: solicitud.session.user,
                                                        titulo: "",
                                                        usuarios: usuarios,
                                                        criterios: [
                                                            {
                                                                val: "",
                                                                name: ""
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
                                                        ]
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
    find: (solicitud, respuesta) => {
        Estanques.find({"modulo": solicitud.body.modulo}, function(error, estanques){
            if(error){
                console.log(chalk.bgRed(error));
            } else {
                Modulos.find( function(error, modulos){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Usuarios.find( function(error, usuarios){
                            if(error){
                                console.log(error);
                            } else { 
                                respuesta.render("Nutricion/new", 
                                    {
                                        user: solicitud.session.user,
                                        modulos: modulos,
                                        estanques: estanques,
                                        modulo: solicitud.body.modulo,
                                        nutricion: {
                                            charola_1: 0,
                                            charola_2: 0,
                                            charola_3: 0,
                                            charola_4: 0,
                                            kg_racion: 0,
                                            porcent_ajuste: 0,
                                            suma: 0,
                                            codigo_racion: 0,
                                            siguiente_racion: 0
                                        },
                                        titulo: "Nutrición",
                                        piscinas: [{
                                            id: 0,
                                            nombre: ""
                                        }],
                                        charoleros: [{
                                            id: 0,
                                            nombre: ""
                                        }],
                                        criterios: [
                                            {
                                                val: "",
                                                name: ""
                                            },
                                        ],
                                        usuarios: usuarios,
                                        ruta: "nutricion"
                                    }
                                );
                            }
                        });
                    }
                }).sort({codigo: 1});
            }
        }).sort({codigo: 1});
    },
    add: async (solicitud, respuesta) => {
        if (!solicitud.user) return respuesta.redirect('/sesion-expirada');
        if (!solicitud.body.nutricion || !body.nutricion.length) return console.log('No guardar, llego todo en 0');

        const documents = body.nutricion.map((val) => new Nutricion(val));

        await saveDocuments(documents, user);

        respuesta.json({ estatus: 'Guardado' });

    },
    pdf: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            var column = solicitud.body.criterio;
            var pdf_name = '';
            var title = '';
            var search = '';

            if (column == 'piscina'){
                title = 'Piscina: ';                
                pdf_name = 'reporte_nutricion_piscina_' + solicitud.body.piscina + '.pdf';
                Nutricion.find({"estanque": solicitud.body.piscina}, function(error, nutricion){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(nutricion, {path: 'estanque'}, function(error, nutricion){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {

                                Usuarios.populate(nutricion, { path: 'charolero'}, function(error, nutricion){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else {                                                                            
                                        search = nutricion[0].estanque.codigo;

                                        generatePdf(nutricion, title, search, pdf_name);
                                    }
                                });
                            }
                        });
                    }
                }).sort({fecha: 1, hora: 1});
            } else if (column == 'charolero'){
                title = 'Charolero: ';
                pdf_name = 'reporte_nutricion_charolero_' + solicitud.body.charolero + '.pdf';

                Nutricion.find({"charolero": solicitud.body.charolero}, function(error, nutricion){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(nutricion, {path: 'estanque'}, function(error, nutricion){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                Usuarios.populate(nutricion, { path: 'charolero'}, function(error, nutricion){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else {
                                        nutricion.forEach(function(n){
                                            search = n.charolero.nombre;
                                        });
                                        generatePdf(nutricion, title, search, pdf_name)
                                    }
                                });
                            }
                        });
                    }
                }).sort({fecha: 1, hora: 1});
            } else if (column == 'fecha'){
                console.log(solicitud.body.fecha);

                fecha = new Date(solicitud.body.fecha).getFullYear() + '-' +
                        (new Date(solicitud.body.fecha).getMonth() + 1) + '-' +
                        (new Date(solicitud.body.fecha).getDate() + 1);

                f = new Date(fecha);

                console.log(f);

                title = 'Fecha: ';
                search = solicitud.body.fecha;
                pdf_name = 'reporte_nutricion_fecha_' + solicitud.body.fecha + '.pdf';
            
                Nutricion.find( { fecha : { $eq: f }}, function(error, nutricion){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(nutricion, {path: 'estanque'}, function(error, nutricion){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                Usuarios.populate(nutricion, { path: 'charolero'}, function(error, nutricion){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else { 
                                        generatePdf(nutricion, title, search, pdf_name)
                                    }
                                });
                            }
                        });
                    }
                }).sort({fecha: 1, hora: 1});
            } else if (column == 'fechas'){
                fechaInicio = new Date(solicitud.body.fechaInicio).getFullYear() + '-' +
                            (new Date(solicitud.body.fechaInicio).getMonth() + 1) +  '-' +
                            (new Date(solicitud.body.fechaInicio).getDate() + 1);

                fechaFin = new Date(solicitud.body.fechaFin).getFullYear() + '-' +
                        (new Date(solicitud.body.fechaFin).getMonth() + 1) +  '-' +
                        (new Date(solicitud.body.fechaFin).getDate() + 1);

                fI = new Date(fechaInicio).toISOString();
                fF = new Date(fechaFin).toISOString()

                title = 'Fechas entre: ';
                search = fechaInicio.replace(new RegExp('-','g'),'/') + '-' + fechaFin.replace(new RegExp('-','g'),'/');
                pdf_name = 'reporte_nutricion_fecha_' + solicitud.body.fechaInicio + '-' + solicitud.body.fechaFin +'.pdf';

                Nutricion.find({
                    fecha: {
                        $gte: fI,
                        $lte: fF
                    }
                }
                , function(error, nutricion){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(nutricion, {path: 'estanque'}, function(error, nutricion){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                Usuarios.populate(nutricion, { path: 'charolero'}, function(error, nutricion){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else {

                                        generatePdf(nutricion, title, search, pdf_name)
                                    }
                                });
                            }
                        });
                    }
                }).sort({fecha: 1, hora: 1});
            }

            Nutricion.find( function(error, nutricion){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.populate(nutricion, {path: 'estanque'}, function(error, nutricion){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Usuarios.populate(nutricion, { path: 'charolero'}, function(error, nutricion){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            var piscinas = Array();
                                            var charoleros = Array();

                                            nutricion.forEach(function(n){
                                                if(piscinas.includes(n.estanque) == false){
                                                    piscinas.push(n.estanque);
                                                }

                                                if(charoleros.includes(n.charolero) == false){
                                                    charoleros.push(n.charolero);
                                                }
                                            });

                                            /*********** AGREGAR AL HISTORIAL */
                                                historial.save(
                                                    'brinkpink',
                                                    'fa-file-pdf',
                                                    'generó reporte de nutrición en pdf por <em class="text-md">' + column + '.</em>',
                                                    solicitud.session.user._id
                                                )
                                            /******************************* */

                                            respuesta.render('Nutricion/all',
                                                {
                                                    user: solicitud.session.user,
                                                    nutricion: nutricion,
                                                    titulo: "Nutrición",
                                                    criterios: [
                                                        {
                                                            val: "piscina",
                                                            name: "Piscina"
                                                        },
                                                        {
                                                            val: "charolero",
                                                            name: "Charolero"
                                                        },{
                                                            val: "fecha",
                                                            name: "Fecha"
                                                        },
                                                        {
                                                            val: "fechas",
                                                            name: "Fechas"
                                                        }
                                                    ],
                                                    usuarios: usuarios,
                                                    piscinas: piscinas,
                                                    charoleros: charoleros,
                                                    ruta: "nutricion",
                                                    url: pdf_name
                                                }
                                            );
                                        }
                                    });
                                }
                            });
                        }
                    })
                }
            }).sort({fecha: 1, hora: 1});
        }
    },
    xls: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            var column = solicitud.body.criterio;
            var pdf_name = '';
            var title = '';
            var search = '';

            if (column == 'piscina'){
                title = 'Piscina: ';                
                Nutricion.find({"estanque": solicitud.body.piscina}, function(error, nutricion){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(nutricion, {path: 'estanque'}, function(error, nutricion){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {

                                Usuarios.populate(nutricion, { path: 'charolero'}, function(error, nutricion){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else {                                                                            
                                       pdf_name = 'reporte_nutricion_piscina_' + nutricion[0].estanque.codigo + '.xlsx';
                                       generateXLS(nutricion, title + nutricion[0].estanque.codigo, pdf_name);
                                    }
                                });
                            }
                        });
                    }
                }).sort({fecha: 1, hora: 1});
            } else if (column == 'charolero'){
                title = 'Charolero: ';
                Nutricion.find({"charolero": solicitud.body.charolero}, function(error, nutricion){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(nutricion, {path: 'estanque'}, function(error, nutricion){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                Usuarios.populate(nutricion, { path: 'charolero'}, function(error, nutricion){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else {

                                        pdf_name = 'reporte_nutricion_charolero_' + nutricion[0].charolero.nombre + '.xlsx';
                                        generateXLS(nutricion, title, pdf_name)
                                    }
                                });
                            }
                        });
                    }
                }).sort({fecha: 1, hora: 1});
            } else if (column == 'fecha'){
                console.log(solicitud.body.fecha);

                fecha = new Date(solicitud.body.fecha).getFullYear() + '-' +
                        (new Date(solicitud.body.fecha).getMonth() + 1) + '-' +
                        (new Date(solicitud.body.fecha).getDate() + 1);

                f = new Date(fecha);

                console.log(f);

                title = 'Fecha: ';
                search = solicitud.body.fecha;
                pdf_name = 'reporte_nutricion_fecha_' + solicitud.body.fecha + '.xlsx';
            
                Nutricion.find( { fecha : { $eq: f }}, function(error, nutricion){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(nutricion, {path: 'estanque'}, function(error, nutricion){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                Usuarios.populate(nutricion, { path: 'charolero'}, function(error, nutricion){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else { 
                                        generateXLS(nutricion, title, pdf_name)
                                    }
                                });
                            }
                        });
                    }
                }).sort({fecha: 1, hora: 1});
            } else if (column == 'fechas'){
                fechaInicio = new Date(solicitud.body.fechaInicio).getFullYear() + '-' +
                            (new Date(solicitud.body.fechaInicio).getMonth() + 1) +  '-' +
                            (new Date(solicitud.body.fechaInicio).getDate() + 1);

                fechaFin = new Date(solicitud.body.fechaFin).getFullYear() + '-' +
                        (new Date(solicitud.body.fechaFin).getMonth() + 1) +  '-' +
                        (new Date(solicitud.body.fechaFin).getDate() + 1);

                fI = new Date(fechaInicio).toISOString();
                fF = new Date(fechaFin).toISOString()

                title = 'Fechas entre: ';
                search = fechaInicio.replace(new RegExp('-','g'),'/') + '-' + fechaFin.replace(new RegExp('-','g'),'/');
                pdf_name = 'reporte_nutricion_fecha_' + solicitud.body.fechaInicio + '-' + solicitud.body.fechaFin +'.xlsx';

                Nutricion.find({
                    fecha: {
                        $gte: fI,
                        $lte: fF
                    }
                }
                , function(error, nutricion){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(nutricion, {path: 'estanque'}, function(error, nutricion){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                Usuarios.populate(nutricion, { path: 'charolero'}, function(error, nutricion){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else {

                                        generateXLS(nutricion, title, pdf_name)
                                    }
                                });
                            }
                        });
                    }
                }).sort({fecha: 1, hora: 1});
            }

            Nutricion.find( function(error, nutricion){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.populate(nutricion, {path: 'estanque'}, function(error, nutricion){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Usuarios.populate(nutricion, { path: 'charolero'}, function(error, nutricion){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else { 
                                            var piscinas = new Array();
                                            var charoleros = new Array();

                                            nutricion.forEach(function(n){
                                                if(piscinas.includes(n.estanque) == false){
                                                    piscinas.push(n.estanque);
                                                }

                                                if(charoleros.includes(n.charolero) == false){
                                                    charoleros.push(n.charolero);
                                                }
                                            });
                                        


                                        /*********** AGREGAR AL HISTORIAL */
                                            historial.save(
                                                'brinkpink',
                                                'fa-file-excel',
                                                'generó reporte en excel por <em class="text-md">'+ column + '.</em>',
                                                solicitud.session.user._id
                                            )
                                        /******************************* */

                                            respuesta.render('Nutricion/all',
                                                {
                                                    user: solicitud.session.user,
                                                    nutricion: nutricion,
                                                    titulo: "Nutrición",
                                                    criterios: [
                                                        {
                                                            val: "piscina",
                                                            name: "Piscina"
                                                        },
                                                        {
                                                            val: "charolero",
                                                            name: "Charolero"
                                                        },{
                                                            val: "fecha",
                                                            name: "Fecha"
                                                        },
                                                        {
                                                            val: "fechas",
                                                            name: "Fechas"
                                                        }
                                                    ],
                                                    usuarios: usuarios,
                                                    piscinas: piscinas,
                                                    charoleros: charoleros,
                                                    ruta: "nutricion",
                                                    url: pdf_name
                                                }
                                            );
                                        }
                                    });
                                }
                            });
                        }
                    })
                }
            }).sort({fecha: 1, hora: 1});
        }
    },
    piscinas: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Estanques.find({"modulo": {$in: solicitud.body.modulos}}, (error, piscinas) => {
                if(error){
                    console.log(error);
                } else {
                    Modulos.find({"_id": { $in: solicitud.body.modulos }},{ nombre: 1 }, (error, modulos) => {
                        if(error) {
                            console.log(error);
                        } else {
                            var anio = new Date().getFullYear();
                            var mes =  new Date().getMonth()+1 <= 9 ? '0' + (new Date().getMonth()+1) : (new Date().getMonth()+1);
                            var dia = new Date().getDate()+1 <= 9 ? '0' + new Date().getDate() : new Date().getDate();
                            var fecha = anio +'-'+ mes +'-'+ dia;

                            //console.log(fecha);

                            /** Reciones del día */                            
                            Nutricion.find(
                                { $and: [
                                    { estanque: { $in: piscinas }},
                                    { fecha: {
                                        $gte: fecha,
                                        $lte: fecha
                                    }}
                                ]
                            }, (error, lista_nutricion) => {
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    //console.log(lista_nutricion);

                                    respuesta.json({
                                        piscinas: piscinas,
                                        modulos: modulos,
                                        lista_nutricion: lista_nutricion
                                    });
                                }
                            }).sort({ estanque : 1, fecha: 1, hora: 1});
                        }
                    });
                }
            }).sort({ codigo : 1});
        }
    },
    acumulado: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Nutricion.find(
                { "estanque": solicitud.body.id },
                { kg_racion: 1 , _id: 0, estanque: 1}
                , (error, kg_acumulados) => {
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        var suma = 0;
                        
                        kg_acumulados.forEach( kg => {
                            suma+= parseFloat(kg.kg_racion);
                        })
                        
                        respuesta.json({
                            id: solicitud.body.id,
                            kg_acumulados: suma.toFixed(2)
                        });
                }
            });
        }
    },
    config: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            Usuarios.find( function(error, usuarios){
                if(error){
                    console.log(error);
                } else { 
                    respuesta.render('Nutricion/config', {
                        user: solicitud.session.user,
                        titulo: "Nutrición",
                        criterios: [
                            {
                                val: "piscina",
                                name: "Piscina"
                            },
                            {
                                val: "charolero",
                                name: "Charolero"
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
                        ruta: "nutricion"
                    });
                }
            });
        }
    },
    obtenerAlimentos: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            /***Búscar el alimento que perteneza a maternidad */
            Productos.find({"categoria": "5e5e8ab5e353ee43602d6bc6"}, (error, alimento) => {
                if(error) {
                    console.log(error);
                } else {
                    respuesta.json({ alimento: alimento});
                }
            });
        }
    },
    obtenerInsumos: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{ 
            /***Búscar el insumo que perteneza a maternidad */
            Productos.find({"categoria": "5e5f1685e353ee43602d6bc9"}, (error, insumo) => {
                if(error) {
                    console.log(error);
                } else {
                    respuesta.json({ insumo: insumo});
                }
            });
        }
    },
    delete: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{ 
            Nutricion.deleteMany({ estanque: solicitud.body.id } , (error) => {
                if(error) {
                    console.log(error);
                } else {
                    respuesta.json('terminado');
                }
            });
        }
    },
    deleteOne: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{ 
            Nutricion.deleteOne({"_id": solicitud.params.id}, (error) => {
                if(error){
                    console.log(error);
                } else {
                    respuesta.redirect('/nutricion/all');
                    /*respuesta.json({
                        id: solicitud.params.id 
                    });*/
                }
            });
        }
    },
    update: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{ 
            Nutricion.updateOne({"_id": solicitud.body.id}, solicitud.body,(error) =>{
                if(error){
                    console.log(error);
                } else {
                    respuesta.json({estatus: "Actualizado"});
                }
            });
        }
    }
}

function generatePdf(data, title, search, pdf_name){
    var prom_charola_1 = 0;
    var prom_charola_2 = 0;
    var prom_charola_3 = 0;
    var prom_charola_4 = 0;
    var prom_kg_racion = 0;
    var prom_porcent_ajuste = 0;
    var prom_suma = 0;
    var prom_codigo_racion = 0;
    var prom_siguiente_racion = 0;

    // CONSTRUIR PDF
    doc = new pdf({
        // Establecer tamaño de hoja
        size: 'letter',
        layout: 'landscape'
    });
    
    // Logo empresa
    doc.image('./public/imgs/logo llaos.jpg', 5, 40,{width: 200})
    
    // Nombre empresa y rfc
    doc.font('fonts/Roboto-Black.ttf')
    .fontSize(14)
    .text('LLAOS ACUACULTURA S.A. de C.V.', 480, 40, { align: 'right', width: 290 })
    .text('REPORTE CHAROLAS', { align: 'right', width: 290 })
    
    // Nombre formato, fecha y hora de creación
    doc.font('fonts/Roboto-Regular.ttf')
    .fontSize(14)
    .text(title + search,{ align: 'right' , width: 290})  
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
    .text("Pisc.", 17, 143, {align: 'center', width: 45})
    .text("Charola 1", 47, 143,  {align: 'center', width: 70})
    .text("Charola 2", 107, 143, {align: 'center', width: 70})
    .text("Charola 3", 167, 143, {align: 'center', width: 70})
    .text("Charola 4", 227, 143, {align: 'center', width: 70})
    .text("Kg Ración", 287, 143, {align: 'center', width: 70})
    .text("% Ajuste", 357, 143, {align: 'center', width: 70})
    .text("Suma", 434, 143, {align: 'center', width: 70})
    .text("Código", 504, 143, {align: 'center', width: 70})
    .text("Kg. Sig. Rac", 577, 143, {align: 'center', width: 70})
    .text("Fecha", 644, 143, {align: 'center', width: 70})
    .text("Hora", 704, 143, {align: 'center', width: 70})
    
    
    // Llenado de tabla
    var y = 155;
    var total = 0;

    data.forEach( function(dat) {                                          
        total = total + 1;
        y += 10;

        if (y > 525){
            y = 165;
            doc.addPage()
            
            // Logo empresa
            doc.image('./public/imgs/logo llaos.jpg', 5, 40,{width: 200})
            
            // Nombre empresa y rfc
            doc.font('fonts/Roboto-Black.ttf')
            .fontSize(14)
            .text('LLAOS ACUACULTURA S.A. de C.V.', 480, 40, { align: 'right', width: 290 })
            .text('REPORTE CHAROLAS', { align: 'right', width: 290 })
            
            // Nombre formato, fecha y hora de creación
            doc.font('fonts/Roboto-Regular.ttf')
            .fontSize(14)
            .text(title + search,{ align: 'right' , width: 290})  
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
            .text("Pisc.", 17, 143, {align: 'center', width: 45})
            .text("Charola 1", 47, 143,  {align: 'center', width: 70})
            .text("Charola 2", 107, 143, {align: 'center', width: 70})
            .text("Charola 3", 167, 143, {align: 'center', width: 70})
            .text("Charola 4", 227, 143, {align: 'center', width: 70})
            .text("Kg Ración", 287, 143, {align: 'center', width: 70})
            .text("% Ajuste", 357, 143, {align: 'center', width: 70})
            .text("Suma", 434, 143, {align: 'center', width: 70})
            .text("Código", 504, 143, {align: 'center', width: 70})
            .text("Kg. Sig. Rac", 577, 143, {align: 'center', width: 70})
            .text("Fecha", 644, 143, {align: 'center', width: 70})
            .text("Hora", 704, 143, {align: 'center', width: 70})
        }

        var date = new Date(dat.fecha);
        date.setDate(date.getDate() + 1);
        var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);

        doc.fillColor('black')
        .text(dat.estanque.codigo, 10, y, {align: 'center', width: 45 })
        .text(dat.charola_1, 47, y,  {align: 'center', width: 70 })
        .text(dat.charola_2, 107, y, {align: 'center', width: 70 })
        .text(dat.charola_3, 167, y, {align: 'center', width: 70 })
        .text(dat.charola_4, 217, y, {align: 'center', width: 70 })
        .text(parseFloat(dat.kg_racion).toFixed(3), 287, y, {align: 'center', width: 70 })
        .text(dat.porcent_ajuste, 357, y, {align: 'center', width: 70 })
        .text(dat.suma, 434, y, {align: 'center', width: 70 })
        .text(dat.codigo_racion, 484, y, {align: 'center', width: 70 })
        .text(dat.siguiente_racion, 577, y, {align: 'center', width: 70 })
        .text(day + '/' + month + '/' + date.getFullYear(), 644, y, {align: 'center', width: 70 })
        .text(dat.hora, 704, y, {align: 'center', width: 70 });

        prom_charola_1 += parseFloat(dat.charola_1);
        prom_charola_2 += parseFloat(dat.charola_2);
        prom_charola_3 += parseFloat(dat.charola_3);
        prom_charola_4 += parseFloat(dat.charola_4);
        prom_kg_racion += parseFloat(dat.kg_racion);
        prom_porcent_ajuste += parseFloat(dat.porcent_ajuste);
        prom_suma += parseFloat(dat.suma);
        prom_codigo_racion += parseFloat(dat.codigo_racion);
        prom_siguiente_racion += parseFloat(dat.siguiente_racion);
    });
    
    // Promedios
    doc.lineWidth(2)
    doc.lineCap('butt')
    .moveTo(15, y + 15)
    .lineTo(780, y + 15)
    .stroke()
    
    doc.font('fonts/Roboto-Black.ttf')
    .text("Prom/Suma: ", 15, y + 15, { align: 'left', width: 55 })
    doc.font('fonts/Roboto-Regular.ttf')
    .text((prom_charola_1 / (data.length - 1)).toFixed(2), 47, y + 15, {align: 'center', width: 70})
    .text((prom_charola_2 / (data.length - 1)).toFixed(2), 107, y + 15, {align: 'center', width: 70})
    .text((prom_charola_3 / (data.length - 1)).toFixed(2), 167, y + 15, {align: 'center', width: 70})
    .text((prom_charola_4 / (data.length - 1)).toFixed(2), 217, y + 15, {align: 'center', width: 70})
    .text(parseFloat(prom_kg_racion).toFixed(3), 287, y + 15, {align: 'center', width: 70})
    .text((prom_porcent_ajuste / (data.length - 1)).toFixed(2) == "NaN" ? "" : (prom_porcent_ajuste / (data.length - 1)).toFixed(2), 357, y + 15, {align: 'center', width: 70})
    .text(prom_suma == "NaN" ? "" : prom_suma, 434, y + 15, {align: 'center', width: 70})
    .text((prom_codigo_racion / (data.length - 1)).toFixed(2) == "NaN" ? "" : (prom_codigo_racion / (data.length - 1)).toFixed(2), 484, y + 15, {align: 'center', width: 70})
    .text((prom_siguiente_racion / (data.length - 1)).toFixed(2) == "NaN" ? "" : (prom_siguiente_racion / (data.length - 1)).toFixed(2), 577, y + 15, {align: 'center', width: 70})

    console.log(file_path);
    
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

function generateXLS(data, title, xls_name){
    var prom_charola_1 = 0;
    var prom_charola_2 = 0;
    var prom_charola_3 = 0;
    var prom_charola_4 = 0;
    var prom_kg_racion = 0;
    var prom_porcent_ajuste = 0;
    var prom_suma = 0;
    var prom_codigo_racion = 0;
    var prom_siguiente_racion = 0;

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

    ws.properties.defaultRowHeight = 18;
    ws.properties.defaultRowWidth = 20;

    // TITULO
    ws.mergeCells('A1:M1');
    ws.getCell('E1').value = 'LLAOS ACUACULTURA S.A. DE C.V.';
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
        fgColor: {argb:'004080'}
    };
    ws.getCell('E1').alignment = { vertical: 'middle', horizontal: 'center' };

    // SUBTITULO
    ws.mergeCells('A2:M2');
    ws.getCell('E2').value = "Reporte " + title;
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
        fgColor: {argb:'004080'},
    };  


    /*** COLUMNAS  */
    ws.getCell('A5').value = 'Piscina';
    ws.getCell('A5').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('A5').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('A5').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'004080'},
    };  

    ws.getCell('B5').value = 'Charola  1';
    ws.getCell('B5').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('B5').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('B5').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'004080'},
    };
    
    ws.getCell('C5').value = 'Charola  2';
    ws.getCell('C5').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('C5').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('C5').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'004080'},
    };

    ws.getCell('D5').value = 'Charola  3';
    ws.getCell('D5').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('D5').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('D5').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'004080'},
    };

    ws.getCell('E5').value = 'Charola  4';
    ws.getCell('E5').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('E5').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('E5').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'004080'},
    };

    ws.getCell('F5').value = 'KG Ración';
    ws.getCell('F5').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('F5').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('F5').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'004080'},
    };

    ws.getCell('G5').value = '% Ajuste';
    ws.getCell('G5').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('G5').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('G5').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'004080'},
    };

    ws.getCell('H5').value = 'Suma';
    ws.getCell('H5').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('H5').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('H5').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'004080'},
    };

    ws.getCell('I5').value = 'Codigo Ración';
    ws.getCell('I5').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('I5').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('I5').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'004080'},
    };

    ws.getCell('J5').value = 'Tiempo';
    ws.getCell('J5').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('J5').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('J5').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'004080'},
    };

    ws.getCell('K5').value = 'Fecha';
    ws.getCell('K5').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('K5').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('K5').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'004080'},
    };

    ws.getCell('L5').value = 'Hora';
    ws.getCell('L5').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('L5').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('L5').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'004080'},
    };

    ws.getCell('M5').value = 'Charolero';
    ws.getCell('M5').font = {
        name: "Roboto", 
        size: 11,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    };
    ws.getCell('M5').alignment = { vertical: 'middle', horizontal: 'center' }; 
    ws.getCell('M5').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb:'004080'},
    };


    // AGREGAR FILTRADO
    ws.autoFilter = {
        from: 'A5',
        to: 'M5',
    }

    ws.columns = [
        {  key: 'piscina', width: 12},
        {  key: 'charola_1', width: 10, style: { numFmt: '#,##'}},
        {  key: 'charola_2', width: 10, style: { numFmt: '#,##'}},
        {  key: 'charola_3', width: 10, style: { numFmt: '#,##'}},
        {  key: 'charola_4', width: 10, style: { numFmt: '#,##'}},
        {  key: 'kg_racion', width: 10, style: { numFmt: '#,##'}},
        {  key: 'porcent_ajuste', width: 10},
        {  key: 'suma', width: 10, style: { numFmt: '#,##'}},
        {  key: 'codigo_racion', width: 10},
        {  key: 'tiempo', width: 10},
        {  key: 'fecha', width: 15 , style: { numFmt: 'dd/mm/yyyy' }},
        {  key: 'hora', width: 12 },
        {  key: 'charolero', width: 27 }
    ];

    // CONTADORES
    var fila = 6;

    /**** LLENADO DE CONTENDIO POR ESTANQUE */
    for(var i = 0; i <= data.length - 1; i ++){
        prom_charola_1 += parseFloat(data[i].charola_1);
        prom_charola_2 += parseFloat(data[i].charola_2);
        prom_charola_3 += parseFloat(data[i].charola_3);
        prom_charola_4 += parseFloat(data[i].charola_4);
        prom_kg_racion += parseFloat(data[i].kg_racion);
        prom_porcent_ajuste += parseFloat(data[i].porcent_ajuste);
        prom_suma += parseFloat(data[i].suma);
        prom_codigo_racion += parseFloat(data[i].codigo_racion);
        prom_siguiente_racion += parseFloat(data[i].siguiente_racion);

        ws.getCell('A'+fila).value = data[i].estanque.codigo;
        ws.getCell('A'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

        ws.getCell('B'+fila).value = data[i].charola_1;
        ws.getCell('B'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 
        
        ws.getCell('C'+fila).value = data[i].charola_2;
        ws.getCell('C'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

        ws.getCell('D'+fila).value = data[i].charola_3;
        ws.getCell('D'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

        ws.getCell('E'+fila).value = data[i].charola_4;
        ws.getCell('E'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

        ws.getCell('F'+fila).value = parseFloat(data[i].kg_racion).toFixed(3);
        ws.getCell('F'+fila).numFmt = '0.000';
        ws.getCell('F'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

        ws.getCell('G'+fila).value = data[i].porcent_ajuste;
        ws.getCell('G'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 
        
        ws.getCell('H'+fila).value = data[i].suma;
        ws.getCell('H'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

        ws.getCell('I'+fila).value = data[i].codigo_racion;
        ws.getCell('I'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

        ws.getCell('J'+fila).value = data[i].tiempo;
        ws.getCell('J'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

        ws.getCell('K'+fila).value = data[i].fecha;
        ws.getCell('K'+fila).numFmt= 'dd/mm/yyyy';
        ws.getCell('K'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

        ws.getCell('L'+fila).value = data[i].hora;
        ws.getCell('L'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

        ws.getCell('M'+fila).value = data[i].charolero.nombre;
        ws.getCell('M'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

        if (fila%2==0) {
            ws.getCell('A'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
            ws.getCell('B'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
            ws.getCell('C'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
            ws.getCell('D'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
            ws.getCell('E'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
            ws.getCell('F'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
            ws.getCell('G'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
            ws.getCell('H'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
            ws.getCell('I'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
            ws.getCell('J'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
            ws.getCell('K'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
            ws.getCell('L'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
            ws.getCell('M'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}            
        }

        fila += 1;
    }

    // Promedios
    ws.addRow(
        {   prom_charola_1,
            prom_charola_2,
            prom_charola_3,
            prom_charola_4,
            prom_kg_racion,
            prom_porcent_ajuste,
            prom_suma,
            prom_codigo_racion,
            prom_siguiente_racion
        }
    );

    wb.commit().then( function(){
        console.log("XLS terminado.")
        return xls_name;
    });
}

function generateConcentrado(data){

}

const saveDocuments = async (documents = [], user) => {
    for(let i = 0; i < documents.length; i++){
        try {
            const currentDocument = await documents[i].save();

            await historial.save(
                'perano',
                'fa-seeding',
                'registró nutrición para la piscina <em class="text-md">' +  documents[i].codigo_piscina + '.</em>',
                user._id
            );

        } catch (error) {
            console.log(chalk.bgRed(error));
        }
    }
}

