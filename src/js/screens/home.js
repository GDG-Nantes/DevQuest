'use strict'
var Model = require('../model/model.js');
var CONST = require('../model/const.js');
var InterfaceUtil = require('../assets/interface-utils.js');


// API :

function homeScreen(){
  var arrayInstructions = InterfaceUtil.drawAlphaBackground();

  var positionGooglePlus = {
  	  x: 5
  	, y : 10
  }
  arrayInstructions.push({
      key : 'socials' // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 1 // colOri
      , yDest :  CONST.ui.UNIT  * (positionGooglePlus.y) // rowDest
      , xDest :  CONST.ui.UNIT * (positionGooglePlus.x) // colDest
      , hDest :  CONST.ui.UNIT // hDest
      , wDest :  CONST.ui.UNIT // wDest
    });

  var positionTwitter = {
  	  x: 7
  	, y : 10
  }
  arrayInstructions.push({
      key : 'socials' // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  1 // rowOri
      , colOri : 1 // colOri
      , yDest :  CONST.ui.UNIT  * (positionTwitter.y) // rowDest
      , xDest :  CONST.ui.UNIT * (positionTwitter.x) // colDest
      , hDest :  CONST.ui.UNIT // hDest
      , wDest :  CONST.ui.UNIT // wDest
    });

  var positionGithub = {
  	  x: 5
  	, y : 12
  }
  arrayInstructions.push({
      key : 'socials' // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , yDest :  CONST.ui.UNIT  * (positionGithub.y) // rowDest
      , xDest :  CONST.ui.UNIT * (positionGithub.x) // colDest
      , hDest :  CONST.ui.UNIT // hDest
      , wDest :  CONST.ui.UNIT // wDest
    });

  var positionCusto = {
  	  x: 7
  	, y : 12 
  }
  arrayInstructions.push({
      key : 'socials' // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  1 // rowOri
      , colOri : 0 // colOri
      , yDest :  CONST.ui.UNIT  * (positionCusto.y) // rowDest
      , xDest :  CONST.ui.UNIT * (positionCusto.x) // colDest
      , hDest :  CONST.ui.UNIT // hDest
      , wDest :  CONST.ui.UNIT // wDest
    });

  // Mise à jour de la map d'interaction
  if (Model.ui.changeScreen != CONST.screens.HOME){
    var interaction = [];
    Model.ui.mapInteraction = interaction;    
    interaction.push({
        x : CONST.ui.UNIT * positionGooglePlus.x
      , y : CONST.ui.UNIT * positionGooglePlus.y
      , w : CONST.ui.UNIT * positionGooglePlus.w
      , h : CONST.ui.UNIT * positionGooglePlus.h
      , key : CONST.uiElements.BTN_G_PLUS
    });
    interaction.push({
        x : CONST.ui.UNIT * positionTwitter.x
      , y : CONST.ui.UNIT * positionTwitter.y
      , w : CONST.ui.UNIT * positionTwitter.w
      , h : CONST.ui.UNIT * positionTwitter.h
      , key : CONST.uiElements.BTN_TWITTER
    });
    interaction.push({
        x : CONST.ui.UNIT * positionGithub.x
      , y : CONST.ui.UNIT * positionGithub.y
      , w : CONST.ui.UNIT * positionGithub.w
      , h : CONST.ui.UNIT * positionGithub.h
      , key : CONST.uiElements.BTN_GITHUB
    });
    interaction.push({
        x : CONST.ui.UNIT * positionCusto.x
      , y : CONST.ui.UNIT * positionCusto.y 
      , w : CONST.ui.UNIT * positionCusto.w
      , h : CONST.ui.UNIT * positionCusto.h
      , key : CONST.uiElements.BTN_CUSTO
    });
  }

  return arrayInstructions;
}

module.exports = {
	homeScreen : homeScreen
};