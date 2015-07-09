'use strict';
var CONST = require('./model/const.js');
var Resources = require('./util/resources.js');
var Engine = require('./engine/engine.js');
var UI = require('./engine/ui.js');
var Model = require('./model/model.js');
require('./triggers/inputs.js');

// Méthodes Internes 


function checkConfig(){
	/* 
	On doit vérifier : 
	OBLIGATOIRE
		* Canvas
		* HTML5 Audio
		* WebSockets
		* localStorage
		* getusermedia
		* page visibility
	OPTIONNELS
		* Touch Events
		* full screen
		* Device motion
		* vibration 
	*/

	console.log(Modernizr.canvas);
	console.log(Modernizr.localstorage);
	console.log(Modernizr.websockets);
	console.log(Modernizr.touch);
	console.log(Modernizr.vibrate);
	console.log(Modernizr.devicemotion);
	console.log(Modernizr.fullscreen);
	console.log(Modernizr.getusermedia);
	console.log((window.AudioContext || window.webkitAudioContext));
	console.log(typeof document.hidden != "undefined"
			|| typeof document.mozHidden != "undefined"
			|| typeof document.msHidden != "undefined"
			|| typeof document.webkitHidden != "undefined");

	return Modernizr.canvas 
		&& Modernizr.localstorage
		&& Modernizr.websockets
		&& Modernizr.getusermedia
		&& (window.AudioContext || window.webkitAudioContext)
		&& (typeof document.hidden != "undefined"
			|| typeof document.mozHidden != "undefined"
			|| typeof document.msHidden != "undefined"
			|| typeof document.webkitHidden != "undefined");

}

function pageLoad(){

	if (!checkConfig()){
		// Faire qqe chose ! 
		return;
	}

	
	// On initialise le canvas
	Model.ui.canvas = document.getElementById('game');
	Model.ui.canvas.width  = window.innerWidth;
	Model.ui.canvas.height = window.innerHeight;
	Model.ui.context = Model.ui.canvas.getContext('2d');
	Model.ui.context.scale(window.devicePixelRatio || 1 , window.devicePixelRatio || 1);
	var widthRatio = Model.ui.canvas.width / window.devicePixelRatio / CONST.UNIT;
	var heightRatio = Model.ui.canvas.height / window.devicePixelRatio / CONST.UNIT;
	Model.ui.screenSize.width = Math.floor(widthRatio) != widthRatio ?  Math.floor(widthRatio) + 1 : widthRatio;
	Model.ui.screenSize.height = Math.floor(heightRatio) != heightRatio ?  Math.floor(heightRatio) + 1 : heightRatio;
	Model.ui.middlePoint.x = Math.floor(Model.ui.screenSize.width/2);
	Model.ui.middlePoint.y = Math.floor(Model.ui.screenSize.height/2);
		
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
		Engine.start();		
	}).catch(function(err){
		console.error("Error  : %s \n %s",err.message, err.stack);
	});

}

//API

function init(){
	 window.addEventListener('load', pageLoad);
}


init();