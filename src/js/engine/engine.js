'use strict';
var Model = require('../model/model.js');
var Inputs = require('../triggers/inputs.js');
var UI = require('./ui.js');
var CONST = require('../model/const.js');
var Socials = require('../triggers/socials.js');

var runActiv = false;	

function registerInteractions_(){
	Inputs.registerInteraction({
		type : CONST.eventType.UP
		, key : [
			CONST.uiElements.BTN_DEMARER
			, CONST.uiElements.BTN_G_PLUS
			, CONST.uiElements.BTN_TWITTER
			, CONST.uiElements.BTN_GITHUB
			, CONST.uiElements.BTN_RIGHT
			, CONST.uiElements.BTN_LEFT
			, CONST.uiElements.BTN_CHOISIR
			, CONST.uiElements.DOOR
			]
		, callback : processInteraction_
	});	
}

function processInteraction_(event){

	if (event && event.type  === CONST.eventType.UP){		
		switch(event.key){
		    case CONST.uiElements.BTN_DEMARER :       
		    	// On regarde si on a déjà un user de stocké sinon, on passe l'écran suivant 
		    	if (!Model.gameModel.showStory){
		    		Model.ui.changeScreen = CONST.screens.STORY;        
		    		Model.gameModel.showStory = true;
		    	}else if (!Model.gameModel.user){
		    		Model.ui.changeScreen = CONST.screens.LOGIN;        
		    	}else if (Model.gameModel.indexUser === -1){
		    		Model.ui.changeScreen = CONST.screens.CHOOSE_USER;        
		    	}else{
		    		Model.ui.changeScreen = CONST.screens.GAME;
		    	}
		    break;
		    case CONST.uiElements.BTN_G_PLUS :       
		    case CONST.uiElements.BTN_TWITTER :       
		    case CONST.uiElements.BTN_GITHUB :       
		    case CONST.uiElements.BTN_CUSTO :       
		    	Socials.login(event.key);
		    break;
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
		    case CONST.uiElements.DOOR :                 
		        Model.ui.changeScreen = CONST.screens.GAME;        
		        break;
		    case CONST.screens.INSIDE_SILVER :    
		    case CONST.screens.INSIDE_GOLD :    
		    case CONST.screens.INSIDE_PLATINIUM :    
		    	Model.gameModel.standId = event.id;
		    	Model.ui.changeScreen = event.key;        
		    default:
		}
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

		// Mise à jour du modèle firebase
		Model.services.fbActivRef.child(Model.gameModel.userHash).set({
			id : Model.gameModel.userHash,
			position : Model.gameModel.position,
			indexUser : Model.gameModel.indexUser
		});
	}
}

function processUsers_(){
	if (Model.ui.usersChange){		
		Model.ui.usersChange = false;
		var arrayUsersTmp = [];
		var tmpMapPositions = {};
		Object.keys(Model.services.activUsers).forEach(function forFbUsers(idUser){
			var userTmp = Model.services.activUsers[idUser];
			if (userTmp.position.x >= Model.gameModel.positionScreen.x
				&& userTmp.position.x < (Model.gameModel.positionScreen.x + Model.ui.screenSize.width)
				&& userTmp.position.y >= Model.gameModel.positionScreen.y
				&& userTmp.position.y < (Model.gameModel.positionScreen.y + Model.ui.screenSize.height)
				&& !tmpMapPositions[userTmp.position.x+'.'+userTmp.position.y]){
				arrayUsersTmp.push(userTmp);			
				tmpMapPositions[userTmp.position.x+'.'+userTmp.position.y] = true;
			}
		});
		Model.ui.users = arrayUsersTmp;
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
		processUsers_();
		if (runActiv){
			window.requestAnimationFrame(run_);
		}
	}catch(err){
		console.error("Error  : %s \n %s",err.message, err.stack);			
	}
}

function startEngine_(){
	if (!runActiv){
		Model.gameModel.lastTime = Date.now();
		runActiv = true;		
		run_();
		UI.startPaint();
		Inputs.initListeners();
		Firebase.goOnline();
		Model.services.fbActivRef.once("value", function(snap){
			Model.services.activUsers = !snap.val() ? {} : snap.val() ;
		});
	}	
}

function stopEngine_(){
	Model.gameModel.time += Date.now() - Model.gameModel.lastTime;
	runActiv = false;
	UI.stopPaint();
	Inputs.removeListeners();
	Model.services.fbActivRef.child(Model.gameModel.userHash).remove();
	Firebase.goOffline();
}

// API

function start(){
	registerInteractions_();	
	manageVisibility_();
	startEngine_();
}

module.exports = {
	start : start
};
