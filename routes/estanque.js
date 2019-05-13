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
                                    respuesta.render('Administracion/Granja/Estanques/all',
                                        {
                                            user: solicitud.session.user,
                                            estanques: estanques
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
                            respuesta.render('Administracion/Granja/Estanques/new',
                                {   
                                    user: solicitud.session.user,
                                    modulos: modulos,
                                    tiposModulos: tiposModulos
                                }
                            );
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
                                                    respuesta.render('Administracion/Granja/Estanques/edit',
                                                        {   
                                                            user: solicitud.session.user,
                                                            modulos: modulos,
                                                            tiposModulos: tiposModulos,
                                                            estanque: estanque
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
                                    
                                    Parametros.find({"estanque": solicitud.params.id},{ fecha: 1, ph: 1 }, function(error, ph){
                                        if(error) {
                                            console.log(chalk.bgRed(error));
                                        } else {
                                            var fechas = [];
                                            var data = [];

                                            ph.forEach(p => {
                                                fechas.push(new Date(p.fecha).getDate()+ '/' + (new Date(p.fecha).getMonth() + 1)+ '/' + new Date(p.fecha).getFullYear())
                                                data.push(p.ph);
                                            });

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

                                                        respuesta.render("Administracion/Granja/Estanques/detail",
                                                            {
                                                                user: solicitud.session.user,
                                                                estanque: estanque,
                                                                locations: Locations,
                                                                fechas: fechas,
                                                                data: data,
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
                                                                datoscons_musc : listcons_musc
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

        console.log(chalk.bgGreen(data));

        Estanques.updateOne({"_id": solicitud.params.id}, data, function(error){
            if(error){
                console.log(chalk.bgRed(error));
            } else {
                respuesta.redirect('/estanque/all');
            }
        });
    }
}