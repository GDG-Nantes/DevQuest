'use strict';
var CONST = require('./const.js');

function computeDoorPosition_(stand){
	switch(stand.type){
		case CONST.common.STAND_SILVER:
			switch(stand.position.orientation){
				case CONST.directions.UP:
					stand.positionDoor = {
						x : stand.position.x + 2
						, y : stand.position.y + 0
					};
				break;
				case CONST.directions.LEFT:
					stand.positionDoor = {
						x : stand.position.x + 0
						, y : stand.position.y + 4
					};
				break;
				case CONST.directions.DOWN:
					stand.positionDoor = {
						x : stand.position.x + 2
						, y : stand.position.y + 6
					};
				break;
				case CONST.directions.RIGHT:
					stand.positionDoor = {
						x : stand.position.x + 4
						, y : stand.position.y + 4
					};
				break;

			}
			break;
		case CONST.common.STAND_GOLD:
			switch(stand.position.orientation){
				case CONST.directions.UP:
					stand.positionDoor = {
						x : stand.position.x + 3
						, y : stand.position.y
					};
				break;
				case CONST.directions.LEFT:
					stand.positionDoor = {
						x : stand.position.x + 1
						, y : stand.position.y + 5
					};
				break;
				case CONST.directions.DOWN:
					stand.positionDoor = {
						x : stand.position.x + 3
						, y : stand.position.y + 6
					};
				break;
				case CONST.directions.RIGHT:
					stand.positionDoor = {
						x : stand.position.x + 4
						, y : stand.position.y + 5
					};
				break;

			}
			break;
		case CONST.common.STAND_PLATINIUM:
			switch(stand.position.orientation){
				case CONST.directions.UP:
					stand.positionDoor = {
						x : stand.position.x + 5
						, y : stand.position.y + 1
					};
				break;
				case CONST.directions.LEFT:
					stand.positionDoor = {
						x : stand.position.x + 2
						, y : stand.position.y + 7
					};
				break;
				case CONST.directions.DOWN:
					stand.positionDoor = {
						x : stand.position.x + 5
						, y : stand.position.y + 6
					};
				break;
				case CONST.directions.RIGHT:
					stand.positionDoor = {
						x : stand.position.x + 4
						, y : stand.position.y + 7
					};
				break;

			}
			break;
	}
}

// API
var stands = [
	{
		name :"stand1"
		, type : CONST.common.STAND_SILVER
		, position : {
			x : 5
			, y : 10
			, orientation : CONST.directions.UP
		}		
	},
	{
		name :"stand2"
		, type : CONST.common.STAND_GOLD
		, position : {
			x : 15
			, y : 10
			, orientation : CONST.directions.RIGHT
		}
		
	},
	{
		name :"stand3"
		, type : CONST.common.STAND_PLATINIUM
		, position : {
			x : 25
			, y : 10
			, orientation : CONST.directions.UP
		}
		
	}
];

// Posttraitement pour mettre en place les fréquences ultrason
stands.forEach(function(stand, index){
	stand['indexQuestion'] = index;
	stand['frequency'] = 18000 + (index * 100);
	computeDoorPosition_(stand);
});


module.exports = stands;