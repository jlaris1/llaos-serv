var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    Parametros = mongoose.model('Parametros');
    Estanques = mongoose.model('Estanques');
    Modulos = mongoose.model('Modulos');
    Usuarios = mongoose.model('Usuarios');
    TiposModulos = mongoose.model('TiposModulos');
    chalk = require('chalk');
    Excel = require('exceljs');

var file_path = './files/reports/parametros/';

module.exports = {
    all: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Parametros.find( function(error, mediciones){
                if(error){
                    console.log(chalk.bgRed(error));
                    
                } else {
                    Estanques.populate(mediciones, {path: 'estanque'}, function(error, mediciones){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Usuarios.populate(mediciones, {path: 'parametrista'}, function(error, mediciones){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(chalk.bgRed(error));
                                        } else {
                                            var piscinas = Array();
                                            var parametristas = Array();

                                            mediciones.forEach(function(m){
                                                if(piscinas.includes(m.estanque) == false){
                                                    piscinas.push(m.estanque);
                                                }

                                                if(parametristas.includes(m.parametrista) == false){
                                                    parametristas.push(m.parametrista);
                                                }
                                            });


                                            respuesta.render('Parametros/all', {
                                                user: solicitud.session.user,
                                                mediciones: mediciones,
                                                usuarios: usuarios,
                                                titulo: "Parámetros",
                                                criterios: [
                                                    {
                                                        val: "piscina",
                                                        name: "Piscina"
                                                    },
                                                    {
                                                        val: "modulo",
                                                        name: "Modulo"
                                                    },
                                                    {
                                                        val: "parametrista",
                                                        name: "Parametrista"
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
                                                piscinas: piscinas,
                                                charoleros: parametristas,
                                                ruta: "parametros"
                                            });
                                        }
                                    });
                                }
                            })
                        }
                    });
                }
            }).sort({fecha: -1});
        }
    },
    find: function(solicitud, respuesta){
        Modulos.find( function(error, modulos){
            if(error){
                console.log(chalk.bgRed(error));
            } else {
                Estanques.find({'modulo': solicitud.body.modulo}, function(error, estanques){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Usuarios.find( function(error, usuarios){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                respuesta.render('Parametros/new', {
                                    user: solicitud.session.user,
                                    modulos: modulos,
                                    usuarios: usuarios,
                                    modulo: solicitud.body.modulo, 
                                    estanque: estanques[0],
                                    siguiente_estanque: estanques[1],
                                    estanques: estanques,
                                    parametro: {
                                        oxigeno: 0,
                                        ph: 0,
                                        salinidad: 0,
                                        temperatura: 0,
                                        nivel_agua: 0,
                                    },
                                    titulo: "",
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
                                });     
                            }
                        });
                    }
                }).sort({ codigo : 1});
            }
        });
    },
    new: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Usuarios.find( function(error, usuarios){
                if(error){
                    console.log(chalk.bgRed(error));
                } else { 
                    respuesta.render('Parametros/new', {
                        user: solicitud.session.user,
                        usuarios: usuarios,
                        titulo: "",
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
                        ],
                    });
                }
            });
        }
    },
    edit: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Parametros.findById({"_id": solicitud.params.id}, function(error, parametro){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.populate(parametro, {path: 'estanque'}, (error, parametro) => {
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else { 
                                    Modulos.populate(parametro, {path: 'estanque.modulo'}, (error, parametro) => {
                                        if(error){
                                            console.log(chalk.bgRed(error));
                                        } else {
                                            Usuarios.populate(parametro, {path: 'parametrista'}, (error, parametro) => {
                                                if(error) {
                                                    console.log(chalk.bgRed(error));
                                                } else {
                                                    respuesta.render('Parametros/edit', {
                                                        user: solicitud.session.user,
                                                        usuarios: usuarios,
                                                        parametro: parametro,
                                                        titulo: "",
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
                                                        ],
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
    add: async (solicitud, respuesta) => {
        if (!solicitud.session.user) return respuesta.redirect('/sesion-expirada');
        if (!solicitud.body.parametros || !solicitud.body.parametros.length) return console.log('No guardar, llego todo en 0');

        const documents = solicitud.body.parametros.map((val) => new Parametros(val));

        await saveDocuments(documents, solicitud.session.user);

        respuesta.json({ estatus: 'Guardado' });

    },
    /*add: function(solicitud, respuesta){    
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            //console.log(solicitud.body);

            if( solicitud.body.parametros != undefined && solicitud.body.parametros.length > 0){
                for(let i=0; i <= solicitud.body.parametros.length -1; i++){
                    var parametro = new Parametros(solicitud.body.parametros[i]);
    
                    parametro.save( (error)=>{
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                                historial.save(
                                    'perano',
                                    'fa-eye-dropper',
                                    'registró parámetros para la piscina <em class="text-md">' + solicitud.body.parametros[i].codigo_piscina + '.</em>',
                                    solicitud.session.user._id
                                )

                            if(i == solicitud.body.parametros.length -1 ){
                                respuesta.json({
                                    estatus: 'Registrado'
                                });
                            }
                        }
                    });
    
                }
            } else {
                console.log("no guardar llego todo en 0's");
            }
        }
    },*/
    update: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            console.log(solicitud.body)

            /*Parametros.updateOne({"_id": solicitud.body.id}, data, function(error){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.json({estatus: 'Actualizado'});
                }
            });*/
        }
    },
    delete: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Parametros.delete({"_id": solicitud.params.id}, function(error){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.redirect('/parametros/all')
                }
            });
        }
    },
    next: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Modulos.find( function(error, modulos){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.find({'modulo': solicitud.body.mod}, function(error, estanques){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {

                            var estanque = {};
                            var siguiente_estanque  = {};

                            for (let i = 0; i < estanques.length; i++) {
                                if(estanques[i].id == solicitud.body.estanque_siguiente ){
                                    estanque = estanques[i];
                                    siguiente_estanque = estanques[i+1];
                                }
                            }

                            console.log(estanque);
                            console.log(siguiente_estanque);
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    respuesta.render('Parametros/new', {
                                        user: solicitud.session.user,
                                        modulos: modulos,
                                        modulo: solicitud.body.mod, 
                                        estanques: estanques,
                                        usuarios: usuarios,
                                        estanque: estanque,
                                        siguiente_estanque: siguiente_estanque,
                                        titulo: "",
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
                                        parametro: {
                                            oxigeno: 0,
                                            ph: 0,
                                            salinidad: 0,
                                            temperatura: 0,
                                            nivel_agua: 0,
                                        }
                                    });
                                }
                            });
                        }
                    }).sort({ codigo : 1});
                }
            });
        }
    },
    pdf: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            var column = solicitud.body.criterio;
            var pdf_name = '';
            var title = '';
            var search = '';
            var modulo = '';

            if (column == 'piscina'){               
                pdf_name = 'reporte_parametros_piscina_' + solicitud.body.piscina + '.pdf';

                Parametros.find({"estanque": solicitud.body.piscina}, function(error, parametros){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(parametros, {path: 'estanque'}, function(error, parametros){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                Modulos.populate(parametros, {path: 'estanque.modulo'}, function(error, parametros){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else {
                                        Usuarios.populate(parametros, { path: 'parametrista'}, function(error, parametros){
                                            if(error){
                                                console.log(chalk.bgRed(error));
                                            } else {                                                                                     
                                                parametros.forEach( function(p){
                                                    search = p.estanque.nombre;
                                                    modulo = p.estanque.modulo.codigo;
                                                });
                                                
                                                title =  'Modulo: ' + modulo + '  Piscina: ' + search;         
                                                generatePDF(parametros, title, pdf_name);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else if (column == 'parametrista'){
                Parametros.find({"parametrista": solicitud.body.charolero}, function(error, parametros){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(parametros, {path: 'estanque'}, function(error, parametros){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                Usuarios.populate(parametros, { path: 'parametrista'}, function(error, parametros){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else {
                                        parametros.forEach(function(p){
                                            search = p.parametrista.nombre;
                                        });

                                        title = 'Parametrista: ' + search;
                                        pdf_name = 'reporte_parametros_parametrista_' + search + '.pdf';
                                        generatePDF(parametros, title, pdf_name)
                                    }
                                });
                            }
                        });
                    }
                });
            } else if (column == 'fecha'){
                fecha = new Date(solicitud.body.fecha).getFullYear() + '-' +
                        (new Date(solicitud.body.fecha).getMonth() + 1) + '-' +
                        (new Date(solicitud.body.fecha).getDate() + 1);

                f = new Date(fecha);

                search = solicitud.body.fecha;
                pdf_name = 'reporte_parametros_fecha_' + solicitud.body.fecha + '.pdf';
            
                Parametros.find( { fecha : { $eq: f }}, function(error, parametros){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(parametros, {path: 'estanque'}, function(error, parametros){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                Usuarios.populate(parametros, { path: 'parametrista'}, function(error, parametros){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else { 
                                        title = 'Fecha: ' + search;
                                        generatePDF(parametros, title, search, pdf_name)
                                    }
                                });
                            }
                        });
                    }
                });
            } else if (column == 'fechas'){
                fechaInicio = new Date(solicitud.body.fechaInicio).getFullYear() + '-' +
                            (new Date(solicitud.body.fechaInicio).getMonth() + 1) +  '-' +
                            (new Date(solicitud.body.fechaInicio).getDate() + 1);

                fechaFin = new Date(solicitud.body.fechaFin).getFullYear() + '-' +
                        (new Date(solicitud.body.fechaFin).getMonth() + 1) +  '-' +
                        (new Date(solicitud.body.fechaFin).getDate() + 1);

                fI = new Date(fechaInicio).toISOString();
                fF = new Date(fechaFin).toISOString()

                search = fechaInicio.replace(new RegExp('-','g'),'/') + '-' + fechaFin.replace(new RegExp('-','g'),'/');
                pdf_name = 'reporte_parametros_fechas_' + solicitud.body.fechaInicio + '-' + solicitud.body.fechaFin +'.pdf';

                Parametros.find({
                    fecha: {
                        $gte: fI,
                        $lte: fF
                    }
                }
                , function(error, parametros){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(parametros, {path: 'estanque'}, function(error, parametros){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                Usuarios.populate(parametros, { path: 'parametrista'}, function(error, parametros){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else {
                                        title = 'Fechas entre: ' + search;
                                        generatePDF(parametros, title, pdf_name)
                                    }
                                });
                            }
                        });
                    }
                });
            }

            Parametros.find( function(error, mediciones){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.populate(mediciones, {path: 'estanque'}, function(error, mediciones){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Usuarios.populate(mediciones, {path: 'parametrista'}, function(error, mediciones){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(chalk.bgRed(error));
                                        } else {
                                            var piscinas = Array();
                                            var parametristas = Array();

                                            mediciones.forEach(function(m){
                                                if(piscinas.includes(m.estanque) == false){
                                                    piscinas.push(m.estanque);
                                                }

                                                if(parametristas.includes(m.parametrista) == false){
                                                    parametristas.push(m.parametrista);
                                                }
                                            });
                                            
                                            /*********** AGREGAR AL HISTORIAL */
                                                historial.save(
                                                    'brinkpink',
                                                    'fa-file-pdf',
                                                    'generó reporte de parámetros en pdf por <em class="text-md">' + column + '.</em>',
                                                    solicitud.session.user._id
                                                )
                                            /******************************* */

                                            respuesta.render('Parametros/all', {
                                                user: solicitud.session.user,
                                                mediciones: mediciones,
                                                usuarios: usuarios,
                                                titulo: "Parámetros",
                                                criterios: [
                                                    {
                                                        val: "piscina",
                                                        name: "Piscina"
                                                    },
                                                    {
                                                        val: "parametrista",
                                                        name: "Parametrista"
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
                                                piscinas: piscinas,
                                                charoleros: parametristas,
                                                ruta: "parametros",
                                                url: pdf_name
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
    xls: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            var column = solicitud.body.criterio;
            var xls_name = '';
            var title = '';
            var search = '';
            var modulo = '';

            if (column == 'piscina'){               
                Parametros.find({"estanque": solicitud.body.piscina}, function(error, parametros){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(parametros, {path: 'estanque'}, function(error, parametros){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                Modulos.populate(parametros, {path: 'estanque.modulo'}, function(error, parametros){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else {
                                        Usuarios.populate(parametros, { path: 'parametrista'}, function(error, parametros){
                                            if(error){
                                                console.log(chalk.bgRed(error));
                                            } else {                                                                                      
                                                parametros.forEach( function(p){
                                                    search = p.estanque.codigo;
                                                    modulo = p.estanque.modulo.codigo;
                                                });
                                                
                                                title =  'Modulo: ' + modulo + '  Piscina: ' + search;    
                                                xls_name = 'reporte_parametros_piscina_' + search + '.xlsx';     
                                                generateXLS(parametros, title, xls_name);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else if (column == 'parametrista'){
                Parametros.find({"parametrista": solicitud.body.charolero}, function(error, parametros){
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(parametros, {path: 'estanque'}, function(error, parametros){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                Usuarios.populate(parametros, { path: 'parametrista'}, function(error, parametros){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else {
                                        parametros.forEach(function(p){
                                            search = p.parametrista.nombre;
                                        });
                                        title = 'Parametrista: ' + search;
                                        xls_name = 'reporte_parametros_parametrista_' + search + '.xlsx';
                                        generateXLS(parametros, title, xls_name)
                                    }
                                });
                            }
                        });
                    }
                });
            } else if (column == 'fecha'){
                search = solicitud.body.fecha;

                var fF = (solicitud.body.fecha).split('-')[0] + '-' + 
                        (solicitud.body.fecha).split('-')[1] + '-';

                if((solicitud.body.fecha).split('-')[2] < 10 ){
                    fF += '0' + (parseFloat((solicitud.body.fecha).split('-')[2])+1);
                } else {
                    fF += (solicitud.body.fecha).split('-')[2];
                }

                xls_name = 'reporte_parametros_fecha_' + solicitud.body.fecha + '.xlsx';

                Parametros.find({})
                    .where({fecha: {$gte: solicitud.body.fecha, $lte: fF}})
                    .populate('estanque')
                    .exec((err, parametros) => {
                        Usuarios.populate(parametros, { path: 'parametrista'}, function(error, parametros){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else { 
                                title = 'Fecha: ' + search;
                                generateXLS(parametros, title, xls_name)
                            }
                        });
                });
            } else if (column == 'fechas'){
                fechaInicio = new Date(solicitud.body.fechaInicio).getFullYear() + '-' +
                            (new Date(solicitud.body.fechaInicio).getMonth() + 1) +  '-' +
                            (new Date(solicitud.body.fechaInicio).getDate() + 1);

                fechaFin = new Date(solicitud.body.fechaFin).getFullYear() + '-' +
                        (new Date(solicitud.body.fechaFin).getMonth() + 1) +  '-' +
                        (new Date(solicitud.body.fechaFin).getDate() + 1);

                fI = new Date(fechaInicio).toISOString();
                fF = new Date(fechaFin).toISOString()

                search = fechaInicio.replace(new RegExp('-','g'),'/') + '-' + fechaFin.replace(new RegExp('-','g'),'/');
                xls_name = 'reporte_parametros_fechas_' + solicitud.body.fechaInicio + '-' + solicitud.body.fechaFin + '.xlsx';

                Parametros.find({
                    fecha: { $gte: solicitud.body.fechaInicio, $lte: solicitud.body.fechaFin }
                }
                ,  (error, parametros) => {
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {
                        Estanques.populate(parametros, {path: 'estanque'}, function(error, parametros){
                            if(error){
                                console.log(chalk.bgRed(error));
                            } else {
                                Usuarios.populate(parametros, { path: 'parametrista'}, function(error, parametros){
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                    } else {
                                        title = 'Fechas entre: ' + search;
                                        generateXLS(parametros, title, xls_name)
                                    }
                                });
                            }
                        });
                    }
                });
            } else if (column == 'modulo'){
                Modulos.findOne( {"codigo": solicitud.body.modulo}, (error, modulo) => {
                    if(error){
                        console.log(chalk.bgRed(error));
                        respuesta.sendStatus(500);
                    } else {
                        Estanques.find({"modulo": modulo.id}, { _id: 1}, (error, estanques) => {
                            if(error){
                                console.log(chalk.bgRed(error));
                                respuesta.sendStatus(501);
                            } else {             
                                // Un día menos del que quieran el reporte y un día más
                                Parametros.find(
                                    { $and: [
                                        { estanque: { $in: estanques }},
                                        { fecha: {
                                            $gte: solicitud.body.fechaInicio,
                                            $lte: solicitud.body.fechaFin
                                        }}
                                    ]
                                }, (error, parametros) => {
                                    if(error){
                                        console.log(chalk.bgRed(error));
                                        respuesta.sendStatus(417);
                                    } else {
                                        Estanques.populate(parametros, { path: 'estanque' }, function(error, parametros){
                                            if(error){
                                                console.log(chalk.bgRed(error));
                                            } else {
                                                console.log(parametros);
                                                title = 'Modulo ' + solicitud.body.modulo;
                                                xls_name = 'reporte_concetrado_modulo_' + solicitud.body.modulo + '.xlsx';
                                                
                                                generateConcentradoXLS(parametros, title, xls_name, solicitud.body.fechaInicio, solicitud.body.fechaFin)
                                            }
                                        });
                                    }
                                }).sort({estanque: 1, fecha: 1});
                            }
                        });
                    }
                });
            }

            Parametros.find( function(error, mediciones){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.populate(mediciones, {path: 'estanque'}, function(error, mediciones){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Usuarios.populate(mediciones, {path: 'parametrista'}, function(error, mediciones){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(chalk.bgRed(error));
                                        } else {
                                            var piscinas = new Array();
                                            var parametristas = new Array();

                                            mediciones.forEach(function(m){
                                                if(piscinas.includes(m.estanque) == false){
                                                    piscinas.push(m.estanque);
                                                }

                                                if(parametristas.includes(m.parametrista) == false){
                                                    parametristas.push(m.parametrista);
                                                }
                                            });


                                            respuesta.render('Parametros/all', {
                                                user: solicitud.session.user,
                                                mediciones: mediciones,
                                                usuarios: usuarios,
                                                titulo: "Parámetros",
                                                criterios: [
                                                    {
                                                        val: "piscina",
                                                        name: "Piscina"
                                                    },
                                                    {
                                                        val: "modulo",
                                                        name: "Modulo"
                                                    },
                                                    {
                                                        val: "parametrista",
                                                        name: "Parametrista"
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
                                                piscinas: piscinas,
                                                charoleros: parametristas,
                                                ruta: "parametros",
                                                url: xls_name
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
    findPiscinas: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
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
                            respuesta.json({
                                piscinas: piscinas,
                                modulos: modulos
                            });
                        }
                    });
                }
            }).sort({ codigo : 1});
        }
    }
}

function generatePDF(data, title, pdf_name){
    var prom_ox = 0;
    var prom_ph = 0;
    var prom_sal = 0;
    var prom_tem = 0;
    var prom_niv = 0;

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
    .text('REPORTE PARÁMETROS', { align: 'right', width: 290 })
    
    // Nombre formato, fecha y hora de creación
    doc.font('fonts/Roboto-Regular.ttf')
    .fontSize(14)
    .text(title,{ align: 'right' , width: 290})  
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
    .text("Est.", 17, 143, {align: 'center', width: 45})
    .text("Oxigeno", 67, 143,  {align: 'center', width: 70})
    .text("pH", 137, 143, {align: 'center', width: 70})
    .text("Salinidad", 207, 143, {align: 'center', width: 70})
    .text("Temperatura", 277, 143, {align: 'center', width: 70})
    .text("Nivel Agua", 347, 143, {align: 'center', width: 70})
    .text("Tiempo", 417, 143, {align: 'center', width: 70})
    //.text("", 494, 143, {align: 'center', width: 70})
    .text("Parametrista", 564, 143, {align: 'center', width: 70})
    .text("Fecha", 637, 143, {align: 'center', width: 70})
    .text("Hora", 704, 143, {align: 'center', width: 70})
    
    // Llenado de tabla
    var y = 155;

    data.forEach( function(dat) {                                                  
        y += 10;

        if (y > 525){
            y = 15;
            doc.addPage()
            .text("")
        }

        doc.fillColor('black')
        .text(dat.estanque.codigo, 10, y, {align: 'center', width: 45 })
        .text(parseFloat(dat.oxigeno).toFixed(2), 67, y,  {align: 'center', width: 70 })
        .text(parseFloat(dat.ph).toFixed(2), 137, y, {align: 'center', width: 70 })
        .text(parseFloat(dat.salinidad).toFixed(2), 207, y, {align: 'center', width: 70 })
        .text(parseFloat(dat.temperatura).toFixed(2), 277, y, {align: 'center', width: 70 })
        .text(parseFloat(dat.nivel_agua).toFixed(2), 347, y, {align: 'center', width: 70 })
        .text(dat.tiempo, 417, y, {align: 'center', width: 70 })
        .text(dat.parametrista.nombre, 447, y, {align: 'center', width: 200 })
        //.text("", 564, y, {align: 'center', width: 70 })
        if ((new Date(dat.fecha).getMonth() + 1) < 10) {
            if ((new Date(dat.fecha).getDate()) < 10) {
                doc.text('0' + new Date(dat.fecha).getDate()+ '/0' + (new Date(dat.fecha).getMonth() + 1)+ '/' + new Date(dat.fecha).getFullYear(), 637, y, {align: 'center', width: 70 });
            } else {
                doc.text(new Date(dat.fecha).getDate()+ '/0' + (new Date(dat.fecha).getMonth() + 1)+ '/' + new Date(dat.fecha).getFullYear(), 637, y, {align: 'center', width: 70 });
            }
        } else {
            if ((new Date(dat.fecha).getDate()) < 10) {
                doc.text('0' + new Date(dat.fecha).getDate()+ '/' + (new Date(dat.fecha).getMonth() + 1)+ '/' + new Date(dat.fecha).getFullYear(), 637, y, {align: 'center', width: 70 });
            } else {
                doc.text(new Date(dat.fecha).getDate()+ '/' + (new Date(dat.fecha).getMonth() + 1)+ '/' + new Date(dat.fecha).getFullYear(), 637, y, {align: 'center', width: 70 });
            }
        }
        doc.text(dat.hora, 704, y, {align: 'center', width: 70 })

        prom_ox += parseFloat(dat.oxigeno);
        prom_ph += parseFloat(dat.ph);
        prom_sal += parseFloat(dat.salinidad);
        prom_tem += parseFloat(dat.temperatura);
        prom_niv += parseFloat(dat.nivel_agua);
        
    });

    // Promedios
    doc.lineWidth(2)
    doc.lineCap('butt')
    .moveTo(15, y + 15)
    .lineTo(780, y + 15)
    .stroke()
    
    doc.font('fonts/Roboto-Black.ttf')
    .text("Promedios: ", 15, y + 15, { align: 'left', width: 55 })
    doc.font('fonts/Roboto-Regular.ttf')
    .text((prom_ox / data.length).toFixed(2), 67, y + 15,  {align: 'center', width: 70 })
    .text((prom_ph / data.length).toFixed(2), 137, y + 15, {align: 'center', width: 70 })
    .text((prom_sal / data.length).toFixed(2), 207, y + 15, {align: 'center', width: 70 })
    .text((prom_tem / data.length).toFixed(2), 277, y + 15, {align: 'center', width: 70 })
    .text((prom_niv / data.length).toFixed(2), 347, y + 15, {align: 'center', width: 70 })
                                                                
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
    var prom_ox = 0;
    var prom_ph = 0;
    var prom_sal = 0;
    var prom_tem = 0;
    var prom_niv = 0;

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

    ws.mergeCells('A1:I1');
    ws.getCell('D1').value = title;
    ws.getCell('D1').font = {
        name: "Roboto", 
        size: 12,  
        //bold: true,
        horizontal: 'center'
    };   

    ws.getRow(3).values = ['Código', 'Oxigeno', 'pH', 'Salinidad', 'Temperatura', 'Nivel Agua', 'Parametrista', 'Fecha', 'Hora', 'Tiempo'];
    ws.getRow(3).fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{ argb:'f4f4f4' },
        bgColor:{ argb:'000000' }
    };

    ws.getRow(3).eachCell( (cell) => {
        cell.font = { name: "Roboto", size: 12 };
        cell.alignment = { horizontal: 'center' };
    });

    ws.columns = [
        {  key: 'code', width: 12},
        {  key: 'oxigeno', width: 10, style: { numFmt: '#,##'}},
        {  key: 'ph', width: 10, style: { numFmt: '#,##'}},
        {  key: 'salinidad', width: 10, style: { numFmt: '#,##'}},
        {  key: 'temperatura', width: 12, style: { numFmt: '#,##'}},
        {  key: 'nivel_agua', width: 10, style: { numFmt: '#,##'}},
        {  key: 'parametrista', width: 25},
        {  key: 'fecha', width: 12 , style: { numFmt: 'dd/mm/yyyy' } },
        {  key: 'hora', width: 15},
        {  key: 'tiempo', width: 15}
    ];

    data.forEach( function(d){
        prom_ox += parseFloat(d.oxigeno);
        prom_ph += parseFloat(d.ph);
        prom_sal += parseFloat(d.salinidad);
        prom_tem += parseFloat(d.temperatura);
        prom_niv += parseFloat(d.nivel_agua);

        ws.addRow(
            {   code: d.estanque.codigo, 
                oxigeno: parseFloat(d.oxigeno).toFixed(2), 
                ph: parseFloat(d.ph).toFixed(2),  
                salinidad: parseFloat(d.salinidad).toFixed(2), 
                temperatura: parseFloat(d.temperatura).toFixed(2), 
                nivel_agua: parseFloat(d.nivel_agua).toFixed(2), 
                parametrista: d.parametrista.nombre, 
                fecha: d.fecha, 
                hora: d.hora, 
                tiempo: d.tiempo,
            }
        );
    });

    // Promedios
    ws.addRow(
        {   code: 'Promedios: ', 
            oxigeno: (prom_ox / data.length).toFixed(2), 
            ph: (prom_ph / data.length).toFixed(2),  
            salinidad: (prom_sal / data.length).toFixed(2), 
            temperatura: (prom_tem / data.length).toFixed(2), 
            nivel_agua: (prom_niv / data.length).toFixed(2), 
            parametrista: '', 
            fecha: '', 
            hora: '' }
    );

    wb.commit().then( function(){
        console.log("XLS terminado.")
        return xls_name;
    });
}

function generateConcentradoXLS(data, title, xls_name, fecha_ini, fecha_fin){
    var prom_ox_am = 0;
    var prom_ox_pm = 0;
    var prom_ph = 0;
    var prom_sal = 0;
    var prom_tem_am = 0;
    var prom_tem_pm = 0;
    var prom_niv_am = 0;
    var prom_niv_pm = 0;
    var gen_prom_tem_am = 0;
    var gen_prom_tem_pm = 0;
    var gen_prom_niv_am = 0;
    var gen_prom_niv_pm = 0;
    var gen_prom_ox_am = 0;
    var gen_prom_ox_pm = 0;
    var gen_prom_sal = 0;
    var gen_prom_ph = 0;

    var options = {
        filename:  file_path + '/' + xls_name ,
        useStyles: true,
        useSharedStrings: true
    };

    var wb = new Excel.stream.xlsx.WorkbookWriter(options);

    wb.creator = 'Llaos Web 2.0';
    wb.created = new Date();

    // NOMBRE DE LA HOJA
    var ws = wb.addWorksheet('Reporte');
    ws.properties.defaultRowHeight = 18;
    ws.properties.defaultRowWidth = 10;

    // TITULO
    ws.mergeCells('A1:K1');
    ws.getCell('E1').value = "Reporte " + title;
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
    ws.mergeCells('A2:K2');
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

    // CICLO + AÑO
    ws.getCell('A4').value = 'Ciclo:';
    ws.getCell('A4').font = {
        name: "Roboto", 
        size: 12,  
        bold: true,
        horizontal: 'center',
        color: { argb: 'ffffff'}
    }; 

    ws.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('B4').value = new Date().getFullYear();
    ws.getCell('B4').alignment = { vertical: 'middle', horizontal: 'center' };

    ws.mergeCells('F4:G4');
    ws.getCell('F4').value= 'Semana: ';
    ws.getCell('F4').font = {
        name: "Roboto", 
        size: 12,  
        bold: true,
        horizontal: 'center'
    }; 
    ws.getCell('F4').alignment = { vertical: 'middle', horizontal: 'center' };

    ws.mergeCells('H4:K4');
    ws.getCell('H4').value = fecha_ini.replace(/-/g,'/') + ' al ' + fecha_fin.replace(/-/g,'/') ;
    ws.getCell('H4').alignment = { vertical: 'middle', horizontal: 'center' };
    //ws.getCell('H4').width = 7;
    //ws.getCell('I4').width = 7;

    ws.getRow(4).eachCell( (cell) => {
        cell.font = { name: "Roboto", size: 12,color: {argb: 'ffffff'} };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.fill = {
            type: "pattern",
	        pattern: "solid",
            fgColor: {argb:'000000'},
        };
    });


    /***** ENCABEZADOS DE LA TABLA DE PARAMETROS *****/
        ws.getCell('A8').value = '';
        ws.getCell('B8').value = '';    
        ws.getCell('C8').value = '';   

        ws.mergeCells('D8:E8');
        ws.getCell('D8').value = 'TEMP. (°C)';
        ws.getCell('D8').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('D8').font = {
            name: "Roboto", 
            size: 12,  
            //bold: true,
            horizontal: 'center'
        };  

        ws.mergeCells('F8:G8');
        ws.getCell('F8').value = 'O2 (mg/L)';
        ws.getCell('F8').font = {
            name: "Roboto", 
            size: 12,  
            //bold: true,
            horizontal: 'center'
        };
        ws.getCell('F8').alignment = { vertical: 'middle', horizontal: 'center' }; 

        ws.mergeCells('H8:I8');
        ws.getCell('H8').value = 'Nivel';
        ws.getCell('H8').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('H8').font = {
            name: "Roboto", 
            size: 12,  
            //bold: true,
            horizontal: 'center'
        }; 

        ws.getCell('J8').value = '';
        ws.getCell('K8').value = '';

        ws.getCell('A9').value = 'Est';
        ws.getCell('A9').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('B9').value = 'Fecha';
        ws.getCell('B9').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('C9').value = 'Día';
        ws.getCell('C9').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('D9').value = 'AM';
        ws.getCell('D9').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('D9').font = {
            name: "Roboto", 
            size: 12,  
            bold: true,
            horizontal: 'center'
        }; 

        ws.getCell('E9').value = 'PM';
        ws.getCell('E9').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('E9').font = {
            name: "Roboto", 
            size: 12,  
            bold: true,
            horizontal: 'center'
        }; 

        ws.getCell('F9').value = 'AM';
        ws.getCell('F9').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('F9').font = {
            name: "Roboto", 
            size: 12,  
            bold: true,
            horizontal: 'center'
        }; 
        //ws.getCell('F9').width = 7;

        ws.getCell('G9').value = 'PM';
        ws.getCell('G9').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('G9').font = {
            name: "Roboto", 
            size: 12,  
            bold: true,
            horizontal: 'center'
        }; 
        //ws.getCell('G9').width = 7;

        ws.getCell('H9').value = 'AM';
        ws.getCell('H9').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('H9').font = {
            name: "Roboto", 
            size: 12,  
            bold: true,
            horizontal: 'center'
        }; 
        //ws.getCell('H9').width = 7;

        ws.getCell('I9').value = 'PM';
        ws.getCell('I9').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('I9').font = {
            name: "Roboto", 
            size: 12,  
            bold: true,
            horizontal: 'center'
        }; 
        //ws.getCell('I9').width = 7;

        ws.getCell('J9').value = 'Sal.';
        ws.getCell('J9').alignment = { vertical: 'middle', horizontal: 'center' };
        //ws.getCell('J9').width = 7;

        ws.getCell('K9').value = 'pH';
        ws.getCell('K9').alignment = { vertical: 'middle', horizontal: 'center' };
        //ws.getCell('K9').width = 7;

        ws.getRow(8).eachCell( (cell) => {
            cell.font = { name: "Roboto", size: 12, color: {argb: 'ffffff'}, bold: true };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor:{argb:'000000'}
            };
        });

        ws.autoFilter = {
            from: 'A9',
            to: 'K9',
        };


        ws.getRow(9).eachCell( (cell) => {
            cell.font = { name: "Roboto", size: 12, color: {argb: '000000'}, bold: true };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor:{argb:'FFFFFF00'},
                bgColor:{argb:'FF0000FF'}
                //fgColor: {argb:'c6c6c6'},

            };
        });

        ws.columns = [
            {  key: 'est', width: 8 },
            {  key: 'fecha', width: 12, style: { numFmt: 'dd/mm/yyyy' } },
            {  key: 'dia', width: 10 },
            {  key: 'temp_am', width: 5, style: { numFmt: '#,##'} },
            {  key: 'temp_pm', width: 5, style: { numFmt: '#,##'} },
            {  key: 'ox_am', width: 5, style: { numFmt: '#,##'} },
            {  key: 'ox_pm', width: 5, style: { numFmt: '#,##'} },
            {  key: 'nivel_am', width: 8, style: { numFmt: '#,##'} },
            {  key: 'nivel_pm', width: 8, style: { numFmt: '#,##'} },
            {  key: 'sal', width: 5 },
            {  key: 'ph', width: 5 }
        ];

        var days = [ "DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];

    /**** */
    
    /*** Contadores  */
        var j_am = 0;
        var j_pm = 0;
        var j_ph = 0;
        var j_sal = 0;
        var g_am = 0;
        var g_pm = 0;
        var g_ph = 0;
        var g_sal = 0;
        var fila = 10;
    /*** */

    var color = '';
 
    /**** LLENADO DE CONTENDIO POR ESTANQUE */
    for(var i = 0; i < data.length; i ++){
        //;
        var ph, sal;

        j_am += 1;
        g_am += 1;
    
        // EVALUAR QUE EL QUE SIGUE SEA PM Y SEAN DEL MISMO ESTANQUE
        if(data[i+1] != null){
            if(data[i+1].tiempo == 'PM' && (data[i+1].codigo == data[i].codigo)){
                j_pm += 1;
                g_pm += 1;

                if( parseFloat(data[i].ph).toFixed(2) > 0.00){
                    j_ph += 1;
                    g_ph += 1;
                    ph = parseFloat(data[i].ph).toFixed(2);
                    prom_ph += parseFloat(data[i].ph);
                    gen_prom_ph += parseFloat(data[i].ph);
                } else {
                    ph = '';
                }

                if( parseFloat(data[i].salinidad).toFixed(2) > 0.00){
                    j_sal += 1;
                    g_sal += 1;
                    sal = parseFloat(data[i].salinidad).toFixed(2);
                    prom_sal += parseFloat(data[i].salinidad);
                    gen_prom_sal += parseFloat(data[i].salinidad);
                } else {
                    sal = '';
                }                
        
                // Asignación de valores para llenado de tabla
                ws.getCell('A'+fila).value = data[i].estanque.codigo;
                ws.getCell('B'+fila).value = data[i].fecha;
                ws.getCell('C'+fila).value = days[new Date(data[i].fecha).getDay()];
                ws.getCell('D'+fila).value = parseFloat(data[i].temperatura).toFixed(2);
                ws.getCell('E'+fila).value = parseFloat(data[i+1].temperatura).toFixed(2);
                ws.getCell('F'+fila).value = parseFloat(data[i].oxigeno).toFixed(2);
                ws.getCell('G'+fila).value = parseFloat(data[i+1].oxigeno).toFixed(2);
                ws.getCell('H'+fila).value = parseFloat(data[i].nivel_agua).toFixed(2);
                ws.getCell('I'+fila).value = parseFloat(data[i+1].nivel_agua).toFixed(2);
                ws.getCell('J'+fila).value = sal;
                ws.getCell('K'+fila).value = ph;
                

                if (fila%2==0) {
                    ws.getCell('A'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'dddddd'}}
                    ws.getCell('B'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'dddddd'}}
                    ws.getCell('C'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'dddddd'}}
                    ws.getCell('D'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'dddddd'}}
                    ws.getCell('E'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'dddddd'}}
                    ws.getCell('F'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'dddddd'}}
                    ws.getCell('G'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'dddddd'}}
                    ws.getCell('H'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'dddddd'}}
                    ws.getCell('I'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'dddddd'}}
                    ws.getCell('J'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'dddddd'}}
                    ws.getCell('K'+fila).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'dddddd'}}
                    
                }

                // Agregar estilo a las celdas
                ws.getCell('A'+fila).font = { name: "Roboto", size: 12};
                ws.getCell('A'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
                ws.getCell('A'+fila).numFmt = '0.00';
                ws.getCell('A'+fila).border = {
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
    
                ws.getCell('B'+fila).font = { name: "Roboto", size: 12};
                ws.getCell('B'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
                ws.getCell('B'+fila).border = {
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };

                ws.getCell('C'+fila).font = { name: "Roboto", size: 12};
                ws.getCell('C'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
                ws.getCell('C'+fila).numFmt = '0.00';
                ws.getCell('C'+fila).border = {
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };

                ws.getCell('D'+fila).font = { name: "Roboto", size: 12};
                ws.getCell('D'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
                ws.getCell('D'+fila).numFmt = '0.00';
                ws.getCell('D'+fila).border = {
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };

                ws.getCell('E'+fila).font = { name: "Roboto", size: 12};
                ws.getCell('E'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
                ws.getCell('E'+fila).numFmt = '0.00';
                ws.getCell('E'+fila).border = {
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };

                ws.getCell('F'+fila).font = { name: "Roboto", size: 12};
                ws.getCell('F'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
                ws.getCell('F'+fila).numFmt = '0.00';
                ws.getCell('F'+fila).border = {
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };

                ws.getCell('G'+fila).font = { name: "Roboto", size: 12};
                ws.getCell('G'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
                ws.getCell('G'+fila).numFmt = '0.00';
                ws.getCell('G'+fila).border = {
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };

                ws.getCell('H'+fila).font = { name: "Roboto", size: 12};
                ws.getCell('H'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
                ws.getCell('H'+fila).numFmt = '0.00';
                ws.getCell('H'+fila).border = {
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };

                ws.getCell('I'+fila).font = { name: "Roboto", size: 12};
                ws.getCell('I'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
                ws.getCell('I'+fila).numFmt = '0.00';
                ws.getCell('I'+fila).border = {
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };

                ws.getCell('J'+fila).font = { name: "Roboto", size: 12};
                ws.getCell('J'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
                ws.getCell('J'+fila).numFmt = '0.00';
                ws.getCell('J'+fila).border = {
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };

                ws.getCell('K'+fila).font = { name: "Roboto", size: 12};
                ws.getCell('K'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
                ws.getCell('K'+fila).numFmt = '0.00';
                ws.getCell('K'+fila).border = {
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };

                /** VALIDACIONES DE MINIMOS COLOREAR EN ROJO LO QUE ESTE DEBAJO DEL MÍNIMO */

                    /*** PH */
                    if(parseFloat(data[i].ph).toFixed(2) > 8.00){
                        ws.getCell('K'+fila).fill = {
                            type: 'pattern',
                            pattern:'solid',
                            fgColor: {argb:'cd919e'}
                        }

                        ws.getCell('K'+fila).font = { name: "Roboto", size: 12, bold: true, color: { argb: '6c2927' }};
                    }

                    /*** TEMPERATURA AM */
                    if(parseFloat(data[i].temperatura).toFixed(2) < 24.0 || parseFloat(data[i].temperatura).toFixed(2) > 33.0){
                        ws.getCell('D'+fila).fill = {
                            type: 'pattern',
                            pattern:'solid',
                            fgColor: {argb:'cd919e'}
                        }
                    }

                // Sumar a promedios de AM
                prom_ox_am += parseFloat(data[i].oxigeno);
                prom_tem_am += parseFloat(data[i].temperatura);
                prom_niv_am += parseFloat(data[i].nivel_agua);
                gen_prom_tem_am += parseFloat(data[i].temperatura) ;
                gen_prom_ox_am += parseFloat(data[i].oxigeno);
                gen_prom_niv_am += parseFloat(data[i].nivel_agua);
                
                
                // Sumar a promedios de PM
                prom_ox_pm += parseFloat(data[i+1].oxigeno);
                prom_tem_pm += parseFloat(data[i+1].temperatura);
                prom_niv_pm += parseFloat(data[i+1].nivel_agua);
                gen_prom_tem_pm += parseFloat(data[i+1].temperatura) ;
                gen_prom_niv_pm += parseFloat(data[i+1].nivel_agua) ;
                gen_prom_ox_pm += parseFloat(data[i+1].oxigeno) ;

                fila ++;
            }
        }else {
            if( parseFloat(data[i].ph).toFixed(2) > 0.00){
                j_ph += 1;
                g_ph += 1;
                ph = parseFloat(data[i].ph).toFixed(2);
                prom_ph += parseFloat(data[i].ph);
                gen_prom_ph += parseFloat(data[i].ph);
            } else {
                ph = '';
            }

            if( parseFloat(data[i].salinidad).toFixed(2) > 0.00){
                j_sal += 1;
                g_sal += 1;
                sal = parseFloat(data[i].salinidad).toFixed(2);
                prom_sal += parseFloat(data[i].salinidad);
                gen_prom_sal += parseFloat(data[i].salinidad);
            } else {
                sal = '';
            }   
            
            // Asignación de valores para llenado de tabla
            ws.getCell('A'+fila).value = data[i].estanque.codigo;
            ws.getCell('B'+fila).value = data[i].fecha;
            ws.getCell('C'+fila).value = days[new Date(data[i].fecha).getDay()];
            ws.getCell('D'+fila).value = parseFloat(data[i].temperatura).toFixed(2);
            ws.getCell('E'+fila).value = '';
            ws.getCell('F'+fila).value = parseFloat(data[i].oxigeno).toFixed(2);
            ws.getCell('G'+fila).value = '';
            ws.getCell('H'+fila).value = parseFloat(data[i].nivel_agua).toFixed(2);
            ws.getCell('I'+fila).value = '';
            ws.getCell('J'+fila).value = sal;
            ws.getCell('K'+fila).value = ph;
            
            // Agregar estilo a las celdas
            ws.getCell('A'+fila).font = { name: "Roboto", size: 12};
            ws.getCell('A'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
            ws.getCell('A'+fila).border = {
                bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                left: {style:'thin', color: {argb:'#FFFFFF'}},
                top: {style:'thin', color: {argb:'#FFFFFF'}},
                right: {style:'thin', color: {argb:'#FFFFFF'}}
            };

            ws.getCell('B'+fila).font = { name: "Roboto", size: 12};
            ws.getCell('B'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
            ws.getCell('B'+fila).border = {
                bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                left: {style:'thin', color: {argb:'#FFFFFF'}},
                top: {style:'thin', color: {argb:'#FFFFFF'}},
                right: {style:'thin', color: {argb:'#FFFFFF'}}
            };

            ws.getCell('C'+fila).font = { name: "Roboto", size: 12};
            ws.getCell('C'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
            ws.getCell('C'+fila).border = {
                bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                left: {style:'thin', color: {argb:'#FFFFFF'}},
                top: {style:'thin', color: {argb:'#FFFFFF'}},
                right: {style:'thin', color: {argb:'#FFFFFF'}}
            };

            ws.getCell('D'+fila).font = { name: "Roboto", size: 12};
            ws.getCell('D'+fila).alignment = { vertical: 'middle', horizontal: 'center' };
            ws.getCell('D'+fila).border = {
                bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                left: {style:'thin', color: {argb:'#FFFFFF'}},
                top: {style:'thin', color: {argb:'#FFFFFF'}},
                right: {style:'thin', color: {argb:'#FFFFFF'}}
            };


            /** VALIDACIONES DE MINIMOS COLOREAR EN ROJO LO QUE ESTE DEBAJO DEL MÍNIMO */
            if(parseFloat(data[i].temperatura).toFixed(2) < 24.0 || parseFloat(data[i].temperatura).toFixed(2) > 33.0){
                ws.getCell('D'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'cd919e'}
                }
            }

            // Sumar a promedios de AM
            prom_ox_am += parseFloat(data[i].oxigeno);
            prom_tem_am += parseFloat(data[i].temperatura);
            prom_niv_am += parseFloat(data[i].nivel_agua);
            gen_prom_tem_am += parseFloat(data[i].temperatura) ;
            gen_prom_ox_am += parseFloat(data[i].oxigeno);
            gen_prom_niv_am += parseFloat(data[i].nivel_agua);
        }            

        /** PROMEDIOS POR ESTANQUE  */
        if(i < data.length -1){
            if ((data[i].estanque.codigo != data[i+1].estanque.codigo)){

                ws.mergeCells('A'+fila+':C'+fila);
                ws.getCell('B'+fila).value = 'Promedios ' + data[i].estanque.codigo + ' :';
                ws.getCell('B'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('B'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                }
                ws.getCell('B'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                }; 
                ws.getCell('B'+fila).alignment = { vertical: 'middle', horizontal: 'center' };

                // TEMPERATURA AM
                ws.getCell('D'+fila).value = (parseFloat(prom_tem_am).toFixed(2) / parseFloat(j_am)).toFixed(2);
                ws.getCell('D'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('D'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                }
                ws.getCell('D'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                };
                ws.getCell('D'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

                // TEMPERATURA PM
                ws.getCell('E'+fila).value = (parseFloat(prom_tem_pm).toFixed(2) / parseFloat(j_pm)).toFixed(2);
                ws.getCell('E'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('E'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                }
                ws.getCell('E'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                }; 
                ws.getCell('E'+fila).alignment = { vertical: 'middle', horizontal: 'center' };

                // O2 AM
                ws.getCell('F'+fila).value = (parseFloat(prom_ox_am).toFixed(2) / parseFloat(j_am)).toFixed(2);
                ws.getCell('F'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('F'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                }
                ws.getCell('F'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                };
                ws.getCell('F'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

                // O2 PM
                ws.getCell('G'+fila).value = (parseFloat(prom_ox_pm).toFixed(2) / parseFloat(j_pm)).toFixed(2);
                ws.getCell('G'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('G'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                    bgColor: {argb:'000000'}
                }
                ws.getCell('G'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                }; 
                ws.getCell('G'+fila).alignment = { vertical: 'middle', horizontal: 'center' };

                // NIVEL AM
                ws.getCell('H'+fila).value = (parseFloat(prom_niv_am).toFixed(2) / parseFloat(j_am)).toFixed(2);
                ws.getCell('H'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('H'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                    bgColor: {argb:'000000'}
                }
                ws.getCell('H'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                }; 
                ws.getCell('H'+fila).alignment = { vertical: 'middle', horizontal: 'center' };

                // NIVEL PM
                ws.getCell('I'+fila).value = (parseFloat(prom_niv_pm).toFixed(2) / parseFloat(j_pm)).toFixed(2);
                ws.getCell('I'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('I'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                    bgColor: {argb:'000000'}
                }
                ws.getCell('I'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                }; 
                ws.getCell('I'+fila).alignment = { vertical: 'middle', horizontal: 'center' };

                // SALINIDAD
                ws.getCell('J'+fila).value = parseFloat((prom_sal).toFixed(2) / parseFloat(j_sal)).toFixed(2);
                ws.getCell('J'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('J'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                    bgColor: {argb:'000000'}
                }
                ws.getCell('J'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                }; 
                ws.getCell('J'+fila).alignment = { vertical: 'middle', horizontal: 'center' };

                // pH
                ws.getCell('K'+fila).value = parseFloat((prom_ph).toFixed(2) / parseFloat(j_ph)).toFixed(2);
                ws.getCell('K'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('K'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                    bgColor: {argb:'000000'}
                }
                ws.getCell('K'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                }; 
                ws.getCell('K'+fila).alignment = { vertical: 'middle', horizontal: 'center' };

                // Resetear los promedios
                prom_ox_am = 0;
                prom_tem_am = 0;
                prom_niv_am = 0;
                prom_ox_pm = 0;
                prom_tem_pm = 0;
                prom_niv_pm = 0;
                prom_ph = 0;
                prom_sal = 0;
                j_am = 0;
                j_pm = 0;
                j_ph = 0;
                j_sal = 0;
                fila ++;
            }
        
        } else if(i == data.length -1){ /*** PROMEDIOS GENERALES */
            ws.mergeCells('A'+fila+':C'+fila);
                ws.getCell('B'+fila).value = 'Promedios del módulo:';
                ws.getCell('B'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('B'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                }
                ws.getCell('B'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                }; 
                ws.getCell('B'+fila).alignment = { vertical: 'middle', horizontal: 'center' };               

                // TEMPERATURA AM
                ws.getCell('D'+fila).value = (parseFloat(gen_prom_tem_am).toFixed(2) / parseFloat(g_am)).toFixed(2);
                ws.getCell('D'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('D'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                }
                ws.getCell('D'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                };
                ws.getCell('D'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

                // TEMPERATURA PM
                ws.getCell('E'+fila).value = (parseFloat(gen_prom_tem_pm).toFixed(2) / parseFloat(g_pm)).toFixed(2);
                ws.getCell('E'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('E'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                }
                ws.getCell('E'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                }; 
                ws.getCell('E'+fila).alignment = { vertical: 'middle', horizontal: 'center' };

                // O2 AM
                ws.getCell('F'+fila).value = (parseFloat(gen_prom_ox_am).toFixed(2) / parseFloat(g_am)).toFixed(2);
                ws.getCell('F'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('F'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                }
                ws.getCell('F'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                };
                ws.getCell('F'+fila).alignment = { vertical: 'middle', horizontal: 'center' }; 

                // O2 PM
                ws.getCell('G'+fila).value = (parseFloat(gen_prom_ox_pm).toFixed(2) / parseFloat(g_pm)).toFixed(2);
                ws.getCell('G'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('G'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                }
                ws.getCell('G'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                }; 
                ws.getCell('G'+fila).alignment = { vertical: 'middle', horizontal: 'center' };

                // NIVEL AM
                ws.getCell('H'+fila).value = (parseFloat(gen_prom_niv_am).toFixed(2) / parseFloat(g_am)).toFixed(2);
                ws.getCell('H'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('H'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                }
                ws.getCell('H'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    color: {argb: 'FFFFFF'},
                    horizontal: 'center'
                }; 
                ws.getCell('H'+fila).alignment = { vertical: 'middle', horizontal: 'center' };

                // NIVEL PM
                ws.getCell('I'+fila).value = (parseFloat(gen_prom_niv_pm).toFixed(2) / parseFloat(g_pm)).toFixed(2);
                ws.getCell('I'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('I'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                }
                ws.getCell('I'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                }; 
                ws.getCell('I'+fila).alignment = { vertical: 'middle', horizontal: 'center' };

                // SALINIDAD
                ws.getCell('J'+fila).value = parseFloat((gen_prom_sal).toFixed(2) / parseFloat(g_sal)).toFixed(2);
                ws.getCell('J'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('J'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                }
                ws.getCell('J'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    color: {argb: 'FFFFFF'},
                    horizontal: 'center'
                }; 
                ws.getCell('J'+fila).alignment = { vertical: 'middle', horizontal: 'center' };

                // pH
                ws.getCell('K'+fila).value = parseFloat((gen_prom_ph).toFixed(2) / parseFloat(g_ph)).toFixed(2);
                ws.getCell('K'+fila).border = { 
                    bottom: {style:'thin', color: {argb:'#FFFFFF'}},
                    left: {style:'thin', color: {argb:'#FFFFFF'}},
                    top: {style:'thin', color: {argb:'#FFFFFF'}},
                    right: {style:'thin', color: {argb:'#FFFFFF'}}
                };
                ws.getCell('K'+fila).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb:'848484'},
                }
                ws.getCell('K'+fila).font = {
                    name: "Roboto", 
                    size: 12,  
                    bold: true,
                    horizontal: 'center',
                    color: {argb: 'FFFFFF'}
                }; 
                ws.getCell('K'+fila).alignment = { vertical: 'middle', horizontal: 'center' };

        }
    }

    wb.commit().then( function(){
        console.log("XLS terminado.")
        return xls_name;
    });
}

// GUARDADO DE DATOS NUTRICION E HISTORIAL
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