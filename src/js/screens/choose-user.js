'use strict';
var Model = require('../model/model.js');
var CONST = require('../model/const.js');
var InterfaceUtil = require('../assets/interface-utils.js');

var colIndex = 0;
var rowIndex = 0;

setInterval(function intervalCol(){
  colIndex = (colIndex+1) % 3;
},100);

setInterval(function intervalRow(){
  rowIndex = (rowIndex+1) % 4;
},1000);

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
      , w: 6
      , h: 6
    };
  Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawCreux(positionCreux));

  arrayInstructions.push({
      custom : true
      , key : 'healer_f' // Sprite
      , wOriValue : CONST.UNIT // wOriValue
      , hOriValue : CONST.HEIGHT_CHARS // hOriValue
      , rowOri :  rowIndex // rowOri
      , colOri : colIndex // colOri
      , yDest :  CONST.UNIT  * (positionCreux.y + 1.5) // rowDest
      , xDest :  CONST.UNIT * (positionCreux.x + 1.5) // colDest
      , hDest :  CONST.UNIT  * 3 // hDest
      , wDest :  CONST.UNIT * 3 // wDest
    });

  var positionBtnPrev = {
      x : positionCreux.x + 0
    , y : positionCreux.y + positionCreux.h -1
    , w : 3
    , h : 3
  };
  Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawBtn(positionBtnPrev));
  arrayInstructions.push({drawText : true
      , text : "<<"
      , fontSize : '30px'
      , x :  CONST.UNIT * (positionBtnPrev.x + 1) // X
      , y : CONST.UNIT * (positionBtnPrev.y + 2) - CONST.UNIT / 3 // Y
      , w : CONST.UNIT * (positionBtnPrev.w - 2) // Max Width
      , lineHeight : 30 // Line Height
  });

  var positionBtnNext = {
      x : positionCreux.x + positionCreux.w - 3
    , y : positionCreux.y + positionCreux.h -1
    , w : 3
    , h : 3
  };
  Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawBtn(positionBtnNext));
  arrayInstructions.push({drawText : true
      , text : ">>"
      , fontSize : '30px'
      , x :  CONST.UNIT * (positionBtnNext.x + 1) // X
      , y : CONST.UNIT * (positionBtnNext.y + 2) - CONST.UNIT / 3 // Y
      , w : CONST.UNIT * (positionBtnNext.w - 2) // Max Width
      , lineHeight : 30 // Line Height
  });

  // Mise à jour de la map d'interaction
  if (Model.ui.screen != 'choose-user'){
    var interaction = [];
    Model.ui.mapInteraction = interaction;
    Model.ui.screen = 'choose-user';
    interaction.push({
        x : CONST.UNIT * positionBtnPrev.x
      , y : CONST.UNIT * positionBtnPrev.y
      , w : CONST.UNIT * positionBtnPrev.w
      , h : CONST.UNIT * positionBtnPrev.h
      , key : 'btnPrev'
    });
    interaction.push({
        x : CONST.UNIT * positionBtnNext.x
      , y : CONST.UNIT * positionBtnNext.y
      , w : CONST.UNIT * positionBtnNext.w
      , h : CONST.UNIT * positionBtnNext.h
      , key : 'btnNext'
    })
  }

  return arrayInstructions;
}

module.exports = {
    chooseUserScreen : chooseUserScreen
}
