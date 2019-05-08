var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// ORDENES DE COMPRA
var ordenOldSchemaJSON = {
    proveedor: String,
    fecha: String,
    hora: String,
    subtotal: String,
    iva: String,
    total: String,
    serie: String,
    estatus: String,
    comentarios: String,
    factura: String,
    tipoCambio: String,
    incluyeIVA: Boolean
}

var ordenOldSchema = new Schema(ordenOldSchemaJSON);

mongoose.model("OrdenesOld", ordenOldSchema);