var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// USUARIOS
var laboratorioSchemaJSON = {
    codigo: String,
    nombre: String,
    fecha: Date,
    hora: String
}

var laboratorioSchema = new Schema(laboratorioSchemaJSON);

mongoose.model("Laboratorios", laboratorioSchema);