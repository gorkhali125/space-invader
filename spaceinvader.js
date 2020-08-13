
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

(function(){

    window.SI;

    window.requestAnimationFrame = (function(){
        return window.requestAnimationFrame       ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame    ||
               window.msRequestionAnimationFrame  ||
               function( callback){
                   window.setTimeout(callback, 1000/60);
               }
    })();


    window.SpaceInvader = function (targetId, width, height){

        SI = this;
        SI.setConfiguration( targetId, width, height);
        SI.createCanvas();
        SI.addBackground();
        SI.createJet();
        SI.listenEvents();
        SI.createEvent();
        
    };

    SpaceInvader.prototype.FireBullet = function(x, y, radius, color, moveSteps, bulletKey) {

        var radiant = Math.PI / 180;
        
        console.log(SI.bulletList, 'Total bullet list');

        ( function updatePostion(){
            SI.context.beginPath();
            SI.context.fillStyle = color;
            SI.context.arc(x, y, radius, 0, 360 * radiant, false);
            SI.context.fill();
            y -= moveSteps;

            console.log(y, 'y');
            if( y > 0 ){
                delete SI.bulletList[bulletKey];
            }
            document.body.addEventListener( SI.eventName, updatePostion );

        })();

    };

    SpaceInvader.prototype.clearCanvas = function(){
        SI.context.clearRect( 0, 0, SI.width, SI.height );
    }


    SpaceInvader.prototype.setConfiguration = function( targetId, width, height ){

        SI.id = targetId;
        SI.width = width;
        SI.height = height;
        SI.xAxisCenter = width /2;
        SI.background = '#ddd';

        SI.jetX = 0;
        SI.jetSize = 40;
        SI.jetMoveSteps = 10;
        SI.jetHalfSize = SI.jetSize /2;
        SI.jetImgSrc = 'img/jet.png';

        SI.bulletColor = 'red';
        SI.bulletRadius = 5;
        SI.bulletMoveSteps = 4;
        SI.bulletInitialX = SI.xAxisCenter;
        SI.bulletInitialY = SI.height - ( SI.jetSize + SI.bulletRadius );

        SI.eventName = 'updateBullet';
        SI.bulletList = {};

    };


    SpaceInvader.prototype.createCanvas = function(){

        /* Creating Canvas */
        var canvas =  document.createElement('canvas');
        canvas.id = SI.id+'-'+Math.random();
        canvas.width = SI.width;
        canvas.height = SI.height;
        
        /* Clear and append to DOM */
        var element = document.getElementById(SI.id);
        element.innerHTML = '';
        element.appendChild(canvas);

        SI.canvas = canvas;
        SI.context = canvas.getContext('2d');
        
    };


    SpaceInvader.prototype.addBackground= function(){
        SI.context.fillStyle = SI.background ;
        SI.context.rect(0, 0, SI.width, SI.height);
        SI.context.fill();
    }


    SpaceInvader.prototype.createJet = function(){
        var jetImage = new Image();
        jetImage.src = SI.jetImgSrc;

        SI.jetX = SI.xAxisCenter - ( SI.jetSize / 2 );
        SI.jetY = SI.height - SI.jetSize; 

        jetImage.onload = function(){
            SI.jetImage = jetImage;
            SI.context.drawImage( SI.jetImage, SI.jetX, SI.jetY, SI.jetSize, SI.jetSize );
            animationLoop();
        }
    };


    SpaceInvader.prototype.updateJetPosition = function(){
        SI.context.drawImage( SI.jetImage, SI.jetX, SI.jetY, SI.jetSize, SI.jetSize );
    }


    SpaceInvader.prototype.getCount = (function(){
        var count = 0;
        return function(){
            count++;
            return count;
        };
    })();
    
    
    SpaceInvader.prototype.handleKeyPress = function(e, eventName){

        switch(e.keyCode){
            // left arrow
            case(37):{
                if(SI.jetX >0){
                    SI.jetX -= SI.jetMoveSteps;
                    SI.bulletInitialX -= SI.jetMoveSteps;
                }
                return true;
            }

            // Up arrow || space
            case(32):
            case(38):{
                var bulletKey = 'bullet'+SI.getCount();
                SI.bulletList[bulletKey] = new SI.FireBullet( SI.bulletInitialX, SI.bulletInitialY, SI.bulletRadius, SI.bulletColor, SI.bulletMoveSteps, bulletKey)
                return true;
            }

            // right arrow
            case(39):{
                if(SI.jetX + SI.jetSize < SI.width){
                    SI.jetX += SI.jetMoveSteps;
                    SI.bulletInitialX += SI.jetMoveSteps;
                }
                return true
            }
        }

    };


    SpaceInvader.prototype.listenEvents = function(){
        document.addEventListener('keydown', SI.handleKeyPress );
        document.addEventListener('keyup', SI.handleKeyPress );
    };


    SpaceInvader.prototype.createEvent = function(){
        SI.event = document.createEvent('Event');
        SI.event.initEvent( SI.eventName, true, true );
    }


    function animationLoop(){

        SI.clearCanvas();
        SI.addBackground();
        SI.updateJetPosition();

        console.log('Redrawing canvas');

        /* For Update bullet position */
        document.body.dispatchEvent(SI.event);
        requestAnimationFrame( animationLoop );
    }

})();
