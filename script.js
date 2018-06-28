var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var snakeElementSize = 20;
var gridWidth = canvas.width / snakeElementSize;
var gridHeight = canvas.height / snakeElementSize;
console.log("width:" + gridWidth );
console.log("height:" + gridHeight );
var snake = [{x:3, y:0},{x:2, y:0}, {x:1, y:0}, {x:0, y:0}];
var directionX = 1;
var directionY = 0;
context.fillStyle = "rgba(0,255,0,.5";
context.fillRect(0,0,100,200);

function logPressedKey(event){ 
    if(event.key === "ArrowUp"){
        directionX = 0;
        directionY = -1;
    }
    if(event.key === "ArrowDown"){
        directionX = 0;
        directionY = 1;
    }
    if(event.key === "ArrowLeft"){
        directionY = 0;
        directionX = -1;
    }
    if(event.key === "ArrowRight"){
        directionY = 0;
        directionX = 1;
    }
  }

document.addEventListener("keypress", logPressedKey);


function drawSnake(snake) {
    for(var i = 0; i < snake.length; i++) { //snake.length ilość elementów tablicy
        context.strokeRect(snake[i].x * snakeElementSize, 
        snake[i].y * snakeElementSize, snakeElementSize, snakeElementSize);
    }
}

function updateSnake(snake){
    //zaczynamy od końca, snake.length = 3 (ilość elementów)
    //ostatni element ma indeks 2 (0,1,2) stąd snake.length -1
    //dopóki i > 0, zmniejszamy i o 1 
    for(var i = snake.length-1; i > 0; i--){
        //snake[2].x  == snake[1].x
        //snake[1].x  == snake[0].x
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }
    //na końcu ustawiamy głowę węża w nowej pozycji
    snake[0].x += directionX;
    snake[0].y += directionY;
}

function isInWall(snake){
    if(snake[0].x >= gridWidth ||
       snake[0].y >= gridHeight ||
       snake[0].x < 0 ||
       snake[0].y < 0
    ){
        return true;
    }
    return false;
}

var gameOn = true;

function update(){
    if (gameOn) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake(snake);
    updateSnake(snake);
    gameOn = !isInWall(snake);
    }
}

setInterval(update, 100); 
