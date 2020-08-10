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
    bulletX = canvasHalfWidth,
    bulletY = canvasHeight - 95,
    bulletMomentum = 2;

function drawHeroJet() {
    const image = new Image();
    image.src = "images/rocket.png";
    image.onload = () => {
        ctx.drawImage(image, canvasHalfWidth - 32, canvasHeight - 80)
    }
}

function drawJetBullet() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight - 80);
    ctx.beginPath();
    ctx.arc(bulletX, bulletY, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    bulletY -= bulletMomentum;
}

function drawGameAssets() {
    drawJetBullet();
}

drawHeroJet();
setInterval(drawGameAssets, 10);



