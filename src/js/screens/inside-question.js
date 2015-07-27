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
	var rowIndex = 0;
	var colIndex = 0;
	var regExp = /(\d\d).(\d)/;
	for (var row in arrayInside){
		var rowArray = arrayInside[row];
		for (var col in rowArray){
			for (var doublon = 1; doublon < rowArray[col].length; doublon++){
				var pixelToPaint = rowArray[col][doublon];
				var rowOri = regExp.exec(pixelToPaint)[1]|0;
				var colOri = regExp.exec(pixelToPaint)[2]|0;
				
				arrayInstructions.push({
			      custom : true
			      , key : rowArray[col][0] // Sprite
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
			colIndex++;
		}
		colIndex = 0;
		rowIndex++;
	}


	// On ajout la question
}

module.exports = {
	insideQuestion : insideQuestion
};