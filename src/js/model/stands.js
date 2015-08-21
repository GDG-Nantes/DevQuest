'use strict';
var CONST = require('./const.js');


// API
var stands = [
	{
		name :"sponsor1"
		, type : CONST.common.STAND_SILVER
		, position : {
			x : 5
			, y : 10
		}		
	},
	{
		name :"sponsor2"
		, type : CONST.common.STAND_GOLD
		, position : {
			x : 15
			, y : 10
		}
		
	},
	{
		name :"sponsor3"
		, type : CONST.common.STAND_PLATINIUM
		, position : {
			x : 25
			, y : 10
		}
		
	}
];

// Posttraitement pour mettre en place les fréquences ultrason
stands.forEach(function(stand, index){
	stand['indexQuestion'] = index;
	stand['frequence'] = 18000 + (index * 100);
});


module.exports = stands;