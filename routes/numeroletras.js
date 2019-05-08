/*************************************************************/
// NumeroALetras
// The MIT License (MIT)
// 
// Copyright (c) 2015 Luis Alfredo Chee 
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// @author Rodolfo Carmona
// @contributor Jean (jpbadoino@gmail.com)
/*************************************************************/

module.exports = {
    unidades: function(num){
        switch(num)
    {
        case 1: return "UN";
        case 2: return "DOS";
        case 3: return "TRES";
        case 4: return "CUATRO";
        case 5: return "CINCO";
        case 6: return "SEIS";
        case 7: return "SIETE";
        case 8: return "OCHO";
        case 9: return "NUEVE";
    }

    return "";
    },
    decenas: function(num){
        decena = Math.floor(num/10);
        unidad = num - (decena * 10);

    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                default: return "DIECI" + unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return "VEINTE";
                default: return "VEINTI" +unidades(unidad);
            }
        case 3: return decenasY("TREINTA", unidad);
        case 4: return decenasY("CUARENTA", unidad);
        case 5: return decenasY("CINCUENTA", unidad);
        case 6: return decenasY("SESENTA", unidad);
        case 7: return decenasY("SETENTA", unidad);
        case 8: return decenasY("OCHENTA", unidad);
        case 9: return decenasY("NOVENTA", unidad);
        case 0: return unidades(unidad);
    }
    },
    decenasY: function(num){
        if (numUnidades > 0)
        return strSin + " Y " + unidades(numUnidades)

        return strSin;
    },
    centenas: function(num){
        centenas = Math.floor(num / 100);
        decenas = num - (centenas * 100);

        switch(centenas)
        {
            case 1:
                if (decenas > 0)
                    return "CIENTO " + decenas(decenas);
                return "CIEN";
            case 2: return "DOSCIENTOS " + decenas(decenas);
            case 3: return "TRESCIENTOS " + decenas(decenas);
            case 4: return "CUATROCIENTOS " + decenas(decenas);
            case 5: return "QUINIENTOS " + decenas(decenas);
            case 6: return "SEISCIENTOS " + decenas(decenas);
            case 7: return "SETECIENTOS " + decenas(decenas);
            case 8: return "OCHOCIENTOS " + decenas(decenas);
            case 9: return "NOVECIENTOS " + decenas(decenas);
        }

        return decenas(decenas);
    },
    seccion: function(num){
        cientos = Math.floor(num / divisor)
        resto = num - (cientos * divisor)

        letras = "";

        if (cientos > 0)
            if (cientos > 1)
                letras = centenas(cientos) + " " + strPlural;
            else
                letras = strSingular;

        if (resto > 0)
            letras += "";

        return letras;
    },
    miles: function(num){
        divisor = 1000;
        cientos = Math.floor(num / divisor)
        resto = num - (cientos * divisor)

        strMiles = seccion(num, divisor, "UN MIL", "MIL");
        strCentenas = centenas(resto);

        if(strMiles == "")
            return strCentenas;

        return strMiles + " " + strCentenas;
    },
    millones: function(num){
        divisor = 1000000;
        cientos = Math.floor(num / divisor)
        resto = num - (cientos * divisor)

        strMillones = seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
        strMiles = miles(resto);

        if(strMillones == "")
            return strMiles;

        return strMillones + " " + strMiles;
    },
    numeroALetras: function(num){
        var data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: "",
            letrasMonedaPlural: 'PESOS',//"PESOS", 'Dólares', 'Bolívares', 'etcs'
            letrasMonedaSingular: 'PESO', //"PESO", 'Dólar', 'Bolivar', 'etc'
    
            letrasMonedaCentavoPlural: "CENTAVOS",
            letrasMonedaCentavoSingular: "CENTAVO"
        };
    
        /*if (data.centavos > 0) {
            data.letrasCentavos = "CON " + (function (){
                if (data.centavos == 1)
                    return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
                else
                    return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
                })();
        };*/

        var centavos = '';

        if(data.centavos <= 9) {
            centavos = '0' + data.centavos;
        } else {
            centavos = data.centavos;
        }

        if(data.enteros == 0)
            return "CERO " + data.letrasMonedaPlural + " " + centavos + "/100";
        if (data.enteros == 1)
            return millones(data.enteros) + " " + data.letrasMonedaSingular + " " + centavos + "/100";
        else
            return millones(data.enteros) + " " + data.letrasMonedaPlural + " " + centavos + "/100";
        }
}

function unidades(num){

    switch(num)
    {
        case 1: return "UN";
        case 2: return "DOS";
        case 3: return "TRES";
        case 4: return "CUATRO";
        case 5: return "CINCO";
        case 6: return "SEIS";
        case 7: return "SIETE";
        case 8: return "OCHO";
        case 9: return "NUEVE";
    }

    return "";
}//Unidades()

function decenas(num){

    decena = Math.floor(num/10);
    unidad = num - (decena * 10);

    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                default: return "DIECI" + unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return "VEINTE";
                default: return "VEINTI" + unidades(unidad);
            }
        case 3: return decenasY("TREINTA", unidad);
        case 4: return decenasY("CUARENTA", unidad);
        case 5: return decenasY("CINCUENTA", unidad);
        case 6: return decenasY("SESENTA", unidad);
        case 7: return decenasY("SETENTA", unidad);
        case 8: return decenasY("OCHENTA", unidad);
        case 9: return decenasY("NOVENTA", unidad);
        case 0: return unidades(unidad);
    }
}//Unidades()

function decenasY(strSin, numUnidades) {
    if (numUnidades > 0)
    return strSin + " Y " + unidades(numUnidades)

    return strSin;
}//DecenasY()

function centenas(num) {
    cent = Math.floor(num / 100);
    dec = num - (cent * 100);

    switch(cent)
    {
        case 1:
            if (dec > 0)
                return "CIENTO " + decenas(dec);
            return "CIEN";
        case 2: return "DOSCIENTOS " + decenas(dec);
        case 3: return "TRESCIENTOS " + decenas(dec);
        case 4: return "CUATROCIENTOS " + decenas(dec);
        case 5: return "QUINIENTOS " + decenas(dec);
        case 6: return "SEISCIENTOS " + decenas(dec);
        case 7: return "SETECIENTOS " + decenas(dec);
        case 8: return "OCHOCIENTOS " + decenas(dec);
        case 9: return "NOVECIENTOS " + decenas(dec);
    }

    return decenas(dec);
}//Centenas()

function seccion(num, divisor, strSingular, strPlural) {
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    letras = "";

    if (cientos > 0)
        if (cientos > 1)
            letras = centenas(cientos) + " " + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += "";

    return letras;
}//Seccion()

function miles(num) {
    divisor = 1000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMiles = seccion(num, divisor, "UN MIL", "MIL");
    strCentenas = centenas(resto);

    if(strMiles == "")
        return strCentenas;

    return strMiles + " " + strCentenas;
}//Miles()

function millones(num) {
    divisor = 1000000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMillones = seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
    strMiles = miles(resto);

    if(strMillones == "")
        return strMiles;

    return strMillones + " " + strMiles;
}//Millones()

function NumeroALetras(num) {
    var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: 'Córdobas',//"PESOS", 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: 'Córdoba', //"PESO", 'Dólar', 'Bolivar', 'etc'

        letrasMonedaCentavoPlural: "CENTAVOS",
        letrasMonedaCentavoSingular: "CENTAVO"
    };

    /*if (data.centavos > 0) {
        data.letrasCentavos = "CON " + (function (){
            if (data.centavos == 1)
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
            else
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
            })();
    };*/

    var centavos = '';

    if(data.centavos <= 9) {
        centavos = '0' + data.centavos;
    } else {
        centavos = data.centavos;
    }

    if(data.enteros == 0)
        return "CERO " + data.letrasMonedaPlural + " " + centavos + "/100";
    if (data.enteros == 1)
        return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + centavos + "/100";
    else
        return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + centavos + "/100";
}//NumeroALetras()