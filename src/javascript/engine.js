'use strict';
var Model = require('./model.js');
var Inputs = require('./inputs.js');
var UI = require('./ui.js');
var CONST = require('./const.js');
var runActiv = false;


function processDirection(){
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
			case CONST.LEFT:
				positionTmp.x = Math.max(0, Model.gameModel.position.x - 1);
				break;
			case CONST.UP:
				positionTmp.y = Math.max(0, Model.gameModel.position.y - 1);
				break;
			case CONST.RIGHT:
				positionTmp.x = Math.min(CONST.SIZE_UNIT.w, Model.gameModel.position.x + 1);
				break;
			case CONST.DOWN:
				positionTmp.y = Math.min(CONST.SIZE_UNIT.h, Model.gameModel.position.y + 1);
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
			positionScreenTmp.x = Math.min(Model.gameModel.position.x - Model.ui.middlePoint.x, CONST.SIZE_UNIT.w - Model.ui.screenSize.width);
		}
		
		if (Model.gameModel.position.y < Model.ui.middlePoint.y){
			positionScreenTmp.y = Math.min(0,Model.gameModel.position.y);
		}else {
			positionScreenTmp.y = Math.min(Model.gameModel.position.y - Model.ui.middlePoint.y, CONST.SIZE_UNIT.h - Model.ui.screenSize.height);
		}

		// On applique la position
		Model.gameModel.positionScreen.x = positionScreenTmp.x;
		Model.gameModel.positionScreen.y = positionScreenTmp.y;		
	}
}

function manageVisibility(){
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
				stopEngine();
			} else {
				startEngine();
			}
		}, false);
	    
	  
	}
}

function run(){
	try{
		processDirection();
		if (runActiv){
			window.requestAnimationFrame(run);
		}
	}catch(err){
		console.error("Error  : %s \n %s",err.message, err.stack);			
	}
}

function startEngine(){
	if (!runActiv){
		runActiv = true;		
		run();
		UI.startPaint();
		Inputs.initListeners();
	}	
}

function stopEngine(){
	runActiv = false;
	UI.stopPaint();
	Inputs.removeListeners();
}

// API

function start(){
	manageVisibility();
	startEngine();
}

module.exports = {
	start : start
};
