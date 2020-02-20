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
    area: String,
    modulo: [
        {   type: Schema.ObjectId, ref: "Modulos",
            default: mongoose.Types.ObjectId('5e473eda1c9d4400004b33bb')
        }
    ],
    autorizador: Boolean
}

var usuarioSchema = new Schema(usuarioSchemaJSON);

mongoose.model("Usuarios", usuarioSchema);