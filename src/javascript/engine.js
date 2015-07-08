'use strict';
var Model = require('./model.js');
var CONST = require('./const.js');


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
		}else if (Model.gameModel.position.x >= Model.ui.screenSize.width - Model.ui.middlePoint.x){
			positionScreenTmp.x = Math.min(Model.gameModel.position.x, CONST.SIZE_UNIT.w - Model.ui.screenSize.width);
		}else{
			positionScreenTmp.x = Model.gameModel.position.x - Model.ui.middlePoint.x;
		}
		if (Model.gameModel.position.y < Model.ui.middlePoint.y){
			positionScreenTmp.y = Math.min(0,Model.gameModel.position.y);
		}else if (Model.gameModel.position.y >= Model.ui.screenSize.height - Model.ui.middlePoint.y){
			positionScreenTmp.y = Math.min(Model.gameModel.position.y, CONST.SIZE_UNIT.h - Model.ui.screenSize.height);
		}else{
			positionScreenTmp.y = Model.gameModel.position.y - Model.ui.middlePoint.y;
		}

		// On applique la position
		Model.gameModel.positionScreen.x = positionScreenTmp.x;
		Model.gameModel.positionScreen.y = positionScreenTmp.y;
		console.log("PositionUser : %s;%s",Model.gameModel.position.x,Model.gameModel.position.y);
		console.log("PositionScreen : %s;%s",Model.gameModel.positionScreen.x,Model.gameModel.positionScreen.y);
	}
}

// API

function run(){
	try{
		processDirection();
		window.requestAnimationFrame(run);
	}catch(err){
		console.error("Error  : %s \n %s",err.message, err.stack);			
	}
}

module.exports = {
	run : run
};
