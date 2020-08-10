// @file spaceinvader.js
// @description A simple space invader game using JS
// @license MIT
// @author Deepesh Khanal

var gameCanvas = document.getElementById("spaceInvader");
var ctx = gameCanvas.getContext("2d");

let canvasWidth = gameCanvas.width,
    canvasHeight = gameCanvas.height,
    canvasHalfWidth = gameCanvas.width / 2,
    canvasHalfHeight = gameCanvas.height / 2;

function drawHeroJet() {
    const image = new Image();
    image.src = "images/rocket.png";
    image.onload = () => {
        ctx.drawImage(image, canvasHalfWidth - 32, canvasHeight - 80)
    }
}

function drawJetBullet(){
    ctx.beginPath();
    ctx.arc(canvasHalfWidth, canvasHeight - 95, 8, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawGameAssets(){
    drawHeroJet();
    drawJetBullet();
}

drawGameAssets();

// setInterval(drawGameAssets, 10);



