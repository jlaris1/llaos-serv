var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tipoCamaronSchemaJSON = {
    nombre: String,
    talla: String,
    presentacion: String,
    cantidadMaster: String,
    almacen: String,
    pesoMaster: String,
    totalKgs: String
}

var tipoCamaronShcema = new Schema(tipoCamaronSchemaJSON);

mongoose.model("TiposCamaron", tipoCamaronShcema);