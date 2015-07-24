'use strict';
var CONST = require('./model/const.js');
var Resources = require('./util/resources.js');
var UiInterface = require('./util/ui-interface.js');
var Engine = require('./engine/engine.js');
var UI = require('./engine/ui.js');
var Model = require('./model/model.js');
require('./triggers/inputs.js');

// Méthodes Internes


function checkConfig(){
	/*
	On doit vérifier :
	OBLIGATOIRE
		* Promise
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

	if (CONST.DEBUG){
		console.debug("============CHECK CONFIG==========");
		console.debug("==================================");
		console.debug("Promise : %s", window.Promise);
		console.debug("Canvas : %s", Modernizr.canvas);
		console.debug("LocalStorage : %s", Modernizr.localstorage);
		console.debug("WebSockets : %s", Modernizr.websockets);
		console.debug("TouchEvents : %s", Modernizr.touch);
		console.debug("Vibrate : %s", Modernizr.vibrate);
		console.debug("DeviceMotion : %s", Modernizr.devicemotion);
		console.debug("FullScreen : %s", Modernizr.fullscreen);
		console.debug("UserMedia : %s", Modernizr.getusermedia);
		console.debug("AudioContext : %s", (window.AudioContext || window.webkitAudioContext));
		console.debug("Page Visibility : %s", typeof document.hidden != "undefined"
				|| typeof document.mozHidden != "undefined"
				|| typeof document.msHidden != "undefined"
				|| typeof document.webkitHidden != "undefined");
	}
	
	return window.Promise
		&& Modernizr.canvas
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
	Model.ui.ratio = window.devicePixelRatio || 1;
	Model.ui.context.scale(window.devicePixelRatio || 1 , window.devicePixelRatio || 1);
	var widthRatio = Model.ui.canvas.width / window.devicePixelRatio / CONST.ui.UNIT;
	var heightRatio = Model.ui.canvas.height / window.devicePixelRatio / CONST.ui.UNIT;
	Model.ui.ratioScreen = document.body.scrollHeight / (heightRatio * CONST.ui.UNIT);
	Model.ui.ratio = Model.ui.ratioScreen;
	Model.ui.screenSize.width = Math.floor(widthRatio) != widthRatio ?  Math.floor(widthRatio) + 1 : widthRatio;
	Model.ui.screenSize.height = Math.floor(heightRatio) != heightRatio ?  Math.floor(heightRatio) + 1 : heightRatio;
	Model.ui.middlePoint.x = Math.floor(Model.ui.screenSize.width/2);
	Model.ui.middlePoint.y = Math.floor(Model.ui.screenSize.height/2);

	if (CONST.DEBUG){
		console.debug("============SCREEN SIZES==========");
		console.debug("==================================");
		console.debug("Ratio : %s",Model.ui.ratio);
		console.debug("RatioScreen : %s",Model.ui.ratioScreen);
		console.debug("Screen Size in px : {%s/%s} ratio : %s",screen.width, screen.height, screen.width / screen.height);
		console.debug("Body Size in px : {%s/%s} ratio : %s",document.body.scrollWidth, document.body.scrollHeight, document.body.scrollWidth / document.body.scrollHeight);
		console.debug("Canvas Size : {%s/%s} ratio : %s",Model.ui.canvas.width, Model.ui.canvas.height, Model.ui.canvas.width / Model.ui.canvas.height);
		console.debug("Screen Size according to unit: {%s/%s} ratio : %s",widthRatio, heightRatio, widthRatio / heightRatio);
		console.debug("Screen Size in pix: {%s/%s}",widthRatio * CONST.ui.UNIT, heightRatio * CONST.ui.UNIT);
		console.debug("Screen Size in Unit : {%s/%s}",Model.ui.screenSize.width, Model.ui.screenSize.height);

	}

	// On précharge toutes les ressources nécessaires
	Resources.loadSprites([
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
				{title: 'inside_1', url: 'assets/img/inside01.png'},
				{title: 'inside_2', url: 'assets/img/inside02.png'},
				{title: 'magecity', url: 'assets/img/magecity_0.png'},
				// Eléments Ui
				{title: 'ui', url: 'assets/img/ui_split.png'}
			])
	.then(function(value) {
		return UiInterface.prepareUiElements();
	})
	.then(function(){
		Engine.start();
	})
	.catch(function(err){
		console.error("Error  : %s \n %s",err.message, err.stack);
	});

}

//API

function init(){
	 window.addEventListener('load', pageLoad);
}


init();
