var express = require('express');

module.exports = function(app){
    var pruebita = require('../routes/pruebita');
    //
    var sesion = require('../routes/sesion');
    //
    var usuarios = require('../routes/usuarios');
    var usuariosRouter = express.Router();
    //
    var proveedores = require('../routes/proveedores');
    var proveedoresRouter = express.Router();
    //
    var productos = require('../routes/productos');
    var productosRouter = express.Router();
    //
    var requisiciones = require('../routes/requisiciones');
    var requisicionesRouter = express.Router();
    //
    var ordenes = require('../routes/ordenes');
    var ordenesRouter = express.Router();
    //
    var cotizaciones = require('../routes/cotizaciones');
    var cotizacionesRouter = express.Router();
    //
    var inventarios = require('../routes/inventarios');
    var inventariosRouter = express.Router();
    //
    var empleados = require('../routes/empleados');
    var empleadosRouter = express.Router();
    //
    var errores = require('../routes/errores');
    //
    var puestos = require('../routes/puestos');
    var puestosRouter = express.Router();
    //
    var tickets = require('../routes/tickets');
    var ticketsRouter = express.Router();
    //
    var tiposCamaron = require('../routes/tiposcamaron');
    var tiposCamRouter = express.Router();
    //
    var inventariosCamaron = require('../routes/inventarioscamaron');
    var inventariosCamRouter = express.Router();
    //
    var evaluaciones = require('../routes/evaluaciones');
    var evaluacionesRouter = express.Router();
    //
    var zooplacton = require('../routes/zooplancton');
    var zooplactonRouter = express.Router();
    //
    var nutrientesTox = require('../routes/nutrientestox');
    var nutrientesToxRouter = express.Router();
    //
    var patologicos = require('../routes/patologicos');
    var patologicosRouter = express.Router();
    //
    var bacteriologia = require('../routes/bacteriologias');
    var bacteriologiaRouter = express.Router();

    var estanque = require('../routes/estanque');
    var estanqueRouter = express.Router();

    var fitoplancton = require('../routes/fitoplancton.js');
    var fitoplanctonRouter = express.Router();

    var parametros = require('../routes/parametros.js');
    var parametrosRouter = express.Router();

    var laboratorios = require('../routes/laboratoriolarvas.js');
    var laboratoriosRouter = express.Router();

    var nutricion = require('../routes/nutricion.js')
    var nutricionRouter = express.Router();

    var recepcionLarvas = require('../routes/recepcionlarvas.js');
    var recepcionLarvasRouter = express.Router();

    //Pruebas
    app.get('/pruebita', pruebita.prueba); 
    
    //Errores
    app.get('error-inesperado', errores.errorInesperado);
    app.get('/error-inicio/:user', errores.errorInicio);
        
    //Sesion
    app.get('/', sesion.login);
    app.post('/inicio', sesion.inicio);
    app.get('/home', sesion.home);
    app.get('/cerrar_sesion', sesion.logoff);
    app.get('/sesion-expirada', sesion.expirada);

    //Usuarios
    app.use('/usuarios', usuariosRouter);
    usuariosRouter.get('/', usuarios.todos);
    usuariosRouter.get('/new/usuario', usuarios.nuevo);
    usuariosRouter.get('/editar/usuario/:id', usuarios.editar);
    usuariosRouter.post('/usuario', usuarios.guardarUsuario);//////
    usuariosRouter.put('/editar/usuario/:id', usuarios.actualizar);
    usuariosRouter.get('/eliminar/usaurio/:id', usuarios.eliminar);

    //Proveedores
    app.use('/proveedores', proveedoresRouter);
    proveedoresRouter.get('/', proveedores.todos);
    proveedoresRouter.get('/new/proveedor', proveedores.nuevo);
    proveedoresRouter.get('/editar/proveedor/:id', proveedores.editar);
    proveedoresRouter.post('/proveedor', proveedores.guardarProveedor);//////
    proveedoresRouter.put('/proveedor/:id', proveedores.actualizar);
    proveedoresRouter.get('/eliminar/proveedor/:id', proveedores.eliminar);

    //Productos
    app.use('/productos', productosRouter);
    productosRouter.get('/', productos.todos);
    productosRouter.get('/new/producto', productos.nuevo);
    productosRouter.get('/producto/editar/:id', productos.editar);
    productosRouter.post('/producto', productos.guardar);
    productosRouter.put('/actualizar/:id', productos.actualizar);
    productosRouter.get('/producto/eliminar/:id', productos.eliminar);

    //Requisiciones
    app.use('/requisiciones', requisicionesRouter);
    requisicionesRouter.get('/old', requisiciones.allOlds);
    requisicionesRouter.get('/', requisiciones.todos);
    requisicionesRouter.get('/requisiciones/canceladas', requisiciones.canceladas);
    requisicionesRouter.get('/new/requisicion', requisiciones.nueva);
    requisicionesRouter.post('/requisicion', requisiciones.guardar);
    requisicionesRouter.get('/requisicion/autorizar/:id', requisiciones.autorizar);
    requisicionesRouter.get('/requisicion/cancelar/:id', requisiciones.cancelar);
    requisicionesRouter.get('/requisicion/ver/:id', requisiciones.ver);
    requisicionesRouter.get('/requisicion/ver/:id/:id_usr', requisiciones.verReqCorreo);
    requisicionesRouter.get('/requisicion/editar/:id', requisiciones.editarRequisicion);
    requisicionesRouter.get('/editar/articulo-requisicion/:id/:req_id', requisiciones.editarArticulo);
    requisicionesRouter.put('/actualizar/requisicion/:id', requisiciones.actualizarSoloRequisicion);
    requisicionesRouter.put('/actualizar/requisicion/:req_id/:art_id', requisiciones.actualizarReqArt);
    requisicionesRouter.get('/enviar/requisicion/:id/:id_usr_aut', requisiciones.correoNuevaRequisicion);
    requisicionesRouter.get('/requisicion/eliminar/:id', requisiciones.eliminarRequisicion);
    requisicionesRouter.get('/eliminar/articulo-requisicion/:id', requisiciones.eliminarArticulo);
    requisicionesRouter.get('/requisiciones/nuevas', requisiciones.requisicionesNuevasAutorizadas);
    requisicionesRouter.post('/pdf/requisiciones', requisiciones.pdfRequisiciones);
    requisicionesRouter.get('/requisicion/cerrar/:id', requisiciones.cerrar);
    requisicionesRouter.get('/requisicion/fechas', requisiciones.reqFechas);

    //Compras
    app.use('/ordenes', ordenesRouter);
    ordenesRouter.get('/', ordenes.todas);
    ordenesRouter.get('/old', ordenes.olds);
    ordenesRouter.get('/compras/new/orden', ordenes.nueva);
    ordenesRouter.post('/buscar/producto/:tipo', ordenes.buscar);
    ordenesRouter.post('/agregar/producto/:id/:id_orden/', ordenes.agregarArticuloOrden);
    ordenesRouter.get('/orden/generar/pdf/:id/:tipo', ordenes.pdfOrdenCompra);
    ordenesRouter.get('/orden/enviar/:id/:tipo', ordenes.enviarCorreoProveedor);
    ordenesRouter.get('/orden/eliminar/articulo/:id/:id_orden/:tipo', ordenes.eliminarArticuloOrden);
    ordenesRouter.get('/orden/cancelar/:id', ordenes.cancelarOrden);
    ordenesRouter.get('/orden/eliminar/:id', ordenes.eliminarOrden);
    ordenesRouter.get('/orden/ver/:id', ordenes.verOrden);
    ordenesRouter.get('/orden/editar/:id', ordenes.editarOrden);
    ordenesRouter.get('/orden/editar/articulo/:id/:id_ord', ordenes.editarArticuloOrden);
    ordenesRouter.get('/compras/ordenes/nuevas', ordenes.ordenesNuevas);
    ordenesRouter.put('/orden/actualizar/:id', ordenes.actualizarOrden);
    ordenesRouter.put('/orden/articulo/actualizar/:id', ordenes.actualizarArticuloOrden);
    ordenesRouter.get('/orden/enruta/:id', ordenes.ordenEnRuta);
    ordenesRouter.post('/buscar/orden', ordenes.buscarOrdenes);
    ordenesRouter.get('/orden/cerrar/:id', ordenes.cerrarOrden);
    ordenesRouter.get('/enruta', ordenes.ordenesEnRuta);
    ordenesRouter.post('/agregar/enruta/:id', ordenes.agregarOrdenEnRuta);
    ordenesRouter.get('/pdf/ordenruta/:id', ordenes.pdfOrdenRuta);
    ordenesRouter.get('/enviar/ordenruta/:id', ordenes.enviarOrdenRuta);
    ordenesRouter.get('/articuloruta/eliminar/:id/:id_oRuta', ordenes.eliminarArticuloOrdenRuta);
    ordenesRouter.get('/ordenesruta', ordenes.ordenesEnRutaBandeja);
    ordenesRouter.get('/ordenruta/ver/:id', ordenes.ordenRutaDetalles);

    //Cotizaciones
    app.use('/externos',cotizacionesRouter);
    cotizacionesRouter.get('/cotizaciones', cotizaciones.todas);
    cotizacionesRouter.get('/cotizacion/new', cotizaciones.nueva);
    cotizacionesRouter.post('/cotizacion/articulo/agregar', cotizaciones.agregarArticulo);
    cotizacionesRouter.get('/cotizacion/enviar/:id/:tipo', cotizaciones.enviar);
    cotizacionesRouter.get('/cotizacion/generar/pdf/:id/:tipo', cotizaciones.pdfCotizacion);
    cotizacionesRouter.get('/cotizacion/orden/:id', cotizaciones.convertirCotizacionAOrden);
    cotizacionesRouter.get('/cotizacion/articulo/eliminar/:id/:id_cot', cotizaciones.eliminarArticulo);
    cotizacionesRouter.get('/cotizacion/eliminar/:id', cotizaciones.eliminarCotizacion);
    cotizacionesRouter.get('/cotizacion/cancelar/:id', cotizaciones.cancelar);
    cotizacionesRouter.get('/cotizacion/pagar/:id', cotizaciones.pagar);
    cotizacionesRouter.get('/cotizaciones/nuevas', cotizaciones.soloNuevas);

    //Inventarios
    app.use('/inventarios', inventariosRouter);
    inventariosRouter.get('/granja', inventarios.inventarioGranja);
    inventariosRouter.get('/planta', inventarios.inventarioPlanta);
    inventariosRouter.get('/oficina', inventarios.inventarioOficina);
    inventariosRouter.get('/articulo/new', inventarios.agregarArticuloAlmacen);
    inventariosRouter.post('/busqueda/producto', inventarios.buscarProducto);
    inventariosRouter.get('/inventario/entrada', inventarios.abrirEntradaArticulo);
    inventariosRouter.get('/inventario/entrada/:id', inventarios.entradaArticulo);
    inventariosRouter.get('/inventario/salida', inventarios.abrirSalidaArticulo);
    inventariosRouter.get('/inventario/salida/:id', inventarios.salidaArticulo);
    inventariosRouter.post('/buscar/articulo/:tipo', inventarios.buscarArticulo);
    inventariosRouter.post('/registrar/entrada/:id_prod', inventarios.registrarEntrada);
    inventariosRouter.post('/registrar/salida/:id_prod', inventarios.registrarSalida);
    inventariosRouter.get('/entradas', inventarios.abrirEntradas);
    inventariosRouter.get('/salidas', inventarios.abrirSalidas);

    //Empleados
    app.use('/empleados', empleadosRouter);
    empleadosRouter.get('/', empleados.todos);
    empleadosRouter.get('/new/empleado', empleados.nuevo);
    empleadosRouter.post('/empleado', empleados.guardarEmpleado);
    empleadosRouter.get('/editar/empleado/:id', empleados.editar);
    empleadosRouter.put('/empleado/:id', empleados.actualizar);
    empleadosRouter.get('/autorizar/:id', empleados.autorizar);
    empleadosRouter.get('/baja/:id', empleados.baja);
    empleadosRouter.post('/upload', empleados.subirDocs);
    empleadosRouter.get('/generarcontrato/:id', empleados.pdfContrato);
    empleadosRouter.get('/empleado/ver/:id', empleados.verEmpleado);
    empleadosRouter.post('/generarbaja', empleados.generarBaja)
    empleadosRouter.get('/correoalta/:id', empleados.enviarAltaCorreo);
    empleadosRouter.get('/empleado/ver/:id/:id_User', empleados.verEmpleadoCorreo);

    //Puestos
    app.use('/puestos', puestosRouter);
    puestosRouter.get('/', puestos.todos);
    puestosRouter.get('/new/puesto', puestos.nuevo);
    puestosRouter.post('/puesto', puestos.guardarPuesto);
    puestosRouter.get('/editar/:id', puestos.editar);
    puestosRouter.put('/puesto/:id', puestos.actualizar);
    puestosRouter.get('/baja/:id', puestos.baja);
    puestosRouter.get('/detalles-puesto/:id', puestos.ver);

    //Tickets
    app.use('/tickets', ticketsRouter);
    ticketsRouter.get('/', tickets.todos);
    ticketsRouter.get('/new/ticket', tickets.nuevo);
    ticketsRouter.post('/ticket', tickets.guardar);
    ticketsRouter.get('/ver/:id', tickets.ver);
    ticketsRouter.put('/asignar/:id', tickets.asignar);
    ticketsRouter.put('/comentar/:id', tickets.comentar);
    ticketsRouter.get('/cancelar/:id', tickets.cancelar);
    ticketsRouter.get('/finalizar/:id', tickets.finalizar);

    //Evaluaciones
    app.use('/evaluaciones', evaluacionesRouter);
    evaluacionesRouter.get('/empleados', evaluaciones.empleados);
    evaluacionesRouter.get('/calendario/:idempleado/:puesto', evaluaciones.calendario);
    evaluacionesRouter.get('/ver/:ideval/:idobj', evaluaciones.verEvaluacion);
    evaluacionesRouter.get('/evaluar/:idempleado/:mes/:idobjetivos', evaluaciones.evaluar);
    evaluacionesRouter.post('/evaluar/registrar/:id/:mes/:anio', evaluaciones.registrarEvaluacion);

    //Objetivos
    evaluacionesRouter.get('/puestos', evaluaciones.puestos);
    evaluacionesRouter.get('/puestos/objetivos/:idpuesto', evaluaciones.objetivosPuesto);
    evaluacionesRouter.get('/objetivos/new/:idpuesto/:anio', evaluaciones.nuevosObjetivos);
    evaluacionesRouter.post('/objetivos/guardar/:idpuesto/:anio', evaluaciones.guardar);
    evaluacionesRouter.get('/objetivos/ver/:idobjetivos', evaluaciones.verObjetivos);

    //Tipo Camarón
    app.use('/tiposcamaron', tiposCamRouter);
    tiposCamRouter.get('/', tiposCamaron.todos);
    tiposCamRouter.get('/new/tipocamaron', tiposCamaron.nuevo);
    tiposCamRouter.post('/guardar', tiposCamaron.guardar);
    tiposCamRouter.get('/editar/:id', tiposCamaron.editar);
    tiposCamRouter.get('/editarInv/:id', tiposCamaron.editarInv);
    tiposCamRouter.get('/ver/:id', tiposCamaron.ver);
    tiposCamRouter.get('/eliminar/:id', tiposCamaron.eliminar);
    tiposCamRouter.put('/edicion/:id', tiposCamaron.actualizar);
    tiposCamRouter.put('/edicionInv/:id', tiposCamaron.actualizarInv);

    //Inventario Camarón
    app.use('/inventarioscamaron', inventariosCamRouter);
    inventariosCamRouter.get('/', inventariosCamaron.todos);
    inventariosCamRouter.get('/entradas', inventariosCamaron.entradas);
    inventariosCamRouter.get('/salidas', inventariosCamaron.salidas);
    inventariosCamRouter.get('/entrada', inventariosCamaron.entrada);
    inventariosCamRouter.get('/salida', inventariosCamaron.salida);
    inventariosCamRouter.post('/buscar', inventariosCamaron.buscar);
    inventariosCamRouter.post('/entrada/agregar', inventariosCamaron.agregarEntrada);
    inventariosCamRouter.post('/salida/agregar', inventariosCamaron.agregarSalida);
    inventariosCamRouter.get('/entrada/editar/:id', inventariosCamaron.editarEntrada);
    inventariosCamRouter.get('/salida/editar/:id', inventariosCamaron.editarSalida);
    inventariosCamRouter.post('/reporte', inventariosCamaron.reporte);
    inventariosCamRouter.get('/entrada/terminar/:id', inventariosCamaron.generarPdfEntrada);
    inventariosCamRouter.get('/salida/terminar/:id', inventariosCamaron.generarPdfSalida);

    //Laboratorio
    app.use('/zooplancton', zooplactonRouter);
    zooplactonRouter.get('/all', zooplacton.all);
    zooplactonRouter.get('/new', zooplacton.new);
    zooplactonRouter.get('/edit/:id', zooplacton.edit);
    zooplactonRouter.post('/find', zooplacton.find);
    zooplactonRouter.post('/add', zooplacton.add);
    zooplactonRouter.put('/update/:id', zooplacton.update);

    // DIARIOS
    app.use('/nutrientestox', nutrientesToxRouter);
    nutrientesToxRouter.get('/diario/all', nutrientesTox.allD);
    nutrientesToxRouter.get('/diario/new', nutrientesTox.newD);
    nutrientesToxRouter.post('/diario/find', nutrientesTox.findD);
    nutrientesToxRouter.post('/diario/add', nutrientesTox.addD);
    // SEMANAL
    nutrientesToxRouter.get('/semanal/all', nutrientesTox.allS);
    nutrientesToxRouter.get('/semanal/new', nutrientesTox.newS);
    nutrientesToxRouter.post('/semanal/find', nutrientesTox.findS);
    nutrientesToxRouter.post('/semanal/add', nutrientesTox.addS);

    app.use('/patologicos', patologicosRouter);
    patologicosRouter.get('/all', patologicos.all);
    patologicosRouter.get('/new', patologicos.new);
    patologicosRouter.post('/find', patologicos.find);
    patologicosRouter.post('/add', patologicos.add);

    app.use('/bacteriologia', bacteriologiaRouter);
    bacteriologiaRouter.get('/all', bacteriologia.all);
    bacteriologiaRouter.get('/new', bacteriologia.new);
    bacteriologiaRouter.post('/find', bacteriologia.find);
    bacteriologiaRouter.post('/add', bacteriologia.add);

    app.use('/fitoplancton', fitoplanctonRouter);
    fitoplanctonRouter.get('/all', fitoplancton.all);
    fitoplanctonRouter.get('/new', fitoplancton.new);
    fitoplanctonRouter.get('/edit/:id', fitoplancton.edit);
    fitoplanctonRouter.post('/find', fitoplancton.find);
    fitoplanctonRouter.post('/add', fitoplancton.add);
    fitoplanctonRouter.put('/update/:id', fitoplancton.update);

    // Granja
    app.use('/estanque', estanqueRouter);
    estanqueRouter.get('/all', estanque.all);
    estanqueRouter.get('/new', estanque.new);
    estanqueRouter.get('/edit/:id', estanque.edit);
    estanqueRouter.post('/add', estanque.add );
    estanqueRouter.get('/detail/:id', estanque.detail);
    estanqueRouter.put('/update/:id', estanque.update);
    estanqueRouter.get('/delete/:id', estanqueRouter.delete);

    // Parametros
    app.use('/parametros', parametrosRouter);
    parametrosRouter.get('/all', parametros.all);
    parametrosRouter.get('/new', parametros.new);
    //parametrosRouter.get('/edit', parametros.edit);
    parametrosRouter.post('/add', parametros.add );
    //parametrosRouter.get('/detail/:id', parametros.detail);
    parametrosRouter.post('/find', parametros.find);
    
    // Laboratorios
    app.use('/laboratoriolarvas', laboratoriosRouter);
    laboratoriosRouter.get('/all', laboratorios.all);
    laboratoriosRouter.get('/new', laboratorios.new);
    //laboratoriosRouter.get('/edit/:id', laboratorios.edit);
    laboratoriosRouter.post('/add', laboratorios.add);
    //laboratoriosRouter.put('/update/:id', laboratorios.update);

    // Nutricion
    app.use('/nutricion', nutricionRouter);
    nutricionRouter.get('/all', nutricion.all);
    nutricionRouter.get('/new', nutricion.new);
    //nutricionRouter.get('/edit', nutricion.edit);
    nutricionRouter.post('/add', nutricion.add );
    //nutricionRouter.get('/detail/:id', nutricion.detail);
    nutricionRouter.post('/find', nutricion.find);

    // Recepción Larva


    // Unidades
    

} 