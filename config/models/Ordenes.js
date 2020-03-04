var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// ORDENES DE COMPRA
var ordenSchemaJSON = {
    proveedor: String,
    fecha: Date,
    hora: String,
    subtotal: String,
    iva: String,
    total: String,
    serie: String,
    estatus: String,
    comentarios: String,
    factura: String,
    tipoCambio: String,
    incluyeIVA: Boolean,
    unidad_negocio: { type: Schema.ObjectId, ref: "UnidadesNegocio" },
}
// ARTICULOS EN LA ORDEN
var articulosOrdenSchemaJSON = {
    cantidad: String,
    unidad: String,
    codigo: String,
    producto: String,
    id_producto: { type: Schema.ObjectId, ref: "Productos" },
    descripcion: String,
    precio_unitario: String,
    iva: String,
    importe: String,
    orden: String,
    requisicion: String,
    moneda: String
}

// ORDEN EN RUTA ENVIO A GRANJA
var ordenRutaSchemaJSON = {
    codigo: String,
    chofer: String,
    unidad: String,
    fecha: Date,
    hora: String,
    subtotal: String,
    iva: String,
    total: String,
    estatus: String
}

// ARTÍCULOS EN ORDEN RUTA
var articulosRutaSchemaJSON = {
    cantidad: String,
    unidad: String,
    codigo: String,
    unidad: String,
    descripcion: String,
    //id_producto: { type: Schema.ObjectId, ref: "Productos" },
    orden: { type: Schema.ObjectId, ref: "Ordenes" } ,
    proveedor: { type: Schema.ObjectId, ref: "Proveedores" },
    ordenRuta: String,
    requisicion: String
    //ordenRuta: { type: Schema.ObjectId, ref: "OrdenesRuta"}
}

var ordenSchema = new Schema(ordenSchemaJSON);
var articulosOrdenSchema = new Schema(articulosOrdenSchemaJSON);
var articulosRutaSchema = new Schema(articulosRutaSchemaJSON);
var ordenRutaSchema = new Schema(ordenRutaSchemaJSON);

mongoose.model("Ordenes", ordenSchema);
mongoose.model("ArticulosOrdenes", articulosOrdenSchema);
mongoose.model("ArticulosRuta", articulosRutaSchema);
mongoose.model("OrdenRuta", ordenRutaSchema);
