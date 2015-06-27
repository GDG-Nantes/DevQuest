'use strict';
var Model = require('./model.js');
var Background = require('./background.js');

function extractBackground(){
	return Background;
}

function drawPixel(pixelToPaint, row, col){
	var image = Model.ui.resources.images['magecity'];	
	var regExp = /(\d\d).(\d)/;
	var pixelValue = 32;
	var rowOri = regExp.exec(pixelToPaint)[1]|0;
	var colOri = regExp.exec(pixelToPaint)[2];

	Model.ui.context.drawImage(image
		, pixelValue * rowOri //sx clipping de l'image originale
		, pixelValue * colOri //sy clipping de l'image originale
		, pixelValue // swidth clipping de l'image originale
		, pixelValue // sheight clipping de l'image originale
		, pixelValue * row // x Coordonnées dans le dessin du Model.ui.canvas
		, pixelValue * col // y Coordonnées dans le dessin du Model.ui.canvas
		, pixelValue // width taille du dessin
		, pixelValue // height taille du dessin			
		);
}

function paintBackground(){
	var arrayTmp = extractBackground();
	var rowIndex = 0;
	var colIndex = 0;
	for (var row in arrayTmp){
		var rowArray = arrayTmp[row];		
		for (var col in rowArray){
			drawPixel(rowArray[col], rowIndex, colIndex);
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