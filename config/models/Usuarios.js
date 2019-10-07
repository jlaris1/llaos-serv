var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// USUARIOS
var usuarioSchemaJSON = {
    nombre: String,
    correo: String,
    usuario: String,
    password: String,
    nacimiento: String,
    numero_nomina: Number,
    empresa: String,
    unidad_negocio: { type: Schema.ObjectId, ref: "UnidadesNegocio" },
    puesto: String,
    permisos: String,
    autorizador: Boolean
}

var usuarioSchema = new Schema(usuarioSchemaJSON);

mongoose.model("Usuarios", usuarioSchema);