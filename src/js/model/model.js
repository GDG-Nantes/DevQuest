'use strict';
var Resources = require('../util/resources');
var CONST = require('./const.js');

var ui = {
	canvas : null,
	context : null,
	ratio : 1,
	ratioScreen : 1,
	mapCollision : [],
	mapInteraction : [],
	interaction : {
		 key : ''
		, type : 'mousedown' 
	},
	screen : '',
	resources : new Resources(),
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
		inputArray : [],
		positionScreen: {
			x:0,
			y:0
		},
		position: {
			x:10, 
			y:10, 
			direction : CONST.UP,
			stepCount : 0
		}
};


// On initialise la map des collisions qui va déterminer le déplacement possible de notre personnage dans la map
for (var row = 0; row < CONST.SIZE_UNIT.h; row++){
	var arrayRow = [];
	for (var col =0; col < CONST.SIZE_UNIT.w; col++){
		arrayRow.push(false);
	}
	ui.mapCollision.push(arrayRow);
}


module.exports = {
	ui : ui,
	gameModel : gameModel
};
