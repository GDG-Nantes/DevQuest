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
      , x :  CONST.ui.UNIT * (position.x + 1) // X
  		, y : CONST.ui.UNIT * (position.y + 1) - CONST.ui.UNIT / 3 // Y
  		, w : CONST.ui.UNIT * (position.w - 2) // Max Width
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
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.HEIGHT_CHARS // hOriValue
      , rowOri :  rowIndex // rowOri
      , colOri : colIndex // colOri
      , yDest :  CONST.ui.UNIT  * (positionCreux.y + 1.5) // rowDest
      , xDest :  CONST.ui.UNIT * (positionCreux.x + 1.5) // colDest
      , hDest :  CONST.ui.UNIT  * 3 // hDest
      , wDest :  CONST.ui.UNIT * 3 // wDest
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
      , x :  CONST.ui.UNIT * (positionBtnPrev.x + 1) // X
      , y : CONST.ui.UNIT * (positionBtnPrev.y + 2) - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (positionBtnPrev.w - 2) // Max Width
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
      , x :  CONST.ui.UNIT * (positionBtnNext.x + 1) // X
      , y : CONST.ui.UNIT * (positionBtnNext.y + 2) - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (positionBtnNext.w - 2) // Max Width
      , lineHeight : 30 // Line Height
  });

  // Mise à jour de la map d'interaction
  if (Model.ui.screen != 'choose-user'){
    var interaction = [];
    Model.ui.mapInteraction = interaction;
    Model.ui.screen = 'choose-user';
    interaction.push({
        x : CONST.ui.UNIT * positionBtnPrev.x
      , y : CONST.ui.UNIT * positionBtnPrev.y
      , w : CONST.ui.UNIT * positionBtnPrev.w
      , h : CONST.ui.UNIT * positionBtnPrev.h
      , key : 'btnPrev'
    });
    interaction.push({
        x : CONST.ui.UNIT * positionBtnNext.x
      , y : CONST.ui.UNIT * positionBtnNext.y
      , w : CONST.ui.UNIT * positionBtnNext.w
      , h : CONST.ui.UNIT * positionBtnNext.h
      , key : 'btnNext'
    })
  }

  return arrayInstructions;
}

module.exports = {
    chooseUserScreen : chooseUserScreen
}
