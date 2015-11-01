'use strict'
var Model = require('../model/model.js');
var CONST = require('../model/const.js');
var InterfaceUtil = require('../assets/interface-utils.js');
var Inputs = require('../triggers/inputs.js');


var _addInteractions = false
  , _colIndex = 0
  , _indexNpc = 0
  , _xNpc = 0
  , _npcArray = ['healer_f',
        'healer_m',
        'mage_f',
        'mage_m',
        'ninja_f',
        'ninja_m',
        'ranger_f',
        'ranger_m',
        'townfolk1_f',
        'townfolk1_m',
        'warrior_f',
        'warrior_m']
  , _page = 0
  , _storyArray = [
    'Vous incarnez DevLink, un développeur à la recherche de la balise perdue !'
    ,'La légende raconte que cette balise permet de contrôler son destin et de devenir un maître "Devi". Les "Devi" sont des développeurs dôtés de supers pouvoirs et sont capable de venir à bout de tous les problèmes d\'algorithmie possible'
    , 'Pour réussir votre quête, vous allez devoir passer des épreuves en répondant correctement à des questions posées par les "anciens".'
    , 'A chaque question, il vous sera demandé un code de confirmation qui ne peut être obtenu q\'en discutant avec le peuple de la tribu de l\'ancien que vous visitez'
    , 'Bonne chance jeune DevLink, que la tabulation soit avec toi !'];


setInterval(function intervalCol(){
  _colIndex = (_colIndex+1) % 3;
},100);


function checkInteractions_(event) {
  if (event.type && 
    event.type  === CONST.eventType.UP){    
    switch(event.key){
        case CONST.uiElements.BTN_LEFT :   
          if (_page > 0){
            _page--;
          }
          break;
        case CONST.uiElements.BTN_RIGHT :   
          if (_page < (_storyArray.length - 1)){
            _page++;
          }
          break;
      }
    }
}

function registerInteractions_(){
  Inputs.registerInteraction({
    type : CONST.eventType.UP
    , key : [CONST.uiElements.BTN_LEFT
          , CONST.uiElements.BTN_RIGHT
          ]
    , callback : checkInteractions_
  });
}


// API :

function storyScreen(){

  if (!_addInteractions){
    registerInteractions_()
    _addInteractions = true;
  }

  var arrayInstructions = [];//InterfaceUtil.drawAlphaBackground();

  // Mise en place du parallax
  Model.ui.stepAnimation += CONST.ui.SPEED_GRASS; 
  if (Model.ui.stepAnimation > CONST.ui.MAX_WIDTH_PARALLAX){
    Model.ui.stepAnimation = 0;
  }
  Model.ui.stepAnimationCloud += CONST.ui.SPEED_CLOUD; 
  if (Model.ui.stepAnimationCloud > CONST.ui.WIDTH_CLOUD_PARALLAX){
    Model.ui.stepAnimationCloud = 0;
  }
  var imgSky = Model.resources.images['sky']
    , imgWater = Model.resources.images['water']
    , imgGrass = Model.resources.images['grass']
    , imgCloud = Model.resources.images['cloud']
    , widthScreen = Model.ui.screenSize.width * CONST.ui.UNIT
    , heightScreen = Model.ui.screenSize.height * CONST.ui.UNIT
    , ratioHeightSky = CONST.ui.RATIO_SKY
    , ratioHeightWater = CONST.ui.RATIO_WATER
    , ratioHeightGrass = CONST.ui.RATIO_GRASS
    , ratioHeightCloud = CONST.ui.RATIO_CLOUD
    , sky = {
      height : heightScreen * ratioHeightSky
      , width : ((heightScreen * ratioHeightSky) / imgSky.height) * imgSky.width
    }
    , water = {
      height : heightScreen * ratioHeightWater
      , width : ((heightScreen * ratioHeightWater) / imgWater.height) * imgWater.width
    }
    , grass = { 
      height : heightScreen * ratioHeightGrass
      , width : ((heightScreen * ratioHeightGrass) / imgGrass.height) * imgGrass.width
      , maxWidth : ((heightScreen * ratioHeightGrass) / imgGrass.height) * CONST.ui.MAX_WIDTH_PARALLAX
      , x : -1 * Model.ui.stepAnimation
    }
    , cloud = { 
      height : heightScreen * ratioHeightCloud
      , width : ((heightScreen * ratioHeightCloud) / imgCloud.height) * imgCloud.width
      , maxWidth : ((heightScreen * ratioHeightCloud) / imgCloud.height) * CONST.ui.WIDTH_CLOUD_PARALLAX
      , x : -1 * Model.ui.stepAnimationCloud
    }

  arrayInstructions.push({
      custom : true
      , key : 'sky' // Sprite
      , wOriValue : imgSky.width // wOriValue
      , hOriValue : imgSky.height // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , yDest :  0 // rowDest
      , xDest :  0 // colDest
      , hDest :  sky.height // hDest
      , wDest :  sky.width // wDest
    });

  arrayInstructions.push({
      custom : true
      , key : 'water' // Sprite
      , wOriValue : imgWater.width // wOriValue
      , hOriValue : imgWater.height // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , yDest :  sky.height // rowDest
      , xDest :  0 // colDest
      , hDest :  water.height // hDest
      , wDest :  water.width // wDest
    });


  arrayInstructions.push({
      custom : true
      , key : 'grass' // Sprite
      , wOriValue : imgGrass.width // wOriValue
      , hOriValue : imgGrass.height // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , yDest :  heightScreen - grass.height // rowDest
      , xDest :  grass.x // colDest
      , hDest :  grass.height // hDest
      , wDest :  grass.width // wDest
    });
  if (grass.x < (-grass.maxWidth + widthScreen)){
    arrayInstructions.push({
      custom : true
      , key : 'grass' // Sprite
      , wOriValue : imgGrass.width // wOriValue
      , hOriValue : imgGrass.height // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , yDest :  heightScreen - grass.height // rowDest
      , xDest :  widthScreen - (widthScreen -  (grass.maxWidth - (-1 * grass.x))) // colDest
      , hDest :  grass.height // hDest
      , wDest :  grass.width // wDest
    });
  }

  arrayInstructions.push({
      custom : true
      , key : 'cloud' // Sprite
      , wOriValue : imgCloud.width // wOriValue
      , hOriValue : imgCloud.height // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , yDest :  sky.height / 3 // rowDest
      , xDest :  cloud.x // colDest
      , hDest :  cloud.height // hDest
      , wDest :  cloud.width // wDest
    });
  if (cloud.x < (-cloud.maxWidth + widthScreen)){
    arrayInstructions.push({
      custom : true
      , key : 'cloud' // Sprite
      , wOriValue : imgCloud.width // wOriValue
      , hOriValue : imgCloud.height // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , yDest :  sky.height / 3 // rowDest
      , xDest :  widthScreen - (widthScreen -  (cloud.maxWidth - (-1 * cloud.x))) // colDest
      , hDest :  cloud.height // hDest
      , wDest :  cloud.width // wDest
    });
  }

  arrayInstructions.push({drawText : true
      , text : _storyArray[_page]
      , fontSize : '20px'
      , color : "black"
      , x : CONST.ui.UNIT * 0.5 // X
      , y : CONST.ui.UNIT * 2// Y
      , w : widthScreen - 40 // Max Width
      , lineHeight : 30 // Line Height
  });

  // Boutons
  var positionBtnPrev = {
      x : 0.5
    , y : Model.ui.screenSize.height - 6
    , w : 3
    , h : 3
  };
  if (_page > 0){    
    Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawBtn(positionBtnPrev));
    arrayInstructions.push({drawText : true
        , text : "<<"
        , fontSize : '30px'
        , x :  CONST.ui.UNIT * (positionBtnPrev.x + 1) // X
        , y : CONST.ui.UNIT * (positionBtnPrev.y + 2) - CONST.ui.UNIT / 3 // Y
        , w : CONST.ui.UNIT * (positionBtnPrev.w - 2) // Max Width
        , lineHeight : 30 // Line Height
    });
  }

  var positionBtnNext = {
      x : Model.ui.screenSize.width - 3
    , y : positionBtnPrev.y
    , w : 3
    , h : 3
  };
  if (_page < (_storyArray.length - 1)){
    Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawBtn(positionBtnNext));
    arrayInstructions.push({drawText : true
        , text : ">>"
        , fontSize : '30px'
        , x :  CONST.ui.UNIT * (positionBtnNext.x + 1) // X
        , y : CONST.ui.UNIT * (positionBtnNext.y + 2) - CONST.ui.UNIT / 3 // Y
        , w : CONST.ui.UNIT * (positionBtnNext.w - 2) // Max Width
        , lineHeight : 30 // Line Height
    });
  }

  var positionBtnDemarer = {
      x : Math.floor(Model.ui.screenSize.width / 2) - 2.5
    , y : positionBtnPrev.y
    , w : 5
    , h : 3
  };
  Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawBtn(positionBtnDemarer));
  arrayInstructions.push({drawText : true
      , text : "Passer"
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * (positionBtnDemarer.x + 1) // X
      , y : CONST.ui.UNIT * (positionBtnDemarer.y + 2) - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (positionBtnDemarer.w - 2) // Max Width
      , lineHeight : 30 // Line Height
  });

  // NPC
  _xNpc += 1;
  if (_xNpc > widthScreen){
    _xNpc = -10;
    _indexNpc = (_indexNpc + 1) % _npcArray.length;
  }
  var positionNPC = {
    x : _xNpc
    , y : Model.ui.screenSize.height - 3
  }
  arrayInstructions.push({
      custom : true
      , key : _npcArray[_indexNpc] // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.HEIGHT_CHARS // hOriValue
      , rowOri :  1 // rowOri
      , colOri : _colIndex // colOri
      , yDest :  CONST.ui.UNIT  * (positionNPC.y) // rowDest
      , xDest :  positionNPC.x // colDest
      , hDest :  CONST.ui.UNIT  * 2 // hDest
      , wDest :  CONST.ui.UNIT * 2 // wDest
    });

  // Mise à jour de la map d'interaction
  if (Model.ui.changeScreen === CONST.screens.STORY){
    var interaction = [];
    Model.ui.mapInteraction = interaction;
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
        x : CONST.ui.UNIT * positionBtnDemarer.x
      , y : CONST.ui.UNIT * positionBtnDemarer.y
      , w : CONST.ui.UNIT * positionBtnDemarer.w
      , h : CONST.ui.UNIT * positionBtnDemarer.h
      , key : CONST.uiElements.BTN_DEMARER
    });
  }
  

  return arrayInstructions;
}

module.exports = {
	storyScreen : storyScreen
};