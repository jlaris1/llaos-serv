var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var empleadoSchemaJSON = {
    numero: String,
    fingreso: String,
    duracion_contrato: String,
    hora_entrada: String,
    hora_salida: String,
    puesto: { type: Schema.ObjectId, ref: "Puestos" },
    jefe_directo: String,
    area: String,
    modulo: String,
    apoyo_transporte: String,
    sueldo_diario: String,
    tipo_sueldo: String,
    apoyo_sueldo: String,
    //
    nombre: String,
    sexo: String,
    estado_civil: String,
    nss: String,
    umf: String,
    rfc: String,
    curp: String,
    nacionalidad: String,
    lugar_nacimiento: String,
    edad: String,
    fnacimiento: String,
    chk_albanil: String,
    chk_carpintero: String,
    chk_chofer: String,
    chk_electricista: String,
    chk_guardia: String,
    chk_herrero: String,
    chk_mecanico: String,
    chk_plomero: String,
    chk_soldador: String,
    chk_velador: String,
    chk_otro: String,
    otro_habilidad: String,
    //
    nombre_emergencia: String,
    parentesco_emergencia: String,
    telefono_emergencia: String,
    //
    direccion: String,
    colonia: String,
    estado: String,
    del_mun: String,
    cp: String,
    telefono: String,
    celular: String,
    correo: String,
    tiene_infonavit: String,
    numero_credito: String,
    factor_descuento: String,
    observaciones: String,
    //
    estatus: String,
    //
    rfcDoc_ruta: String,
    actanaciDoc_ruta: String,
    credeDoc_ruta: String,
    curpDoc_ruta: String,
    nssDoc_ruta: String,
    cdomDoc_ruta: String,
    solicitudDoc_ruta: String,
    contratoDoc_ruta: String
}

var empleadoShcema = new Schema(empleadoSchemaJSON);

mongoose.model("Empleados", empleadoShcema);