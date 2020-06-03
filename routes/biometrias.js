var mongoose = require('mongoose');
    FechaHora = require('./fechahora');
    chalk = require('chalk');
    Biometrias = mongoose.model('Biometrias');

var file_path = './files/reports/biometrias/';

module.exports = {
    all: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Biometrias.find( function(error, biometrias){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.populate(biometrias, {path: 'estanque'}, function(error, biometrias){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            Usuarios.populate(biometrias, { path: 'charolero'}, function(error, biometrias){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            respuesta.render('Produccion/Biometrias/all',
                                                {
                                                    user: solicitud.session.user,
                                                    biometrias: biometrias,
                                                    titulo: "Biometrias",
                                                    criterios: [
                                                        {
                                                            val: "piscina",
                                                            name: "Piscina"
                                                        },
                                                        {
                                                            val: "fecha",
                                                            name: "Fecha"
                                                        },
                                                        {
                                                            val: "fechas",
                                                            name: "Fechas"
                                                        },
                                                        {
                                                            val: "concentrado",
                                                            name: "Concentrado"
                                                        }
                                                    ],
                                                    usuarios: usuarios,
                                                    piscinas: [],
                                                    charoleros: [],
                                                    ruta: "biometrias"
                                                }
                                            );
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }).sort({estanque: 1, fecha_biometria: 0});
        }
    },
    new: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Usuarios.find( function(error, usuarios){
                if(error){
                    console.log(chalk.bgRed(error));
                } else { 
                    respuesta.render('Produccion/biometrias/new', {
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
    add: async (solicitud, respuesta) => {
        if (!solicitud.session.user) return respuesta.redirect('/sesion-expirada');
        if (!solicitud.body.biometrias || !solicitud.body.biometrias.length) return console.log('No guardar, llego todo en 0');

        console.log(solicitud.body.biometrias);

        const documents = solicitud.body.biometrias.map((val) => new Biometrias(val));

        await saveDocuments(documents, solicitud.session.user);

        respuesta.json({ estatus: 'Guardado' });
    },
    findPiscinas: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Estanques.find({ 
                $and: [
                    { estatus: "Sembrado" },
                    {"modulo": {$in: solicitud.body.modulos}}
                ]
                }, (error, piscinas) => {
                if(error){
                    console.log(error);
                } else {
                    Modulos.find(
                        {"_id": { $in: solicitud.body.modulos }},{ nombre: 1 }, (error, modulos) => {
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
    },
    acumulado: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            //console.log(FechaHora.getTuesdayOfLastWeek(new Date()));

            Nutricion.find(
                {$and : 
                    [
                        { "estanque": solicitud.body.id },
                        { fecha: {
                                $lte:  FechaHora.getMondayOfCurrentWeekString(new Date())
                            }
                        }
                ]},
                { kg_racion: 1 }
                , (error, kg_acumulados) => {
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {                       
                        Nutricion.find(
                            { $and: [
                                { estanque: solicitud.body.id},
                                { fecha: {
                                    $gte: FechaHora.getTuesdayOfLastWeek(new Date()),
                                    $lte: FechaHora.getMondayOfCurrentWeekString(new Date())
                                }}
                            ]},{ kg_racion: 1 }
                            , (error, kg_acumulados_sem) => {
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    Biometrias.find({ estanque: solicitud.body.id}, (error, biometrias) => {
                                        if(error){
                                            console.log(chalk.bgRed(error));
                                        } else {
                                            respuesta.json({
                                                id: solicitud.body.id,
                                                kg_acumulados: kg_acumulados.map( n => { return parseFloat(n.kg_racion); }).filter(n => n !== undefined).reduce((a, b) => a + b, 0),
                                                kg_acumulados_sem: kg_acumulados_sem.map( n => { return parseFloat(n.kg_racion); }).filter(n => n !== undefined).reduce((a, b) => a + b, 0),
                                                dias_siembra: FechaHora.getDaysBeetweenTwoDates(new Date(FechaHora.getMondayOfCurrentWeekString(new Date())), new Date(solicitud.body.fecha_siembra)),
                                                biometria_anterior: biometrias[0],
                                                org_muert_acum: biometrias.map(b => { return b.organismos_muertos}).filter(n => n !== undefined).reduce((a, b) => a + b, 0)
                                            });
                                        }
                                    }).sort({fecha_biometria: -1});
                                }
                            }
                        ).sort({ codigo : 1});
                }
            }).sort({ codigo : 1});
        }
    },
    deleteOne: (solicitud, respuesta) => {
        if (!solicitud.session.user) return respuesta.redirect('/sesion-expirada');
        
        Biometrias.deleteOne({"_id": solicitud.params.id}, (error) => {
            if(error) return console.log(chalk.bgRed(error));
            respuesta.redirect('/biometrias/all');
        });
    },
    xls: (solicitud, respuesta) => {
        if (!solicitud.session.user) return respuesta.redirect('/sesion-expirada');

        Biometrias.find({fecha_biometria: 
                { 
                    $gte: '2020-05-19',
                    $lte: '2020-05-20'
                }
            }, (error, biometrias) => {
            if(error) return console.log(chalk.bgRed(error));

            Estanques.populate(biometrias, {path: 'estanque'}, (error, biometrias) =>{
                if(error) return console.log(chalk.bgRed(error));
                
                Modulos.populate(biometrias, {path: 'estanque.modulo'}, (error, biometrias) =>{

                    xls_name = 'reporte_biometrias_.xlsx';
                    pdf_name = 'reporte_biometrias_.xlsx';

                    generateConcentrado(biometrias, xls_name);
                    
                    respuesta.redirect('/biometrias/all');
                });
            });
        });
    }
}

async function generateConcentrado(data, xls_name){
    var filename =  file_path + '/' + xls_name;
    var wb = new Excel.Workbook();

    await wb.xlsx.readFile( file_path + '/reporte_biometrias.xlsx');

    var ws = wb.getWorksheet('Reporte');

    data.sort(GetSortOrder('estanque.codigo'));

    // CONTADORES
    var fila_modulo_abc = 13;
    var fila_modulo_d = 48;
    var fila_modulo_e = 74;
    
    var suma = 0;
    var suma_has_modulo_abc = 0;
    var suma_has_modulo_d = 0;
    var suma_has_modulo_e = 0;

    var suma_alim_sem_modulo_abc = 0;
    var suma_alim_sem_modulo_d = 0;
    var suma_alim_sem_modulo_e = 0;

    var suma_alim_acum_modulo_abc = 0;
    var suma_alim_acum_modulo_d = 0;
    var suma_alim_acum_modulo_e = 0;

    var prom_dias_cultivo_abc = 0;
    var prom_dias_cultivo_d = 0;
    var prom_dias_cultivo_e = 0;

    var prom_peso_siembra_abc = 0;
    var prom_peso_siembra_d = 0;
    var prom_peso_siembra_e = 0;

    var prom_peso_anterior_abc = 0;
    var prom_peso_anterior_d = 0;
    var prom_peso_anterior_e = 0;

    var prom_peso_actual_abc = 0;
    var prom_peso_actual_d = 0;
    var prom_peso_actual_e = 0;

    var prom_incremento_abc = 0;
    var prom_incremento_d = 0;
    var prom_incremento_e = 0;

    var prom_organismo_lance_abc = 0;
    var prom_organismo_lance_d = 0;
    var prom_organismo_lance_e = 0;

    var prom_densidad_abc = 0;
    var prom_densidad_d = 0;
    var prom_densidad_e = 0;

    var prom_cod_4h_abc = 0;
    var prom_cod_4h_d = 0;
    var prom_cod_4h_e = 0;

    var prom_cod_10h_abc = 0;
    var prom_cod_10h_d = 0;
    var prom_cod_10h_e = 0;

    var prom_kg_x_has_sem_abc = 0;
    var prom_kg_x_has_sem_d = 0;
    var prom_kg_x_has_sem_e = 0;

    var prom_aliment_acum_x_has_abc = 0;
    var prom_aliment_acum_x_has_d = 0;
    var prom_aliment_acum_x_has_e = 0;

    var contador_abc = 0;
    var contador_d = 0;
    var contador_e = 0;

    ws.columns = [
        {  key: 'fecha_siembra', width: 15 , style: { numFmt: 'dd/mm/yyyy' }},
        {  key: 'fecha_biometria', width: 15 , style: { numFmt: 'dd/mm/yyyy' }},
    ];

    /**** LLENADO DE CONTENDIO POR ESTANQUE */
    for(var i = 0; i <= data.length - 1; i ++){
        suma += parseFloat(data[i].kg_racion);

        /// LLENADO MÓDULO A, B Y C
        if( data[i].estanque.modulo.codigo == "A" || data[i].estanque.modulo.codigo == "B" || data[i].estanque.modulo.codigo == "C"){
            // SUMAS
            suma_has_modulo_abc += data[i].superficie;
            suma_alim_sem_modulo_abc += data[i].alimento_semanal;
            suma_alim_acum_modulo_abc += data[i].alimento_acumulado;

            // PROMEDIOS
            prom_dias_cultivo_abc += data[i].dias_cultivo;
            prom_peso_siembra_abc += data[i].peso_siembra;
            prom_peso_anterior_abc += data[i].peso_anterior;
            prom_peso_actual_abc += data[i].peso_actual;
            prom_incremento_abc += data[i].incremento;
            prom_organismo_lance_abc += data[i].organismos_lance;
            prom_densidad_abc += data[i].densidad;
            prom_cod_4h_abc += data[i].cod_4h;
            prom_cod_10h_abc += data[i].cod_10h;
            prom_kg_x_has_sem_abc += data[i].kg_has_sembrada_prom;
            prom_aliment_acum_x_has_abc += data[i].alimento_acumulado_has;

            // CONTADOR
            contador_abc += 1;

            ws.getCell('B'+fila_modulo_abc).value = data[i].estanque.codigo;
            ws.getCell('B'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' }; 

            ws.getCell('C'+fila_modulo_abc).value = data[i].superficie;
            ws.getCell('C'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' }; 

            ws.getCell('D'+fila_modulo_abc).value = data[i].fecha_siembra;
            ws.getCell('D'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };
            
            ws.getCell('E'+fila_modulo_abc).value = data[i].fecha_biometria;
            ws.getCell('E'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('F'+fila_modulo_abc).value = data[i].dias_cultivo;
            ws.getCell('F'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('G'+fila_modulo_abc).value = data[i].int_origen.toString();
            ws.getCell('G'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('H'+fila_modulo_abc).value = parseFloat(data[i].peso_siembra.toFixed(3));
            ws.getCell('H'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('I'+fila_modulo_abc).value = parseFloat(data[i].peso_anterior.toFixed(3));
            ws.getCell('I'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('J'+fila_modulo_abc).value = parseFloat(data[i].peso_actual.toFixed(3));
            ws.getCell('J'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('K'+fila_modulo_abc).value = parseFloat(data[i].incremento.toFixed(3));
            ws.getCell('K'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('L'+fila_modulo_abc).value = data[i].organismos_lance;
            ws.getCell('L'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('M'+fila_modulo_abc).value = parseFloat(data[i].densidad.toFixed(2));
            ws.getCell('M'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('N'+fila_modulo_abc).value = parseFloat(data[i].cod_4h.toFixed(2));
            ws.getCell('N'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('O'+fila_modulo_abc).value = parseFloat(data[i].cod_10h.toFixed(2));
            ws.getCell('O'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('P'+fila_modulo_abc).value = data[i].alimento_semanal;
            ws.getCell('P'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('Q'+fila_modulo_abc).value = parseFloat(data[i].kg_has_sembrada_prom.toFixed(2));
            ws.getCell('Q'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('R'+fila_modulo_abc).value = parseFloat(data[i].alimento_acumulado_has.toFixed(2));
            ws.getCell('R'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('S'+fila_modulo_abc).value = data[i].alimento_acumulado;
            ws.getCell('S'+fila_modulo_abc).alignment = { vertical: 'middle', horizontal: 'center' };

            if (fila_modulo_abc%2==0) {
                ws.getCell('B'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('C'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('D'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('E'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('F'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('G'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('H'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('I'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('J'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('K'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('L'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('M'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('N'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('O'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('P'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('Q'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('R'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('S'+fila_modulo_abc).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}         

            }

            fila_modulo_abc += 1;
        }

        /// LLENADO MÓDULO D
        /*if( data[i].estanque.modulo.codigo == "D" ){
            suma_has_modulo_d += data[i].superficie;
            suma_alim_sem_modulo_d += data[i].alimento_semanal;
            suma_alim_acum_modulo_d += data[i].alimento_acumulado;

            // PROMEDIOS
            prom_dias_cultivo_d += data[i].dias_cultivo;
            prom_peso_siembra_d += data[i].peso_siembra;
            prom_peso_anterior_d += data[i].peso_anterior;
            prom_peso_actual_d += data[i].peso_actual;
            prom_incremento_d += data[i].incremento;
            prom_organismo_lance_d += data[i].organismos_lance;
            prom_densidad_d += data[i].densidad;
            prom_cod_4h_d += data[i].cod_4h;
            prom_cod_10h_d += data[i].cod_10h;
            prom_kg_x_has_sem_d += data[i].kg_has_sembrada_prom;
            prom_aliment_acum_x_has_d += data[i].alimento_acumulado_has;

            // CONTADOR
            contador_d += 1;

            ws.getCell('B'+fila_modulo_d).value = data[i].estanque.codigo;
            ws.getCell('B'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' }; 

            ws.getCell('C'+fila_modulo_d).value = data[i].superficie;
            ws.getCell('C'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' }; 

            ws.getCell('D'+fila_modulo_d).value = data[i].fecha_siembra;
            ws.getCell('D'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };
            
            ws.getCell('E'+fila_modulo_d).value = data[i].fecha_biometria;
            ws.getCell('E'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('F'+fila_modulo_d).value = data[i].dias_cultivo;
            ws.getCell('F'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            //ws.getCell('G'+fila_modulo_d).value = await returnIntOrigen(data[i].int_origen);
            //ws.getCell('G'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('H'+fila_modulo_d).value = parseFloat(data[i].peso_siembra.toFixed(3));
            ws.getCell('H'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('I'+fila_modulo_d).value = parseFloat(data[i].peso_anterior.toFixed(3));
            ws.getCell('I'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('J'+fila_modulo_d).value = parseFloat(data[i].peso_actual.toFixed(3));
            ws.getCell('J'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('K'+fila_modulo_d).value = parseFloat(data[i].incremento.toFixed(3));
            ws.getCell('K'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('L'+fila_modulo_d).value = data[i].organismos_lance;
            ws.getCell('L'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('M'+fila_modulo_d).value = parseFloat(data[i].densidad.toFixed(2));
            ws.getCell('M'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('N'+fila_modulo_d).value = parseFloat(data[i].cod_4h.toFixed(2));
            ws.getCell('N'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('O'+fila_modulo_d).value = parseFloat(data[i].cod_10h.toFixed(2));
            ws.getCell('O'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('P'+fila_modulo_d).value = data[i].alimento_semanal;
            ws.getCell('P'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('Q'+fila_modulo_d).value = parseFloat(data[i].kg_has_sembrada_prom.toFixed(2));
            ws.getCell('Q'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('R'+fila_modulo_d).value = parseFloat(data[i].alimento_acumulado_has.toFixed(2));
            ws.getCell('R'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('S'+fila_modulo_d).value = data[i].alimento_acumulado;
            ws.getCell('S'+fila_modulo_d).alignment = { vertical: 'middle', horizontal: 'center' };

            if (fila_modulo_d%2==0) {
                ws.getCell('B'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('C'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('D'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('E'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('F'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('G'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('H'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('I'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('J'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('K'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('L'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('M'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('N'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('O'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('P'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('Q'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('R'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('S'+fila_modulo_d).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}         
            }

            fila_modulo_d += 1;
        }*/

        /// LLENADO MÓDULO E
        /*if( data[i].estanque.modulo.codigo == "E"){
            suma_has_modulo_e += data[i].superficie;
            suma_alim_sem_modulo_e += data[i].alimento_semanal;
            suma_alim_acum_modulo_e += data[i].alimento_acumulado;

            // PROMEDIOS
            prom_dias_cultivo_e += data[i].dias_cultivo;
            prom_peso_siembra_e += data[i].peso_siembra;
            prom_peso_anterior_e += data[i].peso_anterior;
            prom_peso_actual_e += data[i].peso_actual;
            prom_incremento_e += data[i].incremento;
            prom_organismo_lance_e += data[i].organismos_lance;            
            prom_densidad_e += data[i].densidad;            
            prom_cod_4h_e += data[i].cod_4h;
            prom_cod_10h_e += data[i].cod_10h;
            prom_kg_x_has_sem_e += data[i].kg_has_sembrada_prom;
            prom_aliment_acum_x_has_e += data[i].alimento_acumulado_has;

            // CONTADOR
            contador_e += 1;

            ws.getCell('B'+fila_modulo_e).value = data[i].estanque.codigo;
            ws.getCell('B'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' }; 

            ws.getCell('C'+fila_modulo_e).value = data[i].superficie;
            ws.getCell('C'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' }; 

            ws.getCell('D'+fila_modulo_e).value = data[i].fecha_siembra;
            ws.getCell('D'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };
            
            ws.getCell('E'+fila_modulo_e).value = data[i].fecha_biometria;
            ws.getCell('E'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('F'+fila_modulo_e).value = data[i].dias_cultivo;
            ws.getCell('F'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            //ws.getCell('G'+fila_modulo_e).value = await returnIntOrigen(data[i].int_origen);
            //ws.getCell('G'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('H'+fila_modulo_e).value = parseFloat(data[i].peso_siembra.toFixed(3));
            ws.getCell('H'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('I'+fila_modulo_e).value = parseFloat(data[i].peso_anterior.toFixed(3));
            ws.getCell('I'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('J'+fila_modulo_e).value = parseFloat(data[i].peso_actual.toFixed(3));
            ws.getCell('J'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('K'+fila_modulo_e).value = parseFloat(data[i].incremento.toFixed(3));
            ws.getCell('K'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('L'+fila_modulo_e).value = data[i].organismos_lance;
            ws.getCell('L'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('M'+fila_modulo_e).value = parseFloat(data[i].densidad.toFixed(2));
            ws.getCell('M'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('N'+fila_modulo_e).value = data[i].cod_4h != undefined ? parseFloat(data[i].cod_4h.toFixed(2)) : 0;
            ws.getCell('N'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('O'+fila_modulo_e).value = data[i].cod_10h != undefined ? parseFloat(data[i].cod_10h.toFixed(2)) : 0;
            ws.getCell('O'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('P'+fila_modulo_e).value = data[i].alimento_semanal;
            ws.getCell('P'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('Q'+fila_modulo_e).value = parseFloat(data[i].kg_has_sembrada_prom.toFixed(2));
            ws.getCell('Q'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('R'+fila_modulo_e).value = parseFloat(data[i].alimento_acumulado_has.toFixed(2));
            ws.getCell('R'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            ws.getCell('S'+fila_modulo_e).value = data[i].alimento_acumulado;
            ws.getCell('S'+fila_modulo_e).alignment = { vertical: 'middle', horizontal: 'center' };

            if (fila_modulo_e%2==0) {
                ws.getCell('B'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('C'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('D'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('E'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('F'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('G'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('H'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('I'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('J'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('K'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('L'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('M'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('N'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('O'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('P'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('Q'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('R'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}
                ws.getCell('S'+fila_modulo_e).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'ccd8e5'}}         
            }

            fila_modulo_e += 1;
        }*/
    }

    // PROMEDIOS Y SUMAS
        /// MODULO A, B y C
        ws.getCell('C47').value = { formula: "SUMA(C13:C46)", result: suma_has_modulo_abc };
        ws.getCell('C47').alignment = { vertical: 'middle', horizontal: 'center' };      
        ws.getCell('F47').value = { formula: "PROMEDIO(F13:F46)", result: (prom_dias_cultivo_abc / contador_abc) };
        ws.getCell('F47').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('H47').value = { formula: "PROMEDIO(H13:H46)", result: (prom_peso_siembra_abc / contador_abc) };
        ws.getCell('H47').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('I47').value = { formula: "PROMEDIO(I13:I46)", result: (prom_peso_anterior_abc / contador_abc) };
        ws.getCell('I47').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('J47').value = { formula: "PROMEDIO(J13:J46)", result: (prom_peso_actual_abc / contador_abc) };
        ws.getCell('J47').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('K47').value = { formula: "PROMEDIO(K13:K46)", result: (prom_incremento_abc / contador_abc) };
        ws.getCell('K47').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('L47').value = { formula: "PROMEDIO(L13:L46)", result: (prom_organismo_lance_abc / contador_abc) };
        ws.getCell('L47').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('M47').value = { formula: "PROMEDIO(M13:M46)", result: (prom_densidad_abc / contador_abc) };
        ws.getCell('M47').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('N47').value = { formula: "PROMEDIO(N13:N46)", result: (prom_cod_4h_abc / contador_abc) };
        ws.getCell('N47').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('O47').value = { formula: "PROMEDIO(O13:O46)", result: (prom_cod_10h_abc / contador_abc) };
        ws.getCell('O47').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('P47').value = { formula: "SUMA(P13:P46)", result: parseFloat(suma_alim_sem_modulo_abc) };
        ws.getCell('P47').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('Q47').value = { formula: "PROMEDIO(Q13:Q46)", result: (prom_kg_x_has_sem_abc / contador_abc) };
        ws.getCell('Q47').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('R47').value = { formula: "PROMEDIO(R13:R46)", result: (prom_aliment_acum_x_has_abc / suma_alim_acum_modulo_abc ) };
        ws.getCell('R47').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('S47').value = { formula: "SUMA(S13:S46)", result:suma_alim_acum_modulo_abc };
        ws.getCell('S47').alignment = { vertical: 'middle', horizontal: 'center' };



        /// MODULO D
        ws.getCell('C73').value = { formula: "SUMA(C48:C72)", result:suma_has_modulo_d };
        ws.getCell('C73').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('F73').value = { formula: "PROMEDIO(F48:F72)", result: (prom_dias_cultivo_d / contador_d) };
        ws.getCell('F73').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('H73').value = { formula: "PROMEDIO(H48:H72)", result: (prom_peso_siembra_d / contador_d) };
        ws.getCell('H73').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('I73').value = { formula: "PROMEDIO(I48:I72)", result: (prom_peso_anterior_d / contador_d) };
        ws.getCell('I73').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('J73').value = { formula: "PROMEDIO(J48:J72)", result: (prom_peso_actual_d / contador_d) };
        ws.getCell('J73').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('K73').value = { formula: "PROMEDIO(K48:K72)", result: (prom_incremento_d / contador_d) };
        ws.getCell('K73').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('L73').value = { formula: "PROMEDIO(L48:L72)", result: (prom_organismo_lance_d / contador_d) };
        ws.getCell('L73').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('M73').value = { formula: "PROMEDIO(M48:M72)", result: (prom_densidad_d / contador_d) };
        ws.getCell('M73').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('N73').value = { formula: "PROMEDIO(N48:N72)", result: (prom_cod_4h_d / contador_d) };
        ws.getCell('N73').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('O73').value = { formula: "PROMEDIO(O48:O72)", result: (prom_cod_10h_d / contador_d) };
        ws.getCell('O73').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('P73').value = { formula: "SUMA(P48:P72)", result: parseFloat(suma_alim_sem_modulo_d) };
        ws.getCell('P73').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('Q73').value = { formula: "PROMEDIO(Q48:Q73)", result: (prom_kg_x_has_sem_d / contador_d) };
        ws.getCell('Q73').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('R73').value = { formula: "PROMEDIO(R48:R73)", result: (prom_aliment_acum_x_has_d / suma_alim_acum_modulo_d ) };
        ws.getCell('R73').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('S73').value = { formula: "SUMA(S48:S72)", result:suma_alim_acum_modulo_d };
        ws.getCell('S73').alignment = { vertical: 'middle', horizontal: 'center' };

        /// MODULO E (RENEGADOS)
        ws.getCell('C86').value = { formula: "SUMA(C74:C85)", result:suma_has_modulo_e };
        ws.getCell('C86').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('F86').value = { formula: "PROMEDIO(F74:F85)", result: (prom_dias_cultivo_e / contador_e) };
        ws.getCell('F86').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('H86').value = { formula: "PROMEDIO(H74:H85)", result: (prom_peso_siembra_e / contador_e) };
        ws.getCell('H86').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('I86').value = { formula: "PROMEDIO(I74:I85)", result: (prom_peso_anterior_e / contador_e) };
        ws.getCell('I86').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('J86').value = { formula: "PROMEDIO(J74:J85)", result: (prom_peso_actual_e / contador_e) };
        ws.getCell('J86').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('K86').value = { formula: "PROMEDIO(K74:K85)", result: (prom_incremento_e / contador_e) };
        ws.getCell('K86').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('L86').value = { formula: "PROMEDIO(L74:L85)", result: (prom_organismo_lance_e / contador_e) };
        ws.getCell('L86').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('M86').value = { formula: "PROMEDIO(M74:M85)", result: (prom_densidad_e / contador_e) };
        ws.getCell('M86').alignment = { vertical: 'middle', horizontal: 'center' };

        var cod_4h_prom = prom_cod_4h_e == 0 || isNaN(prom_cod_4h_e) ? 0 : (prom_cod_10h_e / contador_e);
        var cod_10h_prom = prom_cod_10h_e == 0 || isNaN(prom_cod_10h_e) ? 0 : (prom_cod_10h_e / contador_e);

        if(cod_4h_prom == 0){
            ws.getCell('N86').value = 0;
            ws.getCell('N86').alignment = { vertical: 'middle', horizontal: 'center' };
        } else {
            ws.getCell('N86').value = { formula: "PROMEDIO(N74:N85)", result:  cod_4h_prom};
            ws.getCell('N86').alignment = { vertical: 'middle', horizontal: 'center' };
        }

        if(cod_10h_prom == 0){
            ws.getCell('O86').value = 0;
            ws.getCell('O86').alignment = { vertical: 'middle', horizontal: 'center' };
        } else {
            ws.getCell('O86').value = { formula: "PROMEDIO(O74:O85)", result: cod_10h_prom };
            ws.getCell('O86').alignment = { vertical: 'middle', horizontal: 'center' };
        }

        ws.getCell('P86').value = { formula: "SUMA(P74:P85)", result: parseFloat(suma_alim_sem_modulo_e) };
        ws.getCell('P86').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('Q86').value = { formula: "PROMEDIO(Q74:Q85)", result: (prom_kg_x_has_sem_e / contador_e) };
        ws.getCell('Q86').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('R86').value = { formula: "PROMEDIO(R74:R85)", result: (prom_aliment_acum_x_has_e / suma_alim_acum_modulo_e ) };
        ws.getCell('R86').alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell('S86').value = { formula: "SUMA(S74:S85)", result:suma_alim_acum_modulo_e };
        ws.getCell('S86').alignment = { vertical: 'middle', horizontal: 'center' };


    
    // PROMEDIOS Y SUMAS GENERALES
    ws.getCell('C89').value = { formula: "C47+C73+C86", result:(suma_has_modulo_abc + suma_has_modulo_d + suma_has_modulo_e) };
    ws.getCell('C89').alignment = { vertical: 'middle', horizontal: 'center' };

    ws.getCell('F89').value = { formula: "(F47+F73+F86) / 3", result: (((prom_dias_cultivo_abc / contador_abc) + (prom_dias_cultivo_d / contador_d) + (prom_dias_cultivo_e / contador_e)) / 3) };
    ws.getCell('F89').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('H89').value = { formula: "(H47+H73+H86) / 3", result: (((prom_peso_siembra_abc / contador_abc) + (prom_peso_siembra_d / contador_d) + (prom_peso_siembra_e / contador_e)) / 3) };
    ws.getCell('H89').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('I89').value = { formula: "(I47+I73+I86) / 3", result: (((prom_peso_anterior_abc / contador_abc) + (prom_peso_anterior_d / contador_d) + (prom_peso_anterior_e / contador_e)) / 3) };
    ws.getCell('I89').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('J89').value = { formula: "(J47+J73+J86) / 3", result: (((prom_peso_actual_abc / contador_abc) + (prom_peso_actual_d / contador_d) + (prom_peso_actual_e / contador_e)) / 3) };
    ws.getCell('J89').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('K89').value = { formula: "(K47+K73+K86) / 3", result: (((prom_incremento_abc / contador_abc) + (prom_incremento_d / contador_d) + (prom_incremento_e / contador_e)) / 3) };
    ws.getCell('K89').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('L89').value = { formula: "(L47+L73+L86) / 3", result: (((prom_organismo_lance_abc / contador_abc) + (prom_organismo_lance_d / contador_d) + (prom_organismo_lance_e / contador_e)) / 3) };
    ws.getCell('L89').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('M89').value = { formula: "(M47+M73+M86) / 3", result: (((prom_densidad_abc / contador_abc) + (prom_densidad_d / contador_d) + (prom_densidad_e / contador_e)) / 3) };
    ws.getCell('M89').alignment = { vertical: 'middle', horizontal: 'center' };

    var cod_4h_prom_gral = (((prom_cod_4h_abc / contador_abc) + (prom_cod_4h_d / contador_d) + (cod_4h_prom)) / 3) == 0 ? 0 : (((prom_cod_4h_abc / contador_abc) + (prom_cod_4h_d / contador_d) + (cod_4h_prom)) / 3);
    var cod_10h_prom_gral = (((prom_cod_10h_abc / contador_abc) + (prom_cod_10h_d / contador_d) + (cod_10h_prom)) / 3) == 0 ? 0 : (((prom_cod_10h_abc / contador_abc) + (prom_cod_10h_d / contador_d) + (cod_10h_prom)) / 3);

    console.log(cod_4h_prom_gral);
    console.log(cod_10h_prom_gral);

    ws.getCell('N89').value = { formula: "(N47+N73+N86) / 3", result: cod_4h_prom_gral };
    ws.getCell('N89').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('O89').value = { formula: "(O47+O73+O86) / 3", result: cod_10h_prom_gral  };
    ws.getCell('O89').alignment = { vertical: 'middle', horizontal: 'center' };


    ws.getCell('P89').value = { formula: "P47+P73+P86", result:(suma_alim_sem_modulo_abc + suma_alim_sem_modulo_d + suma_alim_sem_modulo_e) };
    ws.getCell('P89').alignment = { vertical: 'middle', horizontal: 'center' };

    ws.getCell('Q89').value = { formula: "(Q47+Q73+Q86) / 3", result: (((prom_kg_x_has_sem_abc / contador_abc) +(prom_kg_x_has_sem_d / contador_d)+ (prom_kg_x_has_sem_e / contador_e)) / 3) };
    ws.getCell('Q89').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('R89').value = { formula: "(E47+E73+E86) / 3", result: (((prom_aliment_acum_x_has_abc / suma_alim_acum_modulo_abc ) + (prom_aliment_acum_x_has_d / suma_alim_acum_modulo_d ) + (prom_aliment_acum_x_has_e / suma_alim_acum_modulo_e )) / 3) };
    ws.getCell('R89').alignment = { vertical: 'middle', horizontal: 'center' };

    ws.getCell('S89').value = { formula: "S47+S73+S86", result:(suma_alim_acum_modulo_abc + suma_alim_acum_modulo_d + suma_alim_acum_modulo_e) };
    ws.getCell('S89').alignment = { vertical: 'middle', horizontal: 'center' };

    await wb.xlsx.writeFile(filename).then( function(){
        console.log("XLS terminado.")
        return xls_name;
    });
}

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
} 

const saveDocuments = async (documents = [], user) => {
    for(let i = 0; i < documents.length; i++){
        try {
            const currentDocument = await documents[i].save();

            await historial.save(
                'yellow',
                'fa-ruler-combined',
                'registró biometrias para la piscina <em class="text-md">' +  documents[i].codigo_piscina + '.</em>',
                user._id
            );
            
        } catch (error) {
            console.log(chalk.bgRed(error));
        }
    }
}

const returnIntOrigen = async (data = []) => {
    var int = "";

    for(let j = 0; j < data.length; j++){
        int += data[j].toJSON()[0] + "-" + data[j].toJSON()[2] +""+ data[j].toJSON()[3];   
        if(j > 0 && j != data.length) int += ","
    } 

    return int;
}