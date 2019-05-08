var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// INVENTARIOS
var inventarioSchemaJSON = {
    codigo: String,
    producto: String,
    proveedor: String,
    unidad: String,
    cantidad: String,
    minimo: String,
    maximo: String,
    almacen: String,
    lugar: String
}

// REGISTRO ENTRADAS
var entradaInventariosSchemaJSON = {
    producto: String,
    cantidad: String,
    orden: String,
    factura: String,
    fecha: String,
    hora: String,
    usuario: String,
    lugar: String,
    almacen: String
}

// REGISTRO SALIDAS
var salidaInventariosSchemaJSON = {
    producto: String,
    cantidad: String,
    solicitante: String,
    area: String,
    modulo: String,
    Estanque: String,
    usuario: String,
    fecha: String,
    hora: String,
    lugar: String,
    almacen: String
}

var inventariosSchema = new Schema(inventarioSchemaJSON);
var entradaInventariosSchema = new Schema(entradaInventariosSchemaJSON);
var salidaInventariosSchema = new Schema(salidaInventariosSchemaJSON);

mongoose.model("Inventarios", inventariosSchema);
mongoose.model("EntradaInventarios", entradaInventariosSchema);
mongoose.model("SalidaInventarios", salidaInventariosSchema);