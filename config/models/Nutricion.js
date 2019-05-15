var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// USUARIOS
var nutricionSchemaJSON = {
    charola_1: String,
    charola_2: String,
    charola_3: String,
    charola_4: String,
    charola_5: String,
    charola_6: String,
    suma: String,
    codigo_racion: String,
    estanque: { type: Schema.ObjectId, ref: "Estanques" },
    fecha: Date,
    hora: String,
    charolero: { type: Schema.ObjectId, ref: "Usuarios" }
}

var nutricionSchema = new Schema(nutricionSchemaJSON);

mongoose.model("Nutricion", nutricionSchema);