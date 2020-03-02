var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// USUARIOS
var parametrosSchemaJSON = {
    oxigeno: String,
    ph: String,
    salinidad: { type:String , default: null},
    temperatura: String,
    nivel_agua: { type:String , default: null},
    estanque: { type: Schema.ObjectId, ref: "Estanques" },
    fecha: { type: Date, default: new Date().toLocaleDateString("es-MX",{dateStyle: 'short'})},
    hora: String,
    tiempo: String,
    parametrista: { type: Schema.ObjectId, ref: "Usuarios"},
    turbidez: { type:String , default: null},
    anio: {
        type: String, default: new Date().getFullYear()
    }
}

var parametrosSchema = new Schema(parametrosSchemaJSON);

mongoose.model("Parametros", parametrosSchema);