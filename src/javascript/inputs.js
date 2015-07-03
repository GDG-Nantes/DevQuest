'use strict';

var Model = require('./model.js');
var CONST = require('./const.js');

function keypress(event){
	switch (event.keyCode){
		case 37: //LEFT
			Model.gameModel.position.x = Math.max(0, Model.gameModel.position.x - 1);
			break;
		case 38: //UP
			Model.gameModel.position.y = Math.max(0, Model.gameModel.position.y - 1);
			break;
		case 39: //RIGHT
			Model.gameModel.position.x = Math.min(CONST.SIZE_UNIT.w, Model.gameModel.position.x + 1);
			break;
		case 40: //DOWN
			Model.gameModel.position.y = Math.min(CONST.SIZE_UNIT.h, Model.gameModel.position.y + 1);
			break;
	}
}
 
document.addEventListener('keydown', keypress);

module.exports = {
	
};