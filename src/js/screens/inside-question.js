'use strict'

var CONST = require('../model/const.js');
var Model = require('../model/model.js');
var Inside = require('../assets/inside.js');
var Questions = require('../model/questions.js');

function insideQuestion(){
	var arrayInstructions = [];

	// On récupère le bon type de stand
	var arrayInside = [];
	switch(Model.ui.screen){
		case CONST.screens.INSIDE_SILVER : 
			arrayInside = Inside.showSilverStand();
			break;
		case CONST.screens.INSIDE_GOLD : 
			arrayInside = Inside.showGoldStand();
			break;
		case CONST.screens.INSIDE_PLATINIUM : 
			arrayInside = Inside.showPlatiniumStand();
			break;
	}

	// On convertit les informations en instructions de dessin
	var regExp = /(\d\d).(\d)/;
	arrayInside.forEach(function(rowArray, rowIndex){
		rowArray.forEach(function(colArray, colIndex){			
			for (var doublon = 1; doublon < colArray.length; doublon++){
				var pixelToPaint = colArray[doublon];
				var rowOri = regExp.exec(pixelToPaint)[1]|0;
				var colOri = regExp.exec(pixelToPaint)[2]|0;
				
				arrayInstructions.push({
			      key : colArray[0] // Sprite
			      , wOriValue : CONST.ui.UNIT // wOriValue
			      , hOriValue : CONST.ui.UNIT // hOriValue
			      , rowOri :  rowOri // rowOri
			      , colOri : colOri // colOri
			      , rowDest :  rowIndex|0 // rowDest
			      , colDest :  colIndex|0 // colDest
			    });				
			}
		});
	});
	

	// On ajoute la question
	var question = Questions.filter(function(questionTmp){
		return questionTmp.id === Model.gameModel.standId;
	})[0];
	 arrayInstructions.push({drawText : true
      , text : question.question
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * 1 // X
      , y : CONST.ui.UNIT * 3 // Y
      , w : CONST.ui.UNIT * 10 // Max Width
      , lineHeight : 30 // Line Height
  });


	return arrayInstructions;
}

module.exports = {
	insideQuestion : insideQuestion
};