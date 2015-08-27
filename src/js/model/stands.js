'use strict';
var CONST = require('./const.js');


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
			, orientation : CONST.directions.LEFT
		}
		
	},
	{
		name :"stand3"
		, type : CONST.common.STAND_PLATINIUM
		, position : {
			x : 25
			, y : 10
			, orientation : CONST.directions.LEFT
		}
		
	}
];

// Posttraitement pour mettre en place les fréquences ultrason
stands.forEach(function(stand, index){
	stand['indexQuestion'] = index;
	stand['frequence'] = 18000 + (index * 100);
});


module.exports = stands;