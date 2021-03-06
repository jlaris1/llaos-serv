var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    Estanques = mongoose.model('Estanques');
    Modulos = mongoose.model('Modulos');
    Nutricion = mongoose.model('Nutricion');
    TiposModulos = mongoose.model('TiposModulos');
    Usuarios = mongoose.model('Usuarios');
    chalk = require('chalk');

var file_path = './files/reports/nutricion/';

module.exports = {
    all: function(solicitud, respuesta){
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
                                            var piscinas = Array();
                                            var charoleros = Array();

                                            nutricion.forEach(function(n){
                                                if(piscinas.includes(n.estanque) == false){
                                                    piscinas.push(n.estanque);
                                                }

                                                if(charoleros.includes(n.charolero) == false){
                                                    charoleros.push(n.charolero);
                                                }
                                            })

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
                    })
                }
            });
        } 
    },
    new: function(solicitud, respuesta){
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
    find: function(solicitud, respuesta){
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
    add: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{ 
            var fecha = new Date();

            var data = {
                charola_1: solicitud.body.charola_1,
                charola_2: solicitud.body.charola_2,
                charola_3: solicitud.body.charola_3,
                charola_4: solicitud.body.charola_4,
                kg_racion: solicitud.body.kg_racion,
                porcent_ajuste: solicitud.body.porcent_ajuste,
                siguiente_racion: solicitud.body.siguiente_racion,
                suma: solicitud.body.suma,
                codigo_racion: (parseFloat(solicitud.body.codigo_racion)).toFixed(2),
                estanque: solicitud.body.estanque,
                //fecha: new Date( fecha.getTime() + Math.abs(fecha.getTimezoneOffset()*60000)),
                fecha: new Date( solicitud.body.fecha.getTime() + Math.abs(solicitud.body.fecha.getTimezoneOffset()*60000)),
                hora: FechaHora.obtenerhora(),
                charolero: solicitud.session.user._id
            }

            console.log(chalk.bgGreen(data));

            nutricion = new Nutricion(data);

            nutricion.save( function(error){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.redirect('/nutricion/all');
                }
            })
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
                                        nutricion.forEach( function(n){
                                            search = n.estanque.nombre;
                                        });

                                        generatePdf(nutricion, title, search, pdf_name);
                                    }
                                });
                            }
                        });
                    }
                });
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
                });
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
                });
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
                                                piscinas.push(n.estanque);
                                                charoleros.push(n.charolero);
                                            })

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
            });
        }
    },
    xls: function(solicitud, respuesta){}
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
    .text("Est.", 17, 143, {align: 'center', width: 45})
    .text("Charola 1", 67, 143,  {align: 'center', width: 70})
    .text("Charola 2", 137, 143, {align: 'center', width: 70})
    .text("Charola 3", 207, 143, {align: 'center', width: 70})
    .text("Charola 4", 277, 143, {align: 'center', width: 70})
    .text("Kg Ración", 347, 143, {align: 'center', width: 70})
    .text("% Ajuste", 417, 143, {align: 'center', width: 70})
    .text("Suma", 494, 143, {align: 'center', width: 70})
    .text("Código", 564, 143, {align: 'center', width: 70})
    .text("Kg. Sig. Rac", 637, 143, {align: 'center', width: 70})
    .text("Fecha", 704, 143, {align: 'center', width: 70})
    
    
    // Llenado de tabla
    var y = 155;
    var total = 0;

    if (y > 525){
        y = 15;
        doc.addPage()
        .text("")
    }

    data.forEach( function(dat) {                                          
        total = total + 1;
        y += 10;

        doc.fillColor('black')
        .text(dat.estanque.codigo, 10, y, {align: 'center', width: 45 })
        .text(dat.charola_1, 67, y,  {align: 'center', width: 70 })
        .text(dat.charola_2, 137, y, {align: 'center', width: 70 })
        .text(dat.charola_3, 207, y, {align: 'center', width: 70 })
        .text(dat.charola_4, 277, y, {align: 'center', width: 70 })
        .text(dat.kg_racion, 347, y, {align: 'center', width: 70 })
        .text(dat.porcent_ajuste, 417, y, {align: 'center', width: 70 })
        .text(dat.suma, 494, y, {align: 'center', width: 70 })
        .text(dat.codigo_racion, 564, y, {align: 'center', width: 70 })
        .text(dat.siguiente_racion, 637, y, {align: 'center', width: 70 })
        if ((new Date(dat.fecha).getMonth() + 1) < 10) {
            if ((new Date(dat.fecha).getDate()) < 10) {
                doc.text('0' + new Date(dat.fecha).getDate()+ '/0' + (new Date(dat.fecha).getMonth() + 1)+ '/' + new Date(dat.fecha).getFullYear(), 704, y, {align: 'center', width: 70 });
            } else {
                doc.text(new Date(dat.fecha).getDate()+ '/0' + (new Date(dat.fecha).getMonth() + 1)+ '/' + new Date(dat.fecha).getFullYear(), 704, y, {align: 'center', width: 70 });
            }
        } else {
            if ((new Date(dat.fecha).getDate()) < 10) {
                doc.text('0' + new Date(dat.fecha).getDate()+ '/' + (new Date(dat.fecha).getMonth() + 1)+ '/' + new Date(dat.fecha).getFullYear(), 704, y, {align: 'center', width: 70 });
            } else {
                doc.text(new Date(dat.fecha).getDate()+ '/' + (new Date(dat.fecha).getMonth() + 1)+ '/' + new Date(dat.fecha).getFullYear(), 704, y, {align: 'center', width: 70 });
            }
        }

        prom_charola_1 += dat.charola_1;
        prom_charola_2 += dat.charola_2;
        prom_charola_3 += dat.charola_3;
        prom_charola_4 += dat.charola_4;
        prom_kg_racion += dat.kg_racion;
        prom_porcent_ajuste += dat.porcent_ajuste;
        prom_suma += dat.suma;
        prom_codigo_racion += dat.codigo_racion;
        prom_siguiente_racion += dat.siguiente_racion;
        
    
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
    .text((prom_charola_1 / data.length).toFixed(2), 67, y + 15, {align: 'center', width: 70})
    .text((prom_charola_2 / data.length).toFixed(2), 137, y + 15, {align: 'center', width: 70})
    .text((prom_charola_3 / data.length).toFixed(2), 207, y + 15, {align: 'center', width: 70})
    .text((prom_charola_4 / data.length).toFixed(2), 277, y + 15, {align: 'center', width: 70})
    .text((prom_kg_racion / data.length).toFixed(2), 347, y + 15, {align: 'center', width: 70})
    .text((prom_porcent_ajuste / data.length).toFixed(2), 417, y + 15, {align: 'center', width: 70})
    .text((prom_suma / data.length).toFixed(2), 494, y + 15, {align: 'center', width: 70})
    .text((prom_codigo_racion / data.length).toFixed(2), 564, y + 15, {align: 'center', width: 70})
    .text((prom_siguiente_racion / data.length).toFixed(2), 637, y + 15, {align: 'center', width: 70})

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
function generateXLS(){}