function desativaErros(){
    document.getElementById('ErroBin').style.display = 'none'
    document.getElementById('ErroDec').style.display = 'none'
    document.getElementById('ErroTamDecGrande').style.display = 'none'
    document.getElementById('ErroTamDecPequeno').style.display = 'none'
    document.getElementById('ErroTamBin+53').style.display = 'none'

}
function verificaBinario(){
    var txt = String(document.getElementById('Binario').value)
    var noBinardigit = false
    var aux = ''
    for (var i=txt.length-1; i>=0; i--){
        if((txt[i]!='0') && (txt[i]!='1')){
            if (((txt[i]=='-') || (txt[i]=='+')) && i==0){
                aux = txt[i] + aux
            }else{
                noBinardigit = true
            }
        }else{
            aux = txt[i] + aux
        }
    }
    if(noBinardigit==true){
        document.getElementById('Binario').value = aux
        document.getElementById('ErroBin').style.display = 'flex'
    }else{
        document.getElementById('ErroBin').style.display = 'none'
    }
}
function verificaTamanhoBinario(){
    if(String(document.getElementById('Binario').value).length>53){
        if (String(document.getElementById('Binario').value)[0]=='-' ||
        String(document.getElementById('Binario').value)[0]=='+'){
            document.getElementById('Binario').value = String(document.getElementById('Binario').value).substring(0, 54)
        }else{
            document.getElementById('Binario').value = String(document.getElementById('Binario').value).substring(0, 53)
        }
        document.getElementById('ErroTamBin+53').style.display = 'flex'
    }
}
function Bin2Dec(){
        desativaErros()
        verificaBinario()
        verificaTamanhoBinario()
        positive = true
        binario = String(document.getElementById('Binario').value)
        if(binario[0]=='-'){
            binario = binario.substring(1, binario.length)
            positive = false
        }else{
            if(binario[0]=='-'){
            binario = binario.substring(1, binario.length)
            positive = true
        }
        }
        decimal = 0
        for (var i=0; i<binario.length; i++){
            decimal += Number(binario[binario.length-1-i]) * 2**i
        }
        //decimal = parseInt(binario, 2);
        /*
        cont = 0
        while(binario>0){
            resto = binario % 10
            decimal += resto * 2 ** cont
            binario = Number.parseInt(binario/10)
            cont++
        }
        */
        document.getElementById('Decimal').value = decimal
}
function verificaDecimal(){
    var txt = String(document.getElementById('Decimal').value)
    var noNumberDigit = false
    var aux = ''
    for (var i=0; i<txt.length; i++){
        if((txt[i]!='0') && (txt[i]!='1') && (txt[i]!='2') && (txt[i]!='3')
                && (txt[i]!='4') && (txt[i]!='5') && (txt[i]!='6') && (txt[i]!='7')
                && (txt[i]!='8') && (txt[i]!='9')){
            if (((txt[i]=='-') || (txt[i]=='+')) && i==0){
                aux += txt[i]
            }else{
                noNumberDigit = true
            }
        }else{
            aux += txt[i]
        }
    }
    if(noNumberDigit==true){
        document.getElementById('Decimal').value = aux
        document.getElementById('ErroDec').style.display = 'flex'
    }else{
        document.getElementById('ErroDec').style.display = 'none'
    }
}
function verificaTamanhoDecimal(){
    if (Number(document.getElementById('Decimal').value)>Number.MAX_SAFE_INTEGER){
        decimal = document.getElementById('Decimal').value
        document.getElementById('Decimal').value = decimal.substring(0,(decimal.length - 1))
        document.getElementById('ErroTamDecGrande').style.display = 'flex'
        verificaTamanhoDecimal()
    }
    if (Number(document.getElementById('Decimal').value)<Number.MIN_SAFE_INTEGER){
        decimal = document.getElementById('Decimal').value
        document.getElementById('Decimal').value = decimal.substring(0,(decimal.length - 1))
        document.getElementById('ErroTamDecPequeno').style.display = 'flex'
        verificaTamanhoDecimal()
    }
    
}
function Dec2Bin(){
    desativaErros()
    verificaDecimal()
    verificaTamanhoDecimal()
    decimal = Number(document.getElementById('Decimal').value)
    binario = decimal.toString(2);
    /*
    while (decimal>0){
        binario = String(decimal%2) + binario
        decimal = Number.parseInt(decimal/2)
    }
    if(binario == ""){
        binario = '0'
    }
    */
    document.getElementById('Binario').value = binario
}