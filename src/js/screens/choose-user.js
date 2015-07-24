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

function checkInteractions(){
  // On a un click avéré
  if (Model.ui.interaction.type === CONST.directions.UP){
    switch (Model.ui.interaction.key){
      case CONST.uiElements.BTN_RIGHT : 
        Model.gameModel.indexUser = (Model.gameModel.indexUser + 1) % CONST.characters.length;
        break;
      case CONST.uiElements.BTN_LEFT :                 
        Model.gameModel.indexUser = (Model.gameModel.indexUser - 1);
        if (Model.gameModel.indexUser < 0){
          Model.gameModel.indexUser = CONST.characters.length - 1;
        }
        break;
      default:
    }
    Model.ui.interaction.type = '';
    Model.ui.interaction.key = '';
  }
}

// API :

function chooseUserScreen(){
  checkInteractions();

  var user = CONST.characters[Model.gameModel.indexUser];

  // Zone autour du personnage
  var position = {
        x: 1
      , y :5
      , w: Model.ui.screenSize.width - 3
      , h:Model.ui.screenSize.height - 15}
  var arrayInstructions = InterfaceUtil.drawAlphaBackground();
  Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawZoneTexteAvecTitre(position));
  // Titre
  arrayInstructions.push({drawText : true
      , text : "Choississez votre joueur"
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * (position.x + 1) // X
      , y : CONST.ui.UNIT * (position.y + 1) - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (position.w - 2) // Max Width
      , lineHeight : 30 // Line Height
  });


  // Personnage
  var positionCreux = {
        x: position.x + 0
      , y : position.y + 3
      , w: 5
      , h: 5
    };
  Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawCreux(positionCreux));

  arrayInstructions.push({
      custom : true
      , key : user.key // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.HEIGHT_CHARS // hOriValue
      , rowOri :  rowIndex // rowOri
      , colOri : colIndex // colOri
      , yDest :  CONST.ui.UNIT  * (positionCreux.y + 1.5) // rowDest
      , xDest :  CONST.ui.UNIT * (positionCreux.x + 1.5) // colDest
      , hDest :  CONST.ui.UNIT  * 2 // hDest
      , wDest :  CONST.ui.UNIT * 2 // wDest
    });

  // Desciption du joueur
  arrayInstructions.push({drawText : true
      , text : user.name
      , fontSize : '30px'
      , x :  CONST.ui.UNIT * (position.x + 1) // X
      , y : CONST.ui.UNIT * (position.y + 3) - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (position.w - 2) // Max Width
      , lineHeight : 30 // Line Height
  });

  arrayInstructions.push({drawText : true
      , text : "Genre : \n"+user.genre
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * (position.x + 5) // X
      , y : CONST.ui.UNIT * (position.y + 4) - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (position.w - 2 - 5) // Max Width
      , lineHeight : 30 // Line Height
  });

  arrayInstructions.push({drawText : true
      , text : "Langage secret: \n"+user.language
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * (position.x + 5) // X
      , y : CONST.ui.UNIT * (position.y + 6) - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (position.w - 2 - 4) // Max Width
      , lineHeight : 30 // Line Height
  });

  // Boutons
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

   var positionBtnChoisir = {
      x : position.x + 2
    , y : position.y + position.h -3
    , w : 5
    , h : 3
  };
  Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawBtn(positionBtnChoisir));
  arrayInstructions.push({drawText : true
      , text : "Choisir"
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * (positionBtnChoisir.x + 1) // X
      , y : CONST.ui.UNIT * (positionBtnChoisir.y + 2) - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (positionBtnChoisir.w - 2) // Max Width
      , lineHeight : 30 // Line Height
  });

  // Mise à jour de la map d'interaction
  if (Model.ui.screen != CONST.screens.CHOOSE_USER){
    var interaction = [];
    Model.ui.mapInteraction = interaction;
    Model.ui.screen = CONST.screens.CHOOSE_USER;
    interaction.push({
        x : CONST.ui.UNIT * positionBtnPrev.x
      , y : CONST.ui.UNIT * positionBtnPrev.y
      , w : CONST.ui.UNIT * positionBtnPrev.w
      , h : CONST.ui.UNIT * positionBtnPrev.h
      , key : CONST.uiElements.BTN_LEFT
    });
    interaction.push({
        x : CONST.ui.UNIT * positionBtnNext.x
      , y : CONST.ui.UNIT * positionBtnNext.y
      , w : CONST.ui.UNIT * positionBtnNext.w
      , h : CONST.ui.UNIT * positionBtnNext.h
      , key : CONST.uiElements.BTN_RIGHT
    });
    interaction.push({
        x : CONST.ui.UNIT * positionBtnChoisir.x
      , y : CONST.ui.UNIT * positionBtnChoisir.y
      , w : CONST.ui.UNIT * positionBtnChoisir.w
      , h : CONST.ui.UNIT * positionBtnChoisir.h
      , key : CONST.uiElements.BTN_CHOISIR
    });
  }

  return arrayInstructions;
}

module.exports = {
    chooseUserScreen : chooseUserScreen
}
