var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var tractorSchemaJSON = {
    codigo: String,
    marca: String,
    año: Number,
    modelo: String,
    llantas: String,
    bateria_1: String,
    bateria_2: String,
    horometro: String,
    registro: { type: Date, default: Date.now }
}

var camionetaSchemaJSON = {
    codigo: String,
    marca: String,
    modelo: String,
    año: Number,
    llantas: String,
    bateria: String,
    carroceria: String,
    horometro: String,
    registro: { type: Date, default: Date.now }
}

var motoSchemaJSON = {
    codigo: String,
    marca: String,
    modelo: String,
    año: Number,
    llantas: String,
    bateria: String,
    carroceria: String,
    registro: { type: Date, default: Date.now }
}

var motorSchemaJSON = {
    codigo: String,
    marca: String,
    modelo: String,
    año: Number,
    registro: { type: Date, default: Date.now }
}

var bombaSchemaJSON = {
    codigo: String,
    marca: String,
    modelo: String,
    año: String,
    registro: { type: Date, default: Date.now }
}

var generadorSchemaJSON = {codigo: String,
    marca: String,
    modelo: String,
    año: String,
    registro: { type: Date, default: Date.now }
}

var tractorSchema = new Schema(tractorSchemaJSON);
var camionetaSchema = new Schema(camionetaSchemaJSON);
var motoSchema = new Schema(motoSchemaJSON);
var motorSchema = new Schema(motorSchemaJSON);
var bombaSchema = new Schema(bombaSchemaJSON);
var generadorSchema = new Schema(generadorSchemaJSON);

mongoose.model("Moto", motoSchema);
mongoose.model("Camioneta", camionetaSchema);
mongoose.model("Tractor", tractorSchema);
mongoose.model("Motor", motorSchema);
mongoose.model("Bomba", bombaSchema);
mongoose.model("Generador", generadorSchema);