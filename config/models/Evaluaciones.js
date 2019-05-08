var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var evaluacionSchemaJSON = {
    empleado: { type: Schema.ObjectId, ref: "Empleados" },
    mes: String,
    anio: String,
    calif1: String,
    calif2: String,
    calif3: String,
    calif4: String,
    calif5: String,
    calif6: String,
    valor1: String,
    valor2: String,
    valor3: String,
    valor4: String,
    valor5: String,
    valor6: String,
    final: String
}

var evaluacionShcema = new Schema(evaluacionSchemaJSON);

mongoose.model("Evaluaciones", evaluacionShcema);