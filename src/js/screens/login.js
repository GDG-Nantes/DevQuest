'use strict'
var Model = require('../model/model.js');
var CONST = require('../model/const.js');
var InterfaceUtil = require('../assets/interface-utils.js');
var Inputs = require('../triggers/inputs.js');

var addInteractions = false;

function checkInteractions_(event) {
  
}

function registerInteractions_(){
  Inputs.registerInteraction({
    type : CONST.directions.UP
    , key : CONST.uiElements.BTN_CUSTO
    , callback : checkInteractions_
  });
}

// API :

function loginScreen(){
  if (!addInteractions){
    registerInteractions_()
    addInteractions = true;
  }

  var arrayInstructions = InterfaceUtil.drawAlphaBackground();

  // Zone autour du personnage
  var position = {
        x: 0
      , y :3
      , w: 10
      , h: 12}
  Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawZoneTexteAvecTitre(position));
  // Titre
  arrayInstructions.push({drawText : true
      , text : "Veuillez vous logguer"
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * (position.x + 1) // X
      , y : CONST.ui.UNIT * (position.y + 1) - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (position.w - 2) // Max Width
      , lineHeight : 30 // Line Height
  });


  // Boutons de login
  var xBtns = 2;
  var ecart = 2;

  var positionGooglePlus = {
  	  x: xBtns
  	, y : position.y + 3
  }
  arrayInstructions.push({
      key : 'socials' // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 1 // colOri
      , rowDest :  positionGooglePlus.y // rowDest
      , colDest :  positionGooglePlus.x // colDest
    });
  arrayInstructions.push({drawText : true
      , text : "Google "
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * (positionGooglePlus.x + 2) // X
      , y : CONST.ui.UNIT * (positionGooglePlus.y + 1)  - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (position.w - 2 - 5) // Max Width
      , lineHeight : 30 // Line Height
  });

  var positionTwitter = {
  	  x: xBtns
  	, y : positionGooglePlus.y + ecart
  }
  arrayInstructions.push({
      key : 'socials' // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  1 // rowOri
      , colOri : 1 // colOri
      , rowDest :  positionTwitter.y // rowDest
      , colDest :  positionTwitter.x // colDest
    });
  arrayInstructions.push({drawText : true
      , text : "Twitter"
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * (positionTwitter.x + 2) // X
      , y : CONST.ui.UNIT * (positionTwitter.y + 1)  - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (position.w - 2 - 5) // Max Width
      , lineHeight : 30 // Line Height
  });

  var positionGithub = {
  	  x: xBtns
  	, y : positionTwitter.y + ecart
  }
  arrayInstructions.push({
      key : 'socials' // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , rowDest :  positionGithub.y // rowDest
      , colDest :  positionGithub.x // colDest
    });
  arrayInstructions.push({drawText : true
      , text : "Github"
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * (positionGithub.x + 2) // X
      , y : CONST.ui.UNIT * (positionGithub.y + 1)  - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (position.w - 2 - 5) // Max Width
      , lineHeight : 30 // Line Height
  });

  var positionCusto = {
  	  x: xBtns
  	, y : positionGithub.y + ecart
  }
  arrayInstructions.push({
      key : 'socials' // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  1 // rowOri
      , colOri : 0 // colOri
      , rowDest :  positionCusto.y // rowDest
      , colDest :  positionCusto.x // colDest
    });
  arrayInstructions.push({drawText : true
      , text : "Créer son compte"
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * (positionCusto.x + 2) // X
      , y : CONST.ui.UNIT * (positionCusto.y + 1)  - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (position.w - 4) // Max Width
      , lineHeight : 30 // Line Height
  });

  // Mise à jour de la map d'interaction
  if (Model.ui.changeScreen != CONST.screens.LOGIN){
    var interaction = [];
    Model.ui.mapInteraction = interaction;    
    interaction.push({
        x : CONST.ui.UNIT * positionGooglePlus.x
      , y : CONST.ui.UNIT * positionGooglePlus.y
      , w : CONST.ui.UNIT
      , h : CONST.ui.UNIT
      , key : CONST.uiElements.BTN_G_PLUS
    });
    interaction.push({
        x : CONST.ui.UNIT * positionTwitter.x
      , y : CONST.ui.UNIT * positionTwitter.y
      , w : CONST.ui.UNIT
      , h : CONST.ui.UNIT
      , key : CONST.uiElements.BTN_TWITTER
    });
    interaction.push({
        x : CONST.ui.UNIT * positionGithub.x
      , y : CONST.ui.UNIT * positionGithub.y
      , w : CONST.ui.UNIT
      , h : CONST.ui.UNIT
      , key : CONST.uiElements.BTN_GITHUB
    });
    interaction.push({
        x : CONST.ui.UNIT * positionCusto.x
      , y : CONST.ui.UNIT * positionCusto.y 
      , w : CONST.ui.UNIT
      , h : CONST.ui.UNIT
      , key : CONST.uiElements.BTN_CUSTO
    });
  }

  return arrayInstructions;
}

module.exports = {
	loginScreen : loginScreen
};