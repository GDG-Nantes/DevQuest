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
var standsArray = Stands.initStands();
var stepMove = 0;
var paintActive = false;


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

/*
	Extrait le background correspond à la taille de l'écran
*/
function extractBackground(){
	var array = [];
	var minX = Model.gameModel.positionScreen.x;
	var minY = Model.gameModel.positionScreen.y;

	for (var row = minY; row < minY + Model.ui.screenSize.height; row++){
		var arrayRow = [];
		for (var col =minX; col < minX + Model.ui.screenSize.width; col++){
			var cel = [];
			addFromArray(cel,solArray,row, col);
			addFromArray(cel,contourArray,row, col);
			addFromArray(cel,mursArray,row, col);
			addFromArray(cel,herbeArray,row, col);
			addFromArray(cel,sortiesArray,row, col);
			addFromArray(cel,standsArray,row, col);
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
	var pixelValue = CONST.UNIT;
	var drawPixelValue = CONST.UNIT;
	var rowOri = regExp.exec(pixelToPaint)[1]|0;
	var colOri = regExp.exec(pixelToPaint)[2]|0;

	Model.ui.context.drawImage(image
		, pixelValue * colOri //sx clipping de l'image originale
		, pixelValue * rowOri //sy clipping de l'image originale
		, pixelValue // swidth clipping de l'image originale
		, pixelValue // sheight clipping de l'image originale
		, drawPixelValue * col // x Coordonnées dans le dessin du Model.ui.canvas
		, drawPixelValue * row // y Coordonnées dans le dessin du Model.ui.canvas
		, drawPixelValue // width taille du dessin
		, drawPixelValue // height taille du dessin			
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
					drawPixel(rowArray[col][doublon], rowIndex|0, colIndex|0);	
				}
			}else{
				drawPixel(rowArray[col], rowIndex|0, colIndex|0);
			}
			colIndex++;
		}
		colIndex = 0;
		rowIndex++;
	}
	// Grille 
	var grille = false;
	if (grille){		
		for (var x = 0; x < Model.ui.canvas.width; x+=CONST.UNIT){
			Model.ui.context.beginPath();
			Model.ui.context.moveTo(x,0);
			Model.ui.context.lineTo(x, Model.ui.canvas.height);
			Model.ui.context.stroke();
		}
		for (var y = 0; y < Model.ui.canvas.height; y+=CONST.UNIT){
			Model.ui.context.beginPath();
			Model.ui.context.moveTo(0,y);
			Model.ui.context.lineTo(Model.ui.canvas.width, y);
			Model.ui.context.stroke();
		}
	}
}

function paintCharacter(sprite, direction, step, x, y){
	var image = Model.ui.resources.images[sprite];	
	var pixelColValue = CONST.UNIT;
	var pixelRowValue = CONST.HEIGHT_CHARS;
	var drawPixelValue = CONST.UNIT;
	var rowOri = 0;
	switch(direction){
		case CONST.UP:
			rowOri = 0;
			break;
		case CONST.RIGHT:
			rowOri = 1;
			break;
		case CONST.DOWN:
			rowOri = 2;
			break;
		case CONST.LEFT:
			rowOri = 3;
			break;
	}
	var colOri = step;

	Model.ui.context.drawImage(image
		, pixelColValue * colOri //sx clipping de l'image originale
		, pixelRowValue * rowOri //sy clipping de l'image originale
		, pixelColValue // swidth clipping de l'image originale
		, pixelRowValue // sheight clipping de l'image originale
		, drawPixelValue * x // x Coordonnées dans le dessin du Model.ui.canvas
		, drawPixelValue * y // y Coordonnées dans le dessin du Model.ui.canvas
		, drawPixelValue // width taille du dessin
		, drawPixelValue // height taille du dessin			
		);	
}

function paintUser(){
	paintCharacter('healer_f',// sprite à utiliser
		Model.gameModel.position.direction, // Orientation du joeur
		Model.gameModel.position.stepCount, // état du sprite
		Model.gameModel.position.x - Model.gameModel.positionScreen.x, // x du joueur
		Model.gameModel.position.y - Model.gameModel.positionScreen.y // y du joueur
		);	
}

function paint(){	
	paintBackground();
	paintUser();
	if (paintActive)
		window.requestAnimationFrame(paint);
}

// API

function startPaint(){
	if (!paintActive){		
		paintActive = true;
		paint();
	}
	console.log("Start Paint");
}

function stopPaint(){
	paintActive = false;
	console.log("Stop Paint");
}


module.exports = {
	startPaint : startPaint,
	stopPaint : stopPaint
};