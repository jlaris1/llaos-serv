var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var unidadNegocioSchemaJSON = {
    codigo: String,
    nombre: String,
    razon_social: String,
    representante_legal: String,
    direccion: String,
    correo: String,
    telefono: String,
    rfc: String,
    cp: String,
    registro: { type: Date, default: Date.now }
}

var unidadNegocioSchema = new Schema(unidadNegocioSchemaJSON);

mongoose.model("UnidadesNegocio", unidadNegocioSchema);