var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var errorSchemaJSON = {
    usuario: String,
    fecha: String,
    hora: String,
    descripcion: String,
    error: String
}

var errorShcema = new Schema(errorSchemaJSON);

mongoose.model("Errores", errorShcema);




