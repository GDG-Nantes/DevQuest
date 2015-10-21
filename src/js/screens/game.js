'use strict';
var CONST = require('../model/const.js');
var Model = require('../model/model.js');
var StandsModel = require('../model/stands.js');
var Stands = require('../assets/stands.js');
var Inputs = require('../triggers/inputs.js');
var InterfaceUtil = require('../assets/interface-utils.js');

var _lastPoint = {
	x : 0,
	y : 0
	}
	, _interactionParam = []
	, _interactionParams = []
	, _interactionConfirmation = []
	, _interactionWrongOrientation = []
	, _interactionArrow = []
	, _showParam = false
	, _showConfirmStand = false
	, _eventTmp = null
	, _lastSoundStand = null
	, _addInteractions = false;

function registerInteractions_(){
	Inputs.registerInteraction({
		type : CONST.eventType.DOWN
		, key : [
			CONST.uiElements.BTN_PARAM,			
			CONST.uiElements.BTN_PARAM_CLOSE,			
			CONST.uiElements.BTN_PARAM_MIC,			
			CONST.uiElements.BTN_PARAM_MOTION,			
			CONST.screens.INSIDE_SILVER,			
			CONST.screens.INSIDE_GOLD,			
			CONST.screens.INSIDE_PLATINIUM,			
			//CONST.uiElements.BTN_OK,			
			CONST.uiElements.BTN_YES,			
			CONST.uiElements.BTN_NO			
		]
		, callback : processInteractions_
	});
	Inputs.registerInteraction({
		type : CONST.eventType.SOUND
		, key : [
			CONST.screens.INSIDE_SILVER,			
			CONST.screens.INSIDE_GOLD,			
			CONST.screens.INSIDE_PLATINIUM	
		]
		, callback : processInteractions_
	});
	
}

function processInteractions_(event){
  if (event.type && 
		event.type  === CONST.eventType.DOWN		
		){		
		switch(event.key){
		    case CONST.uiElements.BTN_PARAM :   
		    	_showParam = true;
		    	break;		
		     case CONST.uiElements.BTN_PARAM_CLOSE :   
		    	_showParam = false;
		    	break;		    
		    case CONST.uiElements.BTN_PARAM_MIC :   
		    	Model.gameModel.parameters.mic = !Model.gameModel.parameters.mic;
		    	break;		    
		    case CONST.uiElements.BTN_PARAM_MOTION :   
		    	Model.gameModel.parameters.motion = !Model.gameModel.parameters.motion;
		    	Model.gameModel.parameters.wrongOrientation = false;
		    	break;		    
		    case CONST.screens.INSIDE_SILVER :   
		    case CONST.screens.INSIDE_GOLD :   
		    case CONST.screens.INSIDE_PLATINIUM :   
		    	_eventTmp = event;
		    	_showConfirmStand = true;
		    	break;
		    case CONST.uiElements.BTN_YES :   
		    	Model.gameModel.standId = _eventTmp.id;
		    	Model.ui.changeScreen = _eventTmp.key;        
		    	_showConfirmStand = false;
		    	_eventTmp = null;
		    	// On met à jour la position du personnage en fonction du stand
		    	var stand = StandsModel.filter(function(standTmp){
					return standTmp.name === Model.gameModel.standId;
				})[0];
				Model.gameModel.position.x = stand.positionDoor.x;
				Model.gameModel.position.y = stand.positionDoor.y;
				Model.gameModel.position.direction = stand.position.orientation;
		    	break;
		    case CONST.uiElements.BTN_NO :   
		    	_showConfirmStand = false;
		    	_eventTmp = null;
		    	break;
		    /*case CONST.uiElements.BTN_OK :   
		    	// TODO voir ce qu'on fait
		    	break;*/
		}
	}


  	if (event.type && 
  		event.type === CONST.eventType.SOUND
  		){		
  		switch(event.key){
		    case CONST.screens.INSIDE_SILVER :   
		    case CONST.screens.INSIDE_GOLD :   
		    case CONST.screens.INSIDE_PLATINIUM :   
		    	// On évite le spam à proximité d'un stand si on est déjà
		    	if (_lastSoundStand != event.id){		    		
			    	_eventTmp = event;
			    	_showConfirmStand = true;
			    	_lastSoundStand = event.id;
		    	}
		    	break;		 
		}
  	}
}

function checkInteractions_(){
  if (_lastPoint.x !=  Model.gameModel.positionScreen.x
  	|| _lastPoint.y != Model.gameModel.positionScreen.y
  	|| Model.ui.changeScreen != CONST.screens.GAME){  	
	  // On met à jour la map d'interaction
	  Model.ui.mapInteraction = [];
	  Stands.arrayInteraction.forEach(function(point){
	  	if (point.x < (Model.gameModel.positionScreen.x + Model.ui.screenSize.width) * CONST.ui.UNIT
	  		&& point.y < (Model.gameModel.positionScreen.y + Model.ui.screenSize.height)  * CONST.ui.UNIT){
	  			Model.ui.mapInteraction.push({
	  				key : point.key
	  				, x : point.x - (Model.gameModel.positionScreen.x * CONST.ui.UNIT)
	  				, y : point.y - (Model.gameModel.positionScreen.y * CONST.ui.UNIT)
	  				, w : point.w
	  				, h : point.h
	  				, id : point.id
	  			});
	  	}
	  });
	  _lastPoint = Model.gameModel.positionScreen;
	  if (!Model.gameModel.parameters.motion){
	  	Array.prototype.push.apply(Model.ui.mapInteraction, _interactionArrow);
	  }
	  if(_showParam){
	  	Array.prototype.push.apply(Model.ui.mapInteraction, _interactionParams);
	  }else if (_showConfirmStand){
	  	Array.prototype.push.apply(Model.ui.mapInteraction, _interactionConfirmation);
	  }else{	  	
	  	Array.prototype.push.apply(Model.ui.mapInteraction, _interactionParam);
	  }
  }
}
 

function paintCharacter_(sprite, alpha, direction, step, x, y){
	var rowOri = 0;
	switch(direction){
		case CONST.directions.UP:
			rowOri = 0;
			break;
		case CONST.directions.RIGHT:
			rowOri = 1;
			break;
		case CONST.directions.DOWN:
			rowOri = 2;
			break;
		case CONST.directions.LEFT:
			rowOri = 3;
			break;
	}
	var colOri = step;
	return {key : sprite
		, touchContext : alpha != 1
		, alpha : alpha
		, wOriValue : CONST.ui.UNIT // wOriValue
		, hOriValue : CONST.ui.HEIGHT_CHARS // hOriValue
		, rowOri : rowOri // rowOri
		, colOri : colOri // colOri
		, rowDest : y // rowDest
		, colDest : x // colDest
	};
}

function paintUser_(){
	return paintCharacter_(CONST.characters[Model.gameModel.indexUser].key,// sprite à utiliser
		1, // Pas d'alpha
		Model.gameModel.position.direction, // Orientation du joueur
		Model.gameModel.position.stepCount, // état du sprite
		Model.gameModel.position.x - Model.gameModel.positionScreen.x, // x du joueur
		Model.gameModel.position.y - Model.gameModel.positionScreen.y // y du joueur
		);
}

function paintUsers_(){
	var arrayInstructions = [];
	var tmpMapPositions = {};
	Object.keys(Model.services.activUsers).forEach(function forFbUsers(idUser){
		var userTmp = Model.services.activUsers[idUser];
		if (userTmp.position.x >= Model.gameModel.positionScreen.x
			&& userTmp.position.x < (Model.gameModel.positionScreen.x + Model.ui.screenSize.width)
			&& userTmp.position.y >= Model.gameModel.positionScreen.y
			&& userTmp.position.y < (Model.gameModel.positionScreen.y + Model.ui.screenSize.height)
			&& !tmpMapPositions[userTmp.position.x+'.'+userTmp.position.y]){
			arrayInstructions.push(paintCharacter_(CONST.characters[userTmp.indexUser].key, // sprite à utiliser
				0.75, // Alpha léger 
				userTmp.position.direction, // Orientation du joeur
				userTmp.position.stepCount, // état du sprite
				userTmp.position.x - Model.gameModel.positionScreen.x, // x du joueur
				userTmp.position.y - Model.gameModel.positionScreen.y // y du joueur
				));
			tmpMapPositions[userTmp.position.x+'.'+userTmp.position.y] = true;
		}
	});
	return arrayInstructions;
	
}

function paintConfirmation_(){
	// Zone autour 
	var position = {
	    x: 1
	  , y : (Model.ui.screenSize.height - 4) / 4
	  , w: Model.ui.screenSize.width - 2.5
	  , h: 8
	}
	var arrayInstructions = [{
	     custom : true
	      , key : "alphaBackground" // Sprite
	      , wOriValue : Model.ui.screenSize.width * CONST.ui.UNIT // wOriValue
	      , hOriValue : Model.ui.screenSize.height * CONST.ui.UNIT // hOriValue
	      , rowOri :  0  // rowOri
	      , colOri : 0 // colOri
	      , yDest :  0 // rowDest
	      , xDest :  0 // colDest
	      , hDest :  Model.ui.screenSize.height * CONST.ui.UNIT // hDest
	      , wDest :  Model.ui.screenSize.width * CONST.ui.UNIT // wDest
	  }];
	Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawZoneTexte(position));
	// Titre
	arrayInstructions.push({drawText : true
	  , text : "Voulez vous entrez dans ce stand ?"
	  , fontSize : '20px'
	  , x :  CONST.ui.UNIT * (position.x + 1) // X
	  , y : CONST.ui.UNIT * (position.y + 2) // Y
	  , w : CONST.ui.UNIT * (position.w - 2) // Max Width
	  , lineHeight : 30 // Line Height
	});

	// Boutons
	var positionBtnYes = {
		  x : position.x + 1
		, y : position.y + 3.5
		, w : 4
		, h : 3
	};
	var instructionsBtn = InterfaceUtil.drawBtn(positionBtnYes);
	Array.prototype.push.apply(arrayInstructions, instructionsBtn);
	arrayInstructions.push({drawText : true
		, text : "Oui"
		, fontSize : '30px'
		, x :  CONST.ui.UNIT * (positionBtnYes.x + 1) // X
		, y : CONST.ui.UNIT * (positionBtnYes.y + 2) - CONST.ui.UNIT / 4 // Y
		, w : CONST.ui.UNIT * (positionBtnYes.w - 2) // Max Width
		, lineHeight : 30 // Line Height
	});
	
	var positionBtnNo = {
		  x : positionBtnYes.x + 3.5
		, y : positionBtnYes.y
		, w : 4
		, h : 3
	};
	var instructionsBtn = InterfaceUtil.drawBtn(positionBtnNo);
	Array.prototype.push.apply(arrayInstructions, instructionsBtn);
	arrayInstructions.push({drawText : true
		, text : "Non"
		, fontSize : '30px'
		, x :  CONST.ui.UNIT * (positionBtnNo.x + 1) // X
		, y : CONST.ui.UNIT * (positionBtnNo.y + 2) - CONST.ui.UNIT / 4 // Y
		, w : CONST.ui.UNIT * (positionBtnNo.w - 2) // Max Width
		, lineHeight : 30 // Line Height
	});
	
	  // Mise à jour de la map d'interaction
	if(_interactionConfirmation.length === 0){
		_interactionConfirmation.push({
		    x : CONST.ui.UNIT * positionBtnYes.x
		  , y : CONST.ui.UNIT * positionBtnYes.y
		  , w : CONST.ui.UNIT * positionBtnYes.w
		  , h : CONST.ui.UNIT * positionBtnYes.h
		  , key : CONST.uiElements.BTN_YES
		});	
		_interactionConfirmation.push({
		    x : CONST.ui.UNIT * positionBtnNo.x
		  , y : CONST.ui.UNIT * positionBtnNo.y
		  , w : CONST.ui.UNIT * positionBtnNo.w
		  , h : CONST.ui.UNIT * positionBtnNo.h
		  , key : CONST.uiElements.BTN_NO
		});	
		
	}


	return arrayInstructions;
}

function paintWrongOrientation_(){
	// Zone autour 
	var position = {
	    x: 1
	  , y : (Model.ui.screenSize.height - 4) / 4
	  , w: Model.ui.screenSize.width - 2.5
	  , h: 8
	}
	var arrayInstructions = [{
	     custom : true
	      , key : "alphaBackground" // Sprite
	      , wOriValue : Model.ui.screenSize.width * CONST.ui.UNIT // wOriValue
	      , hOriValue : Model.ui.screenSize.height * CONST.ui.UNIT // hOriValue
	      , rowOri :  0  // rowOri
	      , colOri : 0 // colOri
	      , yDest :  0 // rowDest
	      , xDest :  0 // colDest
	      , hDest :  Model.ui.screenSize.height * CONST.ui.UNIT // hDest
	      , wDest :  Model.ui.screenSize.width * CONST.ui.UNIT // wDest
	  }];
	Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawZoneTexte(position));
	// Titre
	arrayInstructions.push({drawText : true
	  , text : "Vous devez tenir votre téléphone à plat pour vous déplacer."
	  , fontSize : '20px'
	  , x :  CONST.ui.UNIT * (position.x + 1) // X
	  , y : CONST.ui.UNIT * (position.y + 2) // Y
	  , w : CONST.ui.UNIT * (position.w - 2) // Max Width
	  , lineHeight : 30 // Line Height
	});

	// Boutons
	/*var positionBtnYes = {
		  x : (Model.ui.screenSize.width - 4) / 2
		, y : position.y + 4.5
		, w : 4
		, h : 3
	};
	var instructionsBtn = InterfaceUtil.drawBtn(positionBtnYes);
	Array.prototype.push.apply(arrayInstructions, instructionsBtn);
	arrayInstructions.push({drawText : true
		, text : "OK"
		, fontSize : '30px'
		, x :  CONST.ui.UNIT * (positionBtnYes.x + 1) // X
		, y : CONST.ui.UNIT * (positionBtnYes.y + 2) - CONST.ui.UNIT / 4 // Y
		, w : CONST.ui.UNIT * (positionBtnYes.w - 2) // Max Width
		, lineHeight : 30 // Line Height
	});
	
	
	  // Mise à jour de la map d'interaction
	if(_interactionWrongOrientation.length === 0){
		_interactionWrongOrientation.push({
		    x : CONST.ui.UNIT * positionBtnYes.x
		  , y : CONST.ui.UNIT * positionBtnYes.y
		  , w : CONST.ui.UNIT * positionBtnYes.w
		  , h : CONST.ui.UNIT * positionBtnYes.h
		  , key : CONST.uiElements.BTN_YES
		});			
		
	}*/


	return arrayInstructions;
}

function paintBtnParameter_(){
	var arrayInstructions = [];
	// Boutons
	var positionBtnParam = {
		  x : Model.ui.screenSize.width - 3.5
		, y : 0
		, w : 3
		, h : 3
	};
	var instructionsBtn = InterfaceUtil.drawBtn(positionBtnParam);
	instructionsBtn.forEach(function(instruction){
		instruction.touchContext = true;
		instruction.alpha = 0.75;
	});
	Array.prototype.push.apply(arrayInstructions, instructionsBtn);
	arrayInstructions.push({drawText : true
		, text : "\ue809"
		, color : "#8f563b"
		, font : 'Fontello'
		, fontSize : '30px'
		, x :  CONST.ui.UNIT * (positionBtnParam.x + 1) // X
		, y : CONST.ui.UNIT * (positionBtnParam.y + 2) - CONST.ui.UNIT / 4 // Y
		, w : CONST.ui.UNIT * (positionBtnParam.w - 2) // Max Width
		, lineHeight : 30 // Line Height
		, touchContext : true
		, alpha : 0.75
	});

	  // Mise à jour de la map d'interaction
	if (_interactionParam.length === 0){
		_interactionParam.push({
		    x : CONST.ui.UNIT * positionBtnParam.x
		  , y : CONST.ui.UNIT * positionBtnParam.y
		  , w : CONST.ui.UNIT * positionBtnParam.w
		  , h : CONST.ui.UNIT * positionBtnParam.h
		  , key : CONST.uiElements.BTN_PARAM
		});	
		
	}

	return arrayInstructions;
}

function paintParameters_(){
	// Zone autour du personnage
	var position = {
	    x: 1
	  , y :3
	  , w: Model.ui.screenSize.width - 2.5
	  , h: Model.ui.screenSize.height - 4}
	var arrayInstructions = [{
	     custom : true
	      , key : "alphaBackground" // Sprite
	      , wOriValue : Model.ui.screenSize.width * CONST.ui.UNIT // wOriValue
	      , hOriValue : Model.ui.screenSize.height * CONST.ui.UNIT // hOriValue
	      , rowOri :  0  // rowOri
	      , colOri : 0 // colOri
	      , yDest :  0 // rowDest
	      , xDest :  0 // colDest
	      , hDest :  Model.ui.screenSize.height * CONST.ui.UNIT // hDest
	      , wDest :  Model.ui.screenSize.width * CONST.ui.UNIT // wDest
	  }];
	Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawZoneTexteAvecTitre(position));
	// Titre
	arrayInstructions.push({drawText : true
	  , text : "Paramètres"
	  , fontSize : '20px'
	  , x :  CONST.ui.UNIT * (position.x + 1) // X
	  , y : CONST.ui.UNIT * (position.y + 1) - CONST.ui.UNIT / 3 // Y
	  , w : CONST.ui.UNIT * (position.w - 2) // Max Width
	  , lineHeight : 30 // Line Height
	});

	// Boutons
	var positionBtnUltraSon = {
		  x : position.x + 0.5
		, y : position.y + 2
		, w : 3
		, h : 3
	};
	var instructionsBtn = InterfaceUtil.drawBtn(positionBtnUltraSon);
	Array.prototype.push.apply(arrayInstructions, instructionsBtn);
	arrayInstructions.push({drawText : true
		, text : Model.gameModel.parameters.mic ? "\ue815" : "\ue816"
		, color : "#8f563b"
		, font : 'Fontello'
		, fontSize : '30px'
		, x :  CONST.ui.UNIT * (positionBtnUltraSon.x + 1) // X
		, y : CONST.ui.UNIT * (positionBtnUltraSon.y + 2) - CONST.ui.UNIT / 4 // Y
		, w : CONST.ui.UNIT * (positionBtnUltraSon.w - 2) // Max Width
		, lineHeight : 30 // Line Height
	});
	arrayInstructions.push({drawText : true
	  , text : Model.gameModel.parameters.mic ? 
	  	"Désactiver le positionnement par ultrason"
	  	: "Activer le positionnement par ultrason"
	  , fontSize : '15px'
	  , x :  CONST.ui.UNIT * (positionBtnUltraSon.x + 2) + CONST.ui.UNIT / 2 // X
	  , y : CONST.ui.UNIT * (positionBtnUltraSon.y + 1) - CONST.ui.UNIT / 3 // Y
	  , w : CONST.ui.UNIT * (position.w - 4.5) // Max Width
	  , lineHeight : 25 // Line Height
	});

	var positionBtnMotion = {
		  x : positionBtnUltraSon.x
		, y : positionBtnUltraSon.y + 4
		, w : 3
		, h : 3
	};
	var instructionsBtn = InterfaceUtil.drawBtn(positionBtnMotion);
	Array.prototype.push.apply(arrayInstructions, instructionsBtn);
	arrayInstructions.push({drawText : true
		, text : Model.gameModel.parameters.motion ? "\ue812" : "\ue80a"
		, color : "#8f563b"
		, font : 'Fontello'
		, fontSize : '30px'
		, x :  CONST.ui.UNIT * (positionBtnMotion.x + 1) // X
		, y : CONST.ui.UNIT * (positionBtnMotion.y + 2) - CONST.ui.UNIT / 4 // Y
		, w : CONST.ui.UNIT * (positionBtnMotion.w - 2) // Max Width
		, lineHeight : 30 // Line Height
	});
	arrayInstructions.push({drawText : true
	  , text : Model.gameModel.parameters.motion ? 
	  	"Désactiver le déplacement par l'accéloromètre"
	  	: "Activer le déplacement par l'accéloromètre"
	  , fontSize : '15px'
	  , x :  CONST.ui.UNIT * (positionBtnMotion.x + 2) + CONST.ui.UNIT / 2 // X
	  , y : CONST.ui.UNIT * (positionBtnMotion.y + 1) - CONST.ui.UNIT / 3 // Y
	  , w : CONST.ui.UNIT * (position.w - 4.5) // Max Width
	  , lineHeight : 25 // Line Height
	});

	  // Mise à jour de la map d'interaction
	if(_interactionParams.length === 0){
		_interactionParams.push({
		    x : CONST.ui.UNIT * (Model.ui.screenSize.width - 3)
		  , y : CONST.ui.UNIT * 3
		  , w : CONST.ui.UNIT * 3
		  , h : CONST.ui.UNIT * 1
		  , key : CONST.uiElements.BTN_PARAM_CLOSE
		});	
		_interactionParams.push({
		    x : CONST.ui.UNIT * positionBtnUltraSon.x
		  , y : CONST.ui.UNIT * positionBtnUltraSon.y
		  , w : CONST.ui.UNIT * positionBtnUltraSon.w
		  , h : CONST.ui.UNIT * positionBtnUltraSon.h
		  , key : CONST.uiElements.BTN_PARAM_MIC
		});	
		_interactionParams.push({
		    x : CONST.ui.UNIT * positionBtnMotion.x
		  , y : CONST.ui.UNIT * positionBtnMotion.y
		  , w : CONST.ui.UNIT * positionBtnMotion.w
		  , h : CONST.ui.UNIT * positionBtnMotion.h
		  , key : CONST.uiElements.BTN_PARAM_MOTION
		});	
		
	}


	return arrayInstructions;
}

function paintBtnArrow_(){
	
	var arrayInstructions = [];
	// Boutons
	var positionBtnUp = {
		  x : Model.ui.screenSize.width - 5
		, y : Model.ui.screenSize.height - 5
		, w : 3
		, h : 3
	};
	var instructionsBtnUp = InterfaceUtil.drawBtn(positionBtnUp);
	instructionsBtnUp.forEach(function(instruction){
		instruction.touchContext = true;
		instruction.alpha = 0.75;
	});
	Array.prototype.push.apply(arrayInstructions, instructionsBtnUp);
	arrayInstructions.push({drawText : true
		, text : "\ue81a" 
		, color : "#8f563b"
		, font : 'Fontello'
		, fontSize : '30px'
		, x :  CONST.ui.UNIT * (positionBtnUp.x + 1) // X
		, y : CONST.ui.UNIT * (positionBtnUp.y + 2) - CONST.ui.UNIT / 4 // Y
		, w : CONST.ui.UNIT * (positionBtnUp.w - 2) // Max Width
		, lineHeight : 30 // Line Height
		, touchContext : true
		, alpha : 0.75
	});

	var positionBtnLeft = {
		  x : Model.ui.screenSize.width - 7
		, y : Model.ui.screenSize.height - 3
		, w : 3
		, h : 3
	};
	var instructionsBtnLeft = InterfaceUtil.drawBtn(positionBtnLeft);
	instructionsBtnLeft.forEach(function(instruction){
		instruction.touchContext = true;
		instruction.alpha = 0.75;
	});
	Array.prototype.push.apply(arrayInstructions, instructionsBtnLeft);
	arrayInstructions.push({drawText : true
		, text : "\ue818" 
		, color : "#8f563b"
		, font : 'Fontello'
		, fontSize : '30px'
		, x :  CONST.ui.UNIT * (positionBtnLeft.x + 1) // X
		, y : CONST.ui.UNIT * (positionBtnLeft.y + 2) - CONST.ui.UNIT / 4 // Y
		, w : CONST.ui.UNIT * (positionBtnLeft.w - 2) // Max Width
		, lineHeight : 30 // Line Height
		, touchContext : true
		, alpha : 0.75
	});

	var positionBtnRight = {
		  x : Model.ui.screenSize.width - 3
		, y : Model.ui.screenSize.height - 3
		, w : 3
		, h : 3
	};
	var instructionsBtnRight = InterfaceUtil.drawBtn(positionBtnRight);
	instructionsBtnRight.forEach(function(instruction){
		instruction.touchContext = true;
		instruction.alpha = 0.75;
	});
	Array.prototype.push.apply(arrayInstructions, instructionsBtnRight);
	arrayInstructions.push({drawText : true
		, text : "\ue819" 
		, color : "#8f563b"
		, font : 'Fontello'
		, fontSize : '30px'
		, x :  CONST.ui.UNIT * (positionBtnRight.x + 1) // X
		, y : CONST.ui.UNIT * (positionBtnRight.y + 2) - CONST.ui.UNIT / 4 // Y
		, w : CONST.ui.UNIT * (positionBtnRight.w - 2) // Max Width
		, lineHeight : 30 // Line Height
		, touchContext : true
		, alpha : 0.75
	});

	var positionBtnDown = {
		  x : Model.ui.screenSize.width - 5
		, y : Model.ui.screenSize.height - 3
		, w : 3
		, h : 3
	};
	var instructionsBtnDown = InterfaceUtil.drawBtn(positionBtnDown);
	instructionsBtnDown.forEach(function(instruction){
		instruction.touchContext = true;
		instruction.alpha = 0.75;
	});
	Array.prototype.push.apply(arrayInstructions, instructionsBtnDown);
	arrayInstructions.push({drawText : true
		, text : "\ue817" 
		, color : "#8f563b"
		, font : 'Fontello'
		, fontSize : '30px'
		, x :  CONST.ui.UNIT * (positionBtnDown.x + 1) // X
		, y : CONST.ui.UNIT * (positionBtnDown.y + 2) - CONST.ui.UNIT / 4 // Y
		, w : CONST.ui.UNIT * (positionBtnDown.w - 2) // Max Width
		, lineHeight : 30 // Line Height
		, touchContext : true
		, alpha : 0.75
	});
	
	  // Mise à jour de la map d'interaction
	if(_interactionArrow.length === 0){		
		_interactionArrow.push({
		    x : CONST.ui.UNIT * positionBtnUp.x
		  , y : CONST.ui.UNIT * positionBtnUp.y
		  , w : CONST.ui.UNIT * positionBtnUp.w
		  , h : CONST.ui.UNIT * positionBtnUp.h
		  , key : CONST.uiElements.BTN_DIRECTION_UP
		  , priority : -1
		});	
		_interactionArrow.push({
		    x : CONST.ui.UNIT * positionBtnLeft.x
		  , y : CONST.ui.UNIT * positionBtnLeft.y
		  , w : CONST.ui.UNIT * positionBtnLeft.w
		  , h : CONST.ui.UNIT * positionBtnLeft.h
		  , key : CONST.uiElements.BTN_DIRECTION_LEFT
		  , priority : -1
		});	
		_interactionArrow.push({
		    x : CONST.ui.UNIT * positionBtnRight.x
		  , y : CONST.ui.UNIT * positionBtnRight.y
		  , w : CONST.ui.UNIT * positionBtnRight.w
		  , h : CONST.ui.UNIT * positionBtnRight.h
		  , key : CONST.uiElements.BTN_DIRECTION_RIGHT
		  , priority : -1
		});	
		_interactionArrow.push({
		    x : CONST.ui.UNIT * positionBtnDown.x
		  , y : CONST.ui.UNIT * positionBtnDown.y
		  , w : CONST.ui.UNIT * positionBtnDown.w
		  , h : CONST.ui.UNIT * positionBtnDown.h
		  , key : CONST.uiElements.BTN_DIRECTION_DOWN
		  , priority : -1
		});	
	
		
	}


	return arrayInstructions;
}

// API

function gameScreen(){
	if (!_addInteractions){
		registerInteractions_();
		_addInteractions = true;
	}

	var arrayInstructions = [];
	if (!Model.gameModel.parameters.motion){
		Array.prototype.push.apply(arrayInstructions, paintBtnArrow_());
	}
	Array.prototype.push.apply(arrayInstructions, paintUsers_());
	arrayInstructions.push(paintUser_());
	if(_showParam){
		Array.prototype.push.apply(arrayInstructions, paintParameters_());
	}else if (_showConfirmStand){
		Array.prototype.push.apply(arrayInstructions, paintConfirmation_());
	}else if (Model.gameModel.parameters.wrongOrientation){		
		Array.prototype.push.apply(arrayInstructions, paintWrongOrientation_());
	}else if (Model.gameModel.parameters.useParams){
		Array.prototype.push.apply(arrayInstructions, paintBtnParameter_());

	}

	// Calcul des interactions
	// On doit calculer en fonction de l'emplacement de la map dans l'écran
	checkInteractions_();
	
	return arrayInstructions;
}

module.exports = {
	gameScreen : gameScreen
};