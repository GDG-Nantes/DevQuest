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
	// Up Line
	{
		name :"stand1"
		, type : CONST.common.STAND_SILVER
		, position : {
			x : 6
			, y : 0
			, orientation : CONST.directions.DOWN
		}
		
	},
	{
		name :"stand2"
		, type : CONST.common.STAND_GOLD
		, position : {
			x : 12
			, y : 0
			, orientation : CONST.directions.DOWN
		}
		
	},
	{
		name :"stand3"
		, type : CONST.common.STAND_SILVER
		, position : {
			x : 20
			, y : 0
			, orientation : CONST.directions.DOWN
		}
		
	},
	{
		name :"stand4"
		, type : CONST.common.STAND_GOLD
		, position : {
			x : 26
			, y : 0
			, orientation : CONST.directions.DOWN
		}
		
	},
	{
		name :"stand5"
		, type : CONST.common.STAND_SILVER
		, position : {
			x : 34
			, y : 0
			, orientation : CONST.directions.DOWN
		}
		
	},
	{
		name :"stand6"
		, type : CONST.common.STAND_GOLD
		, position : {
			x : 40
			, y : 0
			, orientation : CONST.directions.DOWN
		}
		
	}, 
	// Left Part
	{
		name :"stand7"
		, type : CONST.common.STAND_SILVER
		, position : {
			x : 1
			, y : 6
			, orientation : CONST.directions.RIGHT
		}		
	},{
		name :"stand8"
		, type : CONST.common.STAND_GOLD
		, position : {
			x : 1
			, y : 11
			, orientation : CONST.directions.RIGHT
		}		
	},
	{
		name :"stand9"
		, type : CONST.common.STAND_SILVER
		, position : {
			x : 1
			, y : 19
			, orientation : CONST.directions.RIGHT
		}
		
	},
	{
		name :"stand10"
		, type : CONST.common.STAND_GOLD
		, position : {
			x : 1
			, y : 24
			, orientation : CONST.directions.RIGHT
		}
		
	}
	// Right Part
	,{
		name :"stand11"
		, type : CONST.common.STAND_GOLD
		, position : {
			x : 49
			, y : 3
			, orientation : CONST.directions.LEFT
		}
		
	}
	,{
		name :"stand12"
		, type : CONST.common.STAND_GOLD
		, position : {
			x : 49
			, y : 11
			, orientation : CONST.directions.LEFT
		}
		
	}
	,{
		name :"stand13"
		, type : CONST.common.STAND_SILVER
		, position : {
			x : 50
			, y : 19
			, orientation : CONST.directions.LEFT
		}
		
	}
	,{
		name :"stand14"
		, type : CONST.common.STAND_GOLD
		, position : {
			x : 49
			, y : 24
			, orientation : CONST.directions.LEFT
		}		
	}
	// Central Part Row 1
	,{
		name :"stand15"
		, type : CONST.common.STAND_SILVER
		, position : {
			x : 15
			, y : 13
			, orientation : CONST.directions.UP
		}		
	}
	,{
		name :"stand16"
		, type : CONST.common.STAND_SILVER
		, position : {
			x : 21
			, y : 13
			, orientation : CONST.directions.UP
		}		
	}
	,{
		name :"stand17"
		, type : CONST.common.STAND_GOLD
		, position : {
			x : 27
			, y : 13
			, orientation : CONST.directions.UP
		}		
	}
	,{
		name :"stand18"
		, type : CONST.common.STAND_SILVER
		, position : {
			x : 35
			, y : 13
			, orientation : CONST.directions.UP
		}		
	}
	// Central Part Row 2
	,{
		name :"stand19"
		, type : CONST.common.STAND_GOLD
		, position : {
			x : 17
			, y : 20
			, orientation : CONST.directions.DOWN
		}		
	}
	,{
		name :"stand20"
		, type : CONST.common.STAND_SILVER
		, position : {
			x : 25
			, y : 20
			, orientation : CONST.directions.DOWN
		}		
	}
	,{
		name :"stand21"
		, type : CONST.common.STAND_GOLD
		, position : {
			x : 31
			, y : 20
			, orientation : CONST.directions.DOWN
		}		
	}
	// Low Part
	,{
		name :"stand22"
		, type : CONST.common.STAND_PLATINIUM
		, position : {
			x : 35
			, y : 36
			, orientation : CONST.directions.UP
		}		
	}
	,{
		name :"stand23"
		, type : CONST.common.STAND_PLATINIUM
		, position : {
			x : 45
			, y : 36
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