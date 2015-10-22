'use strict';

var Model = require('../model/model.js');
var StandsModel = require('../model/stands.js');
var Stands = require('../assets/stands.js');
var CONST = require('../model/const.js');
var SonicServer = require('../ultrasonic/sonic-server.js');


var _trackAcceleration = true
	, _arrayZ = []
	, _maxY = 0
 	, _minY = 10
 	, _lastPick = Date.now()
	, _orientation = 0
	, _sonicServer = null
	, _stateFeq={
		frequency : 0,
		time : 0
	}
	, _fullscreen = false
	, _interactionsListeners = []
	, _fireSoundStand = null
	, _addInteractions = false;

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

function registerInteractions_(){
	registerInteraction({
		type : CONST.eventType.DOWN
		, key : [
			CONST.uiElements.BTN_DIRECTION_UP,			
			CONST.uiElements.BTN_DIRECTION_LEFT,			
			CONST.uiElements.BTN_DIRECTION_RIGHT,			
			CONST.uiElements.BTN_DIRECTION_DOWN			
		]
		, callback : processBtnDirections_
	});
	
}

function processBtnDirections_(event){
	switch(event.key){
		case CONST.uiElements.BTN_DIRECTION_UP:
			applyDirection_(CONST.directions.UP);
		break;
		case CONST.uiElements.BTN_DIRECTION_LEFT:
			applyDirection_(CONST.directions.LEFT);
		break;
		case CONST.uiElements.BTN_DIRECTION_RIGHT:
			applyDirection_(CONST.directions.RIGHT);
		break;
		case CONST.uiElements.BTN_DIRECTION_DOWN:
			applyDirection_(CONST.directions.DOWN);
		break;
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

function fireEvent_(eventInteraction){
	// On vérifies s'il n'y a pas un événement à lever
	_interactionsListeners.forEach(function(listener){
		if (!eventInteraction.cancel 
			&& eventInteraction.type === listener.type
			&& eventInteraction.key === listener.key){
			listener.callback(eventInteraction);
		}
	});

} 

function checkMouseIntersection_(event){
	if (Model.ui.mapInteraction && Model.ui.mapInteraction.length > 0){
		var eventX = event.clientX / Model.ui.ratio;
		var eventY = event.clientY / Model.ui.ratio;
		if (event.type === 'touchstart' || event.type === 'touchend'){
			eventX = event.changedTouches[0].pageX / Model.ui.ratioScreen;
			eventY = event.changedTouches[0].pageY / Model.ui.ratioScreen;
		}
		// On tri la map afin de gérer des prioritées
		Model.ui.mapInteraction.sort(function sortMapInterraction(interectionA, interactionB){
			return interectionA.priority && interactionB.priority  ? interectionA.priority - interactionB.priority 
				: (interectionA.priority ? -1 : 1)
		});
		Model.ui.mapInteraction.every(function everyMapInteraction(point){
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
					fireEvent_({
						key : point.key
						, type : event.type === 'touchstart' ? CONST.eventType.DOWN : 
										(event.type === 'touchend' ? CONST.eventType.UP : CONST.eventType.UP)
						, id : point.id
					});

					return false;
			}
			return true;
		});

		// Cas particulier du bouton démarer car on passe en fullScreen
		/*
		TODO à décomenter
		if (!_fullscreen){
			toggleFullScreen_();
				_fullscreen = true
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
	// Attention l'orientation html va à l'inverse des aiguilles d'une montre !
	var upRef = 150; // La référence est 150° pour indiquer le up 
	/*
		Haut => >= 105 || < 195
		Droite => >=5 && < 105
		Bas => >= 285 && < 360 || >= 0 && < 5
		Gauge=> >= 195 && < 285
	*/
	var directionStep = CONST.directions.RIGHT;
	if (orientation >= 105 && orientation < 195){
		directionStep = CONST.directions.UP;
	}else if (orientation >= 5 && orientation < 105){
		directionStep = CONST.directions.RIGHT;
	}else if ((orientation >= 285 && orientation < 360)
			|| (orientation >= 0 && orientation < 5)){
		directionStep = CONST.directions.DOWN;
	}else{
		directionStep = CONST.directions.LEFT;
	}

	return directionStep;
}



function motionCallBack_(event){
	if (_trackAcceleration &&  event.accelerationIncludingGravity){
		//console.log("x: %s | y: %s | z: %s",event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y,event.accelerationIncludingGravity.z);
		var zValue = event.accelerationIncludingGravity.z - CONST.motion.GRAVITY;
		_maxY = Math.max(event.accelerationIncludingGravity.y, _maxY);
		_minY = Math.min(event.accelerationIncludingGravity.y, _minY);
		// Initialisation
		_arrayZ.push(zValue);
		if (_arrayZ.length > 3){
			_arrayZ = _arrayZ.slice(1,4);
			// On est sur un pic
			if (_arrayZ[1] > _arrayZ[0]
				&& _arrayZ[1] > _arrayZ[2]
				&& _arrayZ[1] > CONST.motion.STEP_ACCELERATION_Z
				&& _maxY > CONST.motion.STEP_ACCELERATION_Y ){
				var currentTime = Date.now();
				// On tiens comptes d'un temps de rafraischissement minimal pour éviter les événements parasites
				if (currentTime - _lastPick > CONST.motion.STEP_RATE
					&& Model.gameModel.parameters.motion){
					_lastPick = currentTime;
					applyDirection_(transformOrientationToDirection_(_orientation));
					if (CONST.DEBUG){
						console.debug( new Date().toISOString()+" : "+ _arrayZ[1]+" -> "+_orientation
							+" maxY : "+_maxY
							+" minY : "+_minY);
					}
					_maxY = 0;
					_minY = 10;
				}
			}
		}


		
	}
}

function orientationCallBack_(event){
	// On ne tien comptes des pas que si le téléphone est à plat => abs(gamma) < 20 && abs(beta) < 20
	// Le alpha représente la bousolle et nous permet de savoir où l'on est dirigé
	_trackAcceleration = Math.abs(event.beta) < CONST.motion.LIMIT_ORIENTATION
		&& Math.abs(event.gamma) < CONST.motion.LIMIT_ORIENTATION;
	var orientationAlert = Math.abs(event.beta) >= CONST.motion.LIMIT_ORIENTATION_ALERT
		|| Math.abs(event.gamma) >= CONST.motion.LIMIT_ORIENTATION_ALERT; 
	_orientation = event.alpha;
	if (Model.gameModel.parameters.motion && orientationAlert && !Model.gameModel.parameters.wrongOrientation){
		Model.gameModel.parameters.wrongOrientation = true;
	}else if (Model.gameModel.parameters.motion && !orientationAlert && Model.gameModel.parameters.wrongOrientation){
		Model.gameModel.parameters.wrongOrientation = false;
	}

}

function callBackSonic_(message){
	if (message.freq != _stateFeq.frequency){
		_stateFeq.frequency = message.freq;
		_stateFeq.time = Date.now();
	}else{
		if (Model.gameModel.parameters.mic 
			&& Date.now() - _stateFeq.time > CONST.audio.DELAY_STABLE){
			var stand = StandsModel.find(function(standTmp){
				return (standTmp.frequency + CONST.audio.DELTA) > message.freq
				&& (standTmp.frequency - CONST.audio.DELTA) < message.freq;
			});
			if (stand){
				// On vérifie qu'on vient pas déjà de propagé l'événement
				if (_fireSoundStand 
					&& _fireSoundStand.name === stand.name){
					return;
				}
				_fireSoundStand = stand;

				var standInteraction = Stands.arrayInteraction.find(function(standInteractionTmp){
					return standInteractionTmp.id === stand.name;
				});
				fireEvent_({
					key : standInteraction.key
					, type : CONST.eventType.SOUND
					, id : standInteraction.id
				});
				if (CONST.DEBUG){
					console.debug('Recieve message : %d Mhz, %d db for Stand %s',message.freq, message.power, stand.name);
				}
			}
		}
	}
}

function fbAddOrChange_(datas){
	Model.ui.usersChange = true;
	var userTmp = datas.val();
	Model.services.activUsers[userTmp.id] = userTmp;
	console.log("fb_AddOrChange : ",userTmp);
}

function fbRemove_(datas){
	Model.ui.usersChange = true;
	var userTmp = datas.val();
	delete Model.services.activUsers[userTmp.id];
	console.log("fb_Remove : ",userTmp);

}

// API

function initListeners(){
	if (!_addInteractions){
		_addInteractions = true;
		registerInteractions_();
	}

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

	// Firebase Listeners
	Model.services.fbActivRef
		/*.orderByChild('xScreen')
		.startAt(Model.gameModel.positionScreen.x)
		.endAt(Model.gameModel.positionScreen.x+Model.ui.screenSize.width)*/
		.on('child_added', fbAddOrChange_);
	Model.services.fbActivRef
		/*.orderByChild('xScreen')
		.startAt(Model.gameModel.positionScreen.x)
		.endAt(Model.gameModel.positionScreen.x+Model.ui.screenSize.width)*/
		.on('child_removed', fbRemove_);
	Model.services.fbActivRef
		/*.orderByChild('xScreen')
		.startAt(Model.gameModel.positionScreen.x)
		.endAt(Model.gameModel.positionScreen.x+Model.ui.screenSize.width)*/
		.on('child_changed', fbAddOrChange_);
	

// TODO à décommenter !!!
	/*if (!_sonicServer){
		_sonicServer = new SonicServer({peakThreshold: CONST.audio.THRESHOLD});
		//_sonicServer.setDebug(true);
		_sonicServer.on('message', callBackSonic_);
	}

	_sonicServer.start();
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

	// Firebase remove
	Model.services.fbActivRef
		/*.orderByChild('xScreen')
		.startAt(Model.gameModel.positionScreen.x)
		.endAt(Model.gameModel.positionScreen.x+Model.ui.screenSize.width)*/
		.off('child_added', fbAddOrChange_);
	Model.services.fbActivRef
		/*.orderByChild('xScreen')
		.startAt(Model.gameModel.positionScreen.x)
		.endAt(Model.gameModel.positionScreen.x+Model.ui.screenSize.width)*/
		.off('child_removed', fbRemove_);
	Model.services.fbActivRef
		/*.orderByChild('xScreen')
		.startAt(Model.gameModel.positionScreen.x)
		.endAt(Model.gameModel.positionScreen.x+Model.ui.screenSize.width)*/
		.off('child_changed', fbAddOrChange_);

	// TODO à décommenter
	//_sonicServer.stop();
	console.log("RemoveListeners");
}

function registerInteraction(listener){
	if (Array.isArray(listener.key)){
		listener.key.forEach(function(keyItem){
			_interactionsListeners.push({
				type : listener.type
				, key : keyItem
				, callback : listener.callback
			});
		});
	}else{
		_interactionsListeners.push(listener);
	}
}


module.exports = {
	  removeListeners : removeListeners
	, initListeners : initListeners
	, registerInteraction : registerInteraction
};
