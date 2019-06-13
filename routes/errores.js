var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');


module.exports = {
    // Error inesperado
    errorInesperado: function(solicitud, respuesta){
        respuesta.render("login",{
            msg: 'Error: error inesperado. Contacte al área de Sistemas.'
        });
    },
    // Error al inicar sesión
    errorInicio: function(solicitud, respuesta){
        data = {
            usuario: solicitud.params.user,
            fecha: FechaHora.obtenerfecha(),
            hora: FechaHora.obtenerhora(),
            descripcion: 'Error al consultar usuario al inicar sesión.',
            error: solicitud.session.error
        };
        solicitud.session.error = undefined;

        var horror = new Errores(data);
        horror.save(function(error){
            if(error){
                console.log(error);
                respuesta.redirect("/error-inesperado");
            }else{
                respuesta.render("login",{
                    msg: 'Error: error al buscar usuario. Intente de nuevo.',
                });
            };
        });
    },
}