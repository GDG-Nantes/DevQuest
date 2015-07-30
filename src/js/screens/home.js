'use strict'
var Model = require('../model/model.js');
var CONST = require('../model/const.js');
var InterfaceUtil = require('../assets/interface-utils.js');



// API :

function homeScreen(){
  var arrayInstructions = InterfaceUtil.drawAlphaBackground();

  var positionBtnDemarer = {
      x : Math.floor(Model.ui.screenSize.width / 2) - 3
    , y : Model.ui.screenSize.height - 5
    , w : 5
    , h : 3
  };
  Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawBtn(positionBtnDemarer));
  arrayInstructions.push({drawText : true
      , text : "Démarer"
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * (positionBtnDemarer.x + 1) // X
      , y : CONST.ui.UNIT * (positionBtnDemarer.y + 2) - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (positionBtnDemarer.w - 2) // Max Width
      , lineHeight : 30 // Line Height
  });

  // Mise à jour de la map d'interaction
  //if (Model.ui.changeScreen != CONST.screens.HOME){
    var interaction = [];
    Model.ui.mapInteraction = interaction;
    interaction.push({
        x : CONST.ui.UNIT * positionBtnDemarer.x
      , y : CONST.ui.UNIT * positionBtnDemarer.y
      , w : CONST.ui.UNIT * positionBtnDemarer.w
      , h : CONST.ui.UNIT * positionBtnDemarer.h
      , key : CONST.uiElements.BTN_DEMARER
    });
  //}
  

  return arrayInstructions;
}

module.exports = {
	homeScreen : homeScreen
};