var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// REQUISICIONES
var requisicionOldSchemaJSON = {
    area: String,
    modulo: String,
    responsable: String,
    solicita: String,
    uso: String,
    estatus: String,
    fecha: String,
    hora: String,
    codigoRequi: String
}

var requisicionOldSchema = new Schema(requisicionOldSchemaJSON);
	
mongoose.model("RequisicionesOld", requisicionOldSchema);
	