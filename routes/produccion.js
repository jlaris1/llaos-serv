var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    chalk = require('chalk');

module.exports = {
    configPiscinas: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Modulos.find({"unidad_negocio": solicitud.session.user.unidad_negocio}, (error, modulos) =>{
                if(error) {
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.find({modulo: {$in: modulos}}, (error, estanques) => {
                        if(error) {
                            console.log(chalk.bgRed(error));
                        } else {
                            Modulos.populate(estanques, {path: 'modulo'}, (error, estanques) =>{
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    Usuarios.find( (error, usuarios) => {
                                        if(error) {
                                            console.log(chalk.bgRed(error));
                                        } else {
                                            respuesta.render('Produccion/config',
                                            {
                                                estanques: estanques,
                                                usuarios: usuarios,
                                                user: solicitud.session.user,
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
                                                ruta: ""
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }).sort({codigo: 1});
                }
            });
        }
    },
    guardarConfigPiscinas: (solicitud, respuesta) => {
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            //console.log(solicitud.body.piscinas);

            for(let i = 0; i <= solicitud.body.piscinas.length - 1; i++){
                Estanques.updateOne({"_id": solicitud.body.piscinas[i].id}, {estatus: solicitud.body.piscinas[i].estatus}, (error) =>{
                    if(error){
                        console.log(error);
                    }

                    if(i == solicitud.body.piscinas.length -1){
                        respuesta.json('Guardado');
                    }
                }) 
            }
        }
    },
    mostrasPiscinas: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        } else {
            Modulos.find({"unidad_negocio": solicitud.session.user.unidad_negocio}, (error, modulos) =>{
                if(error) {
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.find({modulo: {$in: modulos}}, (error, estanques) => {
                        if(error) {
                            console.log(chalk.bgRed(error));
                        } else {
                            Modulos.populate(estanques, {path: 'modulo'}, (error, estanques) =>{
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    respuesta.json({piscinas: estanques});
                                }
                            });
                        }
                    });
                }
            });
        }
    }
}