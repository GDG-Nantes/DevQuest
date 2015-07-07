'use strict';

var Model = require('./model.js');
var CONST = require('./const.js');
var trackAcceleration = true;
var arrayZ = [];
var lastPick = new Date().getTime();
var orientation = 0;
var UP = 1,
	LEFT = 2,
	RIGHT = 3,
	DOWN = 4;

function applyDirection(direction){
	switch (direction){
		case LEFT:
			Model.gameModel.position.x = Math.max(0, Model.gameModel.position.x - 1);
			break;
		case UP:
			Model.gameModel.position.y = Math.max(0, Model.gameModel.position.y - 1);
			break;
		case RIGHT:
			Model.gameModel.position.x = Math.min(CONST.SIZE_UNIT.w, Model.gameModel.position.x + 1);
			break;
		case DOWN:
			Model.gameModel.position.y = Math.min(CONST.SIZE_UNIT.h, Model.gameModel.position.y + 1);
			break;

	}
}

function keypress(event){
	switch (event.keyCode){
		case 37: //LEFT
			applyDirection(LEFT);
			break;
		case 38: //UP
			applyDirection(UP);
			break;
		case 39: //RIGHT
			applyDirection(RIGHT);
			break;
		case 40: //DOWN
			applyDirection(DOWN);
			break;
	}
}

function transformOrientationToDirection(orientation){
	// On a une valeur qui oscille entre 0 et 360
	// On va prendre des tranches de 90 degrés pour chaque direction
	/*
		Haut => < 45 || >= 315
		Gauche => >=45 && < 135
		Bas => >= 135 && < 225
		Droite=> >= 225 && < 315
	*/
	var directionStep = RIGHT;
	if (orientation < 45 || orientation >= 315){
		directionStep = UP;
	}else if (orientation >= 45 && orientation < 135){
		directionStep = LEFT;
	}else if (orientation >= 135 && orientation < 225){
		directionStep = DOWN;
	}else{
		directionStep = RIGHT;
	}

	return directionStep;
}

function motionCallBack(event){
	if (trackAcceleration &&  event.accelerationIncludingGravity){
		//console.log("x: %s | y: %s | z: %s",event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y,event.accelerationIncludingGravity.z);
		var zValue = event.accelerationIncludingGravity.z - CONST.GRAVITY;
		// Initialisation
		arrayZ.push(zValue);
		if (arrayZ.length > 3){
			arrayZ = arrayZ.slice(1,4);
			// On est sur un pic
			if (arrayZ[1] > arrayZ[0] 
				&& arrayZ[1] > arrayZ[2] 
				&& arrayZ[1] > CONST.STEP_ACCELERATION){
				var currentTime = new Date().getTime();
				// On tiens comptes d'un temps de rafraischissement minimal pour éviter les événements parasites
				if (currentTime - lastPick > CONST.STEP_RATE){
					lastPick = currentTime;
					applyDirection(transformOrientationToDirection(orientation));
					console.log( new Date().toISOString()+" : "+ arrayZ[1]+" -> "+orientation);			
				}
			}	
		}

		
		if (Math.abs(zValue) > CONST.STEP_ACCELERATION){
		}
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