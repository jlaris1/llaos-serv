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

    var unidad = require('../routes/unidades.js')
    var unidadRouter = express.Router();

    var catalogos = require('../routes/catalogos.js');
    var catalogosRouter = express.Router();

    var produccion = require('../routes/produccion.js');
    var produccionRouter = express.Router();

    var biometrias = require('../routes/biometrias.js');
    var biometriasRouter = express.Router();

    //Pruebas
    //app.get('/pruebita', pruebita.prueba); 
    //app.get('/pruebita', inventarios.imprimirOrdenSalida);
    //Errores
    app.get('error-inesperado', errores.errorInesperado);
    app.get('/error-inicio/:user', errores.errorInicio);
    
        
    //Sesion
    app.get('/', sesion.login);
    app.post('/inicio', sesion.inicio);
    app.get('/home', sesion.home);
    app.get('/cerrar_sesion', sesion.logoff);
    app.get('/sesion-expirada', sesion.expirada);
    app.get('/obtener/indicadores/compras', sesion.indicadoresCompras);
    app.get('/obtener/indicadores/alimento', sesion.indicadoresAlimento);
    app.get('/historial', sesion.historial);

    //Usuarios
    app.use('/usuarios', usuariosRouter);
    usuariosRouter.get('/', usuarios.todos);
    usuariosRouter.get('/new/usuario', usuarios.nuevo);
    usuariosRouter.get('/editar/usuario/:id', usuarios.editar);
    usuariosRouter.post('/usuario', usuarios.guardar);
    usuariosRouter.post('/editar/usuario/:id', usuarios.actualizar);
    usuariosRouter.get('/eliminar/usaurio/:id', usuarios.eliminar);
    usuariosRouter.get('/find/:unidad', usuarios.findAreas);
    //usuariosRouter.post('/report/pdf', usuarios.pdf);
    //usuariosRouter.post('/report/xls', usuarios.xls);

    //Proveedores
    app.use('/proveedores', proveedoresRouter);
    proveedoresRouter.get('/', proveedores.todos);
    proveedoresRouter.get('/new/proveedor', proveedores.nuevo);
    proveedoresRouter.get('/editar/proveedor/:id', proveedores.editar);
    proveedoresRouter.post('/proveedor', proveedores.guardarProveedor);//////
    proveedoresRouter.put('/proveedor/:id', proveedores.actualizar);
    proveedoresRouter.get('/eliminar/proveedor/:id', proveedores.eliminar);
    //proveedoresRouter.post('/report/pdf', proveedores.pdf);
    //proveedoresRouter.post('/report/xls', proveedores.xls);

    //Productos
    app.use('/productos', productosRouter);
    productosRouter.get('/', productos.todos);
    productosRouter.get('/all', productos.all);
    productosRouter.get('/new/producto', productos.nuevo);
    productosRouter.get('/producto/editar/:id', productos.editar);
    productosRouter.post('/producto', productos.guardar);
    productosRouter.put('/actualizar/:id', productos.actualizar);
    productosRouter.get('/producto/eliminar/:id', productos.eliminar);
    //productosRouter.post('/report/pdf', productos.pdf);
    //productosRouter.post('/report/xls', productos.xls);

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
    requisicionesRouter.get('/requisicion/veranteriores/:id', requisiciones.verAnteriores);
    requisicionesRouter.get('/requisicion/ver/:id/:id_usr', requisiciones.verReqCorreo);
    requisicionesRouter.get('/requisicion/editar/:id', requisiciones.editarRequisicion);
    requisicionesRouter.get('/editar/articulo-requisicion/:id/:req_id', requisiciones.editarArticulo);
    requisicionesRouter.put('/actualizar/requisicion/:id', requisiciones.actualizarSoloRequisicion);
    requisicionesRouter.put('/actualizar/requisicion/:req_id/:art_id', requisiciones.actualizarReqArt);
    requisicionesRouter.get('/enviar/requisicion/:id/:id_usr_aut', requisiciones.correoNuevaRequisicion);
    requisicionesRouter.get('/requisicion/eliminar/:id', requisiciones.eliminarRequisicion);
    requisicionesRouter.get('/eliminar/articulo-requisicion/:id', requisiciones.eliminarArticulo);
    requisicionesRouter.get('/requisiciones/nuevas', requisiciones.requisicionesNuevasAutorizadas);
    requisicionesRouter.post('/report/pdf', requisiciones.pdfRequisiciones);
    requisicionesRouter.post('/report/xls', requisiciones.xls);
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
    
    
    ordenesRouter.get('/articuloruta/eliminar/:id/:id_oRuta', ordenes.eliminarArticuloOrdenRuta);
    
    ordenesRouter.get('/ordenruta/ver/:id', ordenes.ordenRutaDetalles);
    ordenesRouter.get('/ordenruta/entrada/:id', ordenes.ordenRutaEntrada);
    ordenesRouter.get('/ordenruta/cerrar/:id', ordenes.cerrarOrdenRuta);
    ordenesRouter.post('/ordenruta/inventario', ordenes.entradaOrdenRuta);
    ordenesRouter.get('/ordenruta/articulos/:id', ordenes.articulosOrdenRuta);
    ordenesRouter.get('/ordenruta/articulo/buscar/:id', ordenes.articuloOrdenVieja);

    // REVISAR TODO LO QUE SE VA A ELIMINAR DE ARRIBA
    ordenesRouter.get('/ordenesruta', ordenes.ordenesEnRutaBandeja);
    ordenesRouter.get('/ordenruta/ordenes', ordenes.obtenerOrdenesCompra);
    ordenesRouter.get('/ordenruta/articulos/orden/:id_orden', ordenes.agregarArticulosOrdenRuta);
    ordenesRouter.post('/ordenruta/generar', ordenes.generarOrdenRuta);
    ordenesRouter.post('/ordenruta/enviar', ordenes.enviarOrdenRuta);

    //ordenesRouter.post('/report/pdf', ordenes.pdf);
    //ordenesRouter.post('/report/xls', ordenes.xls);

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
    //cotizacionesRouter.post('/report/pdf', cotizaciones.pdf);
    //cotizacionesRouter.post('/report/xls', cotizaciones.xls);

    //Inventarios
    app.use('/inventarios', inventariosRouter);
    inventariosRouter.get('/granja', inventarios.inventarioGranja);
    inventariosRouter.get('/planta', inventarios.inventarioPlanta);
    inventariosRouter.get('/oficina', inventarios.inventarioOficina);
    inventariosRouter.get('/articulo/new', inventarios.agregarArticuloAlmacen);
    inventariosRouter.get('/find/:modulo', inventarios.find);
    inventariosRouter.get('/inventario/entrada', inventarios.abrirEntradaArticulo);
    inventariosRouter.get('/inventario/entrada/:id', inventarios.entradaArticulo);
    inventariosRouter.get('/inventario/salida', inventarios.abrirSalidaArticulo);
    inventariosRouter.get('/inventario/salida_nueva', inventarios.abrirSalidaArticulo);
    inventariosRouter.get('/inventario/salida/:id', inventarios.salidaArticulo);
    inventariosRouter.post('/buscar/articulo/:tipo', inventarios.buscarArticulo);
    inventariosRouter.post('/registrar/entrada/:id_prod', inventarios.registrarEntrada);
    inventariosRouter.post('/registrar/salida/:id_prod', inventarios.registrarSalida);
    inventariosRouter.post('/registrar/salida/', inventarios.registrarNuevaSalida);
    inventariosRouter.post('/salida/imprimir', inventarios.imprimirOrdenSalida);
    inventariosRouter.post('/salida/finalizar', inventarios.finalizar);
    inventariosRouter.get('/entradas', inventarios.abrirEntradas);
    inventariosRouter.get('/salidas', inventarios.abrirSalidas);
    inventariosRouter.get('/salidas/ver/:id', inventarios.verOrdenSalida);

    inventariosRouter.get('/usuario/datos/:id', inventarios.datosUsuario);


    //inventariosRouter.post('/report/pdf', inventarios.pdf);
    inventariosRouter.post('/report/salidas/xls', inventarios.xls);
    inventariosRouter.post('/report/entradas/xls', inventarios.xls);

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
    //empleadosRouter.post('/report/pdf', empleados.pdf);
    //empleadosRouter.post('/report/xls', empleados.xls);

    //Puestos
    app.use('/puestos', puestosRouter);
    puestosRouter.get('/', puestos.todos);
    puestosRouter.get('/new/puesto', puestos.nuevo);
    puestosRouter.post('/puesto', puestos.guardarPuesto);
    puestosRouter.get('/editar/:id', puestos.editar);
    puestosRouter.put('/puesto/:id', puestos.actualizar);
    puestosRouter.get('/baja/:id', puestos.baja);
    puestosRouter.get('/detalles-puesto/:id', puestos.ver);
    //puestosRouter.post('/report/pdf', puestos.pdf);
    //puestosRouter.post('/report/xls', puestos.xls);

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
    //ticketsRouter.post('/report/pdf', tickets.pdf);
    //ticketsRouter.post('/report/xls', tickets.xls);

    //Evaluaciones
    app.use('/evaluaciones', evaluacionesRouter);
    evaluacionesRouter.get('/empleados', evaluaciones.empleados);
    evaluacionesRouter.get('/calendario/:idempleado/:puesto', evaluaciones.calendario);
    evaluacionesRouter.get('/ver/:ideval/:idobj', evaluaciones.verEvaluacion);
    evaluacionesRouter.get('/evaluar/:idempleado/:mes/:idobjetivos', evaluaciones.evaluar);
    evaluacionesRouter.post('/evaluar/registrar/:id/:mes/:anio', evaluaciones.registrarEvaluacion);
    //evaluacionesRouter.post('/report/pdf', evaluaciones.pdf);
    //evaluacionesRouter.post('/report/xls', evaluaciones.xls);


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
    //tiposCamRouter.post('/report/pdf', tiposCamaron.pdfD);
    //tiposCamRouter.post('/report/xls', tiposCamaron.xlsD);

    //Inventario Camarón
    app.use('/inventarioscamaron', inventariosCamRouter);
    inventariosCamRouter.get('/all', inventariosCamaron.todos);
    inventariosCamRouter.get('/entradas', inventariosCamaron.entradas);
    inventariosCamRouter.get('/salidas', inventariosCamaron.salidas);
    inventariosCamRouter.get('/entrada', inventariosCamaron.entrada);
    inventariosCamRouter.get('/salida', inventariosCamaron.salida);
    inventariosCamRouter.post('/buscar', inventariosCamaron.buscar);
    inventariosCamRouter.post('/entrada/agregar', inventariosCamaron.agregarEntrada);
    inventariosCamRouter.post('/salida/agregar', inventariosCamaron.agregarSalida);
    inventariosCamRouter.get('/entrada/editar/:id', inventariosCamaron.editarEntrada);
    inventariosCamRouter.get('/salida/editar/:id', inventariosCamaron.editarSalida);
    inventariosCamRouter.get('/entrada/terminar/:id', inventariosCamaron.generarPdfEntrada);
    inventariosCamRouter.get('/salida/terminar/:id', inventariosCamaron.generarPdfSalida);
    inventariosCamRouter.post('/report/pdf', inventariosCamaron.pdf);
    //inventariosCamRouter.post('/report/xls', inventariosCamaron.xls);

    //Laboratorio
    app.use('/zooplancton', zooplactonRouter);
    zooplactonRouter.get('/all', zooplacton.all);
    zooplactonRouter.get('/new', zooplacton.new);
    zooplactonRouter.get('/edit/:id', zooplacton.edit);
    zooplactonRouter.post('/find', zooplacton.find);
    zooplactonRouter.post('/add', zooplacton.add);
    zooplactonRouter.put('/update/:id', zooplacton.update);
    //zooplactonRouter.post('/report/pdf', zooplacton.pdfD);
    //zooplactonRouter.post('/report/xls', zooplacton.xlsD);

    // DIARIOS
    app.use('/nutrientestox', nutrientesToxRouter);
    nutrientesToxRouter.get('/diario/all', nutrientesTox.allD);
    nutrientesToxRouter.get('/diario/new', nutrientesTox.newD);
    nutrientesToxRouter.post('/diario/find', nutrientesTox.findD);
    nutrientesToxRouter.post('/diario/add', nutrientesTox.addD);
    //nutrientesToxRouter.post('/report/pdf', nutrientesTox.pdfD);
    //nutrientesToxRouter.post('/report/xls', nutrientesTox.xlsD);

    // SEMANAL
    nutrientesToxRouter.get('/semanal/all', nutrientesTox.allS);
    nutrientesToxRouter.get('/semanal/new', nutrientesTox.newS);
    nutrientesToxRouter.post('/semanal/find', nutrientesTox.findS);
    nutrientesToxRouter.post('/semanal/add', nutrientesTox.addS);
    //nutrientesToxRouter.post('/report/pdf', nutrientesTox.pdfS);
    //nutrientesToxRouter.post('/report/xls', nutrientesTox.xlsS);

    app.use('/patologicos', patologicosRouter);
    patologicosRouter.get('/all', patologicos.all);
    patologicosRouter.get('/new', patologicos.new);
    patologicosRouter.post('/find', patologicos.find);
    patologicosRouter.post('/add', patologicos.add);
    //patologicosRouter.post('/report/pdf', patologicos.pdf);
    //patologicosRouter.post('/report/xls', patologicos.xls);

    app.use('/bacteriologia', bacteriologiaRouter);
    bacteriologiaRouter.get('/all', bacteriologia.all);
    bacteriologiaRouter.get('/new', bacteriologia.new);
    bacteriologiaRouter.post('/find', bacteriologia.find);
    bacteriologiaRouter.post('/add', bacteriologia.add);
    //bacteriologiaRouter.post('/report/pdf', bacteriologia.pdf);
    //bacteriologiaRouter.post('/report/xls', bacteriologia.xls);

    app.use('/fitoplancton', fitoplanctonRouter);
    fitoplanctonRouter.get('/all', fitoplancton.all);
    fitoplanctonRouter.get('/new', fitoplancton.new);
    fitoplanctonRouter.get('/edit/:id', fitoplancton.edit);
    fitoplanctonRouter.post('/find', fitoplancton.find);
    fitoplanctonRouter.post('/add', fitoplancton.add);
    fitoplanctonRouter.put('/update/:id', fitoplancton.update);
    //fitoplanctonRouter.post('/report/pdf', fitoplancton.pdf);
    //fitoplanctonRouter.post('/report/xls', fitoplancton.xls);

    // Granja
    app.use('/estanque', estanqueRouter);
    estanqueRouter.get('/all', estanque.all);
    estanqueRouter.get('/new', estanque.new);
    estanqueRouter.get('/edit/:id', estanque.edit);
    estanqueRouter.post('/add', estanque.add );
    estanqueRouter.get('/detail/:id', estanque.detail);
    estanqueRouter.put('/update/:id', estanque.update);
    estanqueRouter.get('/delete/:id', estanque.delete);
    //estanqueRouter.post('/report/pdf', estanque.pdf);
    //estanqueRouter.post('/report/xls', estanque.xls);
    estanqueRouter.get('/indicators', estanque.indicators);
    estanqueRouter.post('/indicators/piscinas', estanque.piscinas);
    

    // Parametros
    app.use('/parametros', parametrosRouter);
    parametrosRouter.get('/all', parametros.all);
    parametrosRouter.get('/new', parametros.new);
    parametrosRouter.get('/edit/:id', parametros.edit);
    parametrosRouter.post('/add', parametros.add );
    parametrosRouter.post('/update', parametros.update );
    parametrosRouter.get('/delete/:id', parametros.delete);
    parametrosRouter.post('/find', parametros.find);
    parametrosRouter.post('/next', parametros.next);
    parametrosRouter.post('/report/pdf', parametros.pdf);
    parametrosRouter.post('/report/xls', parametros.xls);
    parametrosRouter.post('/piscinas', parametros.findPiscinas)
    
    // Laboratorios
    app.use('/laboratoriolarvas', laboratoriosRouter);
    laboratoriosRouter.get('/all', laboratorios.all);
    laboratoriosRouter.get('/new', laboratorios.new);
    //laboratoriosRouter.get('/edit/:id', laboratorios.edit);
    laboratoriosRouter.post('/add', laboratorios.add);
    //laboratoriosRouter.put('/update/:id', laboratorios.update);
    //laboratoriosRouter.post('/report/pdf', laboratorios.pdf);
    //laboratoriosRouter.post('/report/xls', laboratorios.xls);

    // Nutricion
    app.use('/nutricion', nutricionRouter);
    nutricionRouter.get('/all', nutricion.all);
    nutricionRouter.get('/new', nutricion.new);
    nutricionRouter.get('/editar/:id', nutricion.edit);
    nutricionRouter.post('/add', nutricion.add );
    //nutricionRouter.get('/detail/:id', nutricion.detail);
    nutricionRouter.post('/find', nutricion.find);
    nutricionRouter.post('/report/pdf', nutricion.pdf);
    nutricionRouter.post('/report/xls', nutricion.xls);
    nutricionRouter.post('/piscinas', nutricion.piscinas);
    nutricionRouter.post('/acumulado', nutricion.acumulado);
    nutricionRouter.get('/config', nutricion.config);
    nutricionRouter.get('/alimento', nutricion.obtenerAlimentos);
    nutricionRouter.get('/insumos', nutricion.obtenerInsumos);
    nutricionRouter.post('/delete/piscina/', nutricion.delete);
    nutricionRouter.get('/eliminar/:id', nutricion.deleteOne);
    nutricionRouter.post('/update', nutricion.update);

    // Recepción Larva


    // Unidades
    app.use('/unidades', unidadRouter);
    unidadRouter.get('/tractor/all', unidad.allT);
    unidadRouter.get('/tractor/new', unidad.newT);
    unidadRouter.post('/tractor/add', unidad.addT);
    unidadRouter.get('/tractor/view/:id', unidad.viewT);
    unidadRouter.get('/tractor/delete/:id', unidad.deleteT);
    unidadRouter.get('/camioneta/all', unidad.allC);
    unidadRouter.get('/camioneta/new', unidad.newC);
    unidadRouter.post('/tractor/add', unidad.addS);
    unidadRouter.post('/camioneta/add', unidad.addC);
    /*unidadRouter.get('/tractor/view/:id', unidad.viewT);
    unidadRouter.get('/tractor/delete/:id', unidad.deleteT);*/

    // Servicios
    unidadRouter.get('/servicios/all', unidad.allS);
    unidadRouter.get('/servicios/new', unidad.newS);
    unidadRouter.post('/servicios/add', unidad.addS);
    //unidadRouter.get('/servicios/view/:id', unidad.viewS);

    // Catalogos
    app.use('/catalogos', catalogosRouter);
    catalogosRouter.get('/areas/all', catalogos.allAreas);
    catalogosRouter.get('/areas/new', catalogos.newAreas);
    catalogosRouter.get('/areas/edit/:id', catalogos.editAreas);
    catalogosRouter.post('/areas/', catalogos.saveAreas);
    catalogosRouter.post('/areas/update/:id', catalogos.updateAreas);
    catalogosRouter.post('/areas/delete/:id', catalogos.deleteAreas);

    catalogosRouter.get('/cuentas/all', catalogos.allCuentas);
    catalogosRouter.get('/cuentas/new', catalogos.newCuentas);
    catalogosRouter.get('/cuentas/edit', catalogos.allCuentas);
    catalogosRouter.post('/cuentas/', catalogos.saveCuentas);
    catalogosRouter.post('/cuentas/update/:id', catalogos.updateCuentas);

    catalogosRouter.get('/subcuentas/all', catalogos.allSubCuentas);
    catalogosRouter.get('/subcuentas/new', catalogos.newSubCuentas);
    catalogosRouter.get('/subcuentas/edit', catalogos.allSubCuentas);
    catalogosRouter.post('/subcuentas/', catalogos.saveSubCuentas);
    catalogosRouter.post('/subcuentas/update/:id', catalogos.updateSubCuentas);

    // Producción
    app.use('/produccion', produccionRouter);
    produccionRouter.get('/configuracion/piscinas', produccion.configPiscinas);
    produccionRouter.get('/mostrar/piscinas', produccion.mostrasPiscinas);
    produccionRouter.post('/configuracion/piscinas/guardar', produccion.guardarConfigPiscinas);

    app.use('/biometrias', biometriasRouter);
    biometriasRouter.get('/all', biometrias.all);
    biometriasRouter.get('/new', biometrias.new);
    biometriasRouter.post('/save', biometrias.add);
    biometriasRouter.post('/piscinas', biometrias.findPiscinas);
    biometriasRouter.post('/acumulado', biometrias.acumulado);

} 