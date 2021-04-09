var canvas = document.getElementById("snake");
var context = canvas.getContext("2d");
var box = 32;
var snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
var direction = "right";
var food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBackgorund() {
    context.fillStyle = "#202020";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() {
    for(let i=0; i < snake.length; i++) {
        context.fillStyle = "#1a6327";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
 
function drawFood() {
    context.fillStyle = "#751313";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(e) {
    if(e.keyCode == 38 && direction != "down") direction = "up";
    if(e.keyCode == 37 && direction != "right") direction = "left";
    if(e.keyCode == 40 && direction != "up") direction = "down";
    if(e.keyCode == 39 && direction != "left") direction = "right";
}

function iniciaJogo() {

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {

            var r = confirm("Game Over\n Press \'OK'\ to start a new game");

            if(r == true) {
                window.location.reload();
            } else {
                clearInterval(iniciaJogo);
            }
        }
    }
    
    criarBackgorund();
    criarSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();   
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX, 
        y: snakeY
    }

    snake.unshift(newHead);
}

var jogo = setInterval(iniciaJogo, 100);