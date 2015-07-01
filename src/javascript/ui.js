'use strict';
var Model = require('./model.js');
var Background = require('./background.js');
var Stands = require('./stands.js');
var CONST = require('./const.js');
// On défini l'ensemble des array qui vont servir pour le dessin
var solArray = Background.initSol();
var contourArray = Background.initContour();
var mursArray = Background.initMurs();;
var herbeArray = Background.initHerbe();
var sortiesArray = Background.initSorties();
var screenSize = {
				width : Model.ui.canvas.width
				, height : Model.ui.canvas.height};


function addFromArray(cel, arrayOri, row, col){	
	var valueTmp = arrayOri[row][col];
	if (Array.isArray(arrayOri[row][col])){
		for (var doublon in valueTmp){
			cel.push(valueTmp[doublon]);
		}
	}else if (valueTmp != ''){
		cel.push(valueTmp);
	}
}

function extractBackground(){
	var array = [];
	var minX = Math.min(Model.gameModel.position.x, CONST.SIZE_UNIT.w - screenSize.width);
	var minY = Math.min(Model.gameModel.position.y, CONST.SIZE_UNIT.h - screenSize.height);

	for (var row = minY; row < minY + screenSize.height; row++){
		var arrayRow = [];
		for (var col =minX; col < minY + screenSize.width; col++){
			var cel = [];
			addFromArray(cel,solArray,row, col);
			addFromArray(cel,contourArray,row, col);
			addFromArray(cel,mursArray,row, col);
			addFromArray(cel,herbeArray,row, col);
			addFromArray(cel,sortiesArray,row, col);
			arrayRow.push(cel);
		}
		array.push(arrayRow);
	}
	return array;
}


function drawPixel(pixelToPaint, row, col){
	if (pixelToPaint === '')
		return;
	var image = Model.ui.resources.images['magecity'];	
	var regExp = /(\d\d).(\d)/;
	var pixelValue = 32;
	var rowOri = regExp.exec(pixelToPaint)[1]|0;
	var colOri = regExp.exec(pixelToPaint)[2];

	Model.ui.context.drawImage(image
		, pixelValue * colOri //sx clipping de l'image originale
		, pixelValue * rowOri //sy clipping de l'image originale
		, pixelValue // swidth clipping de l'image originale
		, pixelValue // sheight clipping de l'image originale
		, pixelValue * col // x Coordonnées dans le dessin du Model.ui.canvas
		, pixelValue * row // y Coordonnées dans le dessin du Model.ui.canvas
		, pixelValue // width taille du dessin
		, pixelValue // height taille du dessin			
		);
}

function paintBackground(){
	// Référence graphique : Mezzanine Cité : 27mx21.3m => 27x22
	// 1m = 64px => Image de 1792x1472
	var arrayTmp = extractBackground();
	//var arrayStands = Stands.initStands();
	var rowIndex = 0;
	var colIndex = 0;
	for (var row in arrayTmp){
		var rowArray = arrayTmp[row];		
		for (var col in rowArray){
			if (Array.isArray(rowArray[col])){
				for (var doublon in rowArray[col]){
					drawPixel(rowArray[col][doublon], rowIndex, colIndex);	
				}
			}else{
				drawPixel(rowArray[col], rowIndex, colIndex);
			}
			/*if (Array.isArray(arrayStands[row][col])){
				for (var doublon in arrayStands[row][col]){
					drawPixel(arrayStands[row][col][doublon], rowIndex, colIndex);	
				}
			}else{
				drawPixel(arrayStands[row][col], rowIndex, colIndex);
			}*/
			colIndex++;
		}
		colIndex = 0;
		rowIndex++;
	}
}

// API

function paint(){	
	paintBackground();
}

module.exports = {
	paint : paint
};