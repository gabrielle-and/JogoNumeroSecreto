let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let historicoChutes = [];

let vozAtiva = localStorage.getItem("vozAtiva") !== "false";

// voz
function falar(texto){

if(!vozAtiva) return;

speechSynthesis.cancel();

let fala = new SpeechSynthesisUtterance(texto);

fala.lang = "pt-BR";
fala.rate = 1.2;

speechSynthesis.speak(fala);
}

// mostrar texto
function exibirTextoNaTela(tag,texto){

let campo = document.querySelector(tag);

campo.innerHTML = texto;

falar(texto);
}

// tentativas
function atualizarTentativas(){

document.getElementById("tentativas").innerHTML =
`Tentativas: ${tentativas}`;

}

// mensagem inicial
function exibirMensagemInicial(){

exibirTextoNaTela("h1","Jogo do número secreto");

exibirTextoNaTela("p","Escolha um número entre 1 e 10");

atualizarTentativas();

}

exibirMensagemInicial();

// verificar chute
function verificarChute(){

let chute = parseInt(document.querySelector("input").value);

if(!chute) return;

historicoChutes.push(chute);

document.getElementById("historico").innerHTML =
`Números digitados: ${historicoChutes.join(", ")}`;

if(chute === numeroSecreto){

exibirTextoNaTela("h1","Acertou!");

let palavraTentativa = tentativas > 1 ? "tentativas":"tentativa";

let mensagem =
`Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

exibirTextoNaTela("p",mensagem);

document.getElementById("reiniciar").removeAttribute("disabled");

}else{

if(chute > numeroSecreto){

exibirTextoNaTela("p","O número secreto é menor");

}else{

exibirTextoNaTela("p","O número secreto é maior");

}

tentativas++;

atualizarTentativas();

limparCampo();

}

}

// gerar número
function gerarNumeroAleatorio(){

let numeroEscolhido = parseInt(Math.random()*numeroLimite+1);

if(listaDeNumerosSorteados.length == numeroLimite){

listaDeNumerosSorteados = [];

}

if(listaDeNumerosSorteados.includes(numeroEscolhido)){

return gerarNumeroAleatorio();

}else{

listaDeNumerosSorteados.push(numeroEscolhido);

return numeroEscolhido;

}

}

// limpar input
function limparCampo(){

let campo = document.querySelector("input");

campo.value = "";

}

// reiniciar jogo
function reiniciarJogo(){

numeroSecreto = gerarNumeroAleatorio();

limparCampo();

tentativas = 1;

historicoChutes = [];

document.getElementById("historico").innerHTML = "";

exibirMensagemInicial();

document.getElementById("reiniciar").setAttribute("disabled",true);

}

// alternar voz
function alternarVoz(){

vozAtiva = !vozAtiva;

localStorage.setItem("vozAtiva",vozAtiva);

let botao = document.getElementById("botaoVoz");

if(vozAtiva){

botao.innerHTML = "🔊 Voz ligada";

}else{

botao.innerHTML = "🔇 Voz desligada";

speechSynthesis.cancel();

}

}

// jogar com ENTER
document.querySelector("input").addEventListener("keypress",function(event){

if(event.key === "Enter"){

verificarChute();

}

});

// atualizar botão ao carregar
window.onload = function(){

let botao = document.getElementById("botaoVoz");

if(!vozAtiva){

botao.innerHTML = "🔇 Voz desligada";

}

}