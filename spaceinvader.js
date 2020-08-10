// @file spaceinvader.js
// @description A simple space invader game using JS
// @license MIT
// @author Deepesh Khanal
let gameCanvas = document.getElementById("spaceInvader"),
    ctx = gameCanvas.getContext("2d"),
    canvasWidth = gameCanvas.width,
    canvasHeight = gameCanvas.height,
    canvasHalfWidth = gameCanvas.width / 2,
    canvasHalfHeight = gameCanvas.height / 2,
    jetX = canvasHalfWidth - 32,
    jetY = canvasHeight - 80,
    bulletX = canvasHalfWidth,
    bulletY = canvasHeight - 95,
    ballRadius = 8,
    bulletMomentum = 2,
    moveRight = false,
    moveLeft = false;

const jetWidth = jetHeight = 64;

function drawHeroJet() {
    if(moveRight){
        jetX += 10;
        if(jetX + jetWidth > canvasWidth){
            jetX = canvasWidth - jetWidth;
        }
    }else if(moveLeft){
        jetX -= 10;
        if(jetX < 0){
            jetX = 0;
        }
    }

    const image = new Image();
    image.src = "images/rocket.png";
    image.onload = () => {
        ctx.drawImage(image, jetX, jetY);
    }
}

function drawJetBullet() {
    ctx.beginPath();
    ctx.arc(bulletX, bulletY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    bulletY -= bulletMomentum;
}

function initializeGame() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawHeroJet();
    drawJetBullet();
    attachKeyboardEvents();
}

function attachKeyboardEvents() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
}

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        moveRight = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        moveLeft = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        moveRight = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        moveLeft = false;
    }
}


setInterval(initializeGame, 10);



