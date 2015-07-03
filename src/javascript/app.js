'use strict';
var CONST = require('./const.js');
var Resources = require('./resources');
var Engine = require('./engine');
var Model = require('./model');
require('./inputs.js');

// Méthodes Internes 


function pageLoad(){
	
	// On initialise le canvas
	Model.ui.canvas = document.getElementById('game');
	Model.ui.canvas.width  = window.innerWidth;
	Model.ui.canvas.height = window.innerHeight;
	Model.ui.context = Model.ui.canvas.getContext('2d');
	var rect = Model.ui.canvas.getBoundingClientRect();
	Model.ui.screenSize.width = screen.width / CONST.UNIT;
	Model.ui.screenSize.height = screen.height / CONST.UNIT;
	Model.ui.screenSize.width = Math.floor((rect.width / window.devicePixelRatio) / CONST.UNIT)+1;
	Model.ui.screenSize.height = Math.floor((rect.height / window.devicePixelRatio) / CONST.UNIT)+ 1;
	console.log(Model.ui.screenSize);
	
	// On précharge toutes les ressources nécessaires
	Model.ui.resources.loadSprites([	
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
		Engine.run();		
	}).catch(function(err){
		console.error("Error  : %s \n %s",err.message, err.stack);
	});

}

//API

function init(){
	 window.addEventListener('load', pageLoad);
}


init();