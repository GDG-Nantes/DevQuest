'use strict';
var CONST = require('./const.js');

var resources = {
	images : [],
	sizes : [],
	patterns : []
};

var services = {
	fbActivRef : null, 
	activUsers : {}
};

var ui = {
	canvas : null,
	context : null,
	ratio : 1,
	ratioScreen : 1,
	stepAnimation : 0,
	stepAnimationCloud : 0,
	usersChange: false,
	users : [],
	mapCollision : [],
	mapInteraction : [],	
	changeScreen : '',
	screen : CONST.screens.HOME,
	middlePoint : {
		x : 0,
		y : 0
	},
	screenSize : {
			width : 0
			, height : 0
	}
}; 

var gameModel = {		
	version : '9',
	userHash : null,
	user : null,
	typeSocial : null,	
	indexUser : -1,
	showStory : false,
	inputArray : [],
	standId : '',
	time : 0,
	lastTime : 0,
	positionScreen: {
		x:0,
		y:0
	},
	position: {
		x:10, 
		y:10, 
		direction : CONST.directions.UP,
		stepCount : 0
	},
	parameters : {
		useParams : false
		, mic : false
		, motion : false
		, wrongOrientation : false
	}
};


// On initialise la map des collisions qui va déterminer le déplacement possible de notre personnage dans la map
for (var row = 0; row < CONST.ui.SIZE_UNIT.h; row++){
	var arrayRow = [];
	for (var col =0; col < CONST.ui.SIZE_UNIT.w; col++){
		arrayRow.push(false);
	}
	ui.mapCollision.push(arrayRow);
}


module.exports = {
	resources : resources,
	ui : ui,
	gameModel : gameModel,
	services : services
};
