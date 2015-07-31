'use strict';
var Model = require('../model/model.js');
var CONST = require('../model/const.js');

// Helper Methodes

function bestSize_(size){
  return Math.ceil(size / CONST.ui.UNIT) * CONST.ui.UNIT;
}

function extractImage_(canvas, context, idImage, x, y, w, h, xCanvas, yCanvas, wCanvas, hCanvas){
  // On initialise le canvas à la bonne taille
  //var canvas = document.createElement("canvas");
  //var context = canvas.getContext('2d');
  canvas.width = wCanvas;
  canvas.height = hCanvas;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(Model.resources.images[idImage],
    x, y, w, h, // Extraction originale
    xCanvas, yCanvas, w, h// Postionement dans le canvas
  );
  var imageToReturn = new Image();
  imageToReturn.src = canvas.toDataURL("image/png");
  return imageToReturn;
}

function registerImageCusto_(canvas, context, idImage, key, sizes, pattern){
  Model.resources.images[key] = extractImage_(canvas, context, idImage, 
              sizes.x, sizes.y, sizes.w, sizes.h, // Données d'origine
              sizes.xOut, sizes.yOut, sizes.wOut, sizes.hOut  // Données sortie
              );
  Model.resources.sizes[key] = sizes;
  if (pattern) {
    Model.resources.patterns[key] = context.createPattern(Model.resources.images[key], pattern);
  }

  if (CONST.DEBUG){
    console.debug("Img : key : %s", key);
    var img = Model.resources.images[key];
    document.body.appendChild(img);
    img.style.display = 'none';
    console.debug(img);
  }

}

function registerImage_(canvas, context, key, sizes, pattern){
  registerImageCusto_(canvas, context, 'ui', key, sizes, pattern); 

}

function prepareZoneText_(canvas, context){
  var promise = new Promise(function promiseZoneText(resolve, reject){
    // zone repeat-x haut
    registerImage_(canvas, context
      ,'txt-repeat-x-haut'
      ,{x:17,y:13,w:57,h:7
        ,xOut : 0, yOut: bestSize_(7) - 7,  wOut: 57, hOut : bestSize_(7)
      }
      ,'repeat'
    );
    // zone repeat-x bas
    registerImage_(canvas, context
      ,'txt-repeat-x-bas'
      ,{x:17,y:45,w:57,h:7
        ,xOut : 0,yOut: 0, wOut: 57, hOut : bestSize_(7)
      }
      ,'repeat'
    );
    // zone repeat-y gauche
    registerImage_(canvas, context
      ,'txt-repeat-y-gauche'
      ,{x:6,y:21,w:10,h:23
        ,xOut : bestSize_(10) - 10, yOut: 0,  wOut: bestSize_(10), hOut : 23
      }
      ,'repeat'
    );
    // zone repeat-y droite
    registerImage_(canvas, context
      ,'txt-repeat-y-droite'
      ,{x:75,y:21,w:10,h:23
        ,xOut : 0,yOut: 0, wOut: bestSize_(10), hOut : 23
      }
      ,'repeat'
    );
    // zone repeat-xy centre
    registerImage_(canvas, context
      ,'txt-repeat-xy'
      ,{x:17,y:21,w:57,h:23
        ,xOut : 0, yOut: 0, wOut: 57, hOut : 23
      }
      ,'repeat'
    );
    // zone coin gauche haut
    registerImage_(canvas, context
      ,'txt-haut-gauche'
      ,{x:6,y:13,w:10,h:7
        ,xOut : bestSize_(10) - 10,yOut:  bestSize_(7) - 7, wOut: bestSize_(10), hOut : bestSize_(7)
      });
    // zone coin droite haut
    registerImage_(canvas, context
      ,'txt-haut-droite'
      ,{x:75,y:13,w:9,h:7
        ,xOut : 0, yOut: bestSize_(7) - 7, wOut: bestSize_(9), hOut : bestSize_(7)
      });
    // zone coin gauche bas
    registerImage_(canvas, context
      ,'txt-bas-gauche'
      ,{x:6,y:45,w:10,h:7
        ,xOut : bestSize_(10) - 10, yOut: 0, wOut: bestSize_(10), hOut : bestSize_(7)
      });
    // zone coin droite bas
    registerImage_(canvas, context
      ,'txt-bas-droite'
      ,{x:75,y:45,w:9,h:7
        ,xOut : 0, yOut: 0, wOut: bestSize_(9), hOut : bestSize_(7)
      });

    resolve();
  });
  return promise;
}

function prepareTitleScreen_(canvas, context){
    var promise = new Promise(function promiseTitleScreen(resolve, reject){
      // Début ZoneText
      registerImage_(canvas, context
        ,'title-gauche'
        ,{x:176, y:100, w:20, h:31
          ,xOut: bestSize_(20) - 20, yOut:bestSize_(31) - 31, wOut:bestSize_(20), hOut:bestSize_(31)
      });
      // Zone milieu
      registerImage_(canvas, context
        ,'title-center'
        ,{x:196, y:100, w:40, h:31
          ,xOut: 0, yOut:bestSize_(31) - 31, wOut:40, hOut:bestSize_(31)
        }
        ,'repeat'
      );
      // Fin zone
      registerImage_(canvas, context
        ,'title-droite'
        ,{x:252, y:100, w:44, h:31
          ,xOut: 0, yOut:bestSize_(31) - 31, wOut:bestSize_(44), hOut:bestSize_(31)
      });
      // zone repeat-x haut
      registerImage_(canvas, context
        ,'title-repeat-x-haut'
        ,{x:196,y:131,w:40,h:32
          ,xOut : 0, yOut: 0,  wOut: 40, hOut : bestSize_(32)
        }
        ,'repeat'
      );
      // zone repeat-x bas
      registerImage_(canvas, context
        ,'title-repeat-x-bas'
        ,{x:196,y:160,w:40,h:12
          ,xOut : 0,yOut: 0, wOut: 40, hOut : bestSize_(12)
        }
        ,'repeat'
      );
      // zone repeat-y gauche
      registerImage_(canvas, context
        ,'title-repeat-y-gauche'
        ,{x:176,y:155,w:20,h:7
          ,xOut : bestSize_(20) - 20, yOut: 0,  wOut: bestSize_(20), hOut : 7
        }
        ,'repeat'
      );
      // zone repeat-y droite
      registerImage_(canvas, context
        ,'title-repeat-y-droite'
        ,{x:273,y:155,w:32,h:7
          ,xOut : 0,yOut: 0, wOut: bestSize_(32), hOut : 7
        }
        ,'repeat'
      );
      // zone repeat-xy centre
      registerImage_(canvas, context
        ,'title-repeat-xy'
        ,{x:196,y:155,w:14,h:11
          ,xOut : 0, yOut: 0, wOut: 14, hOut : 11
        }
        ,'repeat'
      );
      // zone coin gauche haut
      registerImage_(canvas, context
        ,'title-haut-gauche'
        ,{x:176,y:131,w:20,h:32
          ,xOut : bestSize_(20) - 20,yOut:  0, wOut: bestSize_(20), hOut : bestSize_(32)
        });
      // zone coin droite haut
      registerImage_(canvas, context
        ,'title-haut-droite'
        ,{x:273,y:131,w:44,h:32
          ,xOut : 0, yOut: 0, wOut: bestSize_(44), hOut : bestSize_(32)
        });
      // zone coin gauche bas
      registerImage_(canvas, context
        ,'title-bas-gauche'
        ,{x:176,y:160,w:20,h:12
          ,xOut : bestSize_(20) - 20, yOut: 0, wOut: bestSize_(20), hOut : bestSize_(12)
        });
      // zone coin droite bas
      registerImage_(canvas, context
        ,'title-bas-droite'
        ,{x:273,y:160,w:44,h:12
          ,xOut : 0, yOut: 0, wOut: bestSize_(44), hOut : bestSize_(12)
        });

      resolve();
    });
    return promise;
}

function prepareCreux_(canvas, context){
  var promise = new Promise(function promiseCreux(resolve, reject){
    //Haut Gauche
    registerImage_(canvas, context
      ,'creux-haut-gauche'
      ,{x:45,y:60,w:3,h:3
        ,xOut : bestSize_(3) - 3,yOut:  bestSize_(3) - 3, wOut: bestSize_(3), hOut : bestSize_(3)
      });
    //Haut Centre
    registerImage_(canvas, context
        ,'creux-repeat-x-haut'
        ,{x:47,y:60,w:2,h:3
          ,xOut : 0, yOut: bestSize_(3) - 3, wOut: 2, hOut : bestSize_(3)
        }
        ,'repeat'
      );
    //Haut Droit
    registerImage_(canvas, context
      ,'creux-haut-droite'
      ,{x:50,y:60,w:3,h:3
        ,xOut : 0,yOut:  bestSize_(3) - 3, wOut: bestSize_(3), hOut : bestSize_(3)
      });
    //Gauche
    registerImage_(canvas, context
        ,'creux-repeat-y-gauche'
        ,{x:45,y:62,w:3,h:2
          ,xOut : bestSize_(3) - 3, yOut: 0, wOut: bestSize_(3), hOut : 2
        }
        ,'repeat'
      );
    //Centre
    registerImage_(canvas, context
        ,'creux-repeat-xy'
        ,{x:47,y:62,w:2,h:2
          ,xOut : 0, yOut: 0, wOut: 2, hOut : 2
        }
        ,'repeat'
      );
    //Droite
    registerImage_(canvas, context
        ,'creux-repeat-y-droite'
        ,{x:50,y:62,w:3,h:2
          ,xOut : 0, yOut: 0, wOut: bestSize_(3), hOut : 2
        }
        ,'repeat'
      );
    //Bas Gauche
    registerImage_(canvas, context
      ,'creux-bas-gauche'
      ,{x:45,y:65,w:3,h:3
        ,xOut : bestSize_(3) - 3,yOut:  0, wOut: bestSize_(3), hOut : bestSize_(3)
      });
    //Bas Centre
    registerImage_(canvas, context
        ,'creux-repeat-x-bas'
        ,{x:47,y:66,w:2,h:3
          ,xOut : 0, yOut: 0, wOut: 2, hOut : bestSize_(3)
        }
        ,'repeat'
      );
    //Bas Droit
    registerImage_(canvas, context
      ,'creux-bas-droite'
      ,{x:50,y:65,w:3,h:3
        ,xOut : 0,yOut:  0, wOut: bestSize_(3), hOut : bestSize_(3)
      });

    resolve();
  });
  return promise;
}

function prepareBtn_(canvas, context){
  var promise = new Promise(function promiseBtn(resolve, reject){
    //Haut Gauche
    registerImage_(canvas, context
      ,'btn-haut-gauche'
      ,{x:148,y:13,w:17,h:6
        ,xOut : bestSize_(17) - 17,yOut:  bestSize_(6) - 6, wOut: bestSize_(17), hOut : bestSize_(6)
      });
    //Haut Centre
    registerImage_(canvas, context
        ,'btn-repeat-x-haut'
        ,{x:165,y:13,w:6,h:6
          ,xOut : 0, yOut: bestSize_(6) - 6, wOut: 6, hOut : bestSize_(6)
        }
        ,'repeat'
      );
    //Haut Droit
    registerImage_(canvas, context
      ,'btn-haut-droite'
      ,{x:171,y:13,w:9,h:6
        ,xOut : 0,yOut:  bestSize_(6) - 6, wOut: bestSize_(9), hOut : bestSize_(6)
      });
    //Gauche
    registerImage_(canvas, context
        ,'btn-repeat-y-gauche'
        ,{x:148,y:19,w:17,h:4
          ,xOut : bestSize_(17) - 17, yOut: 0, wOut: bestSize_(17), hOut : 4
        }
        ,'repeat'
      );
    //Centre
    registerImage_(canvas, context
        ,'btn-repeat-xy'
        ,{x:165,y:19,w:6,h:4
          ,xOut : 0, yOut: 0, wOut: 6, hOut : 4
        }
        ,'repeat'
      );
    //Droite
    registerImage_(canvas, context
        ,'btn-repeat-y-droite'
        ,{x:171,y:19,w:9,h:4
          ,xOut : 0, yOut: 0, wOut: bestSize_(9), hOut : 4
        }
        ,'repeat'
      );
    //Bas Gauche
    registerImage_(canvas, context
      ,'btn-bas-gauche'
      ,{x:148,y:23,w:17,h:6
        ,xOut : bestSize_(17) - 17,yOut:  0, wOut: bestSize_(17), hOut : bestSize_(6)
      });
    //Bas Centre
    registerImage_(canvas, context
        ,'btn-repeat-x-bas'
        ,{x:165,y:23,w:6,h:6
          ,xOut : 0, yOut: 0, wOut: 6, hOut : bestSize_(6)
        }
        ,'repeat'
      );
    //Bas Droit
    registerImage_(canvas, context
      ,'btn-bas-droite'
      ,{x:171,y:23,w:9,h:6
        ,xOut : 0,yOut:  0, wOut: bestSize_(9), hOut : bestSize_(6)
      });

    resolve();
  });
  return promise;
}

function prepareBtnPressed_(canvas, context){
  var promise = new Promise(function promiseBtnPressed(resolve, reject){

    //Haut Gauche
    registerImage_(canvas, context
      ,'btnpressed-haut-gauche'
      ,{x:148,y:47,w:5,h:5
        ,xOut : bestSize_(5) - 5,yOut:  bestSize_(5) - 5, wOut: bestSize_(5), hOut : bestSize_(5)
      });
    //Haut Centre
    registerImage_(canvas, context
        ,'btnpressed-repeat-x-haut'
        ,{x:153,y:47,w:7,h:5
          ,xOut : 0, yOut: bestSize_(5) - 5, wOut: 7, hOut : bestSize_(5)
        }
        ,'repeat'
      );
    //Haut Droit
    registerImage_(canvas, context
      ,'btnpressed-haut-droite'
      ,{x:160,y:47,w:20,h:5
        ,xOut : 0,yOut:  bestSize_(5) - 5, wOut: bestSize_(20), hOut : bestSize_(5)
      });
    //Gauche
    registerImage_(canvas, context
        ,'btnpressed-repeat-y-gauche'
        ,{x:148,y:52,w:5,h:6
          ,xOut : bestSize_(5) - 5, yOut: 0, wOut: bestSize_(5), hOut : 5
        }
        ,'repeat'
      );
    //Centre
    registerImage_(canvas, context
        ,'btnpressed-repeat-xy'
        ,{x:153,y:52,w:7,h:6
          ,xOut : 0, yOut: 0, wOut: 7, hOut : 6
        }
        ,'repeat'
      );
    //Droite
    registerImage_(canvas, context
        ,'btnpressed-repeat-y-droite'
        ,{x:160,y:52,w:20,h:6
          ,xOut : 0, yOut: 0, wOut: bestSize_(20), hOut : 6
        }
        ,'repeat'
      );
    //Bas Gauche
    registerImage_(canvas, context
      ,'btnpressed-bas-gauche'
      ,{x:148,y:58,w:5,h:5
        ,xOut : bestSize_(5) - 5,yOut:  0, wOut: bestSize_(5), hOut : bestSize_(5)
      });
    //Bas Centre
    registerImage_(canvas, context
        ,'btnpressed-repeat-x-bas'
        ,{x:153,y:58,w:7,h:5
          ,xOut : 0, yOut: 0, wOut: 7, hOut : bestSize_(5)
        }
        ,'repeat'
      );
    //Bas Droit
    registerImage_(canvas, context
      ,'btnpressed-bas-droite'
      ,{x:160,y:58,w:20,h:5
        ,xOut : 0,yOut:  0, wOut: bestSize_(20), hOut : bestSize_(5)
      });

    resolve();
  });
return promise;
}

function prepareNPC_(canvas, context){
  var promise = new Promise(function promiseNPC(resolve, reject){

    registerImageCusto_(canvas, context, 'npc_silver'
      ,'npc_face_silver'
      ,{x:77,y:4,w:59,h:65
        ,xOut : 0, yOut:  0, wOut: 59, hOut : 65
      });

    registerImageCusto_(canvas, context, 'npc_gold'
      ,'npc_face_gold'
      ,{x:82,y:3,w:60,h:71
        ,xOut : 0, yOut:  0, wOut: 60, hOut : 71
      });

    registerImageCusto_(canvas, context, 'npc_platinium'
      ,'npc_face_platinium'
      ,{x:82,y:3,w:60,h:71
        ,xOut : 0, yOut:  0, wOut: 60, hOut : 71
      });
    
    resolve();
  });
return promise;
}
// API


// Prépare toutes les ressources
function prepareUiElements(){
  var promise = new Promise(function promisePrepareUiElements(resolve, reject){
    // On va devoir feinter pour préparer l'ui avec des élements spéciaux
    var canvasTmp = document.createElement("canvas");
    canvasTmp.id = "toDelete";
    var contextTmp = canvasTmp.getContext('2d');
    // On initialise une map de tailles histoire de connaitre les tailles d'affichage
    Model.resources.sizes = [];
    // On fait la même chose avec les patterns
    Model.resources.patterns = [];
    // On prépare toutes les promesses de chargement
    var promises = [prepareZoneText_(canvasTmp, contextTmp)
            , prepareTitleScreen_(canvasTmp, contextTmp)
            , prepareCreux_(canvasTmp, contextTmp)
            , prepareBtn_(canvasTmp, contextTmp)
            , prepareBtnPressed_(canvasTmp, contextTmp)
            , prepareNPC_(canvasTmp, contextTmp)
            ];
    Promise.all(promises)
          .then(function(){
            canvasTmp.remove();
            resolve();

    });

  });
  return promise;
}


module.exports = {
  prepareUiElements : prepareUiElements
};
