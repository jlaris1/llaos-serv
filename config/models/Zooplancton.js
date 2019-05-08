var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// USUARIOS
var zooplanctonSchemaJSON = {
    nauplios: Number,
    nauplios_porcent: String,
    copepodos: Number,
    copepodos_porcent: String,
    rutiferos: Number,
    rutiferos_porcent: String,
    poliquetos: Number,
    poliquetos_porcent: String,
    otros: Number,
    otros_porcent: String,
    total_organismos: Number,
    estanque: { type: Schema.ObjectId, ref: "Estanques" },
    fecha: Date,
    hora: String,
    biologo: String
}

var zooplanctonSchema = new Schema(zooplanctonSchemaJSON);

mongoose.model("Zooplancton", zooplanctonSchema);