var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// USUARIOS
var parametrosSchemaJSON = {
    oxigeno: String,
    ph: String,
    salinidad: String,
    temperatura: String,
    nivel_agua: String,
    estanque: { type: Schema.ObjectId, ref: "Estanques" },
    fecha: Date,
    hora: String,
    tiempo: String,
    parametrista: String
}

var parametrosSchema = new Schema(parametrosSchemaJSON);

mongoose.model("Parametros", parametrosSchema);