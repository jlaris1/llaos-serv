var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var proveedorSchemaJSON = {
    codigo: String,
    tipoEmpresa: String,
    rfc: String,
    nombreEmpresa: String,
    razonSocial: String,
    curp: String,
    direccion: String,
    tipoPago: String,
    telefono: String,
    nombreVendedor: String,
    celular: String,
    correo: String,
    correo_empresa: String,
    banco: String,
    cuenta: String,
    clabe: String
}
        
var ProveedoresBancosSchemaJSON = {
    proveedor: String,
    banco: String,
    cuenta: String,
    clabe: String,
    moneda: String
}
    
var proveedorSchema = new Schema(proveedorSchemaJSON);
var bancoProveedoreSchema = new Schema(ProveedoresBancosSchemaJSON);

mongoose.model("Proveedores", proveedorSchema);
mongoose.model("BancosProveedores", bancoProveedoreSchema);