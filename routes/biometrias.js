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
    }

}