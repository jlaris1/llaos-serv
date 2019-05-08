var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    Laboratorios = mongoose.model('Laboratorios');
    chalk = require('chalk');

module.exports = {
    all: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Laboratorios.find( function(error, laboratorios){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.render("Laboratorio Larvas/all", 
                        {
                            user: solicitud.session.user,
                            laboratorios: laboratorios
                        }
                    )
                }
            })
        } 
    },
    new: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            respuesta.render("Laboratorio Larvas/new",
                {
                    user: solicitud.session.user
                }
            )
        }
    },
    add: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            var data = {
                codigo: solicitud.body.codigo,
                nombre: solicitud.body.nombre,
                fecha: new Date,
                hora: FechaHora.obtenerhora()
            }

            var laboratorio = new Laboratorios(data);

            laboratorio.save( function(error){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.redirect('/laboratoriolarvas/all');
                }
            });
        }
    }
}