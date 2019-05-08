var mongoose = require('mongoose'),
    Evaluaciones = mongoose.model('Evaluaciones'),
    Objetivos = mongoose.model('Objetivos'),
    Empleados = mongoose.model('Empleados'),
    Puestos = mongoose.model('Puestos'),
    FechaHora = require('./fechahora');

module.exports = {
    // Método para obtener todos los empleados para poder ser evaluados según su puesto
    empleados: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Empleados.find(function(error, empleados) {
                Puestos.populate(empleados, {path: 'puesto'}, function(error, empleados){
                    respuesta.render("Evaluaciones/empleados", {
                        user: solicitud.session.user,
                        empleados: empleados,
                        msg: ""
                    });
                });
            });
        };
    },
    // Método para ver el calendario de evaluaciones del empleado
    calendario: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Evaluaciones.find({ empleado: solicitud.params.idempleado }, function(error, evaluaciones){
                if(error){
                    console.log(error);
                }else{
                    Empleados.findById({"_id":solicitud.params.idempleado}, function(error, empleado){
                        if(error){
                            console.log(error);
                        }else{
                            Objetivos.find({ puesto: solicitud.params.puesto }, function(error, objetivos){
                                if(objetivos.length==0){
                                    Puestos.findById({"_id":solicitud.params.puesto}, function(error, puestoError){
                                        Empleados.find(function(error, empleados) {
                                            Puestos.populate(empleados, {path: 'puesto'}, function(error, empleados){
                                                respuesta.render("Evaluaciones/empleados", {
                                                    user: solicitud.session.user,
                                                    empleados: empleados,
                                                    msg: "Los Objetivos para el puesto "+puestoError.posicion+" no han sido definidos."
                                                });
                                            });
                                        });
                                    });
                                }else{
                                    var añoActual = new Date();
                                    añoActual = añoActual.getFullYear();

                                    var evalActuales, evalPasadas, evalFuturas;
                                    evalPasadas = {
                                        enero: Object,
                                        febrero: Object,
                                        marzo: Object,
                                        abril: Object,
                                        mayo: Object,
                                        junio: Object,
                                        julio: Object,
                                        agosto: Object,
                                        septiembre: Object,
                                        octubre: Object,
                                        noviembre: Object,
                                        diciembre: Object
                                    }

                                    evalActuales = {
                                        enero: Object,
                                        febrero: Object,
                                        marzo: Object,
                                        abril: Object,
                                        mayo: Object,
                                        junio: Object,
                                        julio: Object,
                                        agosto: Object,
                                        septiembre: Object,
                                        octubre: Object,
                                        noviembre: Object,
                                        diciembre: Object
                                    }

                                    evalFuturas = {
                                        enero: Object,
                                        febrero: Object,
                                        marzo: Object,
                                        abril: Object,
                                        mayo: Object,
                                        junio: Object,
                                        julio: Object,
                                        agosto: Object,
                                        septiembre: Object,
                                        octubre: Object,
                                        noviembre: Object,
                                        diciembre: Object
                                    }

                                    var añoPasado = (añoActual-1).toString();
                                    añoActual = añoActual.toString();
                                    var añoFuturo = (añoActual+1).toString();
                                    evaluaciones.forEach(eva => {
                                        switch(eva.anio){
                                            case añoPasado:
                                                switch(eva.mes){
                                                    case 'enero':
                                                        evalPasadas.enero = eva;
                                                        break;
                                                    case 'febrero':
                                                        evalPasadas.febrero = eva;
                                                        break;
                                                    case 'marzo':
                                                        evalPasadas.marzo = eva;
                                                        break;
                                                    case 'abril':
                                                        evalPasadas.abril = eva;
                                                        break;
                                                    case 'mayo':
                                                        evalPasadas.mayo = eva;
                                                        break;
                                                    case 'junio':
                                                        evalPasadas.junio = eva;
                                                        break;
                                                    case 'julio':
                                                        evalPasadas.julio = eva;
                                                        break;
                                                    case 'agosto':
                                                        evalPasadas.agosto = eva;
                                                        break;
                                                    case 'septiembre':
                                                        evalPasadas.septiembre = eva;
                                                        break;
                                                    case 'octubre':
                                                        evalPasadas.octubre = eva;
                                                        break;
                                                    case 'noviembre':
                                                        evalPasadas.noviembre = eva;
                                                        break;
                                                    case 'diciembre':
                                                        evalPasadas.diciembre = eva;
                                                        break;
                                                }
                                                break;
                                            case añoActual:
                                                switch(eva.mes){
                                                    case 'enero':
                                                        evalActuales.enero = eva;
                                                        break;
                                                    case 'febrero':
                                                        evalActuales.febrero = eva;
                                                        break;
                                                    case 'marzo':
                                                        evalActuales.marzo = eva;
                                                        break;
                                                    case 'abril':
                                                        evalActuales.abril = eva;
                                                        break;
                                                    case 'mayo':
                                                        evalActuales.mayo = eva;
                                                        break;
                                                    case 'junio':
                                                        evalActuales.junio = eva;
                                                        break;
                                                    case 'julio':
                                                        evalActuales.julio = eva;
                                                        break;
                                                    case 'agosto':
                                                        evalActuales.agosto = eva;
                                                        break;
                                                    case 'septiembre':
                                                        evalActuales.septiembre = eva;
                                                        break;
                                                    case 'octubre':
                                                        evalActuales.octubre = eva;
                                                        break;
                                                    case 'noviembre':
                                                        evalActuales.noviembre = eva;
                                                        break;
                                                    case 'diciembre':
                                                        evalActuales.diciembre = eva;
                                                        break;
                                                }
                                                break;
                                            case añoFuturo:
                                                switch(eva.mes){
                                                    case 'enero':
                                                        evalFuturas.enero = eva;
                                                        break;
                                                    case 'febrero':
                                                        evalFuturas.febrero = eva;
                                                        break;
                                                    case 'marzo':
                                                        evalFuturas.marzo = eva;
                                                        break;
                                                    case 'abril':
                                                        evalFuturas.abril = eva;
                                                        break;
                                                    case 'mayo':
                                                        evalFuturas.mayo = eva;
                                                        break;
                                                    case 'junio':
                                                        evalFuturas.junio = eva;
                                                        break;
                                                    case 'julio':
                                                        evalFuturas.julio = eva;
                                                        break;
                                                    case 'agosto':
                                                        evalFuturas.agosto = eva;
                                                        break;
                                                    case 'septiembre':
                                                        evalFuturas.septiembre = eva;
                                                        break;
                                                    case 'octubre':
                                                        evalFuturas.octubre = eva;
                                                        break;
                                                    case 'noviembre':
                                                        evalFuturas.noviembre = eva;
                                                        break;
                                                    case 'diciembre':
                                                        evalFuturas.diciembre = eva;
                                                        break;
                                                }
                                                break;                                            
                                        }
                                    });
                                    respuesta.render("Evaluaciones/calendario", {
                                        user: solicitud.session.user,
                                        evaluaciones: evaluaciones,
                                        empleado: empleado,
                                        evalPasadas: evalPasadas,
                                        evalActuales: evalActuales,
                                        evalFuturas: evalFuturas,
                                        objetivos: objetivos,
                                        añoActual: añoActual
                                    });
                                };
                            });
                        };
                    });
                };
            });
        };
    },
    // Método para visualizar una evaluación
    verEvaluacion: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Evaluaciones.findById({"_id": solicitud.params.ideval}, function(error, evaluacion){
                if(error){
                    console.log(error);
                }else{
                    Empleados.populate(evaluacion, {path: 'empleado'}, function(error, evaluacion){
                        if(error){
                            console.log(error);
                        }else{
                            Objetivos.findById({"_id": solicitud.params.idobj}, function(error, objetivos){
                                if(error){
                                    console.log(error);
                                }else{
                                    respuesta.render("Evaluaciones/evaluacion", {
                                        user: solicitud.session.user,
                                        evaluacion: evaluacion,
                                        objetivos: objetivos
                                    });
                                }
                            });
                        };
                    });
                };
            });
        };
    },
    // Método para visualizar el formulario de evaluación
    evaluar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Empleados.findById({"_id": solicitud.params.idempleado}, function(error, empleado){
                if(error){
                    console.log(error);
                }else{
                    Objetivos.findById({"_id": solicitud.params.idobjetivos}, function(error, objetivos){
                        if(error){
                            console.log(error);
                        }else{
                            respuesta.render("Evaluaciones/evaluar", {
                                user: solicitud.session.user,
                                empleado: empleado,
                                objetivos: objetivos,
                                mes: solicitud.params.mes
                            });
                        }
                    });
                };
            });
        };
    },
    // Método para registrar evaluación en base de datos
    registrarEvaluacion: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Empleados.findById({"_id": solicitud.params.id}, function(error, empleado){
                if(error){
                    console.log(error);
                }else{
                    var data = {
                        empleado: empleado.id,
                        mes: solicitud.params.mes,
                        anio: solicitud.params.anio,
                        calif1: solicitud.body.calif1,
                        calif2: solicitud.body.calif2,
                        calif3: solicitud.body.calif3,
                        calif4: solicitud.body.calif4,
                        calif5: solicitud.body.calif5,
                        calif6: solicitud.body.calif6,
                        valor1: solicitud.body.valor1,
                        valor2: solicitud.body.valor2,
                        valor3: solicitud.body.valor3,
                        valor4: solicitud.body.valor4,
                        valor5: solicitud.body.valor5,
                        valor6: solicitud.body.valor6,
                        final: solicitud.body.final
                    };
        
                    var evaluacion = new Evaluaciones(data);
        
                    evaluacion.save( function(error){
                        if(error){
                            console.log(error);
                        }else{
                            respuesta.redirect("/evaluaciones/calendario/"+empleado.id+"/"+empleado.puesto);
                        };
                    });
                };
            });
        };
    },
    // Método para obtener los puestos a los cuales se les asignarán objetivos
    puestos: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Puestos.find( function(error, puestos) {
                respuesta.render("Evaluaciones/puestos", {
                    user: solicitud.session.user,
                    puestos: puestos
                });
            });
        };
    },
    // Método para visualizar los objetivos de un puesto
    objetivosPuesto: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            var fecha = new Date();
            anio = fecha.getFullYear();
            
            Puestos.findById({"_id": solicitud.params.idpuesto}, function(error, pues){
                Objetivos.find({ puesto: solicitud.params.idpuesto, anio: { $gte: anio-1, $lte: anio+1 } }, function(error, objetivos) {
                    var añoActual = new Date().getFullYear();
                    var anterior;
                    var actual;
                    var siguiente;
                    
                    for(var i=0; i<objetivos.length; i++){
                        if(objetivos[i].anio == añoActual-1)
                            anterior = objetivos[i];
                        if(objetivos[i].anio == añoActual)
                            actual = objetivos[i];
                        if(objetivos[i].anio == añoActual+1)
                            siguiente = objetivos[i];
                    }

                    respuesta.render("Evaluaciones/objetivos", {
                        user: solicitud.session.user,
                        puesto: pues,
                        anio: añoActual,
                        anterior: anterior,
                        actual: actual,
                        siguiente: siguiente
                    });
                });
            });
        };
    },
    // Método para visualizar formulario de objetivos
    nuevosObjetivos: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Puestos.findById({ "_id": solicitud.params.idpuesto }, function(error, puesto) {
                respuesta.render("Evaluaciones/nuevo_objetivos", {
                    user: solicitud.session.user,
                    puesto: puesto,
                    anio: solicitud.params.anio
                });
            });
        };
    },
    // Método para almacenar nuevos objetivos
    guardar: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Puestos.findById({"_id": solicitud.params.idpuesto}, function(error, puesto){
                if(error){
                    console.log(error);
                }else{
                    var data = {
                        puesto: puesto,
                        anio: solicitud.params.anio,
                        mes: solicitud.params.mes,
                        objetivo1: solicitud.body.objetivo1,
                        peso1: solicitud.body.peso1,
                        objetivo2: solicitud.body.objetivo2,
                        peso2: solicitud.body.peso2,
                        objetivo3: solicitud.body.objetivo3,
                        peso3: solicitud.body.peso3,
                        objetivo4: solicitud.body.objetivo4,
                        peso4: solicitud.body.peso4,
                        objetivo5: solicitud.body.objetivo5,
                        peso5: solicitud.body.peso5,
                        objetivo6: solicitud.body.objetivo6,
                        peso6: solicitud.body.peso6
                    };

                    var objetivos = new Objetivos(data);

                    objetivos.save( function(error){
                        if(error){
                            console.log(error);
                        }else{
                            respuesta.redirect("/evaluaciones/puestos/objetivos/"+solicitud.params.idpuesto);
                        };
                    });
                }
            });
        };
    },
    // Método para visualizar los objetivos especificos
    verObjetivos: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
            respuesta.redirect("/sesion-expirada");
        }else{
            Objetivos.findById({"_id": solicitud.params.idobjetivos}, function(error, objetivos){
                if(error){
                    console.log(error);
                }else{
                    Puestos.populate(objetivos, {path: 'puesto'}, function(error, objetivos){
                        if(error){
                            console.log(error);
                        }else{
                            respuesta.render("Evaluaciones/ver_objetivos", {
                                user: solicitud.session.user,
                                objetivos: objetivos
                            });
                        };
                    });
                };
            });
        };
    }
}