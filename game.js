// ゲームのキャンバスの設定
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
context.scale(2, 2); // キャンバスの拡大

// スネークの初期位置とサイズ
var snakeSize = 20;
var snake = [
    { x: 100, y: 100 },
    { x: 80, y: 100 },
    { x: 60, y: 100 }
];
var dx = snakeSize;
var dy = 0;

// りんごの初期位置とサイズ
var apple = { x: 200, y: 200 };

// ゲームの状態
var score = 0;
var changingDirection = false;

// キー入力の検知
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var UP_KEY = 38;
    var DOWN_KEY = 40;

    if (changingDirection) return;
    changingDirection = true;

    var keyPressed = event.keyCode;
    var goingUp = dy === -snakeSize;
    var goingDown = dy === snakeSize;
    var goingRight = dx === snakeSize;
    var goingLeft = dx === -snakeSize;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -snakeSize;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -snakeSize;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = snakeSize;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = snakeSize;
    }
}

// 衝突検出
function detectCollision() {
    if (
        snake[0].x >= canvas.width ||
        snake[0].x < 0 ||
        snake[0].y >= canvas.height ||
        snake[0].y < 0
    ) {
        gameOver();
    }

    for (var i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver();
        }
    }

    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        score++;
        generateApple();
        increaseSnakeSize();
    }
}

function gameOver() {
    // ゲームオーバー時の処理
    // ...
}

// スネークの成長
function increaseSnakeSize() {
    var tail = { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y };
    snake.push(tail);
}

// りんごの生成
function generateApple() {
    apple.x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
    apple.y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
}

// 描画
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // りんごの描画
    context.fillStyle = "red";
    context.fillRect(apple.x, apple.y, snakeSize, snakeSize);

    // スコアの表示
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 20);

    // スネークの各パーツの描画
    snake.forEach(drawSnakePart);
}

// ゲームループ
function gameLoop() {
    changingDirection = false;
    detectCollision();
    moveSnake();
    draw();

    if (gameOverCondition) {
        // ゲームオーバー時の処理
        // ...
        return;
    }
    setInterval(gameLoop, 200);
}

// スネークの移動
function moveSnake() {
    var head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

// ゲームの開始
gameLoop();   
