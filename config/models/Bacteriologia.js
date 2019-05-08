var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// USUARIOS
var bacteriologiasSchemaJSON = {
    agua_ca: String,
    agua_cv: String,
    mac_larva_ca: String,
    mac_larva_cv: String,
    hepato_ca: String,
    hepato_cv: String,
    estanque: { type: Schema.ObjectId, ref: "Estanques" },
    fecha: Date,
    fecha_siembra: Date,
    lab_origen:  { type: Schema.ObjectId, ref: "Laboratorios" }
}

var bacteriologiasSchema = new Schema(bacteriologiasSchemaJSON);

mongoose.model("Bacteriologias", bacteriologiasSchema);