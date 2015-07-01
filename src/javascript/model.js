'use strict';
var Resources = require('./resources');
var CONST = require('./const.js');

var ui = {
	canvas : null,
	context : null,
	mapCollision : [],
	resources : new Resources(),
	screenSize : {
			width : 0
			, height : 0
	}
};

var gameModel = {		
	position: {x:0, y:0}
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
