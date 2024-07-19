var valor = document.getElementById('valor');
var campoValor = document.getElementById('campoValor');
const balloon = document.getElementById('balloon');
var valorFinal;

var prazo = document.getElementById('prazo');
var campoPrazo = document.getElementById('campoPrazo');

var campoParcelas = document.getElementById('campoParcelas');

var url = window.location;
var urlParams = new URLSearchParams(url.search);
var email = urlParams.get("email");

function voltar() {
    window.location.href = "../inicio/";
}

function proximo() {
    window.location.href = `assets/php/valor.php?email=${email}&valor=${valor.value}&prazo=${prazo.value}`;
}

function mudarValor(){

    valorFinal = valor.value;

    if(valorFinal.length == 5){
        valorFinal = `R$${valor.value[0]}${valor.value[1]}.${valor.value[2]}${valor.value[3]}${valor.value[4]},00`;
    } else{
        valorFinal = `R$${valor.value[0]}${valor.value[1]}${valor.value[2]}.${valor.value[3]}${valor.value[4]}${valor.value[5]},00`;
    }

    campoValor.textContent = valorFinal;
    balloon.textContent = valorFinal;

    if(campoPrazo != "Definir o Prazo"){
        valorParcela = ((valor.value*0.19)+(valor.value*1)) / (prazo.value*1);
        campoParcelas.textContent = `R$${valorParcela.toFixed(2)}`.replace('.',',');
    } else{
        campoParcelas.textContent = "R$0.000,00"
    }
}

function mudarPrazo(){
    if(prazo.value == "Definir o Prazo"){
        campoPrazo.textContent = "Definir o Prazo";
    } else{
        campoPrazo.textContent = prazo.value + " Meses";

        valorParcela = ((valor.value*0.19)+(valor.value*1)) / (prazo.value*1);
        campoParcelas.textContent = `R$${valorParcela.toFixed(2)}`.replace('.',',');
        if(valorParcela.length == 5){

        }
    }


}

balloon.textContent = valor.value;

valor.addEventListener('input', () => {
    const value = valor.value;
    if(value.length == 5){
        balloon.textContent = `R$ ${value[0]}${value[1]}.${value[2]}${value[3]}${value[4]},00`;;

    } else{
        balloon.textContent = `R$ ${value[0]}${value[1]}${value[2]}.${value[3]}${value[4]}${value[5]},00`;
    }
    balloon.textContent = `R$ ${value[0]}${value[1]}.${value[2]}${value[3]}${value[4]},00`;;
    const position = (value / (valor.max - valor.min)) * 100;
    balloon.style.left = `calc(${position}% - 10px)`;
});

function verificarCadastro(){
    if(email == null){
        voltar();
    }
}

valor.addEventListener("input", mudarValor);
prazo.addEventListener("input", mudarPrazo);
window.addEventListener("load", verificarCadastro);
window.addEventListener("load", mudarValor);