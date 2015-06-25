'use strict';

var DevQuest = DevQuest || function(){

	// Variables à utiliser

	var ui = {
		canvas : null,
		context : null,
		resources : new Resources()
	}

	var gameModel = {		
	};


	// Méthodes Internes 


	function pageLoad(){
		
		// On initialise le canvas
		ui.canvas = document.getElementById('game');
		ui.canvas.width  = window.innerWidth;
		ui.canvas.height = window.innerHeight;
		ui.context = ui.canvas.getContext('2d');
		
		// On précharge toutes les ressources nécessaires
		ui.resources.loadSprites([	
								// Personnages
								{title: 'healer_f', url: 'assets/img/healer_f.png'},
								{title: 'healer_m', url: 'assets/img/healer_m.png'},
								{title: 'mage_f', url: 'assets/img/mage_f.png'},
								{title: 'mage_m', url: 'assets/img/mage_m.png'},
								{title: 'ninja_f', url: 'assets/img/ninja_f.png'},
								{title: 'ninja_m', url: 'assets/img/ninja_m.png'},
								{title: 'ranger_f', url: 'assets/img/ranger_f.png'},
								{title: 'ranger_m', url: 'assets/img/ranger_m.png'},
								{title: 'townfolk1_f', url: 'assets/img/townfolk1_f.png'},
								{title: 'townfolk1_m', url: 'assets/img/townfolk1_m.png'},
								{title: 'warrior_f', url: 'assets/img/warrior_f.png'},
								{title: 'warrior_m', url: 'assets/img/warrior_m.png'},
								// Décors
								{title: 'inside', url: 'assets/img/inside01.png'},								
								{title: 'magecity', url: 'assets/img/magecity_0.png'}
							])
		.then(function(value) {			
			DevQuestEngine.run();		
		}).catch(function(err){
			console.error("Error  : %s \n %s",err.message, err.stack);
		});

	}

	//API

	function init(){
		 window.addEventListener('load', pageLoad);
	}


	return  {
		init : init,
		ui : ui, 
		gameModel : gameModel
	}
}();

DevQuest.init();