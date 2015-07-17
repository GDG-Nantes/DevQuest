'use strict';

var Model = require('../model/model.js');
var CONST = require('../model/const.js');
var SonicServer = require('../ultrasonic/sonic-server.js');
var trackAcceleration = true;
var arrayZ = [];
var lastPick = Date.now();
var orientation = 0;
var sonicServer = null;
var stateFeq={
	frequency : 0,
	time : 0
};

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
				var currentTime = Date.now();
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

function callBackSonic(message){
	if (message.freq != stateFeq.frequency){
		stateFeq.frequency = message.freq;
		stateFeq.time = Date.now();
	}else{
		if (Date.now() - stateFeq.time > CONST.DELAY_STABLE){
			console.info('Recieve message : %d Mhz, %d db',message.freq, message.power);
		}
	}
}

// API

function initListeners(){

	document.addEventListener('keydown', keypress, false);

	if (Modernizr.devicemotion){
		window.addEventListener('devicemotion', motionCallBack, false);
		window.addEventListener('deviceorientation', orientationCallBack, false);
	}

// TODO à décommenter !!!
	/*if (!sonicServer){
		sonicServer = new SonicServer({peakThreshold: CONST.THRESHOLD});
		//sonicServer.setDebug(true);
		sonicServer.on('message', callBackSonic);
	}

	sonicServer.start();
	*/

	console.log("InitListeners");
}


function removeListeners(){
	document.removeEventListener('keydown', keypress, false);

	if (Modernizr.devicemotion){
		window.removeEventListener('devicemotion', motionCallBack, false);
		window.removeEventListener('deviceorientation', orientationCallBack, false);
	}
	// TODO à décommenter
	//sonicServer.stop();
	console.log("RemoveListeners");
}


module.exports = {
	initListeners : initListeners,
	removeListeners : removeListeners
};
