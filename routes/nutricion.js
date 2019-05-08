var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    Estanques = mongoose.model('Estanques');
    Modulos = mongoose.model('Modulos');
    Nutricion = mongoose.model('Nutricion');
    TiposModulos = mongoose.model('TiposModulos');
    chalk = require('chalk');

module.exports = {
    all: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 

        } 
    }
}