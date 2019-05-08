module.exports = {
    prueba: function (solicitud, respuesta){
		respuesta.render("Prueba/pruebita",
			{user: solicitud.session.user}
        );
    }
}