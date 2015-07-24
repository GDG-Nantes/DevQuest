'use strict';
var Model = require('../model/model.js');
var CONST = require('../model/const.js');


function drawCarreTexte(keys, position){
  var arrayInstructions = [];
  // Coin Haut Gauche
  arrayInstructions.push({key : keys.hautGauche // Sprite
    , wOriValue : CONST.ui.UNIT // wOriValue
    , hOriValue : CONST.ui.UNIT // hOriValue
    , rowOri : 0 // rowOri
    , colOri : 0 // colOri
    , rowDest : position.y // rowDest
    , colDest : position.x // colDest
  });
  // Ligne Haute
  arrayInstructions.push({repeat : true
    , key : keys.haut
    , colDest :(position.x + 1)
    , rowDest : position.y
    , wDest : (position.w - 2)
    , hDest : 1
  });
  // Coin Haut droit
  arrayInstructions.push({key : keys.hautDroite // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri : 0 // rowOri
      , colOri : 0 // colOri
      , rowDest : position.y // rowDest
      , colDest : position.x + position.w - 1 // colDest
    });
  // Côté Gauche
  arrayInstructions.push({ repeat : true
    , key : keys.gauche
    , colDest :position.x
    , rowDest : (position.y + 1)
    , wDest : 1
    , hDest : (position.h - 2)
  });
  // Centre
  arrayInstructions.push({ repeat : true
    , key : keys.centre
    , colDest :(position.x + 1)
    , rowDest : (position.y + 1)
    , wDest : (position.w - 2)
    , hDest : (position.h - 2)
  });
  // Côté Droit
  arrayInstructions.push({ repeat : true
    , key : keys.droite
    , colDest :(position.x + position.w - 1)
    , rowDest : (position.y + 1)
    , wDest : 1
    , hDest : (position.h - 2)
  });
  // Coin bas gauche
  arrayInstructions.push({key : keys.basGauche // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri : 0 // rowOri
      , colOri : 0 // colOri
      , rowDest : position.y + position.h - 1 // rowDest
      , colDest : position.x // colDest
    });
  // ligne basse
  arrayInstructions.push({ repeat : true
    , key : keys.bas
    , colDest :(position.x + 1)
    , rowDest : (position.y + position.h  - 1)
    , wDest : (position.w - 2)
    , hDest : 1
  });
  // Coin bas droit
  arrayInstructions.push({key : keys.basDroite // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri : 0 // rowOri
      , colOri : 0 // colOri
      , rowDest : position.y + position.h - 1// rowDest
      , colDest : position.x + position.w - 1 // colDest
    });

  return arrayInstructions;
}

//API

// Affichage d'une zone de texte en fonction de sa position dans l'écran
function drawCreux(position){
  return drawCarreTexte({
      hautGauche : 'creux-haut-gauche'
    , haut : 'creux-repeat-x-haut'
    , hautDroite : 'creux-haut-droite'
    , gauche : 'creux-repeat-y-gauche'
    , centre : 'creux-repeat-xy'
    , droite : 'creux-repeat-y-droite'
    , basGauche : 'creux-bas-gauche'
    , bas : 'creux-repeat-x-bas'
    , basDroite : 'creux-bas-droite'
  }, position);
}

// Affichage d'un bouton
function drawBtn(position){
  return drawCarreTexte({
      hautGauche : 'btn-haut-gauche'
    , haut : 'btn-repeat-x-haut'
    , hautDroite : 'btn-haut-droite'
    , gauche : 'btn-repeat-y-gauche'
    , centre : 'btn-repeat-xy'
    , droite : 'btn-repeat-y-droite'
    , basGauche : 'btn-bas-gauche'
    , bas : 'btn-repeat-x-bas'
    , basDroite : 'btn-bas-droite'
  }, position);
}

// Affichage d'un bouton pressé
function drawBtnPressed(position){
  return drawCarreTexte({
      hautGauche : 'btnpressed-haut-gauche'
    , haut : 'btnpressed-repeat-x-haut'
    , hautDroite : 'btnpressed-haut-droite'
    , gauche : 'btnpressed-repeat-y-gauche'
    , centre : 'btnpressed-repeat-xy'
    , droite : 'btnpressed-repeat-y-droite'
    , basGauche : 'btnpressed-bas-gauche'
    , bas : 'btnpressed-repeat-x-bas'
    , basDroite : 'btnpressed-bas-droite'
  }, position);
}



// Affichage d'une zone de texte en fonction de sa position dans l'écran
function drawZoneTexte(position){
  return drawCarreTexte({
      hautGauche : 'txt-haut-gauche'
    , haut : 'txt-repeat-x-haut'
    , hautDroite : 'txt-haut-droite'
    , gauche : 'txt-repeat-y-gauche'
    , centre : 'txt-repeat-xy'
    , droite : 'txt-repeat-y-droite'
    , basGauche : 'txt-bas-gauche'
    , bas : 'txt-repeat-x-bas'
    , basDroite : 'txt-bas-droite'
  }, position);
}


// meme chose mais pour la zone avec un titre
function drawZoneTexteAvecTitre(position){
  var arrayInstructions = [];
  // Zone de titre
  arrayInstructions.push({key : 'title-gauche' // Sprite
    , wOriValue : CONST.ui.UNIT // wOriValue
    , hOriValue : CONST.ui.UNIT // hOriValue
    , rowOri :  0 // rowOri
    , colOri : 0 // colOri
    , rowDest :  position.y // rowDest
    , colDest :  position.x // colDest
  });
  arrayInstructions.push({ repeat : true
      , key : 'title-center'
      , colDest : (position.x + 1)
      , rowDest : (position.y + 0)
      , wDest : (position.w - 2)
      , hDest : 1
    });
  arrayInstructions.push({key : 'title-droite' // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , rowDest :  position.y  // rowDest
      , colDest :  position.x + position.w - 1// colDest
    });
  arrayInstructions.push({key : 'title-droite' // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 1 // colOri
      , rowDest :  position.y  // rowDest
      , colDest :  position.x + position.w// colDest
    });
  // Coin Haut Gauche
  arrayInstructions.push({key : 'title-haut-gauche' // Sprite
    , wOriValue : CONST.ui.UNIT // wOriValue
    , hOriValue : CONST.ui.UNIT // hOriValue
    , rowOri :  0 // rowOri
    , colOri : 0 // colOri
    , rowDest :  position.y + 1 // rowDest
    , colDest :  position.x // colDest
  });
  // Ligne Haute
  arrayInstructions.push({ repeat : true
      , key : 'title-repeat-x-haut'
      , colDest : (position.x + 1)
      , rowDest : (position.y + 1)
      , wDest : (position.w - 2)
      , hDest : 1
    });
  // Coin Haut droit
  arrayInstructions.push({key : 'title-haut-droite' // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , rowDest :  position.y + 1 // rowDest
      , colDest :  position.x + position.w - 1 // colDest
    });
  // Côté Gauche
  arrayInstructions.push({ repeat : true
      , key : 'title-repeat-y-gauche'
      , colDest : position.x
      , rowDest : (position.y + 2)
      , wDest : 1
      , hDest : (position.h - 2)
    });
  // Centre
  arrayInstructions.push({ repeat : true
      , key : 'title-repeat-xy'
      , colDest : (position.x + 1)
      , rowDest : (position.y + 2)
      , wDest : (position.w - 2)
      , hDest : (position.h - 2)
    });
  // Côté Droit
  arrayInstructions.push({ repeat : true
      , key : 'title-repeat-y-droite'
      , colDest : (position.x + position.w - 1)
      , rowDest : (position.y + 2)
      , wDest : 1
      , hDest : (position.h - 2)
    });
  // Coin bas gauche
  arrayInstructions.push({key : 'title-bas-gauche' // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , rowDest :  position.y + position.h // rowDest
      , colDest :  position.x // colDest
    });
  // ligne basse
  arrayInstructions.push({ repeat : true
      , key : 'title-repeat-x-bas'
      , colDest : (position.x + 1)
      , rowDest : (position.y + position.h)
      , wDest : (position.w - 2)
      , hDest : 1
    });
  // Coin bas droit
  arrayInstructions.push({key : 'title-bas-droite' // Sprite
      , wOriValue : CONST.ui.UNIT // wOriValue
      , hOriValue : CONST.ui.UNIT // hOriValue
      , rowOri :  0 // rowOri
      , colOri : 0 // colOri
      , rowDest :  position.y + position.h// rowDest
      , colDest :  position.x + position.w - 1 // colDest
    });

  return arrayInstructions;
}

function drawAlphaBackground(){
  var array = [];
  for (var row = 0; row < CONST.ui.SIZE_UNIT.h; row++){
    var arrayRow = [];
    for (var col =0; col < CONST.ui.SIZE_UNIT.w; col++){
      array.push({key : 'inside_1' // Sprite
        , wOriValue : CONST.ui.UNIT // wOriValue
        , hOriValue : CONST.ui.UNIT // hOriValue
        , rowOri :  8 // rowOri
        , colOri : 1 // colOri
        , rowDest :  row// rowDest
        , colDest :  col // colDest
        });
    }
  }
  return array;
}

module.exports = {
    drawZoneTexte : drawZoneTexte,
    drawZoneTexteAvecTitre : drawZoneTexteAvecTitre,
    drawCreux : drawCreux,
    drawBtn : drawBtn,
    drawBtnPressed : drawBtnPressed,
    drawAlphaBackground : drawAlphaBackground
}
