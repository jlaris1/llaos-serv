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
	lugar: String,
	categoria: { type: Schema.ObjectId, ref: "Categorias", default: '5e5e8ab5e353ee43602d6bc5' }
}

var categoriaSchemaJSON = {
	codigo: String,
	nombre: String
}

var productoSchema = new Schema(productoSchemaJSON);
var categoriaSchema = new Schema(categoriaSchemaJSON);

mongoose.model("Productos", productoSchema);
mongoose.model("Categorias", categoriaSchema);