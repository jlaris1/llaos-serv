var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ticketSchemaJSON = {
    usuario: { type: Schema.ObjectId, ref: "Usuarios" },
    folio: String,
    titulo: String,
    categoria: String,
    subcategoria: String,
    solicitud: String,
    imagen: String,
    estatus: String,
    prioridad: String,
    fecha: String,
    hora: String,
    encargado: String,
    comentarios: [{
        usuario: String,
        comentario: String,
        fecha: String,
        hora: String
    }]
}

var ticketShcema = new Schema(ticketSchemaJSON);

mongoose.model("Tickets", ticketShcema);