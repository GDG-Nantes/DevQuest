'use strict'

var CONST = require('../model/const.js');
var Model = require('../model/model.js');
var Inside = require('../assets/inside.js');
var Questions = require('../model/questions.js');
var InterfaceUtil = require('../assets/interface-utils.js');

var widthSilver = 7
	,widthGold = 9
	, widthPlatinium = 11;

function checkInteractions_(){
  var drawFunctions = {
  	drawA : InterfaceUtil.drawBtn
  	, drawB : InterfaceUtil.drawBtn
  	, drawC : InterfaceUtil.drawBtn
  	, drawD : InterfaceUtil.drawBtn
  };
  if (Model.ui.interaction.type && 
		Model.ui.interaction.type  === CONST.directions.DOWN){		
		switch(Model.ui.interaction.key){
		    case CONST.uiElements.BTN_REP_A :   
		    	drawFunctions.drawA = InterfaceUtil.drawBtnPressed;
		    	break;
		    case CONST.uiElements.BTN_REP_B :   
		    	drawFunctions.drawB = InterfaceUtil.drawBtnPressed;
		    	break;
		    case CONST.uiElements.BTN_REP_C :   
		    	drawFunctions.drawC = InterfaceUtil.drawBtnPressed;
		    	break;
		    case CONST.uiElements.BTN_REP_D :   
		    	drawFunctions.drawD = InterfaceUtil.drawBtnPressed;
		    	break;
		}
	}
	return drawFunctions;
}


function insideQuestion(){
	var arrayInstructions = [];
	var drawFuntions = checkInteractions_();

	// On récupère le bon type de stand
    var widthStand = Model.ui.screen === CONST.screens.INSIDE_SILVER ? widthSilver :
				(Model.ui.screen === CONST.screens.INSIDE_GOLD ? widthGold : widthPlatinium);				
	var heightStand = 8;
	var colIndex = Math.max(0, Math.floor((Model.ui.screenSize.width - widthStand) / 2));
	var rowIndex = 4;//Math.max(0, Math.floor((Model.ui.screenSize.height - heightStand) / 2));
	var arrayInside = [];
	var npc = '';
	var npc_face = '';
	switch(Model.ui.screen){
		case CONST.screens.INSIDE_SILVER : 
			arrayInside = Inside.showSilverStand(rowIndex);
			npc = 'npc_silver';
			npc_face = 'npc_face_silver';
			break;
		case CONST.screens.INSIDE_GOLD : 
			arrayInside = Inside.showGoldStand(rowIndex);
			npc = 'npc_gold';
			npc_face = 'npc_face_gold';
			break;
		case CONST.screens.INSIDE_PLATINIUM : 
			arrayInside = Inside.showPlatiniumStand(rowIndex);
			npc = 'npc_platinium';
			npc_face = 'npc_face_platinium';
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
      , fontSize : '15px'
      , x :  CONST.ui.UNIT * 2.5 // X
      , y : CONST.ui.UNIT * 1.5 // Y
      , w : CONST.ui.UNIT * 10 // Max Width
      , lineHeight : 30 // Line Height
  	});


	// Ajout du NPC
	arrayInstructions.push({
      custom : true
      , key : npc // Sprite
      , wOriValue : CONST.ui.WIDTH_NPC // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  2 // rowOri
      , colOri : 1 // colOri
      , yDest :  CONST.ui.UNIT * (rowIndex + 4) // rowDest
      , xDest :  CONST.ui.UNIT * (colIndex  + Math.floor(widthStand / 2)) // colDest
      , hDest :  CONST.ui.UNIT // hDest
      , wDest :  CONST.ui.WIDTH_NPC // wDest
    });
	// Face du NPC
    arrayInstructions.push({
      custom : true
      , key : npc_face // Sprite
      , wOriValue : CONST.ui.NPC_HEAD_W // wOriValue
      , hOriValue : CONST.ui.NPC_HEAD_H // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , yDest :  CONST.ui.UNIT * 1 //(rowIndex + 4) // rowDest
      , xDest :  CONST.ui.UNIT * 0.5 // colDest
      , hDest :  CONST.ui.NPC_HEAD_W * 0.75 // hDest
      , wDest :  CONST.ui.NPC_HEAD_H * 0.75// wDest
    });

    // Ajout des boutons
    var widthBtn = Model.ui.screenSize.width - 1; //Math.floor(Model.ui.screenSize.width / 2) - 1;
    var heightBtn = 3;
    var fontSize = '12px';
    var positionBtnRepA = {
		  x : 0
		, y : rowIndex + heightStand - 1
		, w : widthBtn
		, h : heightBtn
	};
	Array.prototype.push.apply(arrayInstructions, drawFuntions.drawA(positionBtnRepA));
	arrayInstructions.push({drawText : true
	  , text : question.reponseA
	  , fontSize : fontSize
	  , x :  CONST.ui.UNIT * (positionBtnRepA.x + 1) // X
	  , y : CONST.ui.UNIT * (positionBtnRepA.y + 2) - CONST.ui.UNIT / 3 // Y
	  , w : CONST.ui.UNIT * (positionBtnRepA.w - 2) // Max Width
	  , lineHeight : 30 // Line Height
	});
	var positionBtnRepB = {
		  x : positionBtnRepA.x// + widthBtn
		, y : positionBtnRepA.y + heightBtn - 1
		, w : widthBtn
		, h : heightBtn
	};
	Array.prototype.push.apply(arrayInstructions, drawFuntions.drawB(positionBtnRepB));
	arrayInstructions.push({drawText : true
	  , text : question.reponseB
	  , fontSize : fontSize
	  , x :  CONST.ui.UNIT * (positionBtnRepB.x + 1) // X
	  , y : CONST.ui.UNIT * (positionBtnRepB.y + 2) - CONST.ui.UNIT / 3 // Y
	  , w : CONST.ui.UNIT * (positionBtnRepB.w - 2) // Max Width
	  , lineHeight : 30 // Line Height
	});
	var positionBtnRepC = {
		  x : positionBtnRepA.x
		, y : positionBtnRepB.y + heightBtn - 1
		, w : widthBtn
		, h : heightBtn
	};
	Array.prototype.push.apply(arrayInstructions, drawFuntions.drawC(positionBtnRepC));
	arrayInstructions.push({drawText : true
	  , text : question.reponseC
	  , fontSize : fontSize
	  , x :  CONST.ui.UNIT * (positionBtnRepC.x + 1) // X
	  , y : CONST.ui.UNIT * (positionBtnRepC.y + 2) - CONST.ui.UNIT / 3 // Y
	  , w : CONST.ui.UNIT * (positionBtnRepC.w - 2) // Max Width
	  , lineHeight : 30 // Line Height
	});
	var positionBtnRepD = {
		  x : positionBtnRepB.x
		, y : positionBtnRepC.y + heightBtn - 1
		, w : widthBtn
		, h : heightBtn
	};
	Array.prototype.push.apply(arrayInstructions, drawFuntions.drawD(positionBtnRepD));
	arrayInstructions.push({drawText : true
	  , text : question.reponseD
	  , fontSize : fontSize
	  , x :  CONST.ui.UNIT * (positionBtnRepD.x + 1) // X
	  , y : CONST.ui.UNIT * (positionBtnRepD.y + 2) - CONST.ui.UNIT / 3 // Y
	  , w : CONST.ui.UNIT * (positionBtnRepD.w - 2) // Max Width
	  , lineHeight : 30 // Line Height
	});


      // Mise à jour de la map d'interaction
	if (Model.ui.changeScreen != CONST.screens.CHOOSE_USER){
		var interaction = [];
		Model.ui.mapInteraction = interaction;
		Model.ui.screen = CONST.screens.CHOOSE_USER;
		interaction.push({
		    x : CONST.ui.UNIT * positionBtnRepA.x
		  , y : CONST.ui.UNIT * positionBtnRepA.y
		  , w : CONST.ui.UNIT * positionBtnRepA.w
		  , h : CONST.ui.UNIT * positionBtnRepA.h
		  , key : CONST.uiElements.BTN_REP_A
		});
		interaction.push({
		    x : CONST.ui.UNIT * positionBtnRepB.x
		  , y : CONST.ui.UNIT * positionBtnRepB.y
		  , w : CONST.ui.UNIT * positionBtnRepB.w
		  , h : CONST.ui.UNIT * positionBtnRepB.h
		  , key : CONST.uiElements.BTN_REP_B
		});
		interaction.push({
		    x : CONST.ui.UNIT * positionBtnRepC.x
		  , y : CONST.ui.UNIT * positionBtnRepC.y
		  , w : CONST.ui.UNIT * positionBtnRepC.w
		  , h : CONST.ui.UNIT * positionBtnRepC.h
		  , key : CONST.uiElements.BTN_REP_C
		});
		interaction.push({
		    x : CONST.ui.UNIT * positionBtnRepD.x
		  , y : CONST.ui.UNIT * positionBtnRepD.y
		  , w : CONST.ui.UNIT * positionBtnRepD.w
		  , h : CONST.ui.UNIT * positionBtnRepD.h
		  , key : CONST.uiElements.BTN_REP_D
		});
		// Porte d'entrée
		
		interaction.push({
		    x : CONST.ui.UNIT * (colIndex  + Math.floor(widthStand / 2))
		  , y : CONST.ui.UNIT * (rowIndex + 6)
		  , w : CONST.ui.UNIT * 1
		  , h : CONST.ui.UNIT * 1
		  , key : CONST.uiElements.DOOR
		});
		
	}


	return arrayInstructions;
}

module.exports = {
	insideQuestion : insideQuestion
};