var url = window.location;
var urlParams = new URLSearchParams(url.search);
var email = urlParams.get("email");
var valor = urlParams.get("valor");
var prazo = urlParams.get("prazo");
var parcelas = urlParams.get("parcelas");
parcelas = parcelas*1;

var cpf = document.getElementById("cpf");

var campoValor = document.getElementById("campoValor");
var campoPrazo = document.getElementById("campoPrazo");
var campoParcelas = document.getElementById("campoParcelas");

function voltar() {
    window.location.href = "../valor/"
}

document.getElementById('switch').addEventListener("click", function () {
    var checkbox = document.getElementsByClassName('check')[1]
    
    checkbox.checked = !checkbox.checked;
});

function validaCpfCnpj(cpf) {
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;
    
    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
}

function validaCpfCnpj() {
    const input = document.getElementById("cpf");
    let msg = document.getElementById('mensagem');
    const valor = input.value + 1;
    let mensagem = "";

    if (valor.length === 11) {
        if (validarCPF(valor)) {
            mensagem = "CPF válido.";
        } else {
            mensagem = "CPF inválido.";
        }
    } else if (valor.length === 14) {
        if (validarCNPJ(valor)) {
            mensagem = "CNPJ válido.";
        } else {
            mensagem = "CNPJ inválido.";
        }
    } else {
        mensagem = "CPF/CNPJ inválido.";
    }

    msg.textContent = mensagem;
}

function validarCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

function verificarCadastro(){
    if(email == null || prazo == null || valor == null){
        voltar();
    }
}

function atualizarValores(){
    campoParcelas.textContent = `R$${parcelas.toFixed(2)}`.replace('.',',');
    campoPrazo.textContent = `${prazo} meses`;

    if(valor.length == 5){
        campoValor.textContent = `R$${valor[0]}${valor[1]}.${valor[2]}${valor[3]}${valor[4]},00`;
    } else{
        campoValor.textContent = `R$${valor[0]}${valor[1]}${valor[2]}.${valor[3]}${valor[4]}${valor[5]},00`;
    }
}

function enviar(){
    document.location.href = `assets/php/enviar.php?email=${email}&cpf=${cpf.value}`;
}

window.addEventListener("load", verificarCadastro)
window.addEventListener("load", atualizarValores)