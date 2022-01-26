//Transformando em variáveis os conteudos do html.

const display1El = document.querySelector(".display-1");//display01 Elemento
const display2El = document.querySelector(".display-2");
const tempResEl = document.querySelector(".temp-result"); //resultado temporario

const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");  //EL = element
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entety-clear");


let dis1Num = "";
let dis2Num = "";
let result = null;           //Variáveis globais
let lastOperation = "";
let haveDot = false
let resultClick = false


numbersEl.forEach(number => {

    number.addEventListener("click", (e) => {
            if (resultClick) {
                console.log('reset'); //limpando calculadora se começar outra conta.
                display1El.innerHTML = dis1Num;
                display2El.innerText = "";
                dis2Num = "";
                tempResEl.innerHTML = result;
                resultClick = false;   //Deixa o result click falso novamente para calculadora nao dar pau

            }
            if (e.target.innerText === "." && !haveDot) { //Conferindo se já tem ponto no nosso número
                haveDot = true;
            } else if (e.target.innerText === "." && haveDot) {
                return;
            }
            if (dis2Num.length < 8) {                   //Limita a quantidade de caracteres que pode ser digitados por vez.

                dis2Num += e.target.innerText;          //Deixa colocar mais de um elemento, nao substituindo.

                display2El.innerText = dis2Num;         //showing
            }
        }
    )
});


operationEl.forEach(operation => {
    operation.addEventListener("click", (e) => {
        if (!dis2Num) return;       //Verifica se já foi adicionado um numero antes de adicionar um operador, se nao, retorna.
        haveDot = false;             //permite adicionar outro ponto no segundo número
        const operationName = e.target.innerText;       // mostra os sinais de operação na tela
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation();

        } else {
            result = parseFloat(dis2Num); // tranformando o meu display em float, ao inves de string.


        }
        clearVar(operationName);
        lastOperation = operationName;

    })
})

function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " ";  //move o valor do display 2 pra o 1
    display1El.innerHTML = dis1Num;   //mostra o valor que foi movido no display 1
    display2El.innerText = "";
    dis2Num = "";
    tempResEl.innerHTML = result;  //mostra o resultado parcial.

}

function mathOperation() {
    if (lastOperation === "x") {
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === "+") {
        console.log("teste")
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === "÷") {
        result = parseFloat(result) / parseFloat(dis2Num);
    } else if (lastOperation === "√") {
        result = Math.sqrt(dis2Num);
    } else if (lastOperation === "%") {
        result = parseFloat(result) * parseFloat(dis2Num) / 100;
        console.log(result)
    }

}

equalEl.addEventListener("click", (e) => {
    if (!dis1Num || !dis2Num) return;
    haveDot = false; //Permite que adicione um novo ponto
    mathOperation(); //faz o calculo quando clica no equal
    clearVar(); //atualiza meu dislay
    display2El.innerText = result;
    dis2Num = result;
    tempResEl.innerHTML = "";
    dis1Num = "";

    console.log("test  equal")
    console.log(resultClick)
    resultClick = true;  //após o =, se eu adicionar um numero ele vai começar uma nova conta.


});

clearAllEl.addEventListener("click", (e) => {
    display1El.innerHTML = "0";
    display2El.innerText = "0";
    dis1Num = "";
    dis2Num = "";
    result = "";
    tempResEl.innerHTML = "0";

})


clearLastEl.addEventListener("click", (e) => {
    display2El.innerText = "";
    dis2Num = "";

});

window.addEventListener("keydown", (e) => {
    console.log("teste");
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."

    ) {
        clickButtonEl(e.key);

    } else if (
        e.key === "+" ||
        e.key === "-" ||
        e.key === "%"

    ) {

        clickOperation(e.key);

    } else if (e.key === "*") {
        clickOperation("x");
    } else if (e.key === "/") {
        clickOperation("÷");
    } else if (e.key === "Enter" || e.key === "=") {
        clickEqual();
    }

})

function clickButtonEl(key) {
    numbersEl.forEach(button => {
        if (button.innerHTML == key) {  //verifica se temos a tecla pressionada na calculadora
            button.click(); //Se sim, clique.
        }

    })
}

function clickOperation(key) {
    resultClick = false; //Se após o igual eu clicar uma operação, ele continua o calculo normalmente

    operationEl.forEach(button => {
        if (button.innerHTML === key) {
            button.click();       //verifica se temos a operação clicada na calculadora, se sim. click.

        }
    })

}

function clickEqual() {
    equalEl.click()

}


