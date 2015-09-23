'use strict'
var Model = require('../model/model.js');
var CONST = require('../model/const.js');
var InterfaceUtil = require('../assets/interface-utils.js');
var Inputs = require('../triggers/inputs.js');

var _addInteractions = false
  , _showRegister = false
  , _pseudoEmpty = false
  , _emailEmpty = false
  , _interactionRegister = []
  , _interactionLogin = []
  , _state = -1;

function checkInteractions_(event) {
  if (event.type && 
    event.type  === CONST.eventType.UP){    
    switch(event.key){
        case CONST.uiElements.BTN_CUSTO :   
          _showRegister = true;
          break;
        case CONST.uiElements.BTN_OK :   
          var inputPseudo = document.getElementById('pseudo-register');
          var inputEmail = document.getElementById('email-register');
          Model.gameModel.user = {}
          if (inputPseudo && inputPseudo.value){
            _pseudoEmpty = false;
            Model.gameModel.user.displayName = inputPseudo.value;            
            inputPseudo.style.border = "";
            // TODO faire quelque chose avec le code de confirmation
          }else{
            _pseudoEmpty = true;
            inputPseudo.style.border = "thin solid red";
            inputPseudo.placeholder = "PSEUDO OBLIGATOIRE";
            // TODO 
            return;

          }
          if (inputEmail && inputEmail.value){
            _emailEmpty = false;
            Model.gameModel.user.email = inputEmail.value;
            inputEmail.style.border = "";
            // TODO faire quelque chose avec le code de confirmation
          }else{
            _emailEmpty = true;
            inputEmail.style.border = "thin solid red";
            inputEmail.placeholder = "EMAIL OBLIGATOIRE";
            // TODO 
            return;

          }
          document.body.removeChild(inputPseudo);
          document.body.removeChild(inputEmail);
          Model.ui.changeScreen = CONST.screens.CHOOSE_USER;
          break;
      }
    }
}

function registerInteractions_(){
  Inputs.registerInteraction({
    type : CONST.eventType.UP
    , key : [CONST.uiElements.BTN_CUSTO
          , CONST.uiElements.BTN_OK
          ]
    , callback : checkInteractions_
  });
}

function paintLogins_(position){
  var arrayInstructions = [];

  // Boutons de login
  var xBtns = 1.5;
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
  if (_interactionLogin.length === 0 ){
    var interaction = [];
    _interactionLogin = interaction;    
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

function paintRegister_(position){
  var arrayInstructions = [];

  var positionPseudo = {
    x : position.x + 0.5,
    y : position.y + 2,
    w : Model.ui.screenSize.width - 1
  };
  arrayInstructions.push({drawText : true
      , text : "Pseudo"
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * (positionPseudo.x + 1) // X
      , y : CONST.ui.UNIT * (positionPseudo.y + 1) - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (positionPseudo.w - 2) // Max Width
      , lineHeight : 30 // Line Height
  });
  // Gestion du champ de saisie du pseudo
  var inputPseudo = document.getElementById('pseudo-register');
  if (!inputPseudo){
    inputPseudo = document.createElement('input');
    inputPseudo.id = 'pseudo-register';
    inputPseudo.type = 'text';
    inputPseudo.placeholder = 'votre pseudo';
    inputPseudo.style.position = 'absolute';
    inputPseudo.style.top = (CONST.ui.UNIT * (positionPseudo.y + 1))+'px';  
    inputPseudo.style.left = (CONST.ui.UNIT * (positionPseudo.x + 1))+'px';  
    inputPseudo.style.width = (CONST.ui.UNIT * (positionPseudo.w - 4))+'px';
    document.body.appendChild(inputPseudo);
    // input = document.querySelector('#code-confirmation');

  }

  var positionEmail = {
    x : positionPseudo.x,
    y : positionPseudo.y + 2,
    w : positionPseudo.w
  };
  arrayInstructions.push({drawText : true
      , text : "Email"
      , fontSize : '20px'
      , x :  CONST.ui.UNIT * (positionEmail.x + 1) // X
      , y : CONST.ui.UNIT * (positionEmail.y + 1) - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (positionEmail.w - 2) // Max Width
      , lineHeight : 30 // Line Height
  });

  // Gestion du champ de saisie du email
  var inputEmail = document.getElementById('email-register');
  if (!inputEmail){
    inputEmail = document.createElement('input');
    inputEmail.id = 'email-register';
    inputEmail.type = 'text';
    inputEmail.placeholder = 'email de contact';
    inputEmail.style.position = 'absolute';
    inputEmail.style.top = (CONST.ui.UNIT * (positionEmail.y + 1))+'px';  
    inputEmail.style.left = (CONST.ui.UNIT * (positionEmail.x + 1))+'px';  
    inputEmail.style.width = (CONST.ui.UNIT * (positionEmail.w - 4))+'px';
    document.body.appendChild(inputEmail);
    // input = document.querySelector('#code-confirmation');

  }

  // Boutons
  var positionBtnValid = {
      x : (Model.ui.screenSize.width - 6) / 2
    , y : positionEmail.y  + 2
    , w : 6
    , h : 3
  };
  Array.prototype.push.apply(arrayInstructions, InterfaceUtil.drawBtn(positionBtnValid));
  arrayInstructions.push({drawText : true
      , text : "Valider"
      , fontSize : '30px'
      , x :  CONST.ui.UNIT * (positionBtnValid.x + 1) // X
      , y : CONST.ui.UNIT * (positionBtnValid.y + 2) - CONST.ui.UNIT / 3 // Y
      , w : CONST.ui.UNIT * (positionBtnValid.w - 2) // Max Width
      , lineHeight : 30 // Line Height
  });

  // Mise à jour de la map d'interaction
  if (_interactionRegister.length === 0 ){
    var interaction = [];
    _interactionRegister = interaction;    
    interaction.push({
        x : CONST.ui.UNIT * positionBtnValid.x
      , y : CONST.ui.UNIT * positionBtnValid.y
      , w : CONST.ui.UNIT * positionBtnValid.w
      , h : CONST.ui.UNIT * positionBtnValid.h
      , key : CONST.uiElements.BTN_OK
    });    
  }

  return arrayInstructions;
}

// API :

function loginScreen(){
  if (!_addInteractions){
    registerInteractions_()
    _addInteractions = true;
  }

  var arrayInstructions = InterfaceUtil.drawAlphaBackground();

  // Zone autour du personnage
  var position = {
        x: 0
      , y :3
      , w: Model.ui.screenSize.width - 1
      , h: Model.ui.screenSize.height - 4}
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


  if (_showRegister){
    Array.prototype.push.apply(arrayInstructions, paintRegister_(position));

  }else{
    Array.prototype.push.apply(arrayInstructions, paintLogins_(position));
  }

  // Mise à jour de la map d'interaction
  if (Model.ui.changeScreen === CONST.screens.LOGIN){
    _showRegister = false;
    _state = -1;
  }

  var currentState = _showRegister ? 1 : 0;
  if (_state != currentState){
    if (_showRegister){
      Model.ui.mapInteraction = _interactionRegister;        
    }else{
      Model.ui.mapInteraction = _interactionLogin;        
    }
    _state = currentState;
  }

  return arrayInstructions;
}

module.exports = {
	loginScreen : loginScreen
};