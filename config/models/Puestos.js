var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var puestoSchemaJSON = {
        posicion: String,
        reporta: String,
        supervisa: String,
        objetivo: String,
        idiomas: String,
        formacion: String,
        vacante: String,
        conocimientos: Array,
        experiencia: Array,
        competencias: Array,
        actividades: Array,
        estado: String
    }

var puestoShcema = new Schema(puestoSchemaJSON);

mongoose.model("Puestos", puestoShcema);