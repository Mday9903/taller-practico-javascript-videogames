const canvas = document.querySelector('#game');
// A continuacion creamos un contexto en dos dimensiones:
const game = canvas.getContext('2d');

window.addEventListener('load',startGame);

function startGame(){
    // game.fillRect(0,0,100,100);
    // game.clearRect(0,0,100,50)
    game.fillFont = '25px Verdana';
    game.fillStyle = 'purple';
    game.textAlign = 'center';
    game.fillText('Platzi',25,25)


}