var mongoose = require('mongoose');
    FechaHora = require('./fechahora');
    chalk = require('chalk');

module.exports = {
    all: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Biometrias.find( (error, biometrias) =>{
                if(error){
                    console.log(chalk.bgRed(error));
                } else {

                }
            });
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
    add: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {}
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
            Nutricion.find(
                { "estanque": solicitud.body.id },
                { kg_racion: 1 }
                , (error, kg_acumulados) => {
                    if(error){
                        console.log(chalk.bgRed(error));
                    } else {                       
                        Nutricion.find(
                            { $and: [
                                { estanque: solicitud.body.id},
                                { fecha: {
                                    $gte: FechaHora.getMondayOfCurrentWeekString(new Date()),
                                    $lte: FechaHora.getSundayOfCurrentWeekString(new Date())
                                }}
                            ]},{ kg_racion: 1 }
                            , (error, kg_acumulados_sem) => {
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    respuesta.json({
                                        id: solicitud.body.id,
                                        kg_acumulados: kg_acumulados.map( n => { return parseFloat(n.kg_racion); }).filter(n => n !== undefined).reduce((a, b) => a + b, 0),
                                        kg_acumulados_sem: kg_acumulados_sem.map( n => { return parseFloat(n.kg_racion); }).filter(n => n !== undefined).reduce((a, b) => a + b, 0),
                                        dias_siembra: FechaHora.getDaysBeetweenTwoDates(new Date(), new Date(solicitud.body.fecha_siembra))
                                    });
                                }
                            }
                        ).sort({ codigo : 1});
                }
            }).sort({ codigo : 1});
        }
    },
}