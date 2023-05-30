const canvas = document.querySelector('#game');
// A continuacion creamos un contexto en dos dimensiones:
const game = canvas.getContext('2d');
let canvasSize;
let elementsSize;
let level = 0;

let playerPosition = {
        x: undefined,
        y: undefined
}

const gifPosition = {
        x: undefined,
        y: undefined
}
let enemyPositions = [];

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

        
        startGame()
}


function startGame(){
        game.font = elementsSize*0.9 + 'px Verdana';
        game.textAlign = 'start';
    
        const map = maps[level];
        console.log(map);

        if (!map){
                gameWin();
                return
        }
        const mapRows = map.trim().split('\n');
        const mapRowsCols = mapRows.map(row => row.trim().split(''));

        enemyPositions = [];    
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
                                console.log('playerPosition',playerPosition);
                            }
                    } else if (col == 'I'){
                        gifPosition.x = posX;
                        gifPosition.y = posY;
                        console.log('gifPosition',gifPosition);
                    } else if (col == 'X'){
                        //Vamos a crear un array con las ubicaciones de cada bomba:
                        enemyPositions.push({
                                x: posX,
                                y: posY
                        });
                    }
    
                    game.fillText(emoji,posX,posY)
            });
        });
        console.log(enemyPositions);
        movePlayer();       
    }


// Funciones para movimiento del jugador
function movePlayer(){

        // Verificamos si el jugador colisiona con el regalo
        const giftCollisionX = Math.round(gifPosition.x) == Math.round(playerPosition.x);
        const giftCollisionY = Math.round(gifPosition.y) == Math.round(playerPosition.y);
        const giftCollision = giftCollisionX && giftCollisionY;
        
        console.log('playerPosition movePlayer',playerPosition);
        console.log('elementsSize',elementsSize);
        console.log('canvasSize',canvasSize);

         // Verificamos si el jugador colisiona con una bomba
        const enemyCollision = enemyPositions.find(enemy => {
                const enemyCollisionX = Math.round(enemy.x) == Math.round(playerPosition.x);
                const enemyCollisionY = Math.round(enemy.y) == Math.round(playerPosition.y);
                return Math.round(enemyCollisionX) && Math.round(enemyCollisionY);
        })
        
        //Evaluamos si existió una colisión con alguno de los obstáculos:
        if (giftCollision){
                levelWin();
        } else if (enemyCollision) {
                levelLose();
        } else {
                game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
        }

}
//Creamos la función para el caso de que el jugador gane el nivel llegando al regalo:
function levelWin(){
        console.log('Ganaste');
        game.fillText(emojis['WIN'],playerPosition.x,playerPosition.y);
        level++;
        startGame();
}

//Creamos la función para el caso de que el jugador pierda al colisionar con una bomba:

function levelLose(){
        console.log('Choaca');
        game.fillText(emojis['BOMB_COLLISION'],playerPosition.x,playerPosition.y);
        // playerPosition.x = undefined;
        // playerPosition.y = undefined;
        // startGame();
}

//Creamos la función para el caso de que el jugador gane el juego (termine todos los niveles):
function gameWin(){
        console.log('Terminaste el juego!')
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



