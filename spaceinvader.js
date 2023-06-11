
/**
 * spaceinvader.js
 * A Simple space invader game suing js
 * 2020-08-12 - version 1.0.0
 * https://github.com/gorkhali125/space-invader/blob/master/spaceinvader.js
 * 
 * Copyright 2020 Deepesh khanal
 * Release under MIT License
 * https://opensource.org/licenses/MIT
 */

(function () {
    window.SI;

    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestionAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
    })();


    window.SpaceInvader = function (targetId, width, height) {
        SI = this;
        SI.setConfiguration(targetId, width, height);
        SI.createCanvas();
        SI.addBackground();
        SI.createJet();
        SI.listenEvents();
    };

    SpaceInvader.prototype.FireBullet = function (x, y, radius, color, moveSteps, bulletKey) {

        var radiant = Math.PI / 180;

        this.updatePostion = function () {
            SI.context.beginPath();
            SI.context.fillStyle = color;
            SI.context.arc(x, y, radius, 0, 360 * radiant, false);
            SI.context.fill();
            y -= moveSteps;

            if (y < 0) {
                delete SI.bulletList[bulletKey];
                if (Object.keys(SI.bulletList).length == 0) {
                    SI.prevBullet = null;
                }
            }
        }

        this.getPosition = function () {
            return y;
        }
    };


    SpaceInvader.prototype.refreshCanvasBullets = function () {
        var bulletsKeys = Object.keys(SI.bulletList);
        for (var i = 0; i < bulletsKeys.length; i++) {
            var key = bulletsKeys[i];
            var bulletInstance = SI.bulletList[key];
            bulletInstance.updatePostion();
        }
    }

    SpaceInvader.prototype.clearCanvas = function () {
        SI.context.clearRect(0, 0, SI.width, SI.height);
    }


    SpaceInvader.prototype.setConfiguration = function (targetId, width, height) {
        SI.id = targetId;
        SI.width = width;
        SI.height = height;
        SI.xAxisCenter = width / 2;
        SI.background = '#ddd';

        SI.jetX = 0;
        SI.jetSize = 40;
        SI.jetMoveSteps = 20;
        SI.jetHalfSize = SI.jetSize / 2;
        SI.jetImgSrc = 'img/jet.png';

        SI.bulletColor = 'red';
        SI.bulletRadius = 5;
        SI.bulletMoveSteps = 4;
        SI.bulletSeparation = 20;
        SI.prevBullet = null;
        SI.bulletInitialX = SI.xAxisCenter;
        SI.bulletInitialY = SI.height - (SI.jetSize + SI.bulletRadius);
        SI.bulletList = {};
        SI.keyMap = {};

    };


    SpaceInvader.prototype.createCanvas = function () {
        /* Creating Canvas */
        var canvas = document.createElement('canvas');
        canvas.id = SI.id + '-' + Math.random();
        canvas.width = SI.width;
        canvas.height = SI.height;

        /* Clear and append to DOM */
        var element = document.getElementById(SI.id);
        element.innerHTML = '';
        element.appendChild(canvas);

        SI.canvas = canvas;
        SI.context = canvas.getContext('2d');

    };


    SpaceInvader.prototype.addBackground = function () {
        SI.context.fillStyle = SI.background;
        SI.context.rect(0, 0, SI.width, SI.height);
        SI.context.fill();
    }


    SpaceInvader.prototype.createJet = function () {
        var jetImage = new Image();
        jetImage.src = SI.jetImgSrc;

        SI.jetX = SI.xAxisCenter - (SI.jetSize / 2);
        SI.jetY = SI.height - SI.jetSize;

        jetImage.onload = function () {
            SI.jetImage = jetImage;
            SI.context.drawImage(SI.jetImage, SI.jetX, SI.jetY, SI.jetSize, SI.jetSize);
            animationLoop();
        }
    };


    SpaceInvader.prototype.updateJetPosition = function () {
        SI.context.drawImage(SI.jetImage, SI.jetX, SI.jetY, SI.jetSize, SI.jetSize);
    }


    SpaceInvader.prototype.getCount = (function () {
        var count = 0;
        return function () {
            count++;
            return count;
        };
    })();

    SpaceInvader.prototype.handleKeyPress = function (e) {
        var key = e.code || e.key;
        SI.keyMap[key] = true;

        if (SI.keyMap["ArrowLeft"]) {
            if (SI.jetX > 0) {
                SI.jetX -= SI.jetMoveSteps;
                SI.bulletInitialX -= SI.jetMoveSteps;
            }
        }

        if (SI.keyMap["ArrowRight"]) {
            if (SI.jetX + SI.jetSize < SI.width) {
                SI.jetX += SI.jetMoveSteps;
                SI.bulletInitialX += SI.jetMoveSteps;
            }
        }

        if (SI.keyMap["ArrowUp"] || SI.keyMap["Space"] || SI.keyMap[" "]) {
            var bulletKey = 'bullet' + SI.getCount();

            if (SI.prevBullet !== null && Object.keys(SI.bulletList).length > 0) {
                var prevBullet = SI.bulletList[SI.prevBullet];
                if ((SI.bulletInitialY - prevBullet.getPosition()) > SI.bulletSeparation) {
                    SI.prevBullet = bulletKey;
                    SI.bulletList[bulletKey] = new SI.FireBullet(SI.bulletInitialX, SI.bulletInitialY, SI.bulletRadius, SI.bulletColor, SI.bulletMoveSteps, bulletKey);
                }
            } else {
                SI.prevBullet = bulletKey;
                SI.bulletList[bulletKey] = new SI.FireBullet(SI.bulletInitialX, SI.bulletInitialY, SI.bulletRadius, SI.bulletColor, SI.bulletMoveSteps, bulletKey);
            }

            return true;
        }
    };

    SpaceInvader.prototype.handleKeyUp = function (e) {
        var key = e.code || e.key;
        delete SI.keyMap[key];
    }


    SpaceInvader.prototype.listenEvents = function () {
        document.addEventListener('keydown', SI.handleKeyPress);
        document.addEventListener('keyup', SI.handleKeyUp);
    };


    function animationLoop() {
        SI.clearCanvas();
        SI.addBackground();
        SI.updateJetPosition();
        SI.refreshCanvasBullets();
        requestAnimationFrame(animationLoop);
    }
})();
