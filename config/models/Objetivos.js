var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var objetivoSchemaJSON = {
    puesto: { type: Schema.ObjectId, ref: "Puestos" },
    anio: String,
    objetivo1: String,
    peso1: String,
    objetivo2: String,
    peso2: String,
    objetivo3: String,
    peso3: String,
    objetivo4: String,
    peso4: String,
    objetivo5: String,
    peso5: String,
    objetivo6: String,
    peso6: String
}

var objetivoShcema = new Schema(objetivoSchemaJSON);

mongoose.model("Objetivos", objetivoShcema);