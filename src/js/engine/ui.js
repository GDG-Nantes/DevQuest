'use strict';
var Model = require('../model/model.js');
var Background = require('../assets/background.js');
var Stands = require('../assets/stands.js');
var Inside = require('../assets/inside.js');
var ScreenChooseUser = require('../screens/choose-user.js');
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


function addFromArray_(cel, arrayOri, row, col){
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
function extractBackground_(){
	var array = [];
	var minX = Model.gameModel.positionScreen.x;
	var minY = Model.gameModel.positionScreen.y;

	for (var row = minY; row < minY + Model.ui.screenSize.height; row++){
		var arrayRow = [];
		for (var col =minX; col < minX + Model.ui.screenSize.width; col++){
			var cel = [];
			addFromArray_(cel,solArray,row, col);
			addFromArray_(cel,contourArray,row, col);
			addFromArray_(cel,mursArray,row, col);
			addFromArray_(cel,herbeArray,row, col);
			addFromArray_(cel,sortiesArray,row, col);
			addFromArray_(cel,standsArray,row, col);
			arrayRow.push(cel);
		}
		array.push(arrayRow);
	}
	return array;
}

// Fonction générique d'écriture d'un pixel
function drawPixel_(spriteToUse, wOriValue, hOriValue, rowOri, colOri, rowDest, colDest){

	var image = Model.resources.images[spriteToUse];
	var drawPixelValue = CONST.ui.UNIT;

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

function drawPixelBackground_(pixelToPaint, row, col){
	if (pixelToPaint === '')
		return;
	var regExp = /(\d\d).(\d)/;
	var rowOri = regExp.exec(pixelToPaint)[1]|0;
	var colOri = regExp.exec(pixelToPaint)[2]|0;
	drawPixel_('magecity' // Sprite
			, CONST.ui.UNIT // wOriValue
			, CONST.ui.UNIT // hOriValue
			, rowOri // rowOri
			, colOri // colOri
			, row // rowDest
			, col // colDest
		);
}

function drawPixelInside_(sprite,pixelToPaint, row, col){
	if (pixelToPaint === '')
		return;
	var regExp = /(\d\d).(\d)/;
	var rowOri = regExp.exec(pixelToPaint)[1]|0;
	var colOri = regExp.exec(pixelToPaint)[2]|0;
	drawPixel_(sprite // Sprite
			, CONST.ui.UNIT // wOriValue
			, CONST.ui.UNIT // hOriValue
			, rowOri // rowOri
			, colOri // colOri
			, row // rowDest
			, col // colDest
		);
}

function paintBackground_(){
	// Référence graphique : Mezzanine Cité : 27mx21.3m => 27x22
	// 1m = 64px => Image de 1792x1472
	var arrayTmp = extractBackground_();
	var rowIndex = 0;
	var colIndex = 0;
	for (var row in arrayTmp){
		var rowArray = arrayTmp[row];
		for (var col in rowArray){
			if (Array.isArray(rowArray[col])){
				for (var doublon in rowArray[col]){
					drawPixelBackground_(rowArray[col][doublon], rowIndex|0, colIndex|0);
				}
			}else{
				drawPixelBackground_(rowArray[col], rowIndex|0, colIndex|0);
			}
			colIndex++;
		}
		colIndex = 0;
		rowIndex++;
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
	drawPixel_(sprite // Sprite
			, CONST.ui.UNIT // wOriValue
			, CONST.ui.HEIGHT_CHARS // hOriValue
			, rowOri // rowOri
			, colOri // colOri
			, y // rowDest
			, x // colDest
		);

}

function paintUser_(){
	paintCharacter_(CONST.characters[Model.gameModel.indexUser].key,// sprite à utiliser
		Model.gameModel.position.direction, // Orientation du joeur
		Model.gameModel.position.stepCount, // état du sprite
		Model.gameModel.position.x - Model.gameModel.positionScreen.x, // x du joueur
		Model.gameModel.position.y - Model.gameModel.positionScreen.y // y du joueur
		);
}

function paintInsde_(){
	// Référence graphique : Mezzanine Cité : 27mx21.3m => 27x22
	// 1m = 64px => Image de 1792x1472
	var arrayTmp = Inside.showSilverStand();
	var rowIndex = 0;
	var colIndex = 0;
	for (var row in arrayTmp){
		var rowArray = arrayTmp[row];
		for (var col in rowArray){
			for (var doublon = 1; doublon < rowArray[col].length; doublon++){
				drawPixelInside_(rowArray[col][0] // Sprite
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

function wrapText_(text, x, y, maxWidth, lineHeight) {
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

function paintGrille_(){
	// Grille
	for (var x = 0; x < Model.ui.canvas.width; x+=CONST.ui.UNIT){
		Model.ui.context.beginPath();
		Model.ui.context.moveTo(x,0);
		Model.ui.context.lineTo(x, Model.ui.canvas.height);
		Model.ui.context.stroke();
	}
	for (var y = 0; y < Model.ui.canvas.height; y+=CONST.ui.UNIT){
		Model.ui.context.beginPath();
		Model.ui.context.moveTo(0,y);
		Model.ui.context.lineTo(Model.ui.canvas.width, y);
		Model.ui.context.stroke();
	}
}

function paintInstructions_(arrayInstructions){
	for (var instructionIndex in arrayInstructions){
		var instruction = arrayInstructions[instructionIndex];
		if (instruction.repeat){

  			Model.ui.context.fillStyle = Model.resources.patterns[instruction.key];
  			Model.ui.context.fillRect(CONST.ui.UNIT * instruction.colDest
  					, CONST.ui.UNIT * instruction.rowDest
  					, CONST.ui.UNIT * instruction.wDest
  					, CONST.ui.UNIT * instruction.hDest
  				);
		}else if (instruction.drawText){
			Model.ui.context.font = instruction.fontSize+" Visitor";
			Model.ui.context.fillStyle = "#deeed6";
			wrapText_(instruction.text
				, instruction.x // X
				, instruction.y // Y
				, instruction.w // Max Width
				, instruction.lineHeight // Line Height
			);
		}else if (instruction.custom){
			var image = Model.resources.images[instruction.key];
			Model.ui.context.drawImage(image
				, instruction.wOriValue * instruction.colOri //sx clipping de l'image originale
				, instruction.hOriValue * instruction.rowOri //sy clipping de l'image originale
				, instruction.wOriValue // swidth clipping de l'image originale
				, instruction.hOriValue // sheight clipping de l'image originale
				, instruction.xDest // x Coordonnées dans le dessin du Model.ui.canvas
				, instruction.yDest // y Coordonnées dans le dessin du Model.ui.canvas
				, instruction.wDest // width taille du dessin
				, instruction.hDest // height taille du dessin
				);

		}else {
			drawPixel_(instruction.key // Sprite
			    , instruction.wOriValue // wOriValue
			    , instruction.hOriValue // hOriValue
			    , instruction.rowOri // rowOri
			    , instruction.colOri // colOri
			    , instruction.rowDest // rowDest
			    , instruction.colDest // colDest
			  );
		}
	}
}

function paintHomeScreen(){

}

function paintChooseUser_(){
	paintInstructions_(ScreenChooseUser.chooseUserScreen());
}

function paint_(){
	paintBackground_();

	if (Model.ui.screen === CONST.screens.HOME){
		paintChooseUser_();		
				
	}else if (Model.ui.screen === CONST.screens.CHOOSE_USER){
		paintChooseUser_();		
	}else if (Model.ui.screen === CONST.screens.GAME){
		paintUser_();
	}else if (Model.ui.screen === CONST.screens.INSIDE_SILVER){
		paintInsde_();	
	}else if (Model.ui.screen === CONST.screens.INSIDE_GOLD){
		paintInsde_();	
	}else if (Model.ui.screen === CONST.screens.INSIDE_PLATINIUM){
		paintInsde_();	
	}
	//paintInsde_();
	//paintZoneTexte_();
	if (CONST.DEBUG){
		paintGrille_();
	}
	if (paintActive)
		window.requestAnimationFrame(paint_);
}

// API


function startPaint(){
	if (!paintActive){
		paintActive = true;
		paint_();
	}
	console.log("Start Paint");
}

function stopPaint(){
	paintActive = false;
	console.log("Stop Paint");
}

module.exports = {
	  startPaint : startPaint
	, stopPaint : stopPaint
};
