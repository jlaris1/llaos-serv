var mongoose = require('mongoose');
    Historial = mongoose.model('Historial');
    fechaHora = require('./fechahora');

module.exports = {
    save: (color, tipo_logo, accion, usuario) => {
        var h = {
            color: color,
            tipo_logo: tipo_logo,
            accion: accion,
            usuario: usuario,
            hora: fechaHora.obtenerhora()
        }

        histo = new Historial(h);

        histo.save( (error) => {
            if(error){
                console.log(error);
            }
        });
    },
}