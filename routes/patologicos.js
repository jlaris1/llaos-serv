var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    Patologicos = mongoose.model('Patologicos');
    Estanques = mongoose.model('Estanques');
    Modulos = mongoose.model('Modulos');
    TiposModulos = mongoose.model('TiposModulos');

module.exports = {
    all: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Patologicos.find( function(error, analisis){
                if(error){
                    console.log(error);
                } else {
                    Estanques.populate(analisis, {path: 'estanque'}, function(error, analisis){
                        respuesta.render('Laboratorio/Patologicos/all', {
                            user: solicitud.session.user,
                            analisis: analisis
                        });
                    });
                }
            });
        }
    },
    new: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else {
            Modulos.find( function(error, modulos){
                if(error){
                    console.log(error);
                } else {
                    respuesta.render('Laboratorio/Patologicos/new', {
                        user: solicitud.session.user,
                        modulos: modulos,
                        patologico: {
                            branquias_necro: 0,
                            branquias_mo: 0,
                            branquias_epic: 0,
                            plabial: 0,
                            proto_epip: 0,
                            intes_grad: 0,
                            hepato_I: 0,
                            hepato_nhp: 0,
                            hepato_vib: 0,
                            hepato_IIInhp: 0,
                            hepato_IIIvib: 0,
                            hepato_IIIbnhp: 0,
                            hepato_IIIbvib: 0,
                            hepato_IIIcnhp: 0,
                            hepato_IIIcvib: 0,
                            lip_prom: 0,
                            no_org: 0,
                            score_nhp: 0,
                            score_vib: 0,
                            tub_afec: 0,
                            ext_necro: 0,
                            ext_pig: 0,
                            ext_flaci: 0,
                            ur_ur: 0,
                            ur_uv: 0,
                            ur_amp: 0,
                            peso_prom: 0,
                            tiem_prom: 0,
                            tiem_min: 0,
                            tiem_max: 0,
                            cons_ant: 0,
                            cons_musc: 0,
                            fecha: new Date,
                            biologo: ''
                        },
                        estanques: {},
                    });
                }
            });
        }
    },
    add: function(solicitud, respuesta){    
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            var fecha = new Date(solicitud.body.fecha);

            var data = {
                branquias_necro: solicitud.body.branquias_necro,
                branquias_mo: solicitud.body.branquias_mo,
                branquias_epic: solicitud.body.branquias_epic,
                plabial: solicitud.body.plabial,
                proto_epip: solicitud.body.proto_epip,
                intes_grad: solicitud.body.intes_grad,
                hepato_I: solicitud.body.hepato_I,
                hepato_nhp: solicitud.body.hepato_nhp,
                hepato_vib: solicitud.body.hepato_vib,
                hepato_IIInhp: solicitud.body.hepato_IIInhp,
                hepato_IIIvib: solicitud.body.hepato_IIIvib,
                hepato_IIIbnhp: solicitud.body.hepato_IIIbnhp,
                hepato_IIIbvib: solicitud.body.hepato_IIIbvib,
                hepato_IIIcnhp: solicitud.body.hepato_IIIcnhp,
                hepato_IIIcvib: solicitud.body.hepato_IIIcvib,
                lip_prom: solicitud.body.lip_prom,
                no_org: solicitud.body.no_org,
                score_nhp: solicitud.body.score_nhp,
                score_vib: solicitud.body.score_vib,
                tub_afec: solicitud.body.tub_afec,
                ext_necro: solicitud.body.ext_necro,
                ext_pig: solicitud.body.ext_pig,
                ext_flaci: solicitud.body.ext_flaci,
                ur_ur: solicitud.body.ur_ur,
                ur_uv: solicitud.body.ur_uv,
                ur_amp: solicitud.body.ur_amp,
                peso_prom: solicitud.body.peso_prom,
                tiem_prom: solicitud.body.tiem_prom,
                tiem_min: solicitud.body.tiem_min,
                tiem_max: solicitud.body.tiem_max,
                cons_ant: solicitud.body.cons_ant,
                cons_musc: solicitud.body.cons_musc,
                estanque: solicitud.body.estanque,
                fecha: new Date( fecha.getTime() + Math.abs(fecha.getTimezoneOffset()*60000)),
                biologo: solicitud.session.user.nombre
            }

            var patologico = new Patologicos(data);

            patologico.save( function(error){
                if(error){
                    console.log(error);
                } else {
                    respuesta.redirect('/patologicos/all');
                }
            });
        }
    },
    find: function(solicitud, respuesta){
        if (solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		} else { 
            Modulos.find( function(error, modulos){
                if(error){
                    console.log(chalk.bgRed(error));
                } else {
                    Estanques.find({"modulo": solicitud.body.modulo}, function(error, estanques){
                        if(error){
                            console.log(chalk.bgRed(error));
                        } else {
                            respuesta.render('Laboratorio/Patologicos/new', {
                                user: solicitud.session.user,
                                modulos: modulos,
                                modulo: solicitud.body.modulo,
                                patologico: {
                                    branquias_necro: 0,
                                    branquias_mo: 0,
                                    branquias_epic: 0,
                                    plabial: 0,
                                    proto_epip: 0,
                                    intes_grad: 0,
                                    hepato_I: 0,
                                    hepato_nhp: 0,
                                    hepato_vib: 0,
                                    hepato_IIInhp: 0,
                                    hepato_IIIvib: 0,
                                    hepato_IIIbnhp: 0,
                                    hepato_IIIbvib: 0,
                                    hepato_IIIcnhp: 0,
                                    hepato_IIIcvib: 0,
                                    lip_prom: 0,
                                    no_org: 0,
                                    score_nhp: 0,
                                    score_vib: 0,
                                    tub_afec: 0,
                                    ext_necro: 0,
                                    ext_pig: 0,
                                    ext_flaci: 0,
                                    ur_ur: 0,
                                    ur_uv: 0,
                                    ur_amp: 0,
                                    peso_prom: 0,
                                    tiem_prom: 0,
                                    tiem_min: 0,
                                    tiem_max: 0,
                                    cons_ant: 0,
                                    cons_musc: 0,
                                    fecha: new Date,
                                    biologo: ''
                                },
                                estanques: estanques,
                            });
                        }
                    }).sort({ codigo : 1});
                }
            });
        }
    }
}