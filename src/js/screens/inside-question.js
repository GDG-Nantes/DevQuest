'use strict'

var CONST = require('../model/const.js');
var Model = require('../model/model.js');
var Inside = require('../assets/inside.js');

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
			      custom : true
			      , key : colArray[0] // Sprite
			      , wOriValue : CONST.ui.UNIT // wOriValue
			      , hOriValue : CONST.ui.UNIT // hOriValue
			      , rowOri :  rowOri // rowOri
			      , colOri : colOri // colOri
			      , yDest :  rowIndex|0 // rowDest
			      , xDest :  colIndex|0 // colDest
			      , hDest :  CONST.ui.UNIT // hDest
			      , wDest :  CONST.ui.UNIT // wDest
			    });				
			}
		});
	});
	

	// On ajout la question
}

module.exports = {
	insideQuestion : insideQuestion
};