'use strict';
var Resources = require('./resources');

var ui = {
	canvas : null,
		context : null,
		resources : new Resources()
};

var gameModel = {		
};

module.exports = {
	ui : ui,
	gameModel : gameModel
};
