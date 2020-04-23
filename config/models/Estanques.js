var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Estanques
var estanquesSchemaJSON = {
    codigo: String,
    nombre: String,
    modulo: { type: Schema.ObjectId, ref: "Modulos" },
    tipo: { type: Schema.ObjectId, ref: "TiposModulos" },
    pointer_x: Number,
    pointer_y: Number,
    marker_x: Number,
    marker_y: Number,
    locations: [
        {
            pointer: [{
                x: Number,
                y: Number
            }]
        }
    ],
    estatus: String
}

// Módulos
var modulosSchemaJSON = {
    codigo: String,
    nombre: String,
    unidad_negocio: { type: Schema.ObjectId, ref: "Modulos" }
}

// Tipos Modulos
var tiposModulosSchemaJSON = {
    codigo: String, 
    nombre: String
}

var estanquesSchema = new Schema(estanquesSchemaJSON);
var modulosSchema = new Schema(modulosSchemaJSON);
var tiposModulosSchema = new Schema(tiposModulosSchemaJSON);

mongoose.model("Estanques", estanquesSchema);
mongoose.model("Modulos", modulosSchema);
mongoose.model("TiposModulos", tiposModulosSchema);


