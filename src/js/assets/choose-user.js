'use strict';
var Model = require('../model/model.js');
var CONST = require('../model/const.js');
var InterfaceUtil = require('./interface-utils.js');

// API :

function chooseUserScreen(){
  var position = {
        x: 1
      , y :5
      , w: Model.ui.screenSize.width - 3
      , h:Model.ui.screenSize.height - 8}
  var arrayInstructions =  InterfaceUtil.drawZoneTexteAvecTitre(position);
  // Titre
  arrayInstructions.push({drawText : true
      , text : "Choississez votre joueur"
      , fontSize : '20px'
      , x :  CONST.UNIT * (position.x + 1) // X
  		, y : CONST.UNIT * (position.y + 1) - CONST.UNIT / 3 // Y
  		, w : CONST.UNIT * (position.w - 2) // Max Width
  		, lineHeight : 30 // Line Height
  });
  var positionCreux = {
        x: position.x + 2
      , y : position.y + 3
      , w: 4
      , h: 4
    };
  Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawCreux(positionCreux));

    arrayInstructions.push({
      custom : true
      , key : 'healer_f' // Sprite
      , wOriValue : CONST.UNIT // wOriValue
      , hOriValue : CONST.HEIGHT_CHARS // hOriValue
      , rowOri :  2 // rowOri
      , colOri : 1 // colOri
      , yDest :  CONST.UNIT  * (positionCreux.y + 1) // rowDest
      , xDest :  CONST.UNIT * (positionCreux.x + 1) // colDest
      , hDest :  CONST.UNIT  * 2 // hDest
      , wDest :  CONST.UNIT * 2 // wDest
    });

  return arrayInstructions;
}

module.exports = {
    chooseUserScreen : chooseUserScreen
}
