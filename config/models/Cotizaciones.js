var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// COTIZACIÓN
var cotizacionSchemaJSON = {
    codigo: String,
    proveedor: String,
    subtotal: String,
    iva: String,
    total: String,
    estatus: String,
    fecha: String,
    hora: String,
    vigencia: String,
    observaciones: String,
    moneda: String,
    tipoCambio: String,
    banco: String,
    cuenta: String,
    clabe: String
}

// ARTÍCULOS EN COTIZACIÓN
var articulosCotizacionSchemaJSON = {
    codigo: String,
    cotizacion: String,
    cantidad: String,
    unidad: String,
    descripcion: String,
    precioUnitario: String,
    iva: String,
    precioNeto: String,
    tiempoEntrega: String
}

var cotizacionSchema = new Schema(cotizacionSchemaJSON);
var articulosCotizacionSchema = new Schema(articulosCotizacionSchemaJSON);

mongoose.model("Cotizaciones", cotizacionSchema);
mongoose.model("ArticulosCotizaciones", articulosCotizacionSchema);