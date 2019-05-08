var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// USUARIOS
var recepcionSchemaJSON = {
    codigo: String,
    nombre: String,
    numero_ciclo: String,
    estadio: String,
    estanque: { type: Schema.ObjectId, ref: "Estanques"},
    biologo: { type: Schema.ObjectId, ref: "Usuarios"},
    laboratorio: { type: Schema.ObjectId, ref: "Laboratorio"},
    organismos_totales: String,
    hrs_transporte: String,
    temperatura: String,
    oxigeno: String,
    salinidad: String,
    ph: String,
    talla: String,
    peso: String,
    estres_sobre: String,
    cv: String,
    ufc_ca: String,
    ufc_cv: String,
    fecha_llegada: Date,
    hora_llegada: String,
    fecha: Date,
    hora: String
}

var recepcionSchema = new Schema(recepcionSchemaJSON);

mongoose.model("RecepcionLarva", recepcionSchema);