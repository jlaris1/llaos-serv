module.exports = {
    obtenerfecha: function(){
        var fecha = new Date()
        var dia = fecha.getDate();
        var mes = fecha.getMonth()+1;
        var anio = fecha.getFullYear();
    
        if(dia < 10){
            dia = "0"+dia;
        }
    
        if(mes < 10){
            mes = "0"+mes;
        }
    
        return dia+"/"+mes+"/"+anio;
    },
    obtenerhora: function(){
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
    
        if(horas < 10){
            horas = "0"+horas;
        }
    
        if(minutos < 10){
            minutos = "0"+minutos;
        }
    
        if(segundos < 10){
            segundos = "0"+segundos;
        }
            
        return horas+":"+minutos+":"+segundos+" "+dn;
    },
    sumarDias: function(fecha, dias){
        var f = new Date(fecha);
        f.setDate(f.getDate() + dias);

        var dia = f.getDate() + 1;
        var mes = f.getMonth() + 1;
        var anio = f.getFullYear();

        if(dia < 10){
            dia = "0"+dia;
        }
    
        if(mes < 10){
            mes = "0"+mes;
        }
    
        var fCorta = anio + '-' + mes+ '-' + dia;

        return fCorta;
    },
    restarDias: function(fecha, dias){
        var f = new Date(fecha);
        f.setDate(f.getDate() - dias);

        var dia = f.getDate() + 1;
        var mes = f.getMonth() + 1;
        var anio = f.getFullYear();

        if(dia < 10){
            dia = "0"+dia;
        }
    
        if(mes < 10){
            mes = "0"+mes;
        }
    
        var fCorta = anio + '-' + mes+ '-' + dia;

        return fCorta;
    },
    diasResta: function(){
        var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

        var dia =  dias[new Date().getDay()];

        switch(dia) {
            case "Lunes":
                return 7
            case "Martes":
                return 8
            case "Miércoles":
                return 9
            case "Jueves":
                return 10
            case "Viernes":
                return 11
            case "Sábado":
                return 12
            case "Domingo":
                return 13
            default:
                return 0
        }
        
    },
    obtenerFechaMesLetra(){
        var fecha = new Date()
        var dia = fecha.getDate();
        var mes = fecha.getMonth()+1;
        var anio = fecha.getFullYear();
    
        if(dia < 10){
            dia = "0"+dia;
        }

        switch(mes){
            case 1: return dia + " DE ENERO DEL " + anio ;
            case 2: return dia + " DE FEBRERO DEL " + anio ;
            case 3: return dia + " DE MARZO DEL " + anio ;
            case 4: return dia + " DE ABRIL DEL " + anio ;
            case 5: return dia + " DE MAYO DEL " + anio ;
            case 6: return dia + " DE JUNIO DEL " + anio ;
            case 7: return dia + " DE JULIO DEL " + anio ;
            case 8: return dia + " DE AGOSTO DEL " + anio ;
            case 9: return dia + " DE SEPTIEMBRE DEL " + anio ;
            case 10: return dia + " DE OCTUBRE DEL " + anio ;
            case 11: return dia + " DE NOVIEMBRE DEL " + anio ;
            case 12: return dia + " DE DICIEMBRE DEL " + anio ;
        }

        return "";
    },
    obtenerFechaEspecial(fecha){
        var dia = fecha.split("-")[2];
        var mes = fecha.split("-")[1];
        var anio = fecha.split("-")[0];

        switch(mes){
            case '01': return dia + " DE ENERO DEL " + anio ;
            case '02': return dia + " DE FEBRERO DEL " + anio ;
            case '03': return dia + " DE MARZO DEL " + anio ;
            case '04': return dia + " DE ABRIL DEL " + anio ;
            case '05': return dia + " DE MAYO DEL " + anio ;
            case '06': return dia + " DE JUNIO DEL " + anio ;
            case '07': return dia + " DE JULIO DEL " + anio ;
            case '08': return dia + " DE AGOSTO DEL " + anio ;
            case '09': return dia + " DE SEPTIEMBRE DEL " + anio ;
            case '10': return dia + " DE OCTUBRE DEL " + anio ;
            case '11': return dia + " DE NOVIEMBRE DEL " + anio ;
            case '12': return dia + " DE DICIEMBRE DEL " + anio ;
        }

        return "";
    },
    obtenerFechaDesdeDate(fecha){
        var dia = fecha.getDate();
        var mes = fecha.getMonth()+1;
        var anio = fecha.getFullYear();
    
        if(dia < 10){
            dia = "0"+dia;
        }
    
        if(mes < 10){
            mes = "0"+mes;
        }
    
        return dia+"/"+mes+"/"+anio;
    }
}