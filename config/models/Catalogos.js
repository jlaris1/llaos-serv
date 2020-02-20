var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// AREAS
var areasSchemaJSON = {
    codigo: String,
    nombre: String,
    unidad_negocio: { type: Schema.ObjectId, ref: "UnidadesNegocio" },
    registro: Date,
}

// RUBROS
var cuentaContaSchemaJSON = {
    codigo: String,
    nombre: String,
    registro: Date
}

var subCuentaContaSchemaJSON = {
    codigo: String,
    nombre: String,
    cuenta: { type: Schema.ObjectId, ref: "CuentasConta"},
    registro: Date
}

var areasSchema = new Schema(areasSchemaJSON);
var cuentaContaSchema = new Schema(cuentaContaSchemaJSON);
var subCuentaContaSchema = new Schema(subCuentaContaSchemaJSON);

mongoose.model("Areas", areasSchema);
mongoose.model("CuentasConta", cuentaContaSchema);
mongoose.model("SubCuentasConta", subCuentaContaSchema);