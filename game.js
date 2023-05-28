const canvas = document.querySelector('#game');
// A continuacion creamos un contexto en dos dimensiones:
const game = canvas.getContext('2d');
let canvasSize;
let elementsSize;

// Botones
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

// Eventos windows
window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

// Eventos botones

btnUp.addEventListener('click',moveUp);
btnLeft.addEventListener('click',moveLeft);
btnRight.addEventListener('click',moveRight);
btnDown.addEventListener('click',moveDown);

window.addEventListener('keydown',moveByKeys)

let inicialPosX = elementsSize ;
let inicialPosY = elementsSize ;



function moveUp(){
        // let newPosition = inicialPosY + elementsSize;
        inicialPosY = inicialPosY + elementsSize;
        game.fillText(emojis['PLAYER'],inicialPosX,inicialPosY);
        
        console.log("Arriba")
}

function moveLeft(){
        console.log("Izquierda")
}
function moveRight(){
        console.log("Derecha")
}
function moveDown(){
        console.log("Abajo")
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






function startGame(){
    game.font = elementsSize*0.9 + 'px Verdana';
    game.textAlign = 'start';

    const map = maps[1];
    console.log(map);
    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
//     console.log('mapRows',mapRows);
//     console.log('mapRowsCols',mapRowsCols);

    mapRowsCols.forEach((row,rowIndex) => {
        row.forEach((col,colIndex) => {
                const emoji = emojis[col];
                const posX = (elementsSize*colIndex);
                const posY = (elementsSize*(rowIndex+1));

                game.fillText(emoji,posX,posY)
        });
    });

//     for (let row = 1; row <= 10; row++) {
//         for (let col = 1; col <= 10; col++) {
//                 game.fillText(emojis[mapRowsCols[row - 1][col - 1]],(elementsSize * col)+10,(elementsSize * row)); 
//         }
            
//     }
    
    // game.fillRect(0,0,100,100);
    // game.clearRect(0,0,100,50)
    // game.fillFont = '25px Verdana';
    // game.fillStyle = 'purple';
    // game.textAlign = 'center';
    // game.fillText('Platzi',25,25)
}

function setCanvasSize(){
    if (window.innerHeight > window.innerWidth ) {
            canvasSize = window.innerWidth * 0.8;    
    } else {
            canvasSize = window.innerHeight * 0.8;
    }
    canvas.setAttribute('width',canvasSize)
    canvas.setAttribute('height',canvasSize)

    elementsSize = (canvasSize / 10)*0.97;
    console.log(canvasSize);
    console.log(elementsSize);
    startGame()
}