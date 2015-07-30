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
var fullscreen = false;

function toggleFullScreen_() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}


function applyDirection_(direction){
	Model.gameModel.position.direction = direction;
	Model.gameModel.position.stepCount = (Model.gameModel.position.stepCount + 1) % 3;
	Model.gameModel.inputArray.push(direction);

}

function keypress_(event){
	switch (event.keyCode){
		case 37: //LEFT
			applyDirection_(CONST.directions.LEFT);
			break;
		case 38: //UP
			applyDirection_(CONST.directions.UP);
			break;
		case 39: //RIGHT
			applyDirection_(CONST.directions.RIGHT);
			break;
		case 40: //DOWN
			applyDirection_(CONST.directions.DOWN);
			break;
	}
}

function checkMouseIntersection_(event){
	if (Model.ui.mapInteraction && Model.ui.mapInteraction.length > 0){
		var eventX = event.clientX / Model.ui.ratio;
		var eventY = event.clientY / Model.ui.ratio;
		if (event.type === 'touchstart' || event.type === 'touchend'){
			eventX = event.changedTouches[0].pageX / Model.ui.ratioScreen;
			eventY = event.changedTouches[0].pageY / Model.ui.ratioScreen;
		}
		Model.ui.mapInteraction.every(function(point){
			if (CONST.DEBUG){				
				console.debug('Point %s : %s;%s{%s;%s} | %s;%s', point.key, point.x, point.y
						, point.w, point.h
						, point.x/CONST.ui.UNIT, point.y/CONST.ui.UNIT);
				console.debug('hammer : %s;%s | %s;%S',eventX, eventY
						, eventX / CONST.ui.UNIT, eventY / CONST.ui.UNIT);
			}
			if (eventX > point.x
				&& eventX < (point.x + point.w)
				&& eventY > point.y
				&& eventY < (point.y + point.h)){
					if (CONST.DEBUG){
						console.debug("Event Click : %s on %s ", event.type, point.key);
					}
					Model.ui.interaction.key = point.key;
					Model.ui.interaction.type = event.type === 'touchstart' ? CONST.directions.DOWN : 
										(event.type === 'touchend' ? CONST.directions.UP : CONST.directions.UP);
					Model.ui.interaction.id = point.id;

					return false;
			}
			return true;
		});

		// Cas particulier du bouton démarer car on passe en fullScreen
		/*
		TODO à décomenter
		if (!fullscreen){
			toggleFullScreen_();
				fullscreen = true
		}
		*/
	}
}

function mouseDown_(event){
	checkMouseIntersection_(event);	
}

function mouseUp_(event){
	checkMouseIntersection_(event);
}

function transformOrientationToDirection_(orientation){
	// On a une valeur qui oscille entre 0 et 360
	// On va prendre des tranches de 90 degrés pour chaque direction
	/*
		Haut => < 45 || >= 315
		Gauche => >=45 && < 135
		Bas => >= 135 && < 225
		Droite=> >= 225 && < 315
	*/
	var directionStep = CONST.directions.RIGHT;
	if (orientation < 45 || orientation >= 315){
		directionStep = CONST.directions.UP;
	}else if (orientation >= 45 && orientation < 135){
		directionStep = CONST.directions.LEFT;
	}else if (orientation >= 135 && orientation < 225){
		directionStep = CONST.directions.DOWN;
	}else{
		directionStep = CONST.directions.RIGHT;
	}

	return directionStep;
}

function motionCallBack_(event){
	if (trackAcceleration &&  event.accelerationIncludingGravity){
		//console.log("x: %s | y: %s | z: %s",event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y,event.accelerationIncludingGravity.z);
		var zValue = event.accelerationIncludingGravity.z - CONST.motion.GRAVITY;
		// Initialisation
		arrayZ.push(zValue);
		if (arrayZ.length > 3){
			arrayZ = arrayZ.slice(1,4);
			// On est sur un pic
			if (arrayZ[1] > arrayZ[0]
				&& arrayZ[1] > arrayZ[2]
				&& arrayZ[1] > CONST.motion.STEP_ACCELERATION){
				var currentTime = Date.now();
				// On tiens comptes d'un temps de rafraischissement minimal pour éviter les événements parasites
				if (currentTime - lastPick > CONST.motion.STEP_RATE){
					lastPick = currentTime;
					applyDirection_(transformOrientationToDirection_(orientation));
					console.log( new Date().toISOString()+" : "+ arrayZ[1]+" -> "+orientation);
				}
			}
		}


		if (Math.abs(zValue) > CONST.motion.STEP_ACCELERATION){
		}
	}
}

function orientationCallBack_(event){
	// On ne tien comptes des pas que si le téléphone est à plat => abs(gamma) < 20 && abs(beta) < 20
	// Le alpha représente la bousolle et nous permet de savoir où l'on est dirigé
	trackAcceleration = Math.abs(event.beta) < CONST.motion.LIMIT_ORIENTATION
		&& Math.abs(event.gamma) < CONST.motion.LIMIT_ORIENTATION;
	orientation = event.alpha;

}

function callBackSonic_(message){
	if (message.freq != stateFeq.frequency){
		stateFeq.frequency = message.freq;
		stateFeq.time = Date.now();
	}else{
		if (Date.now() - stateFeq.time > CONST.audio.DELAY_STABLE){
			console.info('Recieve message : %d Mhz, %d db',message.freq, message.power);
		}
	}
}

// API

function initListeners(){

	document.addEventListener('keydown', keypress_, false);

	if (Modernizr.touch){		
		document.addEventListener('touchstart', mouseDown_, false);
		document.addEventListener('touchend', mouseUp_, false);
	}else{
		document.addEventListener('mousedown', mouseDown_, false);
		document.addEventListener('mouseup', mouseUp_, false);
	}

	if (Modernizr.devicemotion){
		window.addEventListener('devicemotion', motionCallBack_, false);
		window.addEventListener('deviceorientation', orientationCallBack_, false);
	}

// TODO à décommenter !!!
	/*if (!sonicServer){
		sonicServer = new SonicServer({peakThreshold: CONST.audio.THRESHOLD});
		//sonicServer.setDebug(true);
		sonicServer.on('message', callBackSonic);
	}

	sonicServer.start();
	*/

	console.log("InitListeners");
}


function removeListeners(){
	document.removeEventListener('keydown', keypress_, false);
	if (Modernizr.touch){		
		document.removeEventListener('touchstart', mouseDown_, false);
		document.removeEventListener('touchend', mouseUp_, false);
	}else{
		document.removeEventListener('mousedown', mouseDown_, false);
		document.removeEventListener('mouseup', mouseUp_, false);

	}

	if (Modernizr.devicemotion){
		window.removeEventListener('devicemotion', motionCallBack_, false);
		window.removeEventListener('deviceorientation', orientationCallBack_, false);
	}
	// TODO à décommenter
	//sonicServer.stop();
	console.log("RemoveListeners");
}


module.exports = {
	  removeListeners : removeListeners
	, initListeners : initListeners
};
