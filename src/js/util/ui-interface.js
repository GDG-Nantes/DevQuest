'use strict';
var Model = require('../model/model.js');
var CONST = require('../model/const.js');

function bestSize(size){
  return Math.ceil(size / CONST.UNIT) * CONST.UNIT;
}

function extractImage(canvas, context, x, y, w, h, xCanvas, yCanvas, wCanvas, hCanvas){
  // On initialise le canvas à la bonne taille
  //var canvas = document.createElement("canvas");
  //var context = canvas.getContext('2d');
  canvas.width = wCanvas;
  canvas.height = hCanvas;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(Model.ui.resources.images['ui'],
    x, y, w, h, // Extraction originale
    xCanvas, yCanvas, w, h// Postionement dans le canvas
  );
  var imageToReturn = new Image();
  imageToReturn.src = canvas.toDataURL("image/png");
  return imageToReturn;
}

function registerImage(canvas, context, key, sizes, pattern){
  Model.ui.resources.images[key] = extractImage(canvas, context,
              sizes.x, sizes.y, sizes.w, sizes.h, // Données d'origine
              sizes.xOut, sizes.yOut, sizes.wOut, sizes.hOut  // Données sortie
              );
  Model.ui.resources.sizes[key] = sizes;
  if (pattern) {
    Model.ui.resources.patterns[key] = context.createPattern(Model.ui.resources.images[key], pattern);
  }

}

function prepareZoneText(canvas, context){
  // zone repeat-x haut
  registerImage(canvas, context
    ,'txt-repeat-x-haut'
    ,{x:17,y:13,w:57,h:7
      ,xOut : 0, yOut: bestSize(7) - 7,  wOut: 57, hOut : bestSize(7)
    }
    ,'repeat'
  );
  // zone repeat-x bas
  registerImage(canvas, context
    ,'txt-repeat-x-bas'
    ,{x:17,y:45,w:57,h:7
      ,xOut : 0,yOut: 0, wOut: 57, hOut : bestSize(7)
    }
    ,'repeat'
  );
  // zone repeat-y gauche
  registerImage(canvas, context
    ,'txt-repeat-y-gauche'
    ,{x:6,y:21,w:10,h:23
      ,xOut : bestSize(10) - 10, yOut: 0,  wOut: bestSize(10), hOut : 23
    }
    ,'repeat'
  );
  // zone repeat-y droite
  registerImage(canvas, context
    ,'txt-repeat-y-droite'
    ,{x:75,y:21,w:10,h:23
      ,xOut : 0,yOut: 0, wOut: bestSize(10), hOut : 23
    }
    ,'repeat'
  );
  // zone repeat-xy centre
  registerImage(canvas, context
    ,'txt-repeat-xy'
    ,{x:17,y:21,w:57,h:23
      ,xOut : 0, yOut: 0, wOut: 57, hOut : 23
    }
    ,'repeat'
  );
  // zone coin gauche haut
  registerImage(canvas, context
    ,'txt-haut-gauche'
    ,{x:6,y:13,w:10,h:7
      ,xOut : bestSize(10) - 10,yOut:  bestSize(7) - 7, wOut: bestSize(10), hOut : bestSize(7)
    });
  // zone coin droite haut
  registerImage(canvas, context
    ,'txt-haut-droite'
    ,{x:75,y:13,w:9,h:7
      ,xOut : 0, yOut: bestSize(7) - 7, wOut: bestSize(9), hOut : bestSize(7)
    });
  // zone coin gauche bas
  registerImage(canvas, context
    ,'txt-bas-gauche'
    ,{x:6,y:45,w:10,h:7
      ,xOut : bestSize(10) - 10, yOut: 0, wOut: bestSize(10), hOut : bestSize(7)
    });
  // zone coin droite bas
  registerImage(canvas, context
    ,'txt-bas-droite'
    ,{x:75,y:45,w:9,h:7
      ,xOut : 0, yOut: 0, wOut: bestSize(9), hOut : bestSize(7)
    });
}

function prepareTitleScreen(canvas, context){
    // Début ZoneText
    registerImage(canvas, context
      ,'title-gauche'
      ,{x:176, y:101, w:20, h:32
        ,xOut: bestSize(20) - 20, yOut:0, wOut:bestSize(20), hOut:bestSize(32)
    });
    // Zone milieu
    registerImage(canvas, context
      ,'title-center'
      ,{x:196, y:101, w:40, h:32
        ,xOut: 0, yOut:0, wOut:40, hOut:bestSize(32)
      }
      ,'repeat'
    );
    // Fin zone
    registerImage(canvas, context
      ,'title-droite'
      ,{x:252, y:100, w:44, h:33
        ,xOut: bestSize(44) - 44, yOut:bestSize(33) - 33, wOut:bestSize(44), hOut:bestSize(33)
    });
    // zone repeat-x haut
    registerImage(canvas, context
      ,'title-repeat-x-haut'
      ,{x:196,y:133,w:40,h:6
        ,xOut : 0, yOut: bestSize(6) - 6,  wOut: 40, hOut : bestSize(6)
      }
      ,'repeat'
    );
    // zone repeat-x bas
    registerImage(canvas, context
      ,'title-repeat-x-bas'
      ,{x:196,y:160,w:40,h:12
        ,xOut : 0,yOut: 0, wOut: 40, hOut : bestSize(12)
      }
      ,'repeat'
    );
    // zone repeat-y gauche
    registerImage(canvas, context
      ,'title-repeat-y-gauche'
      ,{x:176,y:139,w:6,h:7
        ,xOut : bestSize(6) - 6, yOut: 0,  wOut: bestSize(6), hOut : 7
      }
      ,'repeat'
    );
    // zone repeat-y droite
    registerImage(canvas, context
      ,'title-repeat-y-droite'
      ,{x:273,y:139,w:13,h:7
        ,xOut : 0,yOut: 0, wOut: bestSize(13), hOut : 7
      }
      ,'repeat'
    );
    // zone repeat-xy centre
    registerImage(canvas, context
      ,'title-repeat-xy'
      ,{x:182,y:139,w:14,h:11
        ,xOut : 0, yOut: 0, wOut: 14, hOut : 11
      }
      ,'repeat'
    );
    // zone coin gauche haut
    registerImage(canvas, context
      ,'title-haut-gauche'
      ,{x:176,y:133,w:6,h:6
        ,xOut : bestSize(6) - 6,yOut:  bestSize(6) - 6, wOut: bestSize(6), hOut : bestSize(6)
      });
    // zone coin droite haut
    registerImage(canvas, context
      ,'title-haut-droite'
      ,{x:273,y:133,w:13,h:6
        ,xOut : 0, yOut: bestSize(6) - 6, wOut: bestSize(13), hOut : bestSize(6)
      });
    // zone coin gauche bas
    registerImage(canvas, context
      ,'title-bas-gauche'
      ,{x:176,y:160,w:6,h:12
        ,xOut : bestSize(6) - 6, yOut: 0, wOut: bestSize(6), hOut : bestSize(12)
      });
    // zone coin droite bas
    registerImage(canvas, context
      ,'title-bas-droite'
      ,{x:273,y:160,w:13,h:12
        ,xOut : 0, yOut: 0, wOut: bestSize(13), hOut : bestSize(12)
      });
}

// API

function prepareUiElements(){
  // On va devoir feinter pour préparer l'ui avec des élements spéciaux
  var canvasTmp = document.createElement("canvas");
  canvasTmp.id = "toDelete";
  var contextTmp = canvasTmp.getContext('2d');
  // On initialise une map de tailles histoire de connaitre les tailles d'affichage
  Model.ui.resources.sizes = [];
  // On fait la même chose avec les patterns
  Model.ui.resources.patterns = [];
  prepareZoneText(canvasTmp, contextTmp);
  prepareTitleScreen(canvasTmp, contextTmp);
  canvasTmp.remove();
}

module.exports = {
    prepareUiElements : prepareUiElements
}
