var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var historial = {
    color: String,
    tipo_logo: String,
    accion: String,
    usuario: { type: Schema.ObjectId, ref: "Usuarios"},
    registro: { type: Date, default: new Date().toLocaleDateString("es-MX",{dateStyle: 'short'})},
    hora: String
}

var historialSchema = new Schema(historial);

mongoose.model("Historial", historialSchema);



