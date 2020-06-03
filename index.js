function desativaErros(){
    document.getElementById('ErroBin').style.display = 'none'
    document.getElementById('ErroTamBin+53').style.display = 'none'
    document.getElementById('ErroDecDecimalSemSinal').style.display = 'none'
    document.getElementById('ErroTamDecGrandeDecimalSemSinal').style.display = 'none'
    document.getElementById('ErroTamDecPequenoDecimalSemSinal').style.display = 'none'
    document.getElementById('ErroDecDecimalComSinal').style.display = 'none'
    document.getElementById('ErroTamDecGrandeDecimalComSinal').style.display = 'none'
    document.getElementById('ErroTamDecPequenoDecimalComSinal').style.display = 'none'

}
function verificaBinario(){
    var txt = String(document.getElementById('Binario').value)
    var noBinardigit = false
    var aux = ''
    for (var i=txt.length-1; i>=0; i--){
        if((txt[i]!='0') && (txt[i]!='1')){
            noBinardigit = true
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
function Bin2Dec(id){
        if(id==''){
            desativaErros()
            verificaBinario()
            verificaTamanhoBinario()
        }
        positive = true
        binario = String(document.getElementById('Binario').value)
        decimalSemSinal = 0
        decimalComSinal = 0
        for (var i=0; i<binario.length; i++){
            decimalSemSinal += Number(binario[binario.length-1-i]) * 2**i
        }
        if (binario[0]=='0'){
            decimalComSinal = decimalSemSinal
        }else{
            binarioInvertido = ''
            for (var i=0; i<binario.length; i++){ //inverte o binário
                if(binario[i]=='1'){
                    binarioInvertido += '0'
                }else{
                    binarioInvertido += '1'
                }
            }
            aux = parseInt(binarioInvertido, 2)
            aux +=1
            decimalComSinal = aux*(-1)
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
        if (id==''){
            document.getElementById('DecimalSemSinal').value = decimalSemSinal
            document.getElementById('DecimalComSinal').value = decimalComSinal
        }else{
            if (id=='DecimalComSinal'){
                document.getElementById('DecimalSemSinal').value = decimalSemSinal
            }else{
                if (id=='DecimalSemSinal'){
                    document.getElementById('DecimalComSinal').value = decimalComSinal
                }
            }
        }
}
function verificaDecimal(id){
    var txt = String(document.getElementById(id).value)
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
        document.getElementById(id).value = aux;
        document.getElementById('ErroDec'+id).style.display = 'flex'
    }else{
        document.getElementById('ErroDec'+id).style.display = 'none'
    }
}
function verificaTamanhoDecimal(id){
    if (Number(document.getElementById(id).value)>Number.MAX_SAFE_INTEGER){
        decimal = document.getElementById(id).value
        document.getElementById(id).value = decimal.substring(0,(decimal.length - 1))
        document.getElementById('ErroTamDecGrande'+id).style.display = 'flex'
        verificaTamanhoDecimal()
    }
    if (Number(document.getElementById(id).value)<Number.MIN_SAFE_INTEGER){
        decimal = document.getElementById(id).value
        document.getElementById(id).value = decimal.substring(0,(decimal.length - 1))
        document.getElementById('ErroTamDecPequeno'+id).style.display = 'flex'
        verificaTamanhoDecimal()
    }
}
function Dec2Bin(id){
    desativaErros()
    verificaDecimal(id)
    verificaTamanhoDecimal(id)
    decimal = Number(document.getElementById(id).value)
    if (decimal>=0){
        binario = '0' + decimal.toString(2);
    }else{
        decimal *= -1
        decimal -= 1
        aux = decimal.toString(2);
        aux = '0'*5 + aux
        binario = ''
        for (var i=0; i<aux.length; i++){
            if (aux[i]=='1'){
                binario += '0'
            }else{
                binario += '1'
            }
        }
    }
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
    Bin2Dec(id)
}