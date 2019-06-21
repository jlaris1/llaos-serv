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
            });
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
            Modulos.find( function(error, modulos){
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
                                modulo: '',
                                estanque: {
                                    id: 0
                                },
                                estanques: {},
                                parametro: {
                                    oxigeno: 0,
                                    ph: 0,
                                    salinidad: 0,
                                    temperatura: 0,
                                    nivel_agua: 0,
                                },
                                siguiente_estanque: {
                                    id: 0
                                },
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
    },
    add: function(solicitud, respuesta){    
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            var data = {
                oxigeno: solicitud.body.oxigeno,
                ph: solicitud.body.ph,
                salinidad: solicitud.body.salinidad,
                temperatura: solicitud.body.temperatura,
                nivel_agua: solicitud.body.nivel_agua,
                estanque: solicitud.body.estanque,
                //fecha: new Date( fecha.getTime() + Math.abs(fecha.getTimezoneOffset()*60000))
                fecha: new Date( new Date(solicitud.body.fecha).getTime() + Math.abs( new Date(solicitud.body.fecha).getTimezoneOffset()*60000)),
                tiempo: solicitud.body.tiempo,
                hora: FechaHora.obtenerhora(),
                parametrista: solicitud.session.user
            }

            var parametro = new Parametros(data);

            parametro.save( function(error){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Modulos.find( function(error, modulos){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Estanques.find({'modulo': solicitud.body.modu}, function(error, estanques){
                                if(error){
                                    respuesta.redirect("/sesion-expirada");
                                    console.log(chalk.bgRed(error));
                                } else {
        
                                    var estanque = {};
                                    var siguiente_estanque  = {};

                                    for (let i = 0; i < estanques.length; i++) {
                                        if(estanques[i].id == solicitud.body.estanque ){
                                            if(i>0){
                                                if(i == estanques.length - 1){
                                                    estanque =  estanques[estanques.length-1];
                                                    siguiente_estanque = estanques[0];
                                                } else {
                                                    estanque = estanques[i+1];
                                                    siguiente_estanque = estanques[i+2];
                                                }
                                            } else {
                                                estanque = estanques[i+1];
                                                siguiente_estanque = estanques[i+2];
                                            }
                                        }
                                    }
        
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(chalk.bgRed(error));
                                        } else {
                                            respuesta.render('Parametros/new', {
                                                user: solicitud.session.user,
                                                modulos: modulos,
                                                modulo: solicitud.body.modu, 
                                                estanques: estanques,
                                                estanque: estanque,
                                                usuarios: usuarios,
                                                siguiente_estanque: siguiente_estanque,
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
                            }).sort({ codigo : 1});
                        }
                    });
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
                                                console.log(chalk.bgGreen(parametros));
                                                
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
                                                    search = p.estanque.nombre;
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
                fecha = new Date(solicitud.body.fecha).getFullYear() + '-' +
                        (new Date(solicitud.body.fecha).getMonth() + 1) + '-' +
                        (new Date(solicitud.body.fecha).getDate() + 1);

                f = new Date(fecha);

                search = solicitud.body.fecha;
                xls_name = 'reporte_parametros_fecha_' + solicitud.body.fecha + '.xlsx';
            
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
                                        generateXLS(parametros, title, search, xls_name)
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
                xls_name = 'reporte_parametros_fechas_' + solicitud.body.fechaInicio + '-' + solicitud.body.fechaFin + '.xlsx';

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
                                        generateXLS(parametros, title, xls_name)
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
        .text(dat.oxigeno, 67, y,  {align: 'center', width: 70 })
        .text(dat.ph, 137, y, {align: 'center', width: 70 })
        .text(dat.salinidad, 207, y, {align: 'center', width: 70 })
        .text(dat.temperatura, 277, y, {align: 'center', width: 70 })
        .text(dat.nivel_agua, 347, y, {align: 'center', width: 70 })
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
        //horizontal: 'center'
    };   

    // Agregar imagen
    /*var imageId1 = ws.addImage({
        filename: './public/imgs/logo llaos.jpg',
        extension: 'jpg',
    }); 

    wb.addImage( imageId1, {
        tl: { col: 0, row: 1 },
        ext: { width: 200, height: 120 }
    });*/

    ws.getRow(9).values = ['Código', 'Oxigeno', 'pH', 'Salinidad', 'Temperatura', 'Nivel Agua', 'Parametrista', 'Fecha', 'Hora', 'Tiempo'];
    ws.getRow(9).fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{ argb:'f4f4f4' },
        bgColor:{ argb:'000000' }
    };

    ws.getRow(9).eachCell( (cell) => {
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
                oxigeno: d.oxigeno, 
                ph: d.ph,  
                salinidad: d.salinidad, 
                temperatura: d.temperatura, 
                nivel_agua: d.nivel_agua, 
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

    ///wb.pipe(wb.xlsx.createInputStream());

}