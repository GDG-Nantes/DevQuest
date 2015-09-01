'use strict';
var CONST = require('../model/const.js');
var Model = require('../model/model.js');
var Stands = require('../assets/stands.js');
var Inputs = require('../triggers/inputs.js');
var InterfaceUtil = require('../assets/interface-utils.js');

var lastPoint_ = {
	x : 0,
	y : 0
	}
	, interactionParam_ = []
	, showParam_ = false
	, addInteractions_ = false;

function registerInteractions_(){
	Inputs.registerInteraction({
		type : CONST.directions.DOWN
		, key : [
			CONST.uiElements.BTN_PARAM,			
			CONST.uiElements.BTN_PARAM_CLOSE,			
			CONST.uiElements.BTN_PARAM_MIC,			
			CONST.uiElements.BTN_PARAM_MOTION			
		]
		, callback : processInteractions_
	});
	
}

function processInteractions_(event){
  if (event.type && 
		event.type  === CONST.directions.DOWN){		
		switch(event.key){
		    case CONST.uiElements.BTN_PARAM :   
		    	showParam_ = true;
		    	break;		
		     case CONST.uiElements.BTN_PARAM_CLOSE :   
		    	showParam_ = false;
		    	break;		    
		    case CONST.uiElements.BTN_PARAM_MIC :   
		    	Model.gameModel.parameters.mic = !Model.gameModel.parameters.mic;
		    	break;		    
		    case CONST.uiElements.BTN_PARAM_MOTION :   
		    	Model.gameModel.parameters.motion = !Model.gameModel.parameters.motion;
		    	break;		    
		}
	}
}

function checkInteractions_(){
  if (lastPoint_.x !=  Model.gameModel.positionScreen.x
  	|| lastPoint_.y != Model.gameModel.positionScreen.y
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
	  lastPoint_ = Model.gameModel.positionScreen;
	  Array.prototype.push.apply(Model.ui.mapInteraction, interactionParam_);
  }
}
 

function paintCharacter_(sprite, direction, step, x, y){
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
		Model.gameModel.position.direction, // Orientation du joeur
		Model.gameModel.position.stepCount, // état du sprite
		Model.gameModel.position.x - Model.gameModel.positionScreen.x, // x du joueur
		Model.gameModel.position.y - Model.gameModel.positionScreen.y // y du joueur
		);
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
	if (Model.ui.changeScreen != CONST.screens.GAME){
		interactionParam_ = [];
		interactionParam_.push({
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
	var arrayInstructions = InterfaceUtil.drawAlphaBackground();
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
	if (Model.ui.changeScreen != CONST.screens.GAME){
		interactionParam_ = [];
		interactionParam_.push({
		    x : CONST.ui.UNIT * (Model.ui.screenSize.width - 3)
		  , y : CONST.ui.UNIT * 3
		  , w : CONST.ui.UNIT * 3
		  , h : CONST.ui.UNIT * 1
		  , key : CONST.uiElements.BTN_PARAM_CLOSE
		});	
		interactionParam_.push({
		    x : CONST.ui.UNIT * positionBtnUltraSon.x
		  , y : CONST.ui.UNIT * positionBtnUltraSon.y
		  , w : CONST.ui.UNIT * positionBtnUltraSon.w
		  , h : CONST.ui.UNIT * positionBtnUltraSon.h
		  , key : CONST.uiElements.BTN_PARAM_MIC
		});	
		interactionParam_.push({
		    x : CONST.ui.UNIT * positionBtnMotion.x
		  , y : CONST.ui.UNIT * positionBtnMotion.y
		  , w : CONST.ui.UNIT * positionBtnMotion.w
		  , h : CONST.ui.UNIT * positionBtnMotion.h
		  , key : CONST.uiElements.BTN_PARAM_MOTION
		});	
		
	}


	return arrayInstructions;
}

// API

function gameScreen(){
	if (!addInteractions_){
		registerInteractions_();
		addInteractions_ = true;
	}

	var arrayInstructions = [];
	arrayInstructions.push(paintUser_());
	if (!showParam_){
		Array.prototype.push.apply(arrayInstructions, paintBtnParameter_());
	}else{
		Array.prototype.push.apply(arrayInstructions, paintParameters_());
	}

	// Calcul des interactions
	// On doit calculer en fonction de l'emplacement de la map dans l'écran
	checkInteractions_();
	
	return arrayInstructions;
}

module.exports = {
	gameScreen : gameScreen
};