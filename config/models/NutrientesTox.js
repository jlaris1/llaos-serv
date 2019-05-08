var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// NUTRENTES DIARIO
var nuetrientesToxDiarioSchemaJSON = {
    amonia: String,
    alcalinidad_CaCO3: String,
    alcalinidad_HCO3: String,
    alcalinidad_CO3: String,
    nitrito_N: String,
    nitrito_NO3: String,
    TAN: String,
    estanque: { type: Schema.ObjectId, ref: "Estanques" },
    fecha: Date,
    observaciones: String,
}

// NUTRENTES SEMANAL
var nuetrientesToxSemanalSchemaJSON = {
    amonia: String,
    nitrito_N: String,
    nitrito_NO3: String,
    alcalinidad_CaCO3: String,
    alcalinidad_HCO3: String,
    alcalinidad_CO3: String,
    dureza: String,
    dureza_CaCO3: String,
    dureza_Ca: String,
    silice_SiO2: String,
    silice_Si: String,
    nitrato_N: String,
    nitrato_NO3: String,
    fosfato_PO4: String,
    fosfato_P: String,
    potasio: String,
    magnecio_Mg: String,
    magnecio_CaCO3: String,
    balance_Ca: String,
    balance_Mg: String,
    balance_K: String,
    estanque: { type: Schema.ObjectId, ref: "Estanques" },
    fecha: Date,
    observaciones: String,
}

var nuetrientesToxDiarioSchema = new Schema(nuetrientesToxDiarioSchemaJSON);
var nuetrientesToxSemanalSchema = new Schema(nuetrientesToxSemanalSchemaJSON);

mongoose.model("NutrientesToxDiario", nuetrientesToxDiarioSchema);
mongoose.model("NutrientesToxSemanal", nuetrientesToxSemanalSchema);