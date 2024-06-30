let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH']
let palabra = fetch('https://random-word-api.herokuapp.com/word?length=5&lang=es')
 	.then(response => response.json())
 	.then(response => {
         console.log(response)
         palabra = response[0].toUpperCase()
     })
 	.catch(err => console.error(err));

function init(){
    console.log('Esto se ejecuta solo cuando se carga la pagina web')
}

window.addEventListener('load', init);
const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const valor = input.value;

function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje){
    input.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function intentar(){
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    const INTENTO = leerIntento();
    if (INTENTO === palabra){
        terminar("<h1>GANASTE!😀</h1>")
        return
    }
    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if(INTENTO[i] === palabra[i]){
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#79b851";
        }
        else if(palabra.includes(INTENTO[i])){
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#f3c237";
        }
        else{
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#a4aec4";
        }
        ROW.appendChild(SPAN)
    }
    intentos--
    if (intentos==0){
        terminar("<h1>PERDISTE!😖</h1>")
    }
    GRID.appendChild(ROW)
}

button.addEventListener("click", intentar);


/* creacion de algoritmo para el wordle:
Obtener datos de un usuario
P = APPLE
I = ANGEL
Si P = I entonces ganaste la partida
    si no restar un intento y verificar si te quedan intentos, sino te quedan intentos desactivamos el input y el botón.
        entonces corroborar si P0 = I0
            si se cumple esto colocar la letra I0 color verde, sino ver si I0 está en algún lugar de P
                si esto se cumple colocar de color amarillo I0, sino colocar de color gris y pasar a la siguiente letra
        entonces corroborar si P1 = I1
            si se cumple esto colocar la letra I1 color verde, sino ver si I1 está en algún lugar de P
                si esto se cumple colocar de color amarillo I1, sino colocar de color gris y pasar a la siguiente letra
        entonces corroborar si P2 = I2
            si se cumple esto colocar la letra I2 color verde, sino ver si I2 está en algún lugar de P
                si esto se cumple colocar de color amarillo I2, sino colocar de color gris y pasar a la siguiente letra
        entonces corroborar si P3 = I3
            si se cumple esto colocar la letra I3 color verde, sino ver si I3 está en algún lugar de P
                si esto se cumple colocar de color amarillo I3, sino colocar de color gris y pasar a la siguiente letra
        entonces corroborar si P4 = I4
            si se cumple esto colocar la letra I4 color verde, sino ver si I4 está en algún lugar de P
                si esto se cumple colocar de color amarillo I4, sino colocar de color gris.
            
*/
