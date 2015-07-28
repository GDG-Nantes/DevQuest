'use strict';
var Model = require('../model/model.js');
var Inputs = require('../triggers/inputs.js');
var UI = require('./ui.js');
var CONST = require('../model/const.js');

var runActiv = false;	

function processInteraction_(){
	if (Model.ui.interaction.type && 
		Model.ui.interaction.type  === CONST.directions.UP){		
		switch(Model.ui.interaction.key){
			case CONST.uiElements.BTN_RIGHT : 
		        Model.gameModel.indexUser = (Model.gameModel.indexUser + 1) % CONST.characters.length;
		        break;
		    case CONST.uiElements.BTN_LEFT :                 
		        Model.gameModel.indexUser = (Model.gameModel.indexUser - 1);
		        if (Model.gameModel.indexUser < 0){
		          Model.gameModel.indexUser = CONST.characters.length - 1;
		        }
		        break;
		    case CONST.uiElements.BTN_CHOISIR :                 
		        Model.ui.changeScreen = CONST.screens.GAME;        
		        break;
		    case CONST.screens.INSIDE_SILVER :    
		    case CONST.screens.INSIDE_GOLD :    
		    case CONST.screens.INSIDE_PLATINIUM :    
		    	Model.ui.changeScreen = Model.ui.interaction.key;        
		    	Model.gameModel.standId = Model.ui.interaction.id;
		    default:
		}
    	Model.ui.interaction.type = '';
    	Model.ui.interaction.key = '';		
    	Model.ui.interaction.id = '';		
	}
}

function processDirection_(){
	if (Model.gameModel.inputArray.length > 0){
		// On va traiter les mouvements présents dans la queue
		var directionTmp = Model.gameModel.inputArray[0];
		Model.gameModel.inputArray = Model.gameModel.inputArray.slice(1,Model.gameModel.inputArray.length+1);
		var positionTmp = {
			x : Model.gameModel.position.x,
			y : Model.gameModel.position.y

		},	positionScreenTmp = {
			x : Model.gameModel.positionScreen.x,
			y : Model.gameModel.positionScreen.y			
		}
		// On va appliquer le mouvement théorique du personnage
		switch (Model.gameModel.position.direction){
			case CONST.directions.LEFT:
				positionTmp.x = Math.max(0, Model.gameModel.position.x - 1);
				break;
			case CONST.directions.UP:
				positionTmp.y = Math.max(0, Model.gameModel.position.y - 1);
				break;
			case CONST.directions.RIGHT:
				positionTmp.x = Math.min(CONST.ui.SIZE_UNIT.w, Model.gameModel.position.x + 1);
				break;
			case CONST.directions.DOWN:
				positionTmp.y = Math.min(CONST.ui.SIZE_UNIT.h, Model.gameModel.position.y + 1);
				break;

		}

		// On va vérifier qu'on a pas de conflit sur la position choisie
		if (Model.ui.mapCollision.length > positionTmp.y
		&& Model.ui.mapCollision[positionTmp.y].length > positionTmp.x
		&& !Model.ui.mapCollision[positionTmp.y][positionTmp.x]){
			Model.gameModel.position.x = positionTmp.x;
			Model.gameModel.position.y = positionTmp.y;
		}
		// On applique aussi le mouvement théorique de l'écran (différent car on cherche à maximiser les moments ou le personnage est au milieu)
		if (Model.gameModel.position.x < Model.ui.middlePoint.x){
			positionScreenTmp.x = Math.min(0,Model.gameModel.position.x);
		}else {
			positionScreenTmp.x = Math.min(Model.gameModel.position.x - Model.ui.middlePoint.x, CONST.ui.SIZE_UNIT.w - Model.ui.screenSize.width);
		}
		
		if (Model.gameModel.position.y < Model.ui.middlePoint.y){
			positionScreenTmp.y = Math.min(0,Model.gameModel.position.y);
		}else {
			positionScreenTmp.y = Math.min(Model.gameModel.position.y - Model.ui.middlePoint.y, CONST.ui.SIZE_UNIT.h - Model.ui.screenSize.height);
		}

		// On applique la position
		Model.gameModel.positionScreen.x = positionScreenTmp.x;
		Model.gameModel.positionScreen.y = positionScreenTmp.y;		
	}
}

function manageVisibility_(){
	// Set the name of the hidden property and the change event for visibility
	var hidden, visibilityChange; 
	if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
	  hidden = "hidden";
	  visibilityChange = "visibilitychange";
	} else if (typeof document.mozHidden !== "undefined") {
	  hidden = "mozHidden";
	  visibilityChange = "mozvisibilitychange";
	} else if (typeof document.msHidden !== "undefined") {
	  hidden = "msHidden";
	  visibilityChange = "msvisibilitychange";
	} else if (typeof document.webkitHidden !== "undefined") {
	  hidden = "webkitHidden";
	  visibilityChange = "webkitvisibilitychange";
	}
	
	// Warn if the browser doesn't support addEventListener or the Page Visibility API
	if (typeof document.addEventListener === "undefined" || 
	  typeof document[hidden] === "undefined") {
	  alert("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
	} else {
		// Handle page visibility change   
		document.addEventListener(visibilityChange, function handleVisibilityChange(){
			if (document[hidden]) {
				localStorage['game_model'] = JSON.stringify(Model.gameModel);
				stopEngine_();
			} else {
				startEngine_();
			}
		}, false);
	    
	  
	}
}

function run_(){
	try{
		processDirection_();
		processInteraction_();
		if (runActiv){
			window.requestAnimationFrame(run_);
		}
	}catch(err){
		console.error("Error  : %s \n %s",err.message, err.stack);			
	}
}

function startEngine_(){
	if (!runActiv){
		runActiv = true;		
		run_();
		UI.startPaint();
		Inputs.initListeners();
	}	
}

function stopEngine_(){
	runActiv = false;
	UI.stopPaint();
	Inputs.removeListeners();
}

// API

function start(){
	if (localStorage["game_model"]){
		Model.gameModel = JSON.parse(localStorage["game_model"]);
	}
	manageVisibility_();
	startEngine_();
}

module.exports = {
	start : start
};
