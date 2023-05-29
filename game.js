const canvas = document.querySelector('#game');
// A continuacion creamos un contexto en dos dimensiones:
const game = canvas.getContext('2d');
let canvasSize;
let elementsSize;

const playerPosition = {
        x: undefined,
        y: undefined
}

// Botones
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

// Eventos windows
window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

// const minX = -68; 
// const maxX = canvasSize-25;
// const minY = 0;
// const maxY = canvasSize;

// Eventos botones

btnUp.addEventListener('click',moveUp);
btnLeft.addEventListener('click',moveLeft);
btnRight.addEventListener('click',moveRight);
btnDown.addEventListener('click',moveDown);

window.addEventListener('keydown',moveByKeys)



function startGame(){
        game.font = elementsSize*0.9 + 'px Verdana';
        game.textAlign = 'start';
    
        const map = maps[0];
        console.log(map);
        const mapRows = map.trim().split('\n');
        const mapRowsCols = mapRows.map(row => row.trim().split(''));
        
        game.clearRect(0,0,canvasSize,canvasSize);

        mapRowsCols.forEach((row,rowIndex) => {
            row.forEach((col,colIndex) => {
                    const emoji = emojis[col];
                    const posX = (elementsSize*colIndex);
                    const posY = (elementsSize*(rowIndex+1));
    
                    if (col == 'O'){
                            if (!playerPosition.x && !playerPosition.y){
                                playerPosition.x = posX;
                                playerPosition.y = posY;
                                console.log(playerPosition);
                            }
                    }
    
                    game.fillText(emoji,posX,posY)
            });
        });
    
        // game.fillText(emojis["PLAYER"], playerPosition.x,playerPosition.y)

        movePlayer();
      
       
    }

// Funcion para crear el canvas y darle el tamaño
function setCanvasSize(){
        if (window.innerHeight > window.innerWidth ) {
                canvasSize = window.innerWidth * 0.8;    
        } else {
                canvasSize = window.innerHeight * 0.8;
        }
        canvas.setAttribute('width',canvasSize)
        canvas.setAttribute('height',canvasSize)
    
        elementsSize = (canvasSize / 10)*0.97;

        //Declaro los máximos y mínimos que pueden tomar las coordenadas X e Y. Y lo hago sin "CONST" ni "LET" para permitirles ser variables globales.
        minX = -1; 
        maxX = canvasSize*0.95;
        minY = 20;
        maxY = canvasSize;

        console.log(canvasSize);
        console.log(elementsSize);
        startGame()
}

// Funciones para movimiento del jugador
function movePlayer(){
        game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
        console.log(playerPosition);
        console.log(elementsSize);
}

function moveUp(){
        playerPosition.y -= elementsSize; 

        if (playerPosition.y < minY) {
                playerPosition.y += elementsSize; 
        } else {
                startGame();
        }
        
}
function moveLeft(){
        playerPosition.x -= elementsSize; 
        if ( playerPosition.x <= minX) {
                playerPosition.x += elementsSize; 
        } else {
                startGame();
        }
}
function moveRight(){
        playerPosition.x += elementsSize; 
        if (playerPosition.x >= (maxX)) {
                playerPosition.x -= elementsSize; 
        } else {
                startGame();
        }
}
function moveDown(){
        playerPosition.y += elementsSize; 
        if (playerPosition.y > maxY) {
                playerPosition.y -= elementsSize; 
        } else {
                startGame();
        }
}

function moveByKeys(event){
        switch (event.key) {
                case "ArrowUp":
                        moveUp()                        
                        break;
                case "ArrowLeft":
                        moveLeft()                        
                        break;
                case "ArrowRight":
                        moveRight()                        
                        break;
                case "ArrowDown":
                        moveDown()
                        break;
                                
                default:
                        console.log("Otra tecla")
                        break;
        }        
}



