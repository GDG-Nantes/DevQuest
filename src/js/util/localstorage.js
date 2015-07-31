'use strict'

var Model = require('../model/model.js');

//API

function checkLocalStorage(){
	var p = new Promise(function(resolve, reject) {
		var reset = false;
		// On vérifie la version du modèle présente		
		if (localStorage["game_model"]){
			var modelTmp = JSON.parse(localStorage["game_model"]);
			// Si la version est différente, alors on réinitialise le modèle en mémoire
			if (modelTmp.version === Model.gameModel.version){
				Model.gameModel = modelTmp;
			}else{
				reset = true;
			}
		}else{
			reset = true;
		}

		if (reset){
			localStorage['game_model'] = JSON.stringify(Model.gameModel);
		}
		resolve();

	});

	return p;

}

module.exports = {
	checkLocalStorage : checkLocalStorage	
}