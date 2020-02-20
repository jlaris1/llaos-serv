//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url;
    // }).addClass('active').parent().parent().addClass('in').parent();
    var element = $('ul.nav a').filter(function() {
        return this.href == url;
    }).addClass('active').parent();

    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent();
        } else {
            break;
        }
    }
});

$(document).ready( function() {

    reports()

    $('#side-menu').click(function(e){
        var id = e.target.id;
    });

    $('#menuCompras').click( function(){
        if ($('#subMenuCompras').hasClass('hidden')) {
            $('#subMenuCompras').removeClass('hidden');
            $('#spanMenuCompras').removeClass('fa-angle-left');
            $('#spanMenuCompras').addClass('fa-angle-down');
        }else{
            $('#subMenuCompras').addClass('hidden');
            $('#spanMenuCompras').removeClass('fa-angle-down');
            $('#spanMenuCompras').addClass('fa-angle-left');
        }        
    });

    $('#menuOrdenes').click( function(){
        if ($('#subMenuOrdenes').hasClass('hidden')) {
            $('#subMenuOrdenes').removeClass('hidden');
            $('#spanMenuOrdenes').removeClass('fa-angle-left');
            $('#spanMenuOrdenes').addClass('fa-angle-down');
        }else{
            $('#subMenuOrdenes').addClass('hidden');
            $('#spanMenuOrdenes').removeClass('fa-angle-down');
            $('#spanMenuOrdenes').addClass('fa-angle-left');
        }        
    });

    $('#menuProveedores').click( function(){
        if ($('#subMenuProveedores').hasClass('hidden')) {
            $('#subMenuProveedores').removeClass('hidden');
            $('#spanMenuProveedores').removeClass('fa-angle-left');
            $('#spanMenuProveedores').addClass('fa-angle-down');
        }else{
            $('#subMenuProveedores').addClass('hidden');
            $('#spanMenuProveedores').removeClass('fa-angle-down');
            $('#spanMenuProveedores').addClass('fa-angle-left');
        }        
    });

    $('#menuProductos').click( function(){
        if ($('#subMenuProductos').hasClass('hidden')) {
            $('#subMenuProductos').removeClass('hidden');
            $('#spanMenuProductos').removeClass('fa-angle-left');
            $('#spanMenuProductos').addClass('fa-angle-down');
        }else{
            $('#subMenuProductos').addClass('hidden');
            $('#spanMenuProductos').removeClass('fa-angle-down');
            $('#spanMenuProductos').addClass('fa-angle-left');
        }        
    });

    $('#menuRequisiciones').click( function(){
        if ($('#subMenuRequisiciones').hasClass('hidden')) {
            $('#subMenuRequisiciones').removeClass('hidden');
            $('#spanMenuRequisiciones').removeClass('fa-angle-left');
            $('#spanMenuRequisiciones').addClass('fa-angle-down');
        }else{
            $('#subMenuRequisiciones').addClass('hidden');
            $('#spanMenuRequisiciones').removeClass('fa-angle-down');
            $('#spanMenuRequisiciones').addClass('fa-angle-left');
        }        
    });

    $('#menuSistemas').click( function(){
        if ($('#subMenuSistemas').hasClass('hidden')) {
            $('#subMenuSistemas').removeClass('hidden');
            $('#spanMenuSistemas').removeClass('fa-angle-left');
            $('#spanMenuSistemas').addClass('fa-angle-down');
        }else{
            $('#subMenuSistemas').addClass('hidden');
            $('#spanMenuSistemas').removeClass('fa-angle-down');
            $('#spanMenuSistemas').addClass('fa-angle-left');
        }        
    });

    $('#menuUsuarios').click( function(){
        if ($('#subMenuUsuarios').hasClass('hidden')) {
            $('#subMenuUsuarios').removeClass('hidden');
            $('#spanMenuUsuarios').removeClass('fa-angle-left');
            $('#spanMenuUsuarios').addClass('fa-angle-down');
        }else{
            $('#subMenuUsuarios').addClass('hidden');
            $('#spanMenuUsuarios').removeClass('fa-angle-down');
            $('#spanMenuUsuarios').addClass('fa-angle-left');
        }        
    });

    $('#menuProvExt').click( function(){
        if ($('#subMenuProvExt').hasClass('hidden')) {
            $('#subMenuProvExt').removeClass('hidden');
            $('#spanMenuProvExt').removeClass('fa-angle-left');
            $('#spanMenuProvExt').addClass('fa-angle-down');
        }else{
            $('#subMenuProvExt').addClass('hidden');
            $('#spanMenuProvExt').removeClass('fa-angle-down');
            $('#spanMenuProvExt').addClass('fa-angle-left');
        }        
    });

    $('#menuInventarios').click( function(){
        if ($('#subMenuInventarios').hasClass('hidden')) {
            $('#subMenuInventarios').removeClass('hidden');
            $('#spanMenuInvetarios').removeClass('fa-angle-left');
            $('#spanMenuInvetarios').addClass('fa-angle-down');
        }else{
            $('#subMenuInventarios').addClass('hidden');
            $('#spanMenuInvetarios').removeClass('fa-angle-down');
            $('#spanMenuInvetarios').addClass('fa-angle-left');
        }        
    });

    $('#menuGranja').click( function(){
        if ($('#subMenuGranja').hasClass('hidden')) {
            $('#subMenuGranja').removeClass('hidden');
            $('#spanMenuGranja').removeClass('fa-angle-left');
            $('#spanMenuGranja').addClass('fa-angle-down');
        }else{
            $('#subMenuGranja').addClass('hidden');
            $('#spanMenuGranja').removeClass('fa-angle-down');
            $('#spanMenuGranja').addClass('fa-angle-left');
        }        
    });

    $('#menuPlanta').click( function(){
        if ($('#subMenuPlanta').hasClass('hidden')) {
            $('#subMenuPlanta').removeClass('hidden');
            $('#spanMenuPlanta').removeClass('fa-angle-left');
            $('#spanMenuPlanta').addClass('fa-angle-down');
        }else{
            $('#subMenuPlanta').addClass('hidden');
            $('#spanMenuPlanta').removeClass('fa-angle-down');
            $('#spanMenuPlanta').addClass('fa-angle-left');
        }        
    });

    $('#menuOficina').click( function(){
        if ($('#subMenuOficina').hasClass('hidden')) {
            $('#subMenuOficina').removeClass('hidden');
            $('#spanMenuOficina').removeClass('fa-angle-left');
            $('#spanMenuOficina').addClass('fa-angle-down');
        }else{
            $('#subMenuOficina').addClass('hidden');
            $('#spanMenuOficina').removeClass('fa-angle-down');
            $('#spanMenuOficina').addClass('fa-angle-left');
        }        
    });

    $('#menuDesarrollo').click( function(){
        if ($('#subMenuDesarrollo').hasClass('hidden')) {
            $('#subMenuDesarrollo').removeClass('hidden');
            $('#spanMenuDesarrollo').removeClass('fa-angle-left');
            $('#spanMenuDesarrollo').addClass('fa-angle-down');
        }else{
            $('#subMenuDesarrollo').addClass('hidden');
            $('#spanMenuDesarrollo').removeClass('fa-angle-down');
            $('#spanMenuDesarrollo').addClass('fa-angle-left');
        }         
    });

    $('#menuEmpleados').click( function(){
        if ($('#subMenuEmpleados').hasClass('hidden')) {
            $('#subMenuEmpleados').removeClass('hidden');
            $('#spanMenuEmpleados').removeClass('fa-angle-left');
            $('#spanMenuEmpleados').addClass('fa-angle-down');
        }else{
            $('#subMenuEmpleados').addClass('hidden');
            $('#spanMenuEmpleados').removeClass('fa-angle-down');
            $('#spanMenuEmpleados').addClass('fa-angle-left');
        }         
    });

    $('#menuFormatos').click( function(){
        if ($('#subMenuFormatos').hasClass('hidden')) {
            $('#subMenuFormatos').removeClass('hidden');
            $('#spanMenuFormatos').removeClass('fa-angle-left');
            $('#spanMenuFormatos').addClass('fa-angle-down');
        }else{
            $('#subMenuFormatos').addClass('hidden');
            $('#spanMenuFormatos').removeClass('fa-angle-down');
            $('#spanMenuFormatos').addClass('fa-angle-left');
        }         
    });

    $('#menuPuestos').click( function(){
        if ($('#subMenuPuestos').hasClass('hidden')) {
            $('#subMenuPuestos').removeClass('hidden');
            $('#spanMenuPuestos').removeClass('fa-angle-left');
            $('#spanMenuPuestos').addClass('fa-angle-down');
        }else{
            $('#subMenuPuestos').addClass('hidden');
            $('#spanMenuPuestos').removeClass('fa-angle-down');
            $('#spanMenuPuestos').addClass('fa-angle-left');
        }         
    });

    $('#menuAdministracion').click( function(){
        if ($('#subMenuAdministracion').hasClass('hidden')) {
            $('#subMenuAdministracion').removeClass('hidden');
            $('#spanMenuAdministracion').removeClass('fa-angle-left');
            $('#spanMenuAdministracion').addClass('fa-angle-down');
        }else{
            $('#subMenuAdministracion').addClass('hidden');
            $('#spanMenuAdministracion').removeClass('fa-angle-down');
            $('#spanMenuAdministracion').addClass('fa-angle-left');
        }         
    });

    $('#menuAdmPlanta').click( function(){
        if ($('#subMenuAdmPlanta').hasClass('hidden')) {
            $('#subMenuAdmPlanta').removeClass('hidden');
            $('#spanMenuAdmPlanta').removeClass('fa-angle-left');
            $('#spanMenuAdmPlanta').addClass('fa-angle-down');
        }else{
            $('#subMenuAdmPlanta').addClass('hidden');
            $('#spanMenuAdmPlanta').removeClass('fa-angle-down');
            $('#spanMenuAdmPlanta').addClass('fa-angle-left');
        }         
    });

    $('#menuInventarioCam').click( function(){
        if ($('#subMenuInventarioCam').hasClass('hidden')) {
            $('#subMenuInventarioCam').removeClass('hidden');
            $('#spanMenuInventarioCam').removeClass('fa-angle-left');
            $('#spanMenuInventarioCam').addClass('fa-angle-down');
        }else{
            $('#subMenuInventarioCam').addClass('hidden');
            $('#spanMenuInventarioCam').removeClass('fa-angle-down');
            $('#spanMenuInventarioCam').addClass('fa-angle-left');
        }         
    });

    $('#menuTickets').click( function(){
        if ($('#subMenuTickets').hasClass('hidden')) {
            $('#subMenuTickets').removeClass('hidden');
            $('#spanMenuTickets').removeClass('fa-angle-left');
            $('#spanMenuTickets').addClass('fa-angle-down');
        }else{
            $('#subMenuTickets').addClass('hidden');
            $('#spanMenuTickets').removeClass('fa-angle-down');
            $('#spanMenuTickets').addClass('fa-angle-left');
        }         
    });

    $('#menuOrdenesRuta').click( function(){
        if ($('#subMenuOrdenesRuta').hasClass('hidden')) {
            $('#subMenuOrdenesRuta').removeClass('hidden');
            $('#spanMenuOrdenesRuta').removeClass('fa-angle-left');
            $('#spanMenuOrdenesRuta').addClass('fa-angle-down');
        }else{
            $('#subMenuOrdenesRuta').addClass('hidden');
            $('#spanMenuOrdenesRuta').removeClass('fa-angle-down');
            $('#spanMenuOrdenesRuta').addClass('fa-angle-left');
        }         
    });  

    $('#menuTipoCamaron').click( function(){
        if ($('#subMenuTipoCamaron').hasClass('hidden')) {
            $('#subMenuTipoCamaron').removeClass('hidden');
            $('#spanMenuTipoCamaron').removeClass('fa-angle-left');
            $('#spanMenuTipoCamaron').addClass('fa-angle-down');
        }else{
            $('#subMenuTipoCamaron').addClass('hidden');
            $('#spanMenuTipoCamaron').removeClass('fa-angle-down');
            $('#spanMenuTipoCamaron').addClass('fa-angle-left');
        }         
    });
    

    /**
     * LABORATORIO
     */

        $('#menuLaboratorio').click( function(){
            if ($('#subMenuLaboratorio').hasClass('hidden')) {
                $('#subMenuLaboratorio').removeClass('hidden');
                $('#spanMenuLaboratorio').removeClass('fa-angle-left');
                $('#spanMenuLaboratorio').addClass('fa-angle-down');
            }else{
                $('#subMenuLaboratorio').addClass('hidden');
                $('#spanMenuLaboratorio').removeClass('fa-angle-down');
                $('#spanMenuLaboratorio').addClass('fa-angle-left');
            }        
        });
        
        $('#menuZooplancton').click( function(){
            if ($('#subMenuZooplancton').hasClass('hidden')) {
                $('#subMenuZooplancton').removeClass('hidden');
                $('#spanMenuZooplancton').removeClass('fa-angle-left');
                $('#spanMenuZooplancton').addClass('fa-angle-down');
            }else{
                $('#subMenuZooplancton').addClass('hidden');
                $('#spanMenuZooplancton').removeClass('fa-angle-down');
                $('#spanMenuZooplancton').addClass('fa-angle-left');
            }        
        });
        
        $('#menuNutrientesTox').click( function(){
            if ($('#subMenuNutrientesTox').hasClass('hidden')) {
                $('#subMenuNutrientesTox').removeClass('hidden');
                $('#spanMenuNutrientesTox').removeClass('fa-angle-left');
                $('#spanMenuNutrientesTox').addClass('fa-angle-down');
            }else{
                $('#subMenuNutrientesTox').addClass('hidden');
                $('#spanMenuNutrientesTox').removeClass('fa-angle-down');
                $('#spanMenuNutrientesTox').addClass('fa-angle-left');
            }        
        });

        $('#menuNutrientesToxDiario').click( function(){
            if ($('#subMenuNutrientesToxDiario').hasClass('hidden')) {
                $('#subMenuNutrientesToxDiario').removeClass('hidden');
                $('#spanMenuNutrientesToxDiario').removeClass('fa-angle-left');
                $('#spanMenuNutrientesToxDiario').addClass('fa-angle-down');
            }else{
                $('#subMenuNutrientesToxDiario').addClass('hidden');
                $('#spanMenuNutrientesToxDiario').removeClass('fa-angle-down');
                $('#spanMenuNutrientesToxDiario').addClass('fa-angle-left');
            }        
        });

        $('#menuNutrientesToxSemanal').click( function(){
            if ($('#subMenuNutrientesToxSemanal').hasClass('hidden')) {
                $('#subMenuNutrientesToxSemanal').removeClass('hidden');
                $('#spanMenuNutrientesToxSemanal').removeClass('fa-angle-left');
                $('#spanMenuNutrientesToxSemanal').addClass('fa-angle-down');
            }else{
                $('#subMenuNutrientesToxSemanal').addClass('hidden');
                $('#spanMenuNutrientesToxSemanal').removeClass('fa-angle-down');
                $('#spanMenuNutrientesToxSemanal').addClass('fa-angle-left');
            }        
        });

        $('#menuPatologico').click( function(){
            if ($('#subMenuPatologico').hasClass('hidden')) {
                $('#subMenuPatologico').removeClass('hidden');
                $('#spanMenuPatologico').removeClass('fa-angle-left');
                $('#spanMenuPatologico').addClass('fa-angle-down');
            }else{
                $('#subMenuPatologico').addClass('hidden');
                $('#spanMenuPatologico').removeClass('fa-angle-down');
                $('#spanMenuPatologico').addClass('fa-angle-left');
            }        
        });

        $('#menuBacteriologia').click( function(){
            if ($('#subMenuBacteriologia').hasClass('hidden')) {
                $('#subMenuBacteriologia').removeClass('hidden');
                $('#spanMenuBacteriologia').removeClass('fa-angle-left');
                $('#spanMenuBacteriologia').addClass('fa-angle-down');
            }else{
                $('#subMenuBacteriologia').addClass('hidden');
                $('#spanMenuBacteriologia').removeClass('fa-angle-down');
                $('#spanMenuBacteriologia').addClass('fa-angle-left');
            }        
        });

        $('#menuFitoplancton').click( function(){
            if ($('#subMenuFitoplancton').hasClass('hidden')) {
                $('#subMenuFitoplancton').removeClass('hidden');
                $('#spanMenuFitoplancton').removeClass('fa-angle-left');
                $('#spanMenuFitoplancton').addClass('fa-angle-down');
            }else{
                $('#subMenuFitoplancton').addClass('hidden');
                $('#spanMenuFitoplancton').removeClass('fa-angle-down');
                $('#spanMenuFitoplancton').addClass('fa-angle-left');
            }        
        });

        // Administración de Granja
            $('#menuAdmGranja').click( function(){
                if ($('#subMenuAdmGranja').hasClass('hidden')) {
                    $('#subMenuAdmGranja').removeClass('hidden');
                    $('#spanMenuAdmGranja').removeClass('fa-angle-left');
                    $('#spanMenuAdmGranja').addClass('fa-angle-down');
                }else{
                    $('#subMenuAdmGranja').addClass('hidden');
                    $('#spanMenuAdmGranja').removeClass('fa-angle-down');
                    $('#spanMenuAdmGranja').addClass('fa-angle-left');
                }        
            });

            $('#menuEstanques').click( function(){
                if ($('#subMenuEstanques').hasClass('hidden')) {
                    $('#subMenuEstanques').removeClass('hidden');
                    $('#spanMenuEstanques').removeClass('fa-angle-left');
                    $('#spanMenuEstanques').addClass('fa-angle-down');
                }else{
                    $('#subMenuEstanques').addClass('hidden');
                    $('#spanMenuEstanques').removeClass('fa-angle-down');
                    $('#spanMenuEstanques').addClass('fa-angle-left');
                }        
            });

        // Parámetros
            $('#menuParametros').click( function(){
                if ($('#subMenuParametros').hasClass('hidden')) {
                    $('#subMenuParametros').removeClass('hidden');
                    $('#spanMenuParametros').removeClass('fa-angle-left');
                    $('#spanMenuParametros').addClass('fa-angle-down');
                }else{
                    $('#subMenuParametros').addClass('hidden');
                    $('#spanMenuParametros').removeClass('fa-angle-down');
                    $('#spanMenuParametros').addClass('fa-angle-left');
                }        
            });
        
        // Laboratorio de larvas
            $('#menuLaboratorioLarvas').click( function(){
                if ($('#submenuLaboratorioLarvas').hasClass('hidden')) {
                    $('#submenuLaboratorioLarvas').removeClass('hidden');
                    $('#spanmenuLaboratorioLarvas').removeClass('fa-angle-left');
                    $('#spanmenuLaboratorioLarvas').addClass('fa-angle-down');
                }else{
                    $('#submenuLaboratorioLarvas').addClass('hidden');
                    $('#spanmenuLaboratorioLarvas').removeClass('fa-angle-down');
                    $('#spanmenuLaboratorioLarvas').addClass('fa-angle-left');
                }        
            });

        // Nutrición
            $('#menuNutricion').click( function(){
                if ($('#subMenuNutricion').hasClass('hidden')) {
                    $('#subMenuNutricion').removeClass('hidden');
                    $('#spanMenuNutricion').removeClass('fa-angle-left');
                    $('#spanMenuNutricion').addClass('fa-angle-down');
                }else{
                    $('#subMenuNutricion').addClass('hidden');
                    $('#spanMenuNutricion').removeClass('fa-angle-down');
                    $('#spanMenuNutricion').addClass('fa-angle-left');
                }        
            });

        // Unidades
            $('#menuUnidades').click( function(){
                if ($('#subMenuUnidades').hasClass('hidden')) {
                    $('#subMenuUnidades').removeClass('hidden');
                    $('#spanMenuUnidades').removeClass('fa-angle-left');
                    $('#spanMenuUnidades').addClass('fa-angle-down');
                }else{
                    $('#subMenuUnidades').addClass('hidden');
                    $('#spanMenuUnidades').removeClass('fa-angle-down');
                    $('#spanMenuUnidades').addClass('fa-angle-left');
                }        
            });
            
            // Tractores
            $('#menuTractores').click( function(){
                if ($('#subMenuTractores').hasClass('hidden')) {
                    $('#subMenuTractores').removeClass('hidden');
                    $('#spanMenuTractores').removeClass('fa-angle-left');
                    $('#spanMenuTractores').addClass('fa-angle-down');
                }else{
                    $('#subMenuTractores').addClass('hidden');
                    $('#spanMenuTractores').removeClass('fa-angle-down');
                    $('#spanMenuTractores').addClass('fa-angle-left');
                }        
            });

            // Camionetas
            $('#menuCamionetas').click( function(){
                if ($('#subMenuCamionetas').hasClass('hidden')) {
                    $('#subMenuCamionetas').removeClass('hidden');
                    $('#spanMenuCamionetas').removeClass('fa-angle-left');
                    $('#spanMenuCamionetas').addClass('fa-angle-down');
                }else{
                    $('#subMenuCamionetas').addClass('hidden');
                    $('#spanMenuCamionetas').removeClass('fa-angle-down');
                    $('#spanMenuCamionetas').addClass('fa-angle-left');
                }        
            });

            // Servicios
            $('#menuServicios').click( function(){
                if ($('#subMenuServicios').hasClass('hidden')) {
                    $('#subMenuServicios').removeClass('hidden');
                    $('#spanMenuServicios').removeClass('fa-angle-left');
                    $('#spanMenuServicios').addClass('fa-angle-down');
                }else{
                    $('#subMenuServicios').addClass('hidden');
                    $('#spanMenuServicios').removeClass('fa-angle-down');
                    $('#spanMenuServicios').addClass('fa-angle-left');
                }        
            });

            /******************** CATALOGOS */
                $('#menuCatalogos').click( function(){
                    if ($('#subMenuCatalogos').hasClass('hidden')) {
                        $('#subMenuCatalogos').removeClass('hidden');
                        $('#spanMenuCatalogos').removeClass('fa-angle-left');
                        $('#spanMenuCatalogos').addClass('fa-angle-down');
                    }else{
                        $('#subMenuCatalogos').addClass('hidden');
                        $('#spanMenuCatalogos').removeClass('fa-angle-down');
                        $('#spanMenuCatalogos').addClass('fa-angle-left');
                    }        
                });

                /***************** ÁREAS */
                $('#menuAreas').click( function(){
                    if ($('#subMenuAreas').hasClass('hidden')) {
                        $('#subMenuAreas').removeClass('hidden');
                        $('#spanMenuAreas').removeClass('fa-angle-left');
                        $('#spanMenuAreas').addClass('fa-angle-down');
                    }else{
                        $('#subMenuAreas').addClass('hidden');
                        $('#spanMenuAreas').removeClass('fa-angle-down');
                        $('#spanMenuAreas').addClass('fa-angle-left');
                    }        
                });

                /***************** CUENTAS */
                $('#menuCuentas').click( function(){
                    if ($('#subMenuCuentas').hasClass('hidden')) {
                        $('#subMenuCuentas').removeClass('hidden');
                        $('#spanMenuCuentas').removeClass('fa-angle-left');
                        $('#spanMenuCuentas').addClass('fa-angle-down');
                    }else{
                        $('#subMenuCuentas').addClass('hidden');
                        $('#spanMenuCuentas').removeClass('fa-angle-down');
                        $('#spanMenuCuentas').addClass('fa-angle-left');
                    }        
                });

                /***************** CUENTAS */
                $('#menuSubCuentas').click( function(){
                    if ($('#subMenuSubCuentas').hasClass('hidden')) {
                        $('#subMenuSubCuentas').removeClass('hidden');
                        $('#spanmenuSubCuentas').removeClass('fa-angle-left');
                        $('#spanmenuSubCuentas').addClass('fa-angle-down');
                    }else{
                        $('#subMenuSubCuentas').addClass('hidden');
                        $('#spanMenuSubCuentas').removeClass('fa-angle-down');
                        $('#spanMenuSubCuentas').addClass('fa-angle-left');
                    }        
                });


            /*******************************/
});

function obtenerfecha(){
	var fecha = new Date()
	var dia = fecha.getDay();
	var mes = fecha.getMonth();
	var anio = fecha.getFullYear();

	if(dia < 10){
		dia = "0"+dia;
	}

	if(mes < 10){
		mes = "0"+mes;
	}

	$("#fecha").text(dia+"/"+mes+"/"+anio+"    ");
}

function obtenerhora(){
	var tiempo = new Date();
	var horas = tiempo.getHours();
	var minutos = tiempo.getMinutes();
	var segundos = tiempo.getSeconds();
	var dn ="";

	if(horas < 12){
		dn = "a.m.";
	}else{
		dn = "p.m.";
	}

	if(minutos < 10){
		minutos = "0"+minutos;
	}

	if(segundos < 10){
		segundos = "0"+segundos;
	}
		
	$("#hora").text(horas+":"+minutos+":"+segundos+" "+dn+"    ");

	setTimeout('obtenerhora()',1000);
	//console.log("un segundo mas...");
}

function reportePDF(){
    var action = "/"+ $('#ruta').val() +"/report/pdf";

    $('#frmReports').attr('action', action);
    document.frmReports.submit();
}

function reporteXLS(){
    var action = "/"+ $('#ruta').val() +"/report/xls";

    $('#frmReports').attr('action', action);
    document.frmReports.submit();
}

function datosCombo(lista){
    var obj = new Object();
    var arr = lista.split("},");

    $("#combo").append(
        new Option(
            "<< Seleccione >>", 
            "0"
        )
    );

    for(var i = 0; i < arr.length; i ++){
        var aObj = arr[i].replace(/"/g, '').replace(/}]/g,'');
        $("#combo").append(
            new Option(
                aObj.split(",")[0].split(":")[1], 
                aObj.split(",")[0].split(":")[1]
            )
        );
    }
}

function reports(){
    /*** MANEJO DE REPORTES */
    $('#criterio').on('change', function(){
        if (this.value == 'area'){
            $('#piscinas').addClass('hidden');
            $('#areas').removeClass('hidden');
            $('#estatus').addClass('hidden');
            $('#otros').addClass('hidden');
            $('#fechas').addClass('hidden');
            $('#responsables').addClass('hidden');
            $('#solicitantes').addClass('hidden');
            $('#modulos').addClass('hidden');
            $('#fechaInicio').addClass('hidden');
            $('#fechaFin').addClass('hidden');
            $('#inputs').addClass('hidden');
            $('#combos').addClass('hidden');
            $('#charolero').addClass('hidden');
            $('#piscina').attr('required', false);
            $('#estatus').attr('required', false);
            $('#modulo').attr('required', false);
            $('#otro').attr('required', false);
            $('#fecha').attr('required', false);
            $('#area').attr('required', true);
            $('#charoleros').attr('required', false);
            $('#solicitante').attr('required', false);
            $('#responsable').attr('required', false);
            $('#fInicio').attr('required', false);
            $('#fFin').attr('required', false);
            $('#input').attr('required', false);
            $('#combo').attr('required', false);
        } else if (this.value == 'modulo'){
            $('#concentrado').removeClass('hidden');
            $('#areas').addClass('hidden');
            $('#estatus').addClass('hidden');
            $('#otros').addClass('hidden');

            if($('#titulo').val() == "Parámetros") {
                $('#fechaInicio').removeClass('hidden');
                $('#fechaFin').removeClass('hidden');
            } else {
                $('#fechaInicio').addClass('hidden');
                $('#fechaFin').addClass('hidden');
            }
            
            $('#responsables').addClass('hidden');
            $('#solicitantes').addClass('hidden');
            $('#modulos').removeClass('hidden');
            $('#inputs').addClass('hidden');
            $('#combos').addClass('hidden');
            $('#piscinas').addClass('hidden');
            $('#charoleros').addClass('hidden');
            $('#charoleros').attr('required', false);
            $('#piscinas').attr('required', false);
            $('#estatus').attr('required', false);
            $('#modulos').attr('required', true);
            $('#otros').attr('required', false);
            $('#fechas').attr('required', false);
            $('#areas').attr('required', false);
            $('#solicitantes').attr('required', false);
            $('#responsables').attr('required', false);
            $('#fechaInicio').attr('required', false);
            $('#fechaFin').attr('required', false);
            $('#inputs').attr('required', false);
            $('#combos').attr('required', false);
        } else if (this.value == 'estatus'){
            $('#concentrado').addClass('hidden');
            $('#piscinas').addClass('hidden');
            $('#areas').addClass('hidden');
            $('#estatus').removeClass('hidden');
            $('#otros').addClass('hidden');
            $('#fechas').addClass('hidden');
            $('#responsables').addClass('hidden');
            $('#solicitantes').addClass('hidden');
            $('#modulos').addClass('hidden');
            $('#fechaInicio').addClass('hidden');
            $('#fechaFin').addClass('hidden');
            $('#inputs').addClass('hidden');
            $('#combos').addClass('hidden');
            $('#charoleros').addClass('hidden');
            $('#piscinas').attr('required', false);
            $('#estatus').attr('required', true);
            $('#modulo').attr('required', false);
            $('#otro').attr('required', false);
            $('#fechas').attr('required', false);
            $('#area').attr('required', false);
            $('#charoleros').attr('required', false);
            $('#solicitante').attr('required', false);
            $('#responsable').attr('required', false);
            $('#fechaInicio').attr('required', false);
            $('#fechaFin').attr('required', false);
            $('#input').attr('required', false);
            $('#combo').attr('required', false);
        } else if (this.value == 'fecha'){
            $('#concentrado').addClass('hidden');
            $('#piscinas').addClass('hidden');
            $('#areas').addClass('hidden');
            $('#estatus').addClass('hidden');
            $('#otros').addClass('hidden');
            $('#fechas').removeClass('hidden');
            $('#responsables').addClass('hidden');
            $('#solicitantes').addClass('hidden');
            $('#modulos').addClass('hidden');
            $('#fechaInicio').addClass('hidden');
            $('#fechaFin').addClass('hidden');
            $('#inputs').addClass('hidden');
            $('#combos').addClass('hidden');
            $('#charoleros').addClass('hidden');
            $('#piscinas').attr('required', false);
            $('#estatus').attr('required', false);
            $('#modulo').attr('required', false);
            $('#otros').attr('required', false);
            $('#fechas').attr('required', true);
            $('#area').attr('required', false);
            $('#charoleros').attr('required', false);
            $('#solicitante').attr('required', false);
            $('#responsable').attr('required', false);
            $('#fechaInicio').attr('required', false);
            $('#fechaFin').attr('required', false);
            $('#input').attr('required', false);
            $('#combo').attr('required', false);
        } else if (this.value == 'fechas'){                     // FECHAAAAASS!!!
            $('#piscinas').addClass('hidden');
            $('#areas').addClass('hidden');
            $('#estatus').addClass('hidden');
            $('#otros').addClass('hidden');
            $('#fechas').addClass('hidden');
            $('#responsables').addClass('hidden');
            $('#solicitantes').addClass('hidden');
            $('#modulos').addClass('hidden');
            $('#fechaInicio').removeClass('hidden');
            $('#fechaFin').removeClass('hidden');
            $('#inputs').addClass('hidden');
            $('#combos').addClass('hidden');
            $('#charoleros').addClass('hidden');
            $('#piscinas').attr('required', false);
            $('#estatus').attr('required', false);
            $('#modulo').attr('required', false);
            $('#otros').attr('required', false);
            $('#fechas').attr('required', false);
            $('#area').attr('required', false);
            $('#charoleros').attr('required', false);
            $('#solicitante').attr('required', false);
            $('#responsable').attr('required', false);
            $('#fechaInicio').attr('required', true);
            $('#fechaFin').attr('required', true);
            $('#input').attr('required', false);
            $('#combo').attr('required', false);
        } else if (this.value == 'responsable') {
            $('#concentrado').addClass('hidden');
            $('#piscinas').addClass('hidden');
            $('#areas').addClass('hidden');
            $('#estatus').addClass('hidden');
            $('#otros').addClass('hidden');
            $('#fechas').addClass('hidden');
            $('#responsables').removeClass('hidden');
            $('#solicitantes').addClass('hidden');
            $('#modulos').addClass('hidden');
            $('#fechaInicio').addClass('hidden');
            $('#fechaFin').addClass('hidden');
            $('#inputs').addClass('hidden');
            $('#combos').addClass('hidden');
            $('#charoleros').addClass('hidden');
            $('#piscinas').attr('required', false);
            $('#estatus').attr('required', false);
            $('#modulo').attr('required', false);
            $('#otros').attr('required', false);
            $('#fechas').attr('required', false);
            $('#area').attr('required', false);
            $('#charoleros').attr('required', false);
            $('#solicitante').attr('required', false);
            $('#responsable').attr('required', true);
            $('#fechaInicio').attr('required', false);
            $('#fechaFin').attr('required', false);
            $('#input').attr('required', false);
            $('#combo').attr('required', false);
        } else if (this.value == 'solicita') {
            $('#concentrado').addClass('hidden');
            $('#piscinas').addClass('hidden');
            $('#areas').addClass('hidden');
            $('#estatus').addClass('hidden');
            $('#otros').addClass('hidden');
            $('#fechas').addClass('hidden');
            $('#responsables').addClass('hidden');
            $('#solicitantes').removeClass('hidden');
            $('#modulos').addClass('hidden');
            $('#fechaInicio').addClass('hidden');
            $('#fechaFin').addClass('hidden');
            $('#inputs').addClass('hidden');
            $('#combos').addClass('hidden');
            $('#charoleros').addClass('hidden');
            $('#piscinas').attr('required', false);
            $('#estatus').attr('required', false);
            $('#modulo').attr('required', false);
            $('#otros').attr('required', false);
            $('#fechas').attr('required', false);
            $('#area').attr('required', false);
            $('#charoleros').attr('required', false);
            $('#solicitante').attr('required', true);
            $('#responsable').attr('required', false);
            $('#fechaInicio').attr('required', false);
            $('#fechaFin').attr('required', false);
            $('#input').attr('required', false);
            $('#combo').attr('required', false);
        } else if (this.value == 1 || this.value == 2 || this.value == 3 || this.value == 4 || this.value == 7 || this.value == 8 || this.value == 9 || this.value == 10){
            $('#concentrado').addClass('hidden');
            $('#piscinas').addClass('hidden');
            $('#areas').addClass('hidden');
            $('#estatus').addClass('hidden');
            $('#otros').addClass('hidden');
            $('#fechas').addClass('hidden');
            $('#responsables').addClass('hidden');
            $('#solicitantes').addClass('hidden');
            $('#modulos').addClass('hidden');
            $('#fechaInicio').addClass('hidden');
            $('#fechaFin').addClass('hidden');
            $('#inputs').removeClass('hidden');
            $('#combos').addClass('hidden');
            $('#charoleros').addClass('hidden');
            $('#piscinas').attr('required', false);
            $('#estatus').attr('required', false);
            $('#modulo').attr('required', false);
            $('#otro').attr('required', false);
            $('#fechas').attr('required', false);
            $('#area').attr('required', false);
            $('#charoleros').attr('required', false);
            $('#solicitante').attr('required', false);
            $('#responsable').attr('required', false);
            $('#fechaInicio').attr('required', false);
            $('#fechaFin').attr('required', false);
            $('#input').attr('required', true);
            $('#combo').attr('required', false);
            $('#labelInputs').text("| " + $('#criterio option:selected').html());
        } else if (this.value == 5 || this.value == 6){
            $('#concentrado').addClass('hidden');
            $('#piscinas').addClass('hidden');
            $('#areas').addClass('hidden');
            $('#estatus').addClass('hidden');
            $('#otros').addClass('hidden');
            $('#fechas').addClass('hidden');
            $('#responsables').addClass('hidden');
            $('#solicitantes').addClass('hidden');
            $('#modulos').addClass('hidden');
            $('#fechaInicio').addClass('hidden');
            $('#fechaFin').addClass('hidden');
            $('#inputs').addClass('hidden');
            $('#combos').removeClass('hidden');
            $('#charoleros').addClass('hidden');
            $('#piscinas').attr('required', false);
            $('#estatus').attr('required', false);
            $('#modulo').attr('required', false);
            $('#otro').attr('required', false);
            $('#fechas').attr('required', false);
            $('#area').attr('required', false);
            $('#charoleros').attr('required', false);
            $('#solicitante').attr('required', false);
            $('#responsable').attr('required', false);
            $('#fechaInicio').attr('required', false);
            $('#fechaFin').attr('required', false);
            $('#input').attr('required', false);
            $('#combos').attr('required', true);
            $('#labelCombos').text("| " + $('#criterio option:selected').html());
            $('#combo').empty();

            if(this.value == 5){
                datosCombo($('#tallas').text());
            } else {
                datosCombo($('#presentaciones').text());
            }
            
        } else if (this.value == 11 ){
            $('#concentrado').addClass('hidden');
            $('#inputs').addClass('hidden');
            $('#fechas').removeClass('hidden');
            $('#combos').addClass('hidden');
            $('#modulo').addClass('hidden');
            $('#areas').addClass('hidden');
            $('#estatus').addClass('hidden');
            $('#otros').addClass('hidden');
            $('#responsables').addClass('hidden');
            $('#solicitantes').addClass('hidden');
            $('#fechaInicio').addClass('hidden');
            $('#fechaFin').addClass('hidden');
            $('#input').attr('required', false);
            $('#fecha').attr('required', true);
            $('#combo').attr('required', false);
            $('#estatus').attr('required', false);
            $('#modulo').attr('required', true);
            $('#otro').attr('required', false);
            $('#area').attr('required', false);
            $('#solicitante').attr('required', false);
            $('#responsable').attr('required', false);
            $('#fechaInicio').attr('required', false);
            $('#fechaFin').attr('required', false);
        } else if (this.value == 'piscina'){
            $('#concentrado').addClass('hidden');
            $('#piscinas').removeClass('hidden');
            $('#areas').addClass('hidden');
            $('#estatus').addClass('hidden');
            $('#otros').addClass('hidden');
            $('#fechas').addClass('hidden');
            $('#responsables').addClass('hidden');
            $('#solicitantes').addClass('hidden');
            $('#modulos').addClass('hidden');
            $('#fechaInicio').addClass('hidden');
            $('#fechaFin').addClass('hidden');
            $('#inputs').addClass('hidden');
            $('#combos').addClass('hidden');
            $('#charoleros').addClass('hidden');
            $('#piscinas').attr('required', true);
            $('#estatus').attr('required', false);
            $('#modulo').attr('required', false);
            $('#otro').attr('required', false);
            $('#fecha').attr('required', false);
            $('#area').attr('required', false);
            $('#charoleros').attr('required', false);
            $('#solicitante').attr('required', false);
            $('#responsable').attr('required', false);
            $('#fechaInicio').attr('required', false);
            $('#fechaFin').attr('required', false);
            $('#input').attr('required', false);
            $('#combo').attr('required', false);
        } else if (this.value == 'charolero'){
            $('#concentrado').addClass('hidden');
            $('#charoleros').removeClass('hidden');
            $('#areas').addClass('hidden');
            $('#estatus').addClass('hidden');
            $('#otros').addClass('hidden');
            $('#fechas').addClass('hidden');
            $('#responsables').addClass('hidden');
            $('#solicitantes').addClass('hidden');
            $('#modulos').addClass('hidden');
            $('#fechaInicio').addClass('hidden');
            $('#fechaFin').addClass('hidden');
            $('#inputs').addClass('hidden');
            $('#combos').addClass('hidden');
            $('#piscinas').addClass('hidden');
            $('#charoleros').attr('required', true);
            $('#piscinas').attr('required', false);
            $('#estatus').attr('required', false);
            $('#modulo').attr('required', false);
            $('#otro').attr('required', false);
            $('#fecha').attr('required', false);
            $('#area').attr('required', false);
            $('#solicitante').attr('required', false);
            $('#responsable').attr('required', false);
            $('#fechaInicio').attr('required', false);
            $('#fechaFin').attr('required', false);
            $('#input').attr('required', false);
            $('#combo').attr('required', false);
            $('#label_charo').text("| Charolero");
        } else if(this.value == 'parametrista'){
            $('#concentrado').addClass('hidden');
            $('#charoleros').removeClass('hidden');
            $('#areas').addClass('hidden');
            $('#estatus').addClass('hidden');
            $('#otros').addClass('hidden');
            $('#fechas').addClass('hidden');
            $('#responsables').addClass('hidden');
            $('#solicitantes').addClass('hidden');
            $('#modulos').addClass('hidden');
            $('#fechaInicio').addClass('hidden');
            $('#fechaFin').addClass('hidden');
            $('#inputs').addClass('hidden');
            $('#combos').addClass('hidden');
            $('#piscinas').addClass('hidden');
            $('#charoleros').attr('required', true);
            $('#piscinas').attr('required', false);
            $('#estatus').attr('required', false);
            $('#modulo').attr('required', false);
            $('#otro').attr('required', false);
            $('#fecha').attr('required', false);
            $('#area').attr('required', false);
            $('#solicitante').attr('required', false);
            $('#responsable').attr('required', false);
            $('#fechaInicio').attr('required', false);
            $('#fechaFin').attr('required', false);
            $('#input').attr('required', false);
            $('#combo').attr('required', false);
            $('#label_charo').text("| Parametrista");
        }
    });
/********************** */
}

// CERRAR ALERT
function cerrarAlert(){
    $('#alertDiv').addClass('hidden');
}