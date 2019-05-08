var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// REGISTRO ENTRADAS CAMARÓN
var entradaInventariosCamSchemaJSON = {
    folio: String,
    remitente: String,
    referencia: String,
    destinatario: String,
    fecha: String,
    hora: String,
    total_master: String,
    total_kgs: String,
    total_lbs: String,
    observaciones: String,
    almacenista: String,
    almacen: String,
    articulos: [{
        tipoCamaron: { type: Schema.ObjectId, ref: "TiposCamaron" },
        bod: String,
        tarima: String,
        codigo_prod: String,
        lote_prod: String,
        talla: String,
        cantidad_master: String,
        peso_master: String,
        total_kgs: String,
        total_lbs: String,
        presentacion: String
    }]
}

// LOG DE ENTRADAS
var logEntradaInventariosCamSchemaJSON = {
    idEntrada: { type: Schema.ObjectId, ref: "EntradasInventariosCamaron" },
    idTipoCam: { type: Schema.ObjectId, ref: "TiposCamaron" },
    cantidadMaster: String,
    cantidadEntrada: String,
    cantidadInventario: String
}

// REGISTRO SALIDAS CAMARÓN
var salidaInventariosCamSchemaJSON = {
    folio: String,
    remitente: String,
    referencia: String,
    destinatario: String,
    fecha: String,
    hora: String,
    total_master: String,
    total_kgs: String,
    total_lbs: String,
    observaciones: String,
    almacenista: String,
    almacen: String,
    articulos: [{
        tipocamaron: { type: Schema.ObjectId, ref: "TiposCamaron" },
        bod: String,
        tarima: String,
        codigo_prod: String,
        lote_prod: String,
        talla: String,
        cantidad_master: String,
        peso_master: String,
        total_kgs: String,
        total_lbs: String,
        presentacion: String
    }]
}

// LOG DE SALIDAS
var logSalidaInventariosCamSchemaJSON = {
    idSalida: { type: Schema.ObjectId, ref: "SalidasInventariosCamaron" },
    idTipoCam: { type: Schema.ObjectId, ref: "TiposCamaron" },
    cantidadMaster: String,
    cantidadSalida: String,
    cantidadInventario: String
}


var entradaInventariosCamaronSchema = new Schema(entradaInventariosCamSchemaJSON);
var logEntradaInventariosCamaronSchema = new Schema(logEntradaInventariosCamSchemaJSON);
var salidaInventariosCamaronSchema = new Schema(salidaInventariosCamSchemaJSON);
var logSalidaInventariosCamaronSchema = new Schema(logSalidaInventariosCamSchemaJSON);

mongoose.model("EntradasInventariosCamaron", entradaInventariosCamaronSchema);
mongoose.model("SalidasInventariosCamaron", salidaInventariosCamaronSchema);
mongoose.model("LogEntradaInventarioCamaron", logEntradaInventariosCamaronSchema);
mongoose.model("LogSalidaInventarioCamaron", logSalidaInventariosCamaronSchema);