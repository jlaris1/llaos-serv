var mongoose = require('mongoose');
    Estanques = mongoose.model('Estanques');
    Modulos = mongoose.model('Modulos');
    TiposModulos = mongoose.model('TiposModulos');
    Parametros = mongoose.model('Parametros');
    chalk = require('chalk');
    Bacteriologias = mongoose.model('Bacteriologias');
    Fitoplancton = mongoose.model('Fitoplancton');
    NutrientesToxDiario = mongoose.model('NutrientesToxDiario');
    NutrientesToxSemanal = mongoose.model('NutrientesToxSemanal');
    Patologicos = mongoose.model('Patologicos');
    Zooplancton = mongoose.model('Zooplancton');

module.exports = {
    all: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{
            Estanques.find( function(error, estanques){
                if(error){
                    console.log(error);
                } else {
                    Modulos.populate(estanques, { path: 'modulo'}, function(error, estanques){
                        if(error){
                            console.log(error);
                        } else {
                            TiposModulos.populate(estanques, { path: 'tipo'}, function(error, estanques){
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            respuesta.render('Administracion/Granja/Estanques/all',
                                                {
                                                    user: solicitud.session.user,
                                                    estanques: estanques,
                                                    titulo: "Piscinas",
                                                    criterios: [
                                                        {
                                                            val: "modulos",
                                                            name: "Módulo"
                                                        },
                                                    ],
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
                                                    usuarios: usuarios,
                                                    ruta: "estanque"
                                                }
                                            );
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
    new: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{
            Modulos.find( function(error, modulos){
                if(error){
                    console.log(error);
                } else {
                    TiposModulos.find( function(error, tiposModulos){
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find( function(error, usuarios){
                                if(error){
                                    console.log(error);
                                } else {
                                    respuesta.render('Administracion/Granja/Estanques/new',
                                        {   
                                            user: solicitud.session.user,
                                            modulos: modulos,
                                            tiposModulos: tiposModulos,
                                            titulo: "Piscinas",
                                            criterios: [
                                                {
                                                    val: "",
                                                    name: ""
                                                },
                                            ],
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
                                            usuarios: usuarios,
                                            ruta: "estanque"
                                        }
                                    );
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    edit: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{
            Estanques.findById({"_id": solicitud.params.id}, function(error, estanque){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Modulos.populate(estanque, {path: 'modulo'}, function(error, estanque){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            TiposModulos.populate(estanque, {path: 'tipo'}, function(error, estanque){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    Modulos.find( function(error, modulos){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            TiposModulos.find( function(error, tiposModulos){
                                                if(error){
                                                    console.log(error);
                                                } else {
                                                    Usuarios.find( function(error, usuarios){
                                                        if(error){
                                                            console.log(error);
                                                        } else {
                                                            respuesta.render('Administracion/Granja/Estanques/edit',
                                                                {   
                                                                    user: solicitud.session.user,
                                                                    modulos: modulos,
                                                                    tiposModulos: tiposModulos,
                                                                    estanque: estanque,
                                                                    titulo: "Piscinas",
                                                                    criterios: [
                                                                        {
                                                                            val: "",
                                                                            name: ""
                                                                        },
                                                                    ],
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
                                                                    usuarios: usuarios,
                                                                    ruta: "estanque"
                                                                }
                                                            );
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
            });
        }
    },
    delete: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{
            Estanques.deleteOne({"_id": solicitud.params.id}, function(error){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    respuesta.redirect('/estanque/all');
                }
            });
        }
    },
    add: function(solicitud, respuesta){
        var locations = JSON.parse(solicitud.body.locations);

        var data = {
            codigo: solicitud.body.code,
            nombre: solicitud.body.name,
            modulo: solicitud.body.module,
            tipo: solicitud.body.type_module,
            pointer_x: solicitud.body.pointer_x,
            pointer_y: solicitud.body.pointer_y,
            marker_x: solicitud.body. marker_x,
            marker_y: solicitud.body.marker_y,
            locations: locations
        }

        console.log(data)

        var estanque = new Estanques(data);

        estanque.save( function(error){
            if(error){
                console.log(error);
            } else {
                respuesta.redirect('/estanque/all')
            }
        });
        

    },
    detail: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{
            Estanques.findById({"_id": solicitud.params.id }, function(error, estanque){
                if(error){
                    console.log(chalk.bgRed(error));
                }else{
                   // console.log(chalk.bgGreen(estanque));

                    Modulos.populate(estanque, { path: 'modulo'}, function(error, estanque){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            TiposModulos.populate(estanque, { path: 'tipo'}, function(error, estanque){
                                if(error){
                                    console.log(chalk.bgRed(error));
                                } else {
                                    var Locations = [];

                                    estanque.locations.forEach(element => {
                                        element.pointer.forEach(p => {
                                            Locations.push([p.x,p.y]);
                                        });
                                    });
                                    
                                    Parametros.find({"estanque": solicitud.params.id},{ 
                                        fecha: 1,
                                        oxigeno: 1,
                                        temperatura: 1, 
                                        ph: 1 ,
                                        tiempo: 1,
                                    }, function(error, ph){
                                        if(error) {
                                            console.log(chalk.bgRed(error));
                                        } else {
                                            var fechas = [];
                                            var data = [];
                                            var oxigeno = [];
                                            var temperatura = [];
                                            var sum_ox = 0;
                                            var sum_ph = 0;
                                            var sum_tm = 0;
                                            var ph_min = 0;
                                            var tm_min = 0;
                                            var ox_min = 0;
                                            var ph_max = 0;
                                            var tm_max = 0;
                                            var ox_max = 0;

                                            ph.forEach(p => {
                                                fechas.push(new Date(p.fecha).getDate()+ '/' + (new Date(p.fecha).getMonth() + 1)+ '/' + new Date(p.fecha).getFullYear() + "-" + p.tiempo)
                                                oxigeno.push(parseFloat(p.oxigeno));
                                                sum_ox += parseFloat(p.oxigeno);
                                                temperatura.push(parseFloat(p.temperatura));
                                                sum_tm += parseFloat(parseFloat(p.temperatura));
                                                if(p.ph > 0){
                                                    data.push(parseFloat(p.ph));
                                                    sum_ph += parseFloat(p.ph);
                                                }
                                            });

                                            var prom_ph = (parseFloat(sum_ph) / parseFloat(data.length)).toFixed(2);
                                            var prom_c = (parseFloat(sum_tm) / parseFloat(temperatura.length)).toFixed(2);
                                            var prom_ox = (parseFloat(sum_ox) / parseFloat(oxigeno.length)).toFixed(2);

                                            ph_min = Math.min.apply(null, data);
                                            tm_min = Math.min.apply(null, temperatura);
                                            ox_min = Math.min.apply(null, oxigeno);
                                            ph_max = Math.max.apply(null, data);
                                            tm_max = Math.max.apply(null, temperatura);
                                            ox_max = Math.max.apply(null, oxigeno);


                                            /*console.log(data);
                                            console.log(ph_min);
                                            console.log(ph_max);*/
 
                                            var fechasP = [];
                                            var listbranquias_necro = [];
                                            var listbranquias_mo = [];
                                            var listbranquias_epic = [];
                                            var listplabial = [];
                                            var listproto_epip = [];
                                            var listintes_grad = [];
                                            var listhepato_I = [];
                                            var listhepato_nhp = [];
                                            var listhepato_vib = [];
                                            var listhepato_IIInhp = [];
                                            var listhepato_IIIvib = [];
                                            var listhepato_IIIbnhp = [];
                                            var listhepato_IIIbvib = [];
                                            var listhepato_IIIcnhp = [];
                                            var listhepato_IIIcvib = [];
                                            var listlip_prom = [];
                                            var listno_org = [];
                                            var listscore_nhp = [];
                                            var listscore_vib = [];
                                            var listtub_afec = [];
                                            var listext_necro = [];
                                            var listext_pig = [];
                                            var listext_flaci = [];
                                            var listur_ur = [];
                                            var listur_uv = [];
                                            var listur_amp = [];
                                            var listpeso_prom = [];
                                            var listtiem_prom = [];
                                            var listtiem_min = [];
                                            var listtiem_max = [];
                                            var listcons_ant = [];
                                            var listcons_musc = [];
                                            
                                            Patologicos.find({"estanque": solicitud.params.id},
                                                { 
                                                    branquias_necro: 1,
                                                    branquias_mo: 1,
                                                    branquias_epic: 1,
                                                    plabial: 1,
                                                    proto_epip: 1,
                                                    intes_grad: 1,
                                                    hepato_I: 1,
                                                    hepato_nhp: 1,
                                                    hepato_vib: 1,
                                                    hepato_IIInhp: 1,
                                                    hepato_IIIvib: 1,
                                                    hepato_IIIbnhp: 1,
                                                    hepato_IIIbvib: 1,
                                                    hepato_IIIcnhp: 1,
                                                    hepato_IIIcvib: 1,
                                                    lip_prom: 1,
                                                    no_org: 1,
                                                    score_nhp: 1,
                                                    score_vib: 1,
                                                    tub_afec: 1,
                                                    ext_necro: 1,
                                                    ext_pig: 1,
                                                    ext_flaci: 1,
                                                    ur_ur: 1,
                                                    ur_uv: 1,
                                                    ur_amp: 1,
                                                    peso_prom: 1,
                                                    tiem_prom: 1,
                                                    tiem_min: 1,
                                                    tiem_max: 1,
                                                    cons_ant: 1,
                                                    cons_musc: 1,
                                                    fecha: 1 
                                                }, function(error, patologicos){
                                                
                                                    if(error) {
                                                        console.log(chalk.bgRed(error));
                                                    } else {
                                                        patologicos.forEach( p=> {
                                                            fechasP.push(new Date(p.fecha).getDate()+ '/' + (new Date(p.fecha).getMonth() + 1)+ '/' + new Date(p.fecha).getFullYear());
                                                            listbranquias_necro.push(p.branquias_necro);
                                                            listbranquias_mo.push(p.branquias_mo);
                                                            listbranquias_epic.push(p.branquias_epic);
                                                            listplabial.push(p.plabial);
                                                            listproto_epip.push(p.proto_epip);
                                                            listintes_grad.push(p.intes_grad);
                                                            listhepato_I.push(p.hepato_I);
                                                            listhepato_nhp.push(p.hepato_nhp);
                                                            listhepato_vib.push(p.hepato_vib);
                                                            listhepato_IIInhp.push(p.hepato_IIInhp);
                                                            listhepato_IIIvib.push(p.hepato_IIIvib);
                                                            listhepato_IIIbnhp.push(p.hepato_IIIbnhp);
                                                            listhepato_IIIbvib.push(p.hepato_IIIbvib);
                                                            listhepato_IIIcnhp.push(p.hepato_IIIcnhp);
                                                            listhepato_IIIcvib.push(p.hepato_IIIcvib);
                                                            listlip_prom.push(p.lip_prom);
                                                            listno_org.push(p.no_org);
                                                            listscore_nhp.push(p.score_nhp);
                                                            listscore_vib.push(p.score_vib);
                                                            listtub_afec.push(p.tub_afec);
                                                            listext_necro.push(p.ext_necro);
                                                            listext_pig.push(p.ext_pig);
                                                            listext_flaci.push(p.ext_flaci);
                                                            listur_ur.push(p.ur_ur);
                                                            listur_uv.push(p.ur_uv);
                                                            listur_amp.push(p.ur_amp);
                                                            listpeso_prom.push(p.peso_prom);
                                                            listtiem_prom.push(p.tiem_prom);
                                                            listtiem_min.push(p.tiem_min);
                                                            listtiem_max.push(p.tiem_max);
                                                            listcons_ant.push(p.cons_ant);
                                                            listcons_musc.push(p.cons_musc);
                                                        })

                                                        Bacteriologias.find({"estanque": solicitud.params.id},{
                                                            agua_ca: 1,
                                                            agua_cv: 1,
                                                            mac_larva_ca: 1,
                                                            mac_larva_cv: 1,
                                                            hepato_ca: 1,
                                                            hepato_cv: 1,
                                                            fecha: 1
                                                        }, function(error, bacteriologia){
                                                            if(error){
                                                                console.log(chalk.bgRed(error));
                                                            } else {
                                                                var listagua_ca = [];
                                                                var listagua_cv = [];
                                                                var listmac_larva_ca = [];
                                                                var listmac_larva_cv = [];
                                                                var listhepato_ca = [];
                                                                var listhepato_cv = [];
                                                                var fechasB = [];

                                                                bacteriologia.forEach(bac => {
                                                                    listagua_ca.push(bac.agua_ca);
                                                                    listagua_cv.push(bac.agua_cv);
                                                                    listmac_larva_ca.push(bac.mac_larva_ca);
                                                                    listmac_larva_cv.push(bac.mac_larva_cv);
                                                                    listhepato_ca.push(bac.hepato_ca);
                                                                    listhepato_cv.push(bac.hepato_cv);
                                                                    fechasB.push(new Date(bac.fecha).getDate()+ '/' + (new Date(bac.fecha).getMonth() + 1)+ '/' + new Date(bac.fecha).getFullYear());
                                                                });

                                                                Fitoplancton.find({"estanque": solicitud.params.id}, {
                                                                    fecha: 1,
                                                                    diatomeas: 1,
                                                                    cianofitas: 1,
                                                                    clorofitas: 1,
                                                                    dinoflagelados: 1,
                                                                    flagelados: 1,
                                                                    total_cel_ml: 1
                                                                }, function(error,fitoplancton){
                                                                    if(error){
                                                                        console.log(chalk.bgRed(error));
                                                                    } else {

                                                                        var fechasF = []
                                                                        var diatomeas = [];
                                                                        var cianofitas = [];
                                                                        var clorofitas = [];
                                                                        var dinoflagelados = [];
                                                                        var flagelados = [];
                                                                        var total_cel_ml = [];

                                                                        fitoplancton.forEach( fito => {
                                                                            diatomeas.push(fito.diatomeas);
                                                                            cianofitas.push(fito.cianofitas);
                                                                            clorofitas.push(fito.clorofitas);
                                                                            dinoflagelados.push(fito.dinoflagelados);
                                                                            flagelados.push(fito.flagelados);
                                                                            total_cel_ml.push(fito.total_cel_ml);
                                                                            fechasF.push(new Date(fito.fecha).getDate()+ '/' + (new Date(fito.fecha).getMonth() + 1)+ '/' + new Date(fito.fecha).getFullYear());
                                                                        });

                                                                        Zooplancton.find({"estanque": solicitud.params.id}, {
                                                                            nauplios: 1,
                                                                            copepodos: 1,
                                                                            rutiferos: 1,
                                                                            poliquetos: 1,
                                                                            otros: 1,
                                                                            total_organismos: 1,
                                                                            fecha: 1,
                                                                        }, function(error, zooplancton){
                                                                            if(error){
                                                                                console.log(chalk.bgRed(error));
                                                                            } else {

                                                                                var nauplios = [];
                                                                                var copepodos = [];
                                                                                var rutiferos = [];
                                                                                var poliquetos = [];
                                                                                var otros = [];
                                                                                var total_organismos = [];
                                                                                var fechasZ = [];

                                                                                zooplancton.forEach( zoo => {
                                                                                    nauplios.push(zoo.nauplios);
                                                                                    copepodos.push(zoo.copepodos);
                                                                                    rutiferos.push(zoo.rutiferos);
                                                                                    poliquetos.push(zoo.poliquetos);
                                                                                    otros.push(zoo.otros);
                                                                                    total_organismos.push(zoo.total_organismos);
                                                                                    fechasZ.push(new Date(zoo.fecha).getDate()+ '/' + (new Date(zoo.fecha).getMonth() + 1)+ '/' + new Date(zoo.fecha).getFullYear());
                                                                                });

                                                                                NutrientesToxDiario.find({"estanque": solicitud.params.id}, {
                                                                                    amonia: 1,
                                                                                    alcalinidad_CaCO3: 1,
                                                                                    alcalinidad_HCO3: 1,
                                                                                    alcalinidad_CO3: 1,
                                                                                    nitrito_N: 1,
                                                                                    nitrito_NO3: 1,
                                                                                    TAN: 1,
                                                                                    fecha: 1
                                                                                }, function(error, nutrientesdiario){
                                                                                    if(error){
                                                                                        console.log(chalk.bgRed(error));
                                                                                    } else {
                                                                                        
                                                                                        var amoniaD = [];
                                                                                        var alcalinidad_CaCO3 = [];
                                                                                        var alcalinidad_HCO3 = [];
                                                                                        var alcalinidad_CO3 = [];
                                                                                        var nitrito_N = [];
                                                                                        var nitrito_NO3 = [];
                                                                                        var TAN = [];
                                                                                        var fechasND = [];

                                                                                        nutrientesdiario.forEach(nuD => {
                                                                                            amoniaD.push(nuD.amonia);
                                                                                            alcalinidad_CaCO3.push(nuD.alcalinidad_CaCO3);
                                                                                            alcalinidad_HCO3.push(nuD.alcalinidad_HCO3);
                                                                                            alcalinidad_CO3.push(nuD.alcalinidad_CO3);
                                                                                            nitrito_N.push(nuD.nitrito_N);
                                                                                            nitrito_NO3.push(nuD.nitrito_NO3);
                                                                                            TAN.push(nuD.TAN);
                                                                                            fechasND.push(new Date(nuD.fecha).getDate()+ '/' + (new Date(nuD.fecha).getMonth() + 1)+ '/' + new Date(nuD.fecha).getFullYear());
                                                                                        });     
                                                                                        
                                                                                        NutrientesToxSemanal.find({"estanque": solicitud.params.id}, {
                                                                                            amonia: 1,
                                                                                            nitrito_N: 1,
                                                                                            nitrito_NO3: 1,
                                                                                            alcalinidad_CaCO3: 1,
                                                                                            alcalinidad_HCO3: 1,
                                                                                            alcalinidad_CO3: 1,
                                                                                            dureza: 1,
                                                                                            dureza_CaCO3: 1,
                                                                                            dureza_Ca: 1,
                                                                                            silice_SiO2: 1,
                                                                                            silice_Si: 1,
                                                                                            nitrato_N: 1,
                                                                                            nitrato_NO3: 1,
                                                                                            fosfato_PO4: 1,
                                                                                            fosfato_P: 1,
                                                                                            potasio: 1,
                                                                                            magnecio_Mg: 1,
                                                                                            magnecio_CaCO3: 1,
                                                                                            balance_Ca: 1,
                                                                                            balance_Mg: 1,
                                                                                            balance_K: 1,
                                                                                            fecha: 1
                                                                                        }, function(error, nutrientessemanal){
                                                                                            if(error){
                                                                                                console.log(chalk.bgRed(error));
                                                                                            } else {
                                                                                                 var amonia = [];                                                                                          
                                                                                                 var nitrito_N = [];
                                                                                                 var nitrito_NO3 = [];
                                                                                                 var alcalinidad_CaCO3 = [];
                                                                                                 var alcalinidad_HCO3 = [];
                                                                                                 var alcalinidad_CO3 = [];
                                                                                                 var dureza = [];
                                                                                                 var dureza_CaCO3 = [];
                                                                                                 var dureza_Ca = [];
                                                                                                 var silice_SiO2 = [];
                                                                                                 var silice_Si = [];
                                                                                                 var nitrato_N = [];
                                                                                                 var nitrato_NO3 = [];
                                                                                                 var fosfato_PO4 = [];
                                                                                                 var fosfato_P = [];
                                                                                                 var potasio = [];
                                                                                                 var magnecio_Mg = [];
                                                                                                 var magnecio_CaCO3 = [];
                                                                                                 var balance_Ca = [];
                                                                                                 var balance_Mg = [];
                                                                                                 var balance_K = [];
                                                                                                 var fechasNS = [];

                                                                                                 nutrientessemanal.forEach( nuS => {
                                                                                                    amonia.push(nuS.amonia);
                                                                                                    nitrito_N.push(nuS.nitrito_N);
                                                                                                    nitrito_NO3.push(nuS.nitrito_NO3);
                                                                                                    alcalinidad_CaCO3.push(nuS.alcalinidad_CaCO3);
                                                                                                    alcalinidad_HCO3.push(nuS.alcalinidad_HCO3);
                                                                                                    alcalinidad_CO3.push(nuS.alcalinidad_CO3);
                                                                                                    dureza.push(nuS.dureza);
                                                                                                    dureza_CaCO3.push(nuS.dureza_CaCO3);
                                                                                                    dureza_Ca.push(nuS.dureza_Ca);
                                                                                                    silice_SiO2.push(nuS.silice_SiO2);
                                                                                                    silice_Si.push(nuS.silice_Si);
                                                                                                    nitrato_N.push(nuS.nitrato_N);
                                                                                                    nitrato_NO3.push(nuS.nitrato_NO3);
                                                                                                    fosfato_PO4.push(nuS.fosfato_PO4);
                                                                                                    fosfato_P.push(nuS.fosfato_P);
                                                                                                    potasio.push(nuS.potasio);
                                                                                                    magnecio_Mg.push(nuS.magnecio_Mg);
                                                                                                    magnecio_CaCO3.push(nuS.magnecio_CaCO3);
                                                                                                    balance_Ca.push(nuS.balance_Ca);
                                                                                                    balance_Mg.push(nuS.balance_Mg);
                                                                                                    balance_K.push(nuS.balance_K);
                                                                                                    fechasNS.push(new Date(nuS.fecha).getDate()+ '/' + (new Date(nuS.fecha).getMonth() + 1)+ '/' + new Date(nuS.fecha).getFullYear());
                                                                                                 });

                                                                                                Usuarios.find( function(error, usuarios){
                                                                                                    if(error){
                                                                                                        console.log(error);
                                                                                                    } else {
                                                                                                        respuesta.render("Administracion/Granja/Estanques/detail",
                                                                                                            {
                                                                                                                ph_min: ph_min,
                                                                                                                tm_min: tm_min,
                                                                                                                ox_min: ox_min,
                                                                                                                ph_max: ph_max,
                                                                                                                tm_max: tm_max,
                                                                                                                ox_max: ox_max,    
                                                                                                                prom_c: prom_c,
                                                                                                                prom_ox: prom_ox,
                                                                                                                prom_ph: prom_ph,
                                                                                                                user: solicitud.session.user,
                                                                                                                estanque: estanque,
                                                                                                                locations: Locations,
                                                                                                                fechas: fechas,
                                                                                                                data: data,
                                                                                                                datosoxigeno: oxigeno,
                                                                                                                datostemperatura: temperatura,
                                                                                                                fechasP : fechasP,
                                                                                                                dataBranquias_necro: listbranquias_necro,
                                                                                                                dataBranquias_mo: listbranquias_mo,
                                                                                                                datosbranquias_epic : listbranquias_epic,
                                                                                                                datosplabial : listplabial,
                                                                                                                datosproto_epip : listproto_epip,
                                                                                                                datosintes_grad : listintes_grad,
                                                                                                                datoshepato_I : listhepato_I,
                                                                                                                datoshepato_nhp : listhepato_nhp,
                                                                                                                datoshepato_vib : listhepato_vib,
                                                                                                                datoshepato_IIInhp : listhepato_IIInhp,
                                                                                                                datoshepato_IIIvib : listhepato_IIIvib,
                                                                                                                datoshepato_IIIbnhp : listhepato_IIIbnhp,
                                                                                                                datoshepato_IIIbvib : listhepato_IIIbvib,
                                                                                                                datoshepato_IIIcnhp : listhepato_IIIcnhp,
                                                                                                                datoshepato_IIIcvib : listhepato_IIIcvib,
                                                                                                                datoslip_prom : listlip_prom,
                                                                                                                datosno_org : listno_org,
                                                                                                                datosscore_nhp : listscore_nhp,
                                                                                                                datosscore_vib : listscore_vib,
                                                                                                                datostub_afec : listtub_afec,
                                                                                                                datosext_necro : listext_necro,
                                                                                                                datosext_pig : listext_pig,
                                                                                                                datosext_flaci : listext_flaci,
                                                                                                                datosur_ur : listur_ur,
                                                                                                                datosur_uv : listur_uv,
                                                                                                                datosur_amp : listur_amp,
                                                                                                                datospeso_prom : listpeso_prom,
                                                                                                                datostiem_prom : listtiem_prom,
                                                                                                                datostiem_min : listtiem_min,
                                                                                                                datostiem_max : listtiem_max,
                                                                                                                datoscons_ant : listcons_ant,
                                                                                                                datoscons_musc : listcons_musc,
                                                                                                                datosagua_ca : listagua_ca,
                                                                                                                datosagua_cv : listagua_cv,
                                                                                                                datosmac_larva_ca : listmac_larva_ca,
                                                                                                                datosmac_larva_cv : listmac_larva_cv,
                                                                                                                datoshepato_ca : listhepato_ca,
                                                                                                                datoshepato_cv : listhepato_cv,
                                                                                                                fechasB : fechasB,
                                                                                                                fechasF : fechasF,
                                                                                                                datosdiatomeas : diatomeas,
                                                                                                                datoscianofitas : cianofitas,
                                                                                                                datosclorofitas : clorofitas,
                                                                                                                datosdinoflagelados : dinoflagelados,
                                                                                                                datosflagelados : flagelados,
                                                                                                                datostotal_cel_ml : total_cel_ml,
                                                                                                                datosnauplios : nauplios,
                                                                                                                datoscopepodos : copepodos,
                                                                                                                datosrutiferos : rutiferos,
                                                                                                                datospoliquetos : poliquetos,
                                                                                                                datosotros : otros,
                                                                                                                datostotal_organismos : total_organismos,
                                                                                                                fechasZ : fechasZ,
                                                                                                                datosamoniaD: amoniaD,
                                                                                                                datosalcalinidad_CaCO3: alcalinidad_CaCO3,
                                                                                                                datosalcalinidad_HCO3: alcalinidad_HCO3,
                                                                                                                datosalcalinidad_CO3: alcalinidad_CO3,
                                                                                                                datosnitrito_N: nitrito_N,
                                                                                                                datosnitrito_NO3: nitrito_NO3,
                                                                                                                datosTAN: TAN,
                                                                                                                fechasND: fechasND,
                                                                                                                datosamonia: amonia,
                                                                                                                datosnitrito_N: nitrito_N,
                                                                                                                datosnitrito_NO3: nitrito_NO3,
                                                                                                                datosalcalinidad_CaCO3: alcalinidad_CaCO3,
                                                                                                                datosalcalinidad_HCO3: alcalinidad_HCO3,
                                                                                                                datosalcalinidad_CO3: alcalinidad_CO3,
                                                                                                                datosdureza: dureza,
                                                                                                                datosdureza_CaCO3: dureza_CaCO3,
                                                                                                                datosdureza_Ca: dureza_Ca,
                                                                                                                datossilice_SiO2: silice_SiO2,
                                                                                                                datossilice_Si: silice_Si,
                                                                                                                datosnitrato_N: nitrato_N,
                                                                                                                datosnitrato_NO3: nitrato_NO3,
                                                                                                                datosfosfato_PO4: fosfato_PO4,
                                                                                                                datosfosfato_P: fosfato_P,
                                                                                                                datospotasio: potasio,
                                                                                                                datosmagnecio_Mg: magnecio_Mg,
                                                                                                                datosmagnecio_CaCO3: magnecio_CaCO3,
                                                                                                                datosbalance_Ca: balance_Ca,
                                                                                                                datosbalance_Mg: balance_Mg,
                                                                                                                datosbalance_K: balance_K,
                                                                                                                fechasNS: fechasNS,
                                                                                                                titulo: "Piscinas",
                                                                                                                criterios: [
                                                                                                                    {
                                                                                                                        val: "",
                                                                                                                        name: ""
                                                                                                                    },
                                                                                                                ],
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
                                                                                                                usuarios: usuarios,
                                                                                                                ruta: "estanque"
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
            })
        }
    },
    update: function(solicitud,respuesta){
        var locations = JSON.parse(solicitud.body.locations);

        var data = {
            codigo: solicitud.body.code,
            nombre: solicitud.body.name,
            modulo: solicitud.body.module,
            tipo: solicitud.body.type_module,
            pointer_x: solicitud.body.pointer_x,
            pointer_y: solicitud.body.pointer_y,
            marker_x: solicitud.body. marker_x,
            marker_y: solicitud.body.marker_y,
            locations: locations
        }

        Estanques.updateOne({"_id": solicitud.params.id}, data, function(error){
            if(error){
                console.log(chalk.bgRed(error));
            } else {
                respuesta.redirect('/estanque/all');
            }
        });
    },
    indicators: (solicitud, respuesta) => {
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
        }else{
            Estanques.find( function(error, estanques){
                if(error){
                    console.log(error);
                } else {
                    Modulos.populate(estanques, { path: 'modulo'}, function(error, estanques){
                        if(error){
                            console.log(error);
                        } else {
                            TiposModulos.populate(estanques, { path: 'tipo'}, function(error, estanques){
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.find( function(error, usuarios){
                                        if(error){
                                            console.log(error);
                                        } else {
                                            var features = [];
                                            var data = {};

                                            estanques.forEach( estanque => {
                                                data= 
                                                    {
                                                        "type":"Feature",
                                                        "id": estanque.id,
                                                        "properties":
                                                            {
                                                                "name": estanque.codigo,
                                                                "density": estanque.oxigeno
                                                            },
                                                        "geometry":
                                                            {
                                                                "type":"Polygon",
                                                                "coordinates":
                                                                    [[
                                                                        [parseFloat(element.locations.pointer[0]), parseFloat(element.locations.pointer[1])],
                                                                        [parseFloat(element.locations.pointer[2]), parseFloat(element.locations.pointer[3])],
                                                                        [parseFloat(element.locations.pointer[4]), parseFloat(element.locations.pointer[5])],
                                                                        [parseFloat(element.locations.pointer[6]), parseFloat(element.locations.pointer[7])],
                                                                        [parseFloat(element.locations.pointer[8]), parseFloat(element.locations.pointer[9])],
                                                                        [parseFloat(element.locations.pointer[10]), parseFloat(element.locations.pointer[11])],
                                                                        [parseFloat(element.locations.pointer[12]), parseFloat(element.locations.pointer[13])],
                                                                        [parseFloat(element.locations.pointer[14]), parseFloat(element.locations.pointer[15])] 
                                                                    ]]
                                                            }
                                                    };
                                                
                                                    features.push(data);
                                            });

                                            var piscinaData = {
                                                "type":"FeatureCollection",
                                                "features": features
                                            };                                          

                                            respuesta.render('Administracion/Granja/Estanques/indicators',
                                                {
                                                    user: solicitud.session.user,
                                                    estanques: estanques,
                                                    piscinaData: piscinaData,
                                                    titulo: "Piscinas",
                                                    criterios: [
                                                        {
                                                            val: "modulos",
                                                            name: "Módulo"
                                                        },
                                                    ],
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
                                                    usuarios: usuarios,
                                                    ruta: "estanque"
                                                }
                                            );
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    }
}