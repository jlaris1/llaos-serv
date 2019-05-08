module.exports = {
    FormatMoney: function(bol, valor){
        var total = 0;

        if (bol) {
            total += valor;
        } else {
            total-=valor;
        }
        
        var entero = '';
        
        Entero_Decimal = total.toString().split('.');
        
        cadena = Entero_Decimal[0].split('').reverse().join('');
        
        for (var z = cadena.length; z >=0; z--) {
            numero = cadena.charAt(z)
            
            if ((cadena.length >= 4 && z ==3 ) || (cadena.length >= 7 && z ==6 ) || (cadena.length >= 10 && z == 9 ) || (cadena.length >= 13 && z ==12 ) || (cadena.length >= 16 && z ==15 )) {
                numero +=  ",";
            }

            entero += numero;
        }
        
        if(Entero_Decimal[1]) {
            if(Entero_Decimal[1].length == 1){
                decimales = '.'+ Entero_Decimal[1]+'0';
            } else {
                decimales = '.'+ Entero_Decimal[1];
            }
            
        } else {
            decimales='.00';
        }
        
        return "$ " + entero + decimales;
    }
}