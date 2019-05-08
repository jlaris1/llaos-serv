var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// PRODUCTOS
var productoSchemaJSON = {
	codigo: String,
	nombre: String,
	unidad: String,
	descripcion: String,
	precioUnitario: String,
	exentoiva: Boolean,
	iva: String,
	precioNeto: String,
	proveedor: String,
	moneda: String,
	cantidad: String,
	orden: String,
	factura: String,
	maximo: String,
	minimo: String,
	fecha: String,
	almacen: String,
	lugar: String
}

var productoSchema = new Schema(productoSchemaJSON);

var Productos = mongoose.model("Productos", productoSchema);

mongoose.model("Productos", productoSchema);