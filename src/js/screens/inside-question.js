'use strict'

var CONST = require('../model/const.js');
var Model = require('../model/model.js');
var Inside = require('../assets/inside.js');
var Inputs = require('../triggers/inputs.js');
var Questions = require('../model/questions.js');
var InterfaceUtil = require('../assets/interface-utils.js');

var _widthSilver = 7
	, _widthGold = 9
	, _widthPlatinium = 11
	, _addInteractions = false
	, _interactionConfirmation = []
	, _drawFunctions = {
	  	drawA : InterfaceUtil.drawBtn
	  	, drawB : InterfaceUtil.drawBtn
	  	, drawC : InterfaceUtil.drawBtn
	  	, drawD : InterfaceUtil.drawBtn
	}
	, _showConfirmation = false
	, _chooseAnswer = ''
	, _state = -1;

function registerInteractions_(){
	Inputs.registerInteraction({
		type : CONST.eventType.DOWN
		, key : [
			CONST.uiElements.BTN_REP_A
			, CONST.uiElements.BTN_REP_B
			, CONST.uiElements.BTN_REP_C
			, CONST.uiElements.BTN_REP_D
			, CONST.uiElements.BTN_SEND
		]
		, callback : checkInteractions_
	});
	Inputs.registerInteraction({
		type : CONST.eventType.UP
		, key : [
			CONST.uiElements.BTN_REP_A
			, CONST.uiElements.BTN_REP_B
			, CONST.uiElements.BTN_REP_C
			, CONST.uiElements.BTN_REP_D
		]
		, callback : checkInteractions_
	});
}

function checkInteractions_(event){
  if (event.type && 
		event.type  === CONST.eventType.DOWN){		
		switch(event.key){
		    case CONST.uiElements.BTN_REP_A :   
		    	_drawFunctions.drawA = InterfaceUtil.drawBtnPressed;
		    	break;
		    case CONST.uiElements.BTN_REP_B :   
		    	_drawFunctions.drawB = InterfaceUtil.drawBtnPressed;
		    	break;
		    case CONST.uiElements.BTN_REP_C :   
		    	_drawFunctions.drawC = InterfaceUtil.drawBtnPressed;
		    	break;
		    case CONST.uiElements.BTN_REP_D :   
		    	_drawFunctions.drawD = InterfaceUtil.drawBtnPressed;
		    	break;
		    case CONST.uiElements.BTN_SEND :   
		    	// On incrémente le compteur de temps
		    	Model.gameModel.time += Date.now() - Model.gameModel.lastTime;
		    	Model.gameModel.lastTime = Date.now();
		    	var input = document.getElementById('code-confirmation');
		    	if (input && input.value){
		    		var code = input.value;
	    			// TODO faire quelque chose avec le code de confirmation
		    	}
	    		document.body.removeChild(input);
		    	Model.ui.changeScreen = CONST.screens.GAME;
		    	// TODO envoyer la réponse
		    	break;
		}
	}else if (event.type && 
		event.type  === CONST.eventType.UP){		
		switch(event.key){
		    case CONST.uiElements.BTN_REP_A :   
		    	_drawFunctions.drawA = InterfaceUtil.drawBtn;
		    	_chooseAnswer = 'A';
		    	break;
		    case CONST.uiElements.BTN_REP_B :   
		    	_drawFunctions.drawB = InterfaceUtil.drawBtn;
		    	_chooseAnswer = 'B';
		    	break;
		    case CONST.uiElements.BTN_REP_C :   
		    	_drawFunctions.drawC = InterfaceUtil.drawBtn;
		    	_chooseAnswer = 'C';
		    	break;
		    case CONST.uiElements.BTN_REP_D :   
		    	_drawFunctions.drawD = InterfaceUtil.drawBtn;		    	
		    	_chooseAnswer = 'D';
		    	break;
		}
		_showConfirmation = true;
	}
	return _drawFunctions;
}

function paintConfirmation_(){
	// Zone autour 
	var position = {
	    x: 1
	  , y : (Model.ui.screenSize.height - 4) / 4
	  , w: Model.ui.screenSize.width - 2.5
	  , h: 9
	}
	var arrayInstructions = [{
	     custom : true
	      , key : "alphaBackground" // Sprite
	      , wOriValue : Model.ui.screenSize.width * CONST.ui.UNIT // wOriValue
	      , hOriValue : Model.ui.screenSize.height * CONST.ui.UNIT // hOriValue
	      , rowOri :  0  // rowOri
	      , colOri : 0 // colOri
	      , yDest :  0 // rowDest
	      , xDest :  0 // colDest
	      , hDest :  Model.ui.screenSize.height * CONST.ui.UNIT // hDest
	      , wDest :  Model.ui.screenSize.width * CONST.ui.UNIT // wDest
	  }];
	Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawZoneTexte(position));
	// Titre
	arrayInstructions.push({drawText : true
	  , text : "Vous avez choisis la réponse : "+_chooseAnswer
	  , fontSize : '20px'
	  , x :  CONST.ui.UNIT * (position.x + 1) // X
	  , y : CONST.ui.UNIT * (position.y + 2) // Y
	  , w : CONST.ui.UNIT * (position.w - 2) // Max Width
	  , lineHeight : 30 // Line Height
	});

	// Boutons
	var positionBtnSend = {
		  x : (Model.ui.screenSize.width - 6) / 2
		, y : position.y + 5.5
		, w : 6
		, h : 3
	};
	var instructionsBtn = InterfaceUtil.drawBtn(positionBtnSend);
	Array.prototype.push.apply(arrayInstructions, instructionsBtn);
	arrayInstructions.push({drawText : true
		, text : "Valider"
		, fontSize : '30px'
		, x :  CONST.ui.UNIT * (positionBtnSend.x + 1) // X
		, y : CONST.ui.UNIT * (positionBtnSend.y + 2) - CONST.ui.UNIT / 4 // Y
		, w : CONST.ui.UNIT * (positionBtnSend.w - 2) // Max Width
		, lineHeight : 30 // Line Height
	});
	

	// Gestion du champ de saisie du code
	var input = document.getElementById('code-confirmation');
	if (!input){
		input = document.createElement('input');
		input.id = 'code-confirmation';
		input.type = 'text';
		input.placeholder = 'code du stand';
		input.style.position = 'absolute';
		input.style.top = (CONST.ui.UNIT * 8)+'px';  
		input.style.left = (CONST.ui.UNIT * 2)+'px';  
		input.style.width = (CONST.ui.UNIT * (position.w - 3))+'px';
		document.body.appendChild(input);
		// input = document.querySelector('#code-confirmation');

	}
	
	  // Mise à jour de la map d'interaction
	if(_interactionConfirmation.length === 0){
		_interactionConfirmation.push({
		    x : CONST.ui.UNIT * positionBtnSend.x
		  , y : CONST.ui.UNIT * positionBtnSend.y
		  , w : CONST.ui.UNIT * positionBtnSend.w
		  , h : CONST.ui.UNIT * positionBtnSend.h
		  , key : CONST.uiElements.BTN_SEND
		});			
		
	}


	return arrayInstructions;
}

function insideQuestion(){
	if (!_addInteractions){
		registerInteractions_();
		_addInteractions = true;
	}
	var arrayInstructions = [{
	     custom : true
	      , key : Model.ui.screen // Sprite
	      , wOriValue : Model.ui.screenSize.width * CONST.ui.UNIT // wOriValue
	      , hOriValue : Model.ui.screenSize.height * CONST.ui.UNIT // hOriValue
	      , rowOri :  0  // rowOri
	      , colOri : 0 // colOri
	      , yDest :  0 // rowDest
	      , xDest :  0 // colDest
	      , hDest :  Model.ui.screenSize.height * CONST.ui.UNIT // hDest
	      , wDest :  Model.ui.screenSize.width * CONST.ui.UNIT // wDest
	  }];

	// On récupère le bon type de stand
    var widthStand = Model.ui.screen === CONST.screens.INSIDE_SILVER ? _widthSilver :
				(Model.ui.screen === CONST.screens.INSIDE_GOLD ? _widthGold : _widthPlatinium);				
	var heightStand = 8;
	var colIndex = Math.max(0, Math.floor((Model.ui.screenSize.width - widthStand) / 2));
	var rowIndex = 2;//Math.max(0, Math.floor((Model.ui.screenSize.height - heightStand) / 2));
	var arrayInside = [];
	var npc = '';
	var npc_face = '';
	switch(Model.ui.screen){
		case CONST.screens.INSIDE_SILVER : 			
			npc = 'npc_silver';
			npc_face = 'npc_face_silver';
			break;
		case CONST.screens.INSIDE_GOLD : 			
			npc = 'npc_gold';
			npc_face = 'npc_face_gold';
			break;
		case CONST.screens.INSIDE_PLATINIUM : 
			npc = 'npc_platinium';
			npc_face = 'npc_face_platinium';
			break;
	}

	// On convertit les informations en instructions de dessin
	/*var regExp = /(\d\d).(\d)/;
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
	*/

	// On ajoute la question
	var question = Questions.filter(function(questionTmp){
		return questionTmp.id === Model.gameModel.standId;
	})[0];
	 arrayInstructions.push({drawText : true
      , text : question.question
      , fontSize : '15px'
      , x :  CONST.ui.UNIT * 2.5 // X
      , y : CONST.ui.UNIT * 1 // Y
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
      , yDest :  CONST.ui.UNIT * 0.5 //(rowIndex + 4) // rowDest
      , xDest :  CONST.ui.UNIT * 0.5 // colDest
      , hDest :  CONST.ui.NPC_HEAD_W * 0.75 // hDest
      , wDest :  CONST.ui.NPC_HEAD_H * 0.75// wDest
    });

    // Ajout des boutons
    var widthBtn = Model.ui.screenSize.width; //Math.floor(Model.ui.screenSize.width / 2) - 1;
    var heightBtn = 3;
    var fontSize = '12px';
    var positionBtnRepA = {
		  x : 0
		, y : rowIndex + heightStand - 1
		, w : widthBtn
		, h : heightBtn
	};
	Array.prototype.push.apply(arrayInstructions, _drawFunctions.drawA(positionBtnRepA));
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
		, y : positionBtnRepA.y + heightBtn - 1.5
		, w : widthBtn
		, h : heightBtn
	};
	Array.prototype.push.apply(arrayInstructions, _drawFunctions.drawB(positionBtnRepB));
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
		, y : positionBtnRepB.y + heightBtn - 1.5
		, w : widthBtn
		, h : heightBtn
	};
	Array.prototype.push.apply(arrayInstructions, _drawFunctions.drawC(positionBtnRepC));
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
		, y : positionBtnRepC.y + heightBtn - 1.5
		, w : widthBtn
		, h : heightBtn
	};
	Array.prototype.push.apply(arrayInstructions, _drawFunctions.drawD(positionBtnRepD));
	arrayInstructions.push({drawText : true
	  , text : question.reponseD
	  , fontSize : fontSize
	  , x :  CONST.ui.UNIT * (positionBtnRepD.x + 1) // X
	  , y : CONST.ui.UNIT * (positionBtnRepD.y + 2) - CONST.ui.UNIT / 3 // Y
	  , w : CONST.ui.UNIT * (positionBtnRepD.w - 2) // Max Width
	  , lineHeight : 30 // Line Height
	});

	if (Model.ui.changeScreen === CONST.screens.INSIDE_SILVER
		|| Model.ui.changeScreen === CONST.screens.INSIDE_GOLD
		|| Model.ui.changeScreen === CONST.screens.INSIDE_PLATINIUM){
		_showConfirmation = false;
		_state = -1;
		_drawFunctions = {
		  	drawA : InterfaceUtil.drawBtn
		  	, drawB : InterfaceUtil.drawBtn
		  	, drawC : InterfaceUtil.drawBtn
		  	, drawD : InterfaceUtil.drawBtn
		};
		_chooseAnswer = '';
	}

	var stateConfirmation = -1;
	if (_showConfirmation){
		Array.prototype.push.apply(arrayInstructions, paintConfirmation_());
		stateConfirmation = 0;
	}else{
		stateConfirmation = 1;
	}


      // Mise à jour de la map d'interaction
	if (_state != stateConfirmation){
		var interaction = [];
		Model.ui.mapInteraction = interaction;
		if (_showConfirmation){
			Array.prototype.push.apply(interaction, _interactionConfirmation);			
		}else{			
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

		_state = stateConfirmation;
		
	}


	return arrayInstructions;
}

module.exports = {
	insideQuestion : insideQuestion
};