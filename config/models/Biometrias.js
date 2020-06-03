var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var biometriaSchemaJSON = {
    estanque: { type: Schema.ObjectId, ref: "Estanques"},
    superficie: Number,
    fecha_siembra: { type: Date, default: new Date().toLocaleDateString("es-MX", {dateStyle: 'short'})},
    fecha_biometria: { type: Date, default: new Date().toLocaleDateString("es-MX", {dateStyle: 'short'})},
    dias_cultivo: Number,
    int_origen: [],
    peso_siembra: Number,
    peso_anterior: Number,
    peso_actual: Number,
    incremento: Number,
    organismos_lance: Number,
    densidad: Number,
    cod_4h: Number,
    cod_10h: Number,
    alimento_semanal: Number,
    kg_has_sembrada_prom: Number,
    alimento_acumulado: Number,
    alimento_acumulado_has: Number,
    organismos_muertos: Number,
    organismos_muertos_semana: Number,
    organismos_muertos_acumulado: Number,
    presencia_pajaros: Number,
    observaciones: String
}

var biometriaSchema = new Schema(biometriaSchemaJSON);

mongoose.model("Biometrias", biometriaSchema);