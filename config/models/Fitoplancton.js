var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// FITOPLANCTON
var fitoplanctonSchemaJSON = {
    diatomeas: String,
    cianofitas: String,
    clorofitas: String,
    dinoflagelados: String,
    flagelados: String,
    diatomeas_porcent: String,
    cianofitas_porcent: String,
    clorofitas_porcent: String,
    dinoflagelados_porcent: String,
    flagelados_porcent: String,
    total_cel_ml: String,
    estanque: { type: Schema.ObjectId, ref: "Estanques" },
    fecha: Date
}


var fitoplanctonSchema = new Schema (fitoplanctonSchemaJSON);

mongoose.model("Fitoplancton", fitoplanctonSchema);