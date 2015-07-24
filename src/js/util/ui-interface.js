'use strict';
var Model = require('../model/model.js');
var CONST = require('../model/const.js');

// Helper Methodes

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
  context.drawImage(Model.resources.images['ui'],
    x, y, w, h, // Extraction originale
    xCanvas, yCanvas, w, h// Postionement dans le canvas
  );
  var imageToReturn = new Image();
  imageToReturn.src = canvas.toDataURL("image/png");
  return imageToReturn;
}

function registerImage(canvas, context, key, sizes, pattern){
  Model.resources.images[key] = extractImage(canvas, context,
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

function prepareZoneText(canvas, context){
  var promise = new Promise(function promiseZoneText(resolve, reject){
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

    resolve();
  });
  return promise;
}

function prepareTitleScreen(canvas, context){
    var promise = new Promise(function promiseTitleScreen(resolve, reject){
      // Début ZoneText
      registerImage(canvas, context
        ,'title-gauche'
        ,{x:176, y:100, w:20, h:31
          ,xOut: bestSize(20) - 20, yOut:bestSize(31) - 31, wOut:bestSize(20), hOut:bestSize(31)
      });
      // Zone milieu
      registerImage(canvas, context
        ,'title-center'
        ,{x:196, y:100, w:40, h:31
          ,xOut: 0, yOut:bestSize(31) - 31, wOut:40, hOut:bestSize(31)
        }
        ,'repeat'
      );
      // Fin zone
      registerImage(canvas, context
        ,'title-droite'
        ,{x:252, y:100, w:44, h:31
          ,xOut: 0, yOut:bestSize(31) - 31, wOut:bestSize(44), hOut:bestSize(31)
      });
      // zone repeat-x haut
      registerImage(canvas, context
        ,'title-repeat-x-haut'
        ,{x:196,y:131,w:40,h:32
          ,xOut : 0, yOut: 0,  wOut: 40, hOut : bestSize(32)
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
        ,{x:176,y:155,w:20,h:7
          ,xOut : bestSize(20) - 20, yOut: 0,  wOut: bestSize(20), hOut : 7
        }
        ,'repeat'
      );
      // zone repeat-y droite
      registerImage(canvas, context
        ,'title-repeat-y-droite'
        ,{x:273,y:155,w:32,h:7
          ,xOut : 0,yOut: 0, wOut: bestSize(32), hOut : 7
        }
        ,'repeat'
      );
      // zone repeat-xy centre
      registerImage(canvas, context
        ,'title-repeat-xy'
        ,{x:196,y:155,w:14,h:11
          ,xOut : 0, yOut: 0, wOut: 14, hOut : 11
        }
        ,'repeat'
      );
      // zone coin gauche haut
      registerImage(canvas, context
        ,'title-haut-gauche'
        ,{x:176,y:131,w:20,h:32
          ,xOut : bestSize(20) - 20,yOut:  0, wOut: bestSize(20), hOut : bestSize(32)
        });
      // zone coin droite haut
      registerImage(canvas, context
        ,'title-haut-droite'
        ,{x:273,y:131,w:44,h:32
          ,xOut : 0, yOut: 0, wOut: bestSize(44), hOut : bestSize(32)
        });
      // zone coin gauche bas
      registerImage(canvas, context
        ,'title-bas-gauche'
        ,{x:176,y:160,w:20,h:12
          ,xOut : bestSize(20) - 20, yOut: 0, wOut: bestSize(20), hOut : bestSize(12)
        });
      // zone coin droite bas
      registerImage(canvas, context
        ,'title-bas-droite'
        ,{x:273,y:160,w:44,h:12
          ,xOut : 0, yOut: 0, wOut: bestSize(44), hOut : bestSize(12)
        });

      resolve();
    });
    return promise;
}

function prepareCreux(canvas, context){
  var promise = new Promise(function promiseCreux(resolve, reject){
    //Haut Gauche
    registerImage(canvas, context
      ,'creux-haut-gauche'
      ,{x:45,y:60,w:3,h:3
        ,xOut : bestSize(3) - 3,yOut:  bestSize(3) - 3, wOut: bestSize(3), hOut : bestSize(3)
      });
    //Haut Centre
    registerImage(canvas, context
        ,'creux-repeat-x-haut'
        ,{x:47,y:60,w:2,h:3
          ,xOut : 0, yOut: bestSize(3) - 3, wOut: 2, hOut : bestSize(3)
        }
        ,'repeat'
      );
    //Haut Droit
    registerImage(canvas, context
      ,'creux-haut-droite'
      ,{x:50,y:60,w:3,h:3
        ,xOut : 0,yOut:  bestSize(3) - 3, wOut: bestSize(3), hOut : bestSize(3)
      });
    //Gauche
    registerImage(canvas, context
        ,'creux-repeat-y-gauche'
        ,{x:45,y:62,w:3,h:2
          ,xOut : bestSize(3) - 3, yOut: 0, wOut: bestSize(3), hOut : 2
        }
        ,'repeat'
      );
    //Centre
    registerImage(canvas, context
        ,'creux-repeat-xy'
        ,{x:47,y:62,w:2,h:2
          ,xOut : 0, yOut: 0, wOut: 2, hOut : 2
        }
        ,'repeat'
      );
    //Droite
    registerImage(canvas, context
        ,'creux-repeat-y-droite'
        ,{x:50,y:62,w:3,h:2
          ,xOut : 0, yOut: 0, wOut: bestSize(3), hOut : 2
        }
        ,'repeat'
      );
    //Bas Gauche
    registerImage(canvas, context
      ,'creux-bas-gauche'
      ,{x:45,y:65,w:3,h:3
        ,xOut : bestSize(3) - 3,yOut:  0, wOut: bestSize(3), hOut : bestSize(3)
      });
    //Bas Centre
    registerImage(canvas, context
        ,'creux-repeat-x-bas'
        ,{x:47,y:66,w:2,h:3
          ,xOut : 0, yOut: 0, wOut: 2, hOut : bestSize(3)
        }
        ,'repeat'
      );
    //Bas Droit
    registerImage(canvas, context
      ,'creux-bas-droite'
      ,{x:50,y:65,w:3,h:3
        ,xOut : 0,yOut:  0, wOut: bestSize(3), hOut : bestSize(3)
      });

    resolve();
  });
  return promise;
}

function prepareBtn(canvas, context){
  var promise = new Promise(function promiseBtn(resolve, reject){
    //Haut Gauche
    registerImage(canvas, context
      ,'btn-haut-gauche'
      ,{x:148,y:13,w:17,h:6
        ,xOut : bestSize(17) - 17,yOut:  bestSize(6) - 6, wOut: bestSize(17), hOut : bestSize(6)
      });
    //Haut Centre
    registerImage(canvas, context
        ,'btn-repeat-x-haut'
        ,{x:165,y:13,w:6,h:6
          ,xOut : 0, yOut: bestSize(6) - 6, wOut: 6, hOut : bestSize(6)
        }
        ,'repeat'
      );
    //Haut Droit
    registerImage(canvas, context
      ,'btn-haut-droite'
      ,{x:171,y:13,w:9,h:6
        ,xOut : 0,yOut:  bestSize(6) - 6, wOut: bestSize(9), hOut : bestSize(6)
      });
    //Gauche
    registerImage(canvas, context
        ,'btn-repeat-y-gauche'
        ,{x:148,y:19,w:17,h:4
          ,xOut : bestSize(17) - 17, yOut: 0, wOut: bestSize(17), hOut : 4
        }
        ,'repeat'
      );
    //Centre
    registerImage(canvas, context
        ,'btn-repeat-xy'
        ,{x:165,y:19,w:6,h:4
          ,xOut : 0, yOut: 0, wOut: 6, hOut : 4
        }
        ,'repeat'
      );
    //Droite
    registerImage(canvas, context
        ,'btn-repeat-y-droite'
        ,{x:171,y:19,w:9,h:4
          ,xOut : 0, yOut: 0, wOut: bestSize(9), hOut : 4
        }
        ,'repeat'
      );
    //Bas Gauche
    registerImage(canvas, context
      ,'btn-bas-gauche'
      ,{x:148,y:23,w:17,h:6
        ,xOut : bestSize(17) - 17,yOut:  0, wOut: bestSize(17), hOut : bestSize(6)
      });
    //Bas Centre
    registerImage(canvas, context
        ,'btn-repeat-x-bas'
        ,{x:165,y:23,w:6,h:6
          ,xOut : 0, yOut: 0, wOut: 6, hOut : bestSize(6)
        }
        ,'repeat'
      );
    //Bas Droit
    registerImage(canvas, context
      ,'btn-bas-droite'
      ,{x:171,y:23,w:9,h:6
        ,xOut : 0,yOut:  0, wOut: bestSize(9), hOut : bestSize(6)
      });

    resolve();
  });
  return promise;
}

function prepareBtnPressed(canvas, context){
  var promise = new Promise(function promiseBtnPressed(resolve, reject){

    //Haut Gauche
    registerImage(canvas, context
      ,'btnpressed-haut-gauche'
      ,{x:148,y:47,w:5,h:5
        ,xOut : bestSize(5) - 5,yOut:  bestSize(5) - 5, wOut: bestSize(5), hOut : bestSize(5)
      });
    //Haut Centre
    registerImage(canvas, context
        ,'btnpressed-repeat-x-haut'
        ,{x:153,y:47,w:7,h:5
          ,xOut : 0, yOut: bestSize(5) - 5, wOut: 7, hOut : bestSize(5)
        }
        ,'repeat'
      );
    //Haut Droit
    registerImage(canvas, context
      ,'btnpressed-haut-droite'
      ,{x:160,y:47,w:20,h:5
        ,xOut : 0,yOut:  bestSize(5) - 5, wOut: bestSize(20), hOut : bestSize(5)
      });
    //Gauche
    registerImage(canvas, context
        ,'btnpressed-repeat-y-gauche'
        ,{x:148,y:52,w:5,h:6
          ,xOut : bestSize(5) - 5, yOut: 0, wOut: bestSize(5), hOut : 5
        }
        ,'repeat'
      );
    //Centre
    registerImage(canvas, context
        ,'btnpressed-repeat-xy'
        ,{x:153,y:52,w:7,h:6
          ,xOut : 0, yOut: 0, wOut: 7, hOut : 6
        }
        ,'repeat'
      );
    //Droite
    registerImage(canvas, context
        ,'btnpressed-repeat-y-droite'
        ,{x:160,y:52,w:20,h:6
          ,xOut : 0, yOut: 0, wOut: bestSize(20), hOut : 6
        }
        ,'repeat'
      );
    //Bas Gauche
    registerImage(canvas, context
      ,'btnpressed-bas-gauche'
      ,{x:148,y:58,w:5,h:5
        ,xOut : bestSize(5) - 5,yOut:  0, wOut: bestSize(5), hOut : bestSize(5)
      });
    //Bas Centre
    registerImage(canvas, context
        ,'btnpressed-repeat-x-bas'
        ,{x:153,y:58,w:7,h:5
          ,xOut : 0, yOut: 0, wOut: 7, hOut : bestSize(5)
        }
        ,'repeat'
      );
    //Bas Droit
    registerImage(canvas, context
      ,'btnpressed-bas-droite'
      ,{x:160,y:58,w:20,h:5
        ,xOut : 0,yOut:  0, wOut: bestSize(20), hOut : bestSize(5)
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
    var promises = [prepareZoneText(canvasTmp, contextTmp)
            , prepareTitleScreen(canvasTmp, contextTmp)
            , prepareCreux(canvasTmp, contextTmp)
            , prepareBtn(canvasTmp, contextTmp)
            , prepareBtnPressed(canvasTmp, contextTmp)
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
