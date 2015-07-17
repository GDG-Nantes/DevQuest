'use strict';
var Model = require('../model/model.js');
var Background = require('../assets/background.js');
var Stands = require('../assets/stands.js');
var Inside = require('../assets/inside.js');
var CONST = require('../model/const.js');
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


// Fonction générique d'écriture d'un pixel
function drawPixel(spriteToUse, wOriValue, hOriValue, rowOri, colOri, rowDest, colDest){

	var image = Model.ui.resources.images[spriteToUse];
	var drawPixelValue = CONST.UNIT;

	Model.ui.context.drawImage(image
		, wOriValue * colOri //sx clipping de l'image originale
		, hOriValue * rowOri //sy clipping de l'image originale
		, wOriValue // swidth clipping de l'image originale
		, hOriValue // sheight clipping de l'image originale
		, drawPixelValue * colDest // x Coordonnées dans le dessin du Model.ui.canvas
		, drawPixelValue * rowDest // y Coordonnées dans le dessin du Model.ui.canvas
		, drawPixelValue // width taille du dessin
		, drawPixelValue // height taille du dessin
		);
}

function drawPixelBackground(pixelToPaint, row, col){
	if (pixelToPaint === '')
		return;
	var regExp = /(\d\d).(\d)/;
	var rowOri = regExp.exec(pixelToPaint)[1]|0;
	var colOri = regExp.exec(pixelToPaint)[2]|0;
	drawPixel('magecity' // Sprite
			, CONST.UNIT // wOriValue
			, CONST.UNIT // hOriValue
			, rowOri // rowOri
			, colOri // colOri
			, row // rowDest
			, col // colDest
		);
}

function drawPixelInside(sprite,pixelToPaint, row, col){
	if (pixelToPaint === '')
		return;
	var regExp = /(\d\d).(\d)/;
	var rowOri = regExp.exec(pixelToPaint)[1]|0;
	var colOri = regExp.exec(pixelToPaint)[2]|0;
	drawPixel(sprite // Sprite
			, CONST.UNIT // wOriValue
			, CONST.UNIT // hOriValue
			, rowOri // rowOri
			, colOri // colOri
			, row // rowDest
			, col // colDest
		);
}

function paintBackground(){
	// Référence graphique : Mezzanine Cité : 27mx21.3m => 27x22
	// 1m = 64px => Image de 1792x1472
	var arrayTmp = extractBackground();
	var rowIndex = 0;
	var colIndex = 0;
	for (var row in arrayTmp){
		var rowArray = arrayTmp[row];
		for (var col in rowArray){
			if (Array.isArray(rowArray[col])){
				for (var doublon in rowArray[col]){
					drawPixelBackground(rowArray[col][doublon], rowIndex|0, colIndex|0);
				}
			}else{
				drawPixelBackground(rowArray[col], rowIndex|0, colIndex|0);
			}
			colIndex++;
		}
		colIndex = 0;
		rowIndex++;
	}
	// Grille
	var grille = true;
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
	drawPixel(sprite // Sprite
			, CONST.UNIT // wOriValue
			, CONST.HEIGHT_CHARS // hOriValue
			, rowOri // rowOri
			, colOri // colOri
			, y // rowDest
			, x // colDest
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

function paintInsde(){
	// Référence graphique : Mezzanine Cité : 27mx21.3m => 27x22
	// 1m = 64px => Image de 1792x1472
	var arrayTmp = Inside.showSilverStand();
	var rowIndex = 0;
	var colIndex = 0;
	for (var row in arrayTmp){
		var rowArray = arrayTmp[row];
		for (var col in rowArray){
			for (var doublon = 1; doublon < rowArray[col].length; doublon++){
				drawPixelInside(rowArray[col][0] // Sprite
					, rowArray[col][doublon]
					, rowIndex|0
					, colIndex|0);
			}
			colIndex++;
		}
		colIndex = 0;
		rowIndex++;
	}
}

function wrapText(text, x, y, maxWidth, lineHeight) {
	  var words = text.split(' ');
	  var line = '';

	  for(var n = 0; n < words.length; n++) {
	    var testLine = line + words[n] + ' ';
	    var metrics = Model.ui.context.measureText(testLine);
	    var testWidth = metrics.width;
	    if (testWidth > maxWidth && n > 0) {
	      Model.ui.context.fillText(line, x, y);
	      line = words[n] + ' ';
	      y += lineHeight;
	    }
	    else {
	      line = testLine;
	    }
	  }
	  Model.ui.context.fillText(line, x, y);
}

function paintZoneTexte(){
	var pos= {x: 1, y :5, w: 8, h:8};
	// Coin Haut Gauche
	drawPixel('txt-haut-gauche' // Sprite
			, CONST.UNIT // wOriValue
			, CONST.UNIT // hOriValue
			, 0 // rowOri
			, 0 // colOri
			, pos.y // rowDest
			, pos.x // colDest
		);
		// Ligne Haute
		Model.ui.context.fillStyle = Model.ui.resources.patterns['txt-repeat-x-haut'];
		Model.ui.context.fillRect(CONST.UNIT * (pos.x + 1), CONST.UNIT * pos.y, CONST.UNIT * (pos.w - 2), CONST.UNIT);
		// Coin Haut droit
		drawPixel('txt-haut-droite' // Sprite
				, CONST.UNIT // wOriValue
				, CONST.UNIT // hOriValue
				, 0 // rowOri
				, 0 // colOri
				, pos.y // rowDest
				, pos.x + pos.w - 1 // colDest
			);
		// Côté Gauche
		Model.ui.context.fillStyle = Model.ui.resources.patterns['txt-repeat-y-gauche'];
		Model.ui.context.fillRect(CONST.UNIT * pos.x, CONST.UNIT * (pos.y + 1), CONST.UNIT, CONST.UNIT * (pos.h - 2));
		// Centre
		Model.ui.context.fillStyle = Model.ui.resources.patterns['txt-repeat-xy'];
		Model.ui.context.fillRect(CONST.UNIT * (pos.x + 1), CONST.UNIT * (pos.y + 1), CONST.UNIT * (pos.w - 2), CONST.UNIT * (pos.h - 2));
		// Côté Droit
		Model.ui.context.fillStyle = Model.ui.resources.patterns['txt-repeat-y-droite'];
		Model.ui.context.fillRect(CONST.UNIT * (pos.x + pos.w - 1), CONST.UNIT * (pos.y + 1), CONST.UNIT, CONST.UNIT * (pos.h - 2));
		// Coin bas gauche
		drawPixel('txt-bas-gauche' // Sprite
				, CONST.UNIT // wOriValue
				, CONST.UNIT // hOriValue
				, 0 // rowOri
				, 0 // colOri
				, pos.y + pos.h - 1 // rowDest
				, pos.x // colDest
			);
		// ligne basse
		Model.ui.context.fillStyle = Model.ui.resources.patterns['txt-repeat-x-bas'];
		Model.ui.context.fillRect(CONST.UNIT * (pos.x + 1), CONST.UNIT * (pos.y + pos.h  - 1), CONST.UNIT * (pos.w - 2), CONST.UNIT);
		// Coin bas droit
		drawPixel('txt-bas-droite' // Sprite
				, CONST.UNIT // wOriValue
				, CONST.UNIT // hOriValue
				, 0 // rowOri
				, 0 // colOri
				, pos.y + pos.h - 1// rowDest
				, pos.x + pos.w - 1 // colDest
			);


			Model.ui.context.font = "30px Visitor";
			Model.ui.context.fillStyle = "#deeed6";
			wrapText("Hello World"
				, CONST.UNIT * (pos.x + 2) // X
				, CONST.UNIT * (pos.y + 2) // Y
				, CONST.UNIT * (pos.w - 4) // Max Width
				, 30 // Line Height
			);

}

function paint(){
	paintBackground();
	paintUser();
	//paintInsde();
	paintZoneTexte();
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
