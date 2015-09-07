'use strict'
var Model = require('../model/model.js');
var CONST = require('../model/const.js');
var InterfaceUtil = require('../assets/interface-utils.js');



// API :

function homeScreen(){
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

  // Titre & Logo 
  var imgTitle = Model.resources.images['title']
    , imgLogo = Model.resources.images['logo']
    , ratioHeightTitle = CONST.ui.RATIO_TITLE
    , ratioHeightLogo = CONST.ui.RATIO_LOGO
    , title = {
      height : heightScreen * ratioHeightTitle
      , width : Math.min(((heightScreen * ratioHeightTitle) / imgTitle.height) * imgTitle.width, imgTitle.width)
    }
    , logo = {
      height : heightScreen * ratioHeightLogo
      , width : ((heightScreen * ratioHeightLogo) / imgLogo.height) * imgLogo.width
    }
  arrayInstructions.push({
      custom : true
      , key : 'title' // Sprite
      , wOriValue : imgTitle.width // wOriValue
      , hOriValue : imgTitle.height // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , yDest :  CONST.ui.UNIT * 3 // rowDest
      , xDest :  (widthScreen - title.width) / 4  // colDest
      , hDest :  title.height // hDest
      , wDest :  title.width // wDest
    });

  arrayInstructions.push({
      custom : true
      , key : 'logo' // Sprite
      , wOriValue : imgLogo.width // wOriValue
      , hOriValue : imgLogo.height // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , yDest :  (sky.height / 3) + cloud.height // rowDest
      , xDest :  (widthScreen - logo.width) / 4  // colDest
      , hDest :  logo.height // hDest
      , wDest :  logo.width // wDest
    });

  // Bouton 
  var positionBtnDemarer = {
      x : Math.floor(Model.ui.screenSize.width / 2) - 2.5
    , y : Model.ui.screenSize.height - 6
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