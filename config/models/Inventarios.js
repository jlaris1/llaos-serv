var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// INVENTARIOS - revisar si funciona
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

// REGISTRO ENTRADAS - proceso para eliminación
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

// REGISTRO SALIDAS - proceso para eliminación 
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

var ordenSalidaSchemaJSON = {
    numero_orden: String,
    lugar_almacen: String,
    lugar_unidad: String,
    solicita: {type: Schema.ObjectId, ref: 'Usuarios'},
    area: String,
    modulo: {
        type: Schema.ObjectId, ref: 'Modulos',
        default: mongoose.Types.ObjectId('5e473eda1c9d4400004b33bb'),
    },
    piscina: {
        type: Schema.ObjectId, ref: 'Estanques',
        default: mongoose.Types.ObjectId('5e473f7f1c9d4400004b33bc'),
    },
    articulos: [
        {
            articulo: {
                id: Schema.ObjectId,
                codigo: String,
                descripcion: String,
                unidad: String,
                cantidad: String,
                rowCount: Number
            }
        }
    ],
    registro: { type: Date, default: Date.now },
    estatus: String
}

var inventariosSchema = new Schema(inventarioSchemaJSON);
var entradaInventariosSchema = new Schema(entradaInventariosSchemaJSON);
var salidaInventariosSchema = new Schema(salidaInventariosSchemaJSON);
var ordenSalidaSchema = new Schema(ordenSalidaSchemaJSON);

mongoose.model("Inventarios", inventariosSchema);
mongoose.model("EntradaInventarios", entradaInventariosSchema);
mongoose.model("SalidaInventarios", salidaInventariosSchema);
mongoose.model("OrdenSalida", ordenSalidaSchema);