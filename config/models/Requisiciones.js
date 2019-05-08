var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// REQUISICIONES
var requisicionSchemaJSON = {
    area: String,
    modulo: String,
    responsable: String,
    solicita: String,
    uso: String,
    estatus: String,
    fecha: Date,
    hora: String,
    codigoRequi: String
}

// ARTICULOS REQUISICION
var articuloRequisicionSchemaJSON = {
    codigoRequisicion: String,
    cantidad: String,
    unidad: String,
    descripcion: String,
    estatus: String,
    proveedor: Boolean,
    nombreProveedor: String,
    telefonoProveedor: String,
    correoProveedor: String
}

var requisicionSchema = new Schema(requisicionSchemaJSON);
var articulosRequisicionSchema = new Schema(articuloRequisicionSchemaJSON);
	
mongoose.model("Requisiciones", requisicionSchema);
mongoose.model("ArticulosRequisiciones", articulosRequisicionSchema);
	