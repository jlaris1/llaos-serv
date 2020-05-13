var mongoose = require('mongoose');
    Usuarios = mongoose.model('Usuarios');
    Cotizaciones = mongoose.model('Cotizaciones');
    Requisiciones = mongoose.model('Requisiciones');
    Ordenes = mongoose.model('Ordenes');
    OrdenesOld = mongoose.model('OrdenesOld');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    chalk = require('chalk');
    UnidadesNegocio = mongoose.model('UnidadesNegocio');

    var fechas = [];
    var alimento = [];
    var piscinas = [];

    var dia1 = 0, dia2 = 0, dia3 = 0, dia4 = 0, dia5 = 0, dia6 = 0, dia7 = 0, dia8 = 0, dia9 = 0, dia10 = 0,
        dia11 = 0, dia12 = 0, dia13 = 0, dia14 = 0, dia15 = 0, dia16 = 0, dia17 = 0, dia18 = 0, dia19 = 0, dia20 = 0,
        dia21 = 0, dia22 = 0, dia23 = 0, dia24 = 0, dia25 = 0, dia26 = 0, dia27 = 0, dia28 = 0, dia29 = 0, dia30 = 0,
        dia31 = 0;

module.exports = {
    //Método root para solicitar inicio de sesión
    login: function (solicitud, respuesta){
        respuesta.render("new_login",{
        //respuesta.render("login",{
            msg: "Por favor inicie sesión."
        });
    },
    inicio: function (solicitud, respuesta){
        //Encerrar en secuencia try-catch
        Usuarios.findOne({"usuario": solicitud.body.user},function (error,usuario){
            if(error){//Error en cuestion de consulta, conexion,etc
                solicitud.session.error = error;
                respuesta.redirect("/error-inicio/"+solicitud.body.user);
            } else {
                if(!usuario){
                    respuesta.render("new_login",{
                        msg: "Error: no existe el usuario " + solicitud.body.user
                    });
                }else{
                    if(usuario.password == solicitud.body.pass){
                        UnidadesNegocio.populate(usuario, {path: 'unidad_negocio'}, (error, usuario) => {
                            if(error){
                                console.log(error);
                            } else {
                                solicitud.session.user = usuario;
                                respuesta.redirect('/home');
                            }
                        });
                    }else{
                        respuesta.render("new_login",{
                            msg: "Error: contraseña incorrecta."
                        });
                    }
                }
            }
        });
        //
    },
    //Método para cerrar sesión
    logoff: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            solicitud.session.user = undefined;
            respuesta.render("new_login",{
                msg: "Por favor inicie sesión."
            });
        };
    },
    home: function(solicitud, respuesta){
		if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{//Los if(error) deberan ser manejados con try-catch
			Requisiciones.find(function(error, requisiciones){
                if(error){//Errores despues de un find son errores de conexion, error al consultar, etc
                    var data = {
                        usuario: solicitud.session.user.usuario,
                        fecha: FechaHora.obtenerfecha(),
                        hora: FechaHora.obtenerhora(),
                        descripcion: 'Error al buscar requisiciones durante el inicio de sesión.',
                        error: error
                    };

                    var horror = new Errores(data);

                    horror.save(function(error){
                        if(error){
                            //console.log(error);
                            respuesta.redirect("/error-inesperado");
                        }
                    });

                } else {
                    Cotizaciones.find({"estatus": "Nueva"}, function(error, cotizaciones){
                        if(error){
                            //console.log(error);
                            var data = {
                                usuario: solicitud.session.user.usuario,
                                fecha: FechaHora.obtenerfecha(),
                                hora: FechaHora.obtenerhora(),
                                descripcion: 'Error al buscar cotizaciones nuevas durante el inicio de sesión.',
                                error: error
                            };

                            var horror = new Errores(data);
                            horror.save(function(error){
                                if(error){
                                    //console.log(error);
                                    respuesta.redirect("/error-inesperado");
                                }
                            });
                        } else {
                            Requisiciones.find({"estatus": "Cancelada"}, function(error, canceladas){
                                if(error){
                                    //console.log(error);
                                    var data = {
                                        usuario: solicitud.session.user.usuario,
                                        fecha: FechaHora.obtenerfecha(),
                                        hora: FechaHora.obtenerhora(),
                                        descripcion: 'Error al buscar requisiciones canceladas durante el inicio de sesión.',
                                        error: error
                                    };
    
                                    var horror = new Errores(data);
                                    horror.save(function(error){
                                        if(error){
                                            //console.log(error);
                                            respuesta.redirect("/error-inesperado");
                                        }
                                    });
                                } else {
                                    Ordenes.find({"estatus": "Nueva"}, function(error, ordenes){
                                        if(error){
                                            //console.log(error);
                                            var data = {
                                                usuario: solicitud.session.user.usuario,
                                                fecha: FechaHora.obtenerfecha(),
                                                hora: FechaHora.obtenerhora(),
                                                descripcion: 'Error al buscar requisiciones durante el inicio de sesión.',
                                                error: error
                                            };
            
                                            var horror = new Errores(data);
                                            horror.save(function(error){
                                                if(error){
                                                    //console.log(error);
                                                    respuesta.redirect("/error-inesperado");
                                                }
                                            });
                                        } else {
                                            // Después de un inicio de sesión exitoso,hacer las consultar, 
                                            // obtener errores y/o cantidades, se renderiza el index
                                            var reqLen=0;
                                            var cotLen=0;
                                            var ordLen=0;
                                            var canLen=0;

                                            if(requisiciones)
                                                reqLen = requisiciones.length
                                            if(cotizaciones)
                                                cotLen = cotizaciones.length
                                            if(ordenes)
                                                ordLen = ordenes.length
                                            if(canceladas)
                                                canLen = canceladas.length
                                            
                                            Usuarios.find( function(error, usuarios){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    respuesta.render("index",{ 
                                                        user: solicitud.session.user,
                                                        requisiciones: reqLen, 
                                                        cotizaciones: cotLen,
                                                        ordenes: ordLen,
                                                        canceladas: canLen,
                                                        criterios: {
                                                            val: "",
                                                            name: ""
                                                        }, 
                                                        piscinas: [
                                                            {
                                                                id: 0,
                                                                nombre: ""
                                                            }
                                                        ],
                                                        charoleros: [
                                                            {
                                                                id: 0,
                                                                nombre: ""
                                                            }   
                                                        ],
                                                        usuarios: usuarios
                                                    });
                                                }
                                            });
                                        }
                                    }); 
                                }
                            });  
                        }
                    });                         
                }
            });
		}
    },
    // Método para mostrar el login con mensaje de error
    expirada: function(solicitud, respuesta){
        respuesta.render("new_login",{
            msg: "Error: sesión caducada. Vuelva a iniciar sesión."
        });
    },
    indicadoresCompras: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            var indicators = [];
            
            var total = 0;
            var total2018 = 0;
            var total2019 = 0;
            
            var mes = 0;
            var mes2018 = 0;
            var mes2019 = 0;

            var dia = 0;
            var dia2018 = 0;
            var dia2019 = 0;
            

            /**** Variables de funcion */
            var dia_actual = new Date(), y = dia_actual.getFullYear(), m = dia_actual.getMonth();
            var dia_un_anio = new Date(), y1 = dia_un_anio.getFullYear()-1, m1 = dia_un_anio.getMonth();
            var dia_dos_anio = new Date(), y2 = dia_dos_anio.getFullYear()-1, m2 = dia_dos_anio.getMonth();

            // Variables año en curso
            var inicio_anio_actual = dia_actual.getFullYear() + '-01-01';
            var primerDiaMes = new Date(y, m, 1).toLocaleDateString("es-MX",{dateStyle: 'short'});
            var ultimoDiaMes = new Date(y, m + 1, 0).toLocaleDateString("es-MX",{dateStyle: 'short'});
            var diaActual = new Date(dia_actual).toLocaleDateString("es-MX",{dateStyle: 'short'});

            // Variables un año atras
            var inicio_un_anio_atras = (dia_actual.getFullYear() - 1) + '-01-01';
            var fin_un_anio_atras = (dia_actual.getFullYear() - 1) + '-12-31';
            var primer_dia_mes_un_anio = new Date(y1, m1, 1).toLocaleDateString("es-MX",{dateStyle: 'short'});
            var ultimo_dia_mes_un_anio = new Date(y1, m1 + 1, 0).toLocaleDateString("es-MX",{dateStyle: 'short'});
            var dia_actual_un_anio = new Date(y1, m1, new Date().getDate()).toLocaleDateString("es-MX",{dateStyle: 'short'});
            

            //console.log(dia_actual_un_anio + ' - '+ primer_dia_mes_un_anio +' - '+ ultimo_dia_mes_un_anio );

            // Varianbles dos años atras [Esto será para el futuro]
            /*var inicio_dos_anio_atras = (dia_actual.getFullYear() - 2) + '-01-01';
            var fin_dos_anio_atras = (dia_actual.getFullYear() - 2) + '-12-31';
            var primer_dia_mes_dos_anio = new Date(y2, m2, 1).toLocaleDateString("es-MX",{dateStyle: 'short'});
            var ultimo_dia_mes_dos_anio = new Date(y2, m2 + 1, 0).toLocaleDateString("es-MX",{dateStyle: 'short'});
            var dia_actual_dos_anio = new Date(y2, m2, new Date().getDate()).toLocaleDateString("es-MX",{dateStyle: 'short'});*/
            
            /** Solo utilizar por ordenes viejas de 2018 */
            var mesNombres = [ "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre" ]; 

            var un_anio_atras = dia_actual.getFullYear() - 1;
            var dos_anio_atras = dia_actual.getFullYear() - 2;
            var mes_atras = mesNombres[new Date().getMonth()];
            var dia_uno_atras = new Date().getDate() + "/" + (m2 + 1 > 9 ? (m2 + 1): '0' + (m2 + 1)) + "/" + un_anio_atras;
            var dia_dos_atras = new Date().getDate() + "/" + (m1 + 1 > 9 ? (m1 + 1): '0' + (m1 + 1)) + "/" + dos_anio_atras;

            //console.log(dia_uno_atras + ' - ' + dia_dos_atras);

            Ordenes.find({
                fecha: {
                    $gte: inicio_anio_actual
                }
            }, {fecha: 1, total: 1}, (error, ordenes) => {
                if(error){
                    console.log(error);
                } else {
                    /*** Búscar órdenes del año en curso */
                    ordenes.forEach(orden => {
                        var date = new Date(orden.fecha);
                        date.setDate(date.getDate() + 1);
                        var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
                        var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
                        var fechaComparar = new Date(date.getFullYear() +'-'+ month +'-'+ day).toLocaleDateString("es-MX",{dateStyle: 'short'});
                        
                        total += parseFloat(orden.total);

                        indicators.push({
                            fecha: new Date(orden.fecha).toLocaleDateString("es-MX",{dateStyle: 'short'}),
                            total: 1 * parseFloat(orden.total)
                        });

                        // Guardar total del mes
                        if( fechaComparar >= primerDiaMes){
                            mes += parseFloat(orden.total);
                        }

                        // Guardar total del día
                        if( diaActual == fechaComparar){
                            dia += parseFloat(orden.total);
                        }
                    });

                    /** Búscar órdenes de un año atras */
                    Ordenes.find({
                        fecha: {
                            $gte: inicio_un_anio_atras,
                            $lte: fin_un_anio_atras
                        }
                    }, {fecha: 1, total: 1}, (error, ordenes) => {
                        ordenes.forEach(orden => {    
                            // Guardar total año pasado
                            total2019 += parseFloat(orden.total);
                        });
                        
                        /*** Búscar órdenes mismo mes un año atras */
                        Ordenes.find({
                            fecha: {
                                $gte: primer_dia_mes_un_anio,
                                $lte: ultimo_dia_mes_un_anio
                            }
                        }, {fecha: 1, total: 1}, (error, ordenes) => {
                            ordenes.forEach(orden => {
                                var date = new Date(orden.fecha);
                                date.setDate(date.getDate() + 1);
                                var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
                                var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
                                var fechaComparar = new Date(date.getFullYear() +'-'+ month +'-'+ day).toLocaleDateString("es-MX",{dateStyle: 'short'});

                                // Guardar total mismo mes año pasado
                                mes2019 += parseFloat(orden.total);
                                
                            });

                            /*** TOTAL 2018 */
                            var total2019_1 = 0;

                            /*** Búscar órdenes de dos años atras [Cambiar en el futuro]*/
                            OrdenesOld.find({},{fecha: 1, total: 1, ano: 1, mes: 1}, (error, orders) => {
                                orders.forEach( order => {
                                    if(order.ano == dos_anio_atras.toString()){
                                        total2018 += parseFloat(order.total);
                                        if(order.mes == mes_atras){
                                            mes2018 += parseFloat(order.total);

                                            if(order.fecha == dia_dos_atras.toString()){
                                                dia2018 += parseFloat(order.total);
                                            }
                                        }
                                    }

                                    if(order.ano == un_anio_atras.toString()){
                                        total2019_1 += parseFloat(order.total);
                                        if(order.mes == mes_atras){
                                            mes2019 += parseFloat(order.total);

                                            if(order.fecha == dia_uno_atras.toString()){
                                                dia2019 += parseFloat(order.total);
                                            }
                                        }
                                    }
                                });

                                total2019 = total2019 + total2019_1;

                                respuesta.json({
                                    indicators: indicators,
                                    total: parseFloat(total).toFixed(2),
                                    mes: parseFloat(mes).toFixed(2),
                                    dia: parseFloat(dia).toFixed(2),
                                    total2019: parseFloat(total2019).toFixed(2),
                                    total2018: parseFloat(total2018).toFixed(2),
                                    mes2019: parseFloat(mes2019).toFixed(2),
                                    mes2018: parseFloat(mes2018).toFixed(2),
                                    dia2019: parseFloat(dia2019).toFixed(2),
                                    dia2018: parseFloat(dia2018).toFixed(2)
                                });
                            }); 
                        });                           
                    });
                }
            });
        }
    },
    indicadoresAlimento: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            var m01 = 0, m05 = 0, m07 = 0, m06 = 0;
            var m2_01 = 0;
            var dia = 0;

            reiniciarContadores();

            var dia_actual = new Date(), y = dia_actual.getFullYear(), m = dia_actual.getMonth(), d = dia_actual.getDate();

            // Variables año en curso
            var primerDiaMes = new Date(y, m, 1).toLocaleDateString("es-MX",{dateStyle: 'short'});
            var ultimoDiaMes = new Date(y, m + 1, 0).toLocaleDateString("es-MX",{dateStyle: 'short'});
            

            Nutricion.find({
                /*fecha: {
                    $gte: primerDiaMes,
                    $lte: ultimoDiaMes
                }*/
            },{fecha: 1, estanque: 1, kg_racion: 1}, (error, nutricion) => {
                if(error){
                    console.log(error);
                } else {
                    Estanques.populate(nutricion, {path: "estanque"}, (error, nutricion) => {
                        if(error){
                            console.log(error);
                        } else {
                            Modulos.populate( nutricion, {path: 'estanque.modulo'}, (error, nutricion) => {
                                if(error){
                                    console.log(error);
                                } else {
                                    UnidadesNegocio.populate( nutricion, {path: 'estanque.modulo.unidad_negocio'}, (error, nutricion) =>{
                                        if(error){
                                            console.log(error);
                                        } else {
                                            //console.log(nutricion);
                                            let n = nutricion.filter( n => n.estanque.modulo.unidad_negocio._id == solicitud.session.user.unidad_negocio._id);

                                            for(let i = 0; i <= n.length - 1; i ++) {
                                                if(existePiscina(n[i].estanque.codigo) == false){
                                                    piscinas.push(
                                                        { 
                                                            codigo: n[i].estanque.codigo,
                                                            unidad_negocio: n[i].estanque.modulo.unidad_negocio.nombre
                                                        }
                                                    );
                                                }                
                                            } 

                                            var total = 0;
                                            
                                            piscinas.forEach( p => {
                                                p.acumulado =  nutricion.map( n => {
                                                    if( n.estanque.codigo == p.codigo ){
                                                        return parseFloat(n.kg_racion);
                                                    }
                                                }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                                                total += p.acumulado;
                                            });

                                            piscinas.sort(GetSortOrder('codigo'));

                                            respuesta.json({piscinas,total});
                                        }
                                    });
                                }
                            });                               

                            /*var m05_list = [];
                            var m05_list_dia = [];
                            var m07_list = [];
                            var m07_list_dia = [];
                            var m2_01_list = [];
                            var m2_01_list_dia = [];
                            var m06_list = [];
                            var m06_list_dia = [];
                            
                            m05_list = nutricion.map( n => {
                                if(n.estanque.codigo == "M-05"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined);

                            var d1_m05 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(primerDiaMes).getTime() && n.estanque.codigo == "M-05"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            var d2_m05 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 2).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M-05"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            var d3_m05 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 3).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M-05"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            var d4_m05 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 4).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M-05"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            var d5_m05 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 5).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M-05"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);


                            m05_list_dia = [d1_m05, d2_m05, d3_m05, d4_m05, d5_m05];

                            /// M-06
                            m06_list = nutricion.map( n => {
                                if(n.estanque.codigo == "M-06"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined);

                            var d1_m06 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(primerDiaMes).getTime() && n.estanque.codigo == "M-06"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            var d2_m06 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 2).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M-06"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            var d3_m06 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 3).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M-06"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            var d4_m06 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 4).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M-06"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            var d5_m06 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 5).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M-06"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);


                            m06_list_dia = [d1_m06, d2_m06, d3_m06, d4_m06, d5_m06];

                            ///
                            m07_list = nutricion.map( n => {
                                if(n.estanque.codigo == "M-07"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined);

                            var d1_m07 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(primerDiaMes).getTime() && n.estanque.codigo == "M-07"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            var d2_m07 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 2).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M-07"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            var d3_m07 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 3).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M-07"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            var d4_m07 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 4).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M-07"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            var d5_m07 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 5).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M-07"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            m07_list_dia = [d1_m07, d2_m07, d3_m07, d4_m07, d5_m07];

                            m2_01_list = nutricion.map( n => {
                                if(n.estanque.codigo == "M2-01"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined);

                            var d1_m2_01 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(primerDiaMes).getTime() && n.estanque.codigo == "M2-01"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);
                            
                            
                            var d2_m2_01 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 2).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M2-01"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);


                            var d3_m2_01 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 3).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M2-01"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);


                            var d4_m2_01 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 4).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M2-01"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            var d5_m2_01 = nutricion.map( n => {
                                if(new Date(n.fecha).getTime() == new Date(new Date(y, m, 5).toLocaleDateString("es-MX",{dateStyle: 'short'})).getTime() && n.estanque.codigo == "M2-01"){
                                    return parseFloat(n.kg_racion);
                                }
                            }).filter(n => n !== undefined).reduce((a, b) => a + b, 0);

                            m2_01_list_dia = [d1_m2_01, d2_m2_01, d3_m2_01, d4_m2_01, d5_m2_01];

                            m05 = m05_list.reduce((a, b) => a + b, 0);   
                            m07 = m07_list.reduce((a, b) => a + b, 0);
                            m06 = m06_list.reduce((a, b) => a + b, 0);                         
                            m2_01 = m2_01_list.reduce((a, b) => a + b, 0);                          

                            for(let i = 0; i <= nutricion.length - 1; i ++) {
                                
                                if(i == 0){
                                    var date = new Date(nutricion[i].fecha);
                                    date.setDate(date.getDate() + 1);
                                    
                                    fechas.push(new Date(date).toLocaleDateString("es-MX",{dateStyle: 'short'}));
                                    dia += 1;
                                    sumarAlDia(dia, nutricion[i].kg_racion);
                                } 
                                
                                if(i > 0) {
                                    if(new Date(nutricion[i].fecha).getTime() != new Date(nutricion[i-1].fecha).getTime()){
                                        var date = new Date(nutricion[i].fecha);
                                        date.setDate(date.getDate() + 1);
                                        fechas.push(new Date(date).toLocaleDateString("es-MX",{dateStyle: 'short'}));
                                        sumarAlDia(dia, nutricion[i].kg_racion);
                                        dia += 1;
                                    } else {
                                        sumarAlDia(dia, nutricion[i].kg_racion);
                                    }
                                }

                                if(i == nutricion.length - 1){  
                                    agregarDiasLista();
                                }
                            }
                            
                            respuesta.json({
                                m01: m01,
                                m05: m05,
                                m06: m06,
                                m07: m07,
                                m2_01: m2_01,
                                m05_list_dia: m05_list_dia,
                                m07_list_dia: m07_list_dia,
                                m06_list_dia: m06_list_dia,
                                m2_01_list_dia: m2_01_list_dia,
                                fechas: fechas,
                                alimento: alimento
                            });*/

                            

                        }
                    });
                }
            }).sort({codigo: 1});
        }
    },
    historial: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            Historial.find( (error, historial) => {
                if(error){
                    console.log(error);
                } else {
                    Usuarios.populate( historial, {path: 'usuario'}, (error, historial) => {
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.json(historial);
                        }
                    });
                }
            })
        }
    }
};

// Sumar al dia la ración de alimento
function sumarAlDia(dia, kg_racion){
    switch (dia) {
        case 1 :
            dia1 += parseFloat(kg_racion);
            break;
        case 2 :
            dia2 += parseFloat(kg_racion);
            break;
        case 3 :
            dia3 += parseFloat(kg_racion);
            break;
        case 4 :
            dia4 += parseFloat(kg_racion);
            break;
        case 5 :
            dia5 += parseFloat(kg_racion);
            break;
        case 6 :
            dia6 += parseFloat(kg_racion);
            break;
        case 7 :
            dia7 += parseFloat(kg_racion);
            break;
        case 8 :
            dia8 += parseFloat(kg_racion);
            break;
        case 9 :
            dia9 += parseFloat(kg_racion);
            break;
        case 10 :
            dia10 += parseFloat(kg_racion);
            break;
        case 11 :
            dia11 += parseFloat(kg_racion);
            break;
        case 12 :
            dia12 += parseFloat(kg_racion);
            break;
        case 13 :
            dia13 += parseFloat(kg_racion);
            break;
        case 14 :
            dia14 += parseFloat(kg_racion);
            break;
        case 15 :
            dia15 += parseFloat(kg_racion);
            break;
        case 16 :
            dia16 += parseFloat(kg_racion);
            break;
        case 17 :
            dia17 += parseFloat(kg_racion);
            break;
        case 18 :
            dia18 += parseFloat(kg_racion);
            break;
        case 19 :
            dia19 += parseFloat(kg_racion);
            break;
        case 20 :
            dia20 += parseFloat(kg_racion);
            break;
        case 21 :
            dia21 += parseFloat(kg_racion);
            break;
        case 22 :
            dia22 += parseFloat(kg_racion);
            break;
        case 23 :
            dia23 += parseFloat(kg_racion);
            break;
        case 24 :
            dia24 += parseFloat(kg_racion);
            break;
        case 25 :
            dia25 += parseFloat(kg_racion);
            break;
        case 26 :
            dia26 += parseFloat(kg_racion);
            break;
        case 27 :
            dia27 += parseFloat(kg_racion);
            break;
        case 28 :
            dia28 += parseFloat(kg_racion);
            break;
        case 29 :
            dia29 += parseFloat(kg_racion);
            break;
        case 30 :
            dia30 += parseFloat(kg_racion);
            break;
        case 31 :
            dia31 += parseFloat(kg_racion);
            break;
    }
}

// Agregar los días a la lista de alimento
function agregarDiasLista(){
    if(dia1 > 0){
        alimento.push(dia1);
    } 
    if(dia2 > 0){
        alimento.push(dia2);
    }
    if(dia3 > 0){
        alimento.push(dia3);
    }
    if(dia4 > 0){
        alimento.push(dia4);
    }
    if(dia5 > 0){
        alimento.push(dia5);
    }
    if(dia6 > 0){
        alimento.push(dia6);
    }
    if(dia7 > 0){
        alimento.push(dia7);
    }
    if(dia8 > 0){
        alimento.push(dia8);
    }
    if(dia9 > 0){
        alimento.push(dia9);
    }
    if(dia10 > 0){
        alimento.push(dia10);
    }
    if(dia11 > 0){
        alimento.push(dia11);
    }
    if(dia12 > 0){
        alimento.push(dia12);
    }
    if(dia13 > 0){
        alimento.push(dia13);
    }
    if(dia14 > 0){
        alimento.push(dia14);
    }
    if(dia15 > 0){
        alimento.push(dia15);
    }
    if(dia16 > 0){
        alimento.push(dia16);
    }
    if(dia17 > 0){
        alimento.push(dia17);
    }
    if(dia18 > 0){
        alimento.push(dia18);
    }
    if(dia19 > 0){
        alimento.push(dia19);
    }
    if(dia20 > 0){
        alimento.push(dia20);
    }
    if(dia21 > 0){
        alimento.push(dia21);
    }
    if(dia22 > 0){
        alimento.push(dia22);
    }
    if(dia23 > 0){
        alimento.push(dia23);
    }
    if(dia24 > 0){
        alimento.push(dia24);
    }
    if(dia25 > 0){
        alimento.push(dia25);
    }
    if(dia26 > 0){
        alimento.push(dia26);
    }
    if(dia27 > 0){
        alimento.push(dia27);
    }
    if(dia28 > 0){
        alimento.push(dia28);
    }
    if(dia29 > 0){
        alimento.push(dia29);
    }
    if(dia30 > 0){
        alimento.push(dia30);
    }
    if(dia31 > 0){
        alimento.push(dia31);
    }
}

// Reiniciar contadores
function reiniciarContadores(){
        fechas = [];
        alimento = [];

        dia1 = 0, dia2 = 0, dia3 = 0, dia4 = 0, dia5 = 0, dia6 = 0, dia7 = 0, dia8 = 0, dia9 = 0, dia10 = 0,
        dia11 = 0, dia12 = 0, dia13 = 0, dia14 = 0, dia15 = 0, dia16 = 0, dia17 = 0, dia18 = 0, dia19 = 0, dia20 = 0,
        dia21 = 0, dia22 = 0, dia23 = 0, dia24 = 0, dia25 = 0, dia26 = 0, dia27 = 0, dia28 = 0, dia29 = 0, dia30 = 0,
        dia31 = 0;
}

function existePiscina(piscina) {
    if(piscinas != undefined && piscinas != null && piscinas.length > 0){
        for(let i = 0; i <= piscinas.length -1; i ++){
            if(piscina == piscinas[i].codigo){
                return true;
            }
        }
    } else {
        return false;
    }

    return false;
}

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
} 
