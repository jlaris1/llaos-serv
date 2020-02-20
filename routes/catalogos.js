var mongoose = require('mongoose');
    Errores = mongoose.model('Errores');
    FechaHora = require('./fechahora');
    CuentasConta = mongoose.model('CuentasConta');
    SubCuentasConta = mongoose.model('SubCuentasConta');
    Areas = mongoose.model('Areas');
    UnidadesNegocio = mongoose.model('UnidadesNegocio');
    Usuarios = mongoose.model('Usuarios');

    module.exports = {
        /************************** AREAS  */
            allAreas: (solicitud, respuesta) => {
                if (solicitud.session.user === undefined){
                    respuesta.redirect("/sesion-expirada");
                } else {
                    Areas.find((error, areas) => {
                        if(error){
                            console.log(error);
                        } else {
                            UnidadesNegocio.populate(areas, {path: 'unidad_negocio'}, (error, areas) => {
                                if(error){
                                    console.log(error);
                                } else {
                                    Usuarios.find((error, usuarios) =>{
                                        if(error){
                                            console.log(error);
                                        } else {
                                            respuesta.render('Administracion/Catalogos/Areas/all', {
                                                user: solicitud.session.user,
                                                titulo: "",
                                                areas: areas,
                                                usuarios: usuarios,
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
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            },
            newAreas: (solicitud, respuesta) => {
                if (solicitud.session.user === undefined){
                    respuesta.redirect("/sesion-expirada");
                } else {
                    UnidadesNegocio.find((error, unidades_negocios) => {
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find((error, usuarios) =>{
                                if(error){
                                    console.log(error);
                                } else {
                                    respuesta.render('Administracion/Catalogos/Areas/new', {
                                        user: solicitud.session.user,
                                        titulo: "",
                                        unidades_negocios: unidades_negocios,
                                        usuarios: usuarios,
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
                                    });
                                }
                            });
                        }
                    });
                }
            },
            editAreas: (solicitud, respuesta) => {
                if (solicitud.session.user === undefined){
                    respuesta.redirect("/sesion-expirada");
                } else {
                    UnidadesNegocio.find((error, unidades_negocios) => {
                        if(error){
                            console.log(error);
                        } else {
                            Usuarios.find((error, usuarios) =>{
                                if(error){
                                    console.log(error);
                                } else {
                                    Areas.find({"_id": solicitud.params.id}, (error, area)=>{
                                        if(error){
                                            console.log(error);
                                        } else {
                                            respuesta.render('Administracion/Catalogos/Areas/edit', {
                                                user: solicitud.session.user,
                                                titulo: "",
                                                area: area,
                                                unidades_negocios: unidades_negocios,
                                                usuarios: usuarios,
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
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            },
            saveAreas: (solicitud, respuesta) => {
                if (solicitud.session.user === undefined){
                    respuesta.redirect("/sesion-expirada");
                } else {
                    var area = Areas(solicitud.body);

                    area.save( (error)=>{
                        if(error){
                            console.log(error);
                        } else {
                            respuesta.json({
                                estatus: 'Guardado'
                            });
                        }
                    });
                }
            },
            updateAreas: (solicitud, respuesta) => {
                if (solicitud.session.user === undefined){
                    respuesta.redirect("/sesion-expirada");
                } else {

                }
            },
            deleteAreas: (solicitud, respuesta) => {
                if (solicitud.session.user === undefined){
                    respuesta.redirect("/sesion-expirada");
                } else {

                } 
            },
        /***************************/
        /************************** CUENTAS  */
            allCuentas: (solicitud, respuesta) => {
                if (solicitud.session.user === undefined){
                    respuesta.redirect("/sesion-expirada");
                } else {

                }
            },
            newCuentas: (solicitud, respuesta) => {
                if (solicitud.session.user === undefined){
                    respuesta.redirect("/sesion-expirada");
                } else {

                }
            },
            editCuentas: (solicitud, respuesta) => {
                if (solicitud.session.user === undefined){
                    respuesta.redirect("/sesion-expirada");
                } else {

                }
            },
            saveCuentas: (solicitud, respuesta) => {
                if (solicitud.session.user === undefined){
                    respuesta.redirect("/sesion-expirada");
                } else {

                }
            },
            updateCuentas: (solicitud, respuesta) => {
                if (solicitud.session.user === undefined){
                    respuesta.redirect("/sesion-expirada");
                } else {

                }
            },
            deleteCuentas: (solicitud, respuesta) => {
                if (solicitud.session.user === undefined){
                    respuesta.redirect("/sesion-expirada");
                } else {

                } 
            },
        /***************************/
        /************************** SUB-CUENTAS  */
        allSubCuentas: (solicitud, respuesta) => {
            if (solicitud.session.user === undefined){
                respuesta.redirect("/sesion-expirada");
            } else {

            }
        },
        newSubCuentas: (solicitud, respuesta) => {
            if (solicitud.session.user === undefined){
                respuesta.redirect("/sesion-expirada");
            } else {

            }
        },
        editSubCuentas: (solicitud, respuesta) => {
            if (solicitud.session.user === undefined){
                respuesta.redirect("/sesion-expirada");
            } else {

            }
        },
        saveSubCuentas: (solicitud, respuesta) => {
            if (solicitud.session.user === undefined){
                respuesta.redirect("/sesion-expirada");
            } else {

            }
        },
        updateSubCuentas: (solicitud, respuesta) => {
            if (solicitud.session.user === undefined){
                respuesta.redirect("/sesion-expirada");
            } else {

            }
        },
        deleteSubCuentas: (solicitud, respuesta) => {
            if (solicitud.session.user === undefined){
                respuesta.redirect("/sesion-expirada");
            } else {

            } 
        }
    /***************************/
    }