'use strict';
var CONST = require('../model/const.js');
var Model = require('../model/model.js');
var Stands = require('../assets/stands.js');

var lastPoint = {
	x : 0,
	y : 0
}


function checkInteractions_(){
  if (lastPoint.x !=  Model.gameModel.positionScreen.x
  	|| lastPoint.y != Model.gameModel.positionScreen.y){  	
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
	  			});
	  	}
	  });
	  lastPoint = Model.gameModel.positionScreen;
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


// API

function gameScreen(){

	var arrayInstructions = [];
	arrayInstructions.push(paintUser_());

	// Calcul des interactions
	// On doit calculer en fonction de l'emplacement de la map dans l'écran
	checkInteractions_();
	
	return arrayInstructions;
}

module.exports = {
	gameScreen : gameScreen
};