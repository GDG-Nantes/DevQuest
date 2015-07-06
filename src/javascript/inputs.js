'use strict';

var Model = require('./model.js');
var CONST = require('./const.js');
var trackAcceleration = true;
var orientation = 0;

function keypress(event){
	switch (event.keyCode){
		case 37: //LEFT
			Model.gameModel.position.x = Math.max(0, Model.gameModel.position.x - 1);
			break;
		case 38: //UP
			Model.gameModel.position.y = Math.max(0, Model.gameModel.position.y - 1);
			break;
		case 39: //RIGHT
			Model.gameModel.position.x = Math.min(CONST.SIZE_UNIT.w, Model.gameModel.position.x + 1);
			break;
		case 40: //DOWN
			Model.gameModel.position.y = Math.min(CONST.SIZE_UNIT.h, Model.gameModel.position.y + 1);
			break;
	}
}

function motionCallBack(event){
	if (trackAcceleration &&  event.accelerationIncludingGravity){
		//console.log("x: %s | y: %s | z: %s",event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y,event.accelerationIncludingGravity.z);
		console.log(event.accelerationIncludingGravity.z - CONST.GRAVITY);
	}
}

function orientationCallBack(event){
	// On ne tien comptes des pas que si le téléphone est à plat => abs(gamma) < 20 && abs(beta) < 20
	// Le alpha représente la bousolle et nous permet de savoir où l'on est dirigé
	trackAcceleration = Math.abs(event.beta) < CONST.LIMIT_ORIENTATION
		&& Math.abs(event.gamma) < CONST.LIMIT_ORIENTATION;
	orientation = event.alpha;

}
 
document.addEventListener('keydown', keypress);

if (Modernizr.devicemotion){
	window.addEventListener('devicemotion', motionCallBack, true);
	window.addEventListener('deviceorientation', orientationCallBack, true);
}


module.exports = {
	
};