'use strict';

var Model = require('./model.js');
var CONST = require('./const.js');
var trackAcceleration = true;
var arrayZ = [];
var lastPick = new Date().getTime();
var orientation = 0;

function applyDirection(direction){
	Model.gameModel.position.direction = direction;
	Model.gameModel.position.stepCount = (Model.gameModel.position.stepCount + 1) % 3;
	Model.gameModel.inputArray.push(direction);
	
}

function keypress(event){
	switch (event.keyCode){
		case 37: //CONST.LEFT
			applyDirection(CONST.LEFT);
			break;
		case 38: //UP
			applyDirection(CONST.UP);
			break;
		case 39: //CONST.RIGHT
			applyDirection(CONST.RIGHT);
			break;
		case 40: //CONST.DOWN
			applyDirection(CONST.DOWN);
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
	var directionStep = CONST.RIGHT;
	if (orientation < 45 || orientation >= 315){
		directionStep = CONST.UP;
	}else if (orientation >= 45 && orientation < 135){
		directionStep = CONST.LEFT;
	}else if (orientation >= 135 && orientation < 225){
		directionStep = CONST.DOWN;
	}else{
		directionStep = CONST.RIGHT;
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