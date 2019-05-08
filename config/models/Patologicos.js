var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// USUARIOS
var patologicosSchemaJSON = {
    branquias_necro: String,
    branquias_mo: String,
    branquias_epic: String,
    plabial: String,
    proto_epip: String,
    intes_grad: String,
    hepato_I: String,
    hepato_nhp: String,
    hepato_vib: String,
    hepato_IIInhp: String,
    hepato_IIIvib: String,
    hepato_IIIbnhp: String,
    hepato_IIIbvib: String,
    hepato_IIIcnhp: String,
    hepato_IIIcvib: String,
    lip_prom: String,
    no_org: String,
    score_nhp: String,
    score_vib: String,
    tub_afec: String,
    ext_necro: String,
    ext_pig: String,
    ext_flaci: String,
    ur_ur: String,
    ur_uv: String,
    ur_amp: String,
    peso_prom: String,
    tiem_prom: String,
    tiem_min: String,
    tiem_max: String,
    cons_ant: String,
    cons_musc: String,
    estanque: { type: Schema.ObjectId, ref: "Estanques" },
    fecha: Date,
    biologo: String
}

var patologicosSchema = new Schema(patologicosSchemaJSON);

mongoose.model("Patologicos", patologicosSchema);