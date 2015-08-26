'use strict';
var CONST = require('../model/const.js');
var StandsModel = require('../model/stands.js');
var Model = require('../model/model.js');

var widthSilver = 5
	,widthGold = 7
	, widthPlatinium = 9
	, arraySilver = {}
	, arrayGold = {}
	, arrayPlatinium = {}
	, arrayInteraction = [];


function standFromDefinition(definition){
	var array = [];
	for (var row = 0; row < definition.height; row++){
		var arrayRow = [];
		for (var col = 0; col < definition.width; col++){
			if (definition['row'+row]){
				if (definition['row'+row]['col'+col]){
					arrayRow.push(definition['row'+row]['col'+col]);
				}else{
					arrayRow.push(definition['row'+row]['colN']);
				}
			}
		}
		array.push(arrayRow);
	}
	return array;
}

// Stand silver tout seul
function standSilver(direction){
	var definition = {};
	switch(direction){
		case CONST.directions.DOWN : 
			definition.width  = widthSilver;
			definition.height =  7;
			// Toit
			definition['row0'] = {
				col0 : ['00.1','23.5']
				, colN : ['23.6']
			};
			definition['row0']['col'+(definition.width - 1)] = ['00.1','23.7'];
			definition['row1'] = {
				col0 : ['24.5']
				, colN : ['24.6']
			};
			definition['row1']['col'+(definition.width - 1)] = ['24.7'];
			definition['row2'] = {
				col0 : ['25.5']
				, colN : ['25.6']
			}; 
			definition['row2']['col'+(definition.width - 1)] = ['25.7'];
			//Maison
			definition['row3'] = { colN : ['23.3'] }; 
			definition['row4'] = { colN : ['23.3'] }; 
			definition['row5'] = { colN : ['23.3'] }; 
			// Porte 
			definition['row4']['col2'] = ['40.6'];
			definition['row5']['col2'] = ['41.6'];
			// Sol
			definition['row6'] = {
				col0 : ['09.3']
				, colN : ['10.1']
			}; 
			definition['row6']['col'+(definition.width - 1)] = ['09.4'];
			break;
		case CONST.directions.UP : 
			definition.width  = widthSilver;
			definition.height =  7;
			// Sol & Toit
			definition['row0'] = {
				col0 : ['09.3']
				, colN : ['10.1']
			};
			definition['row0']['col'+(definition.width - 1)] = ['09.4'];
			definition['row1'] = {
				col0 : ['09.3','23.5']
				, colN : ['23.6']
			};
			definition['row1']['col'+(definition.width - 1)] = ['09.4','23.7'];
			definition['row2'] = {
				col0 : ['24.5']
				, colN : ['24.6']
			};
			definition['row2']['col'+(definition.width - 1)] = ['24.7'];
			definition['row3'] = {
				col0 : ['25.5']
				, colN : ['25.6']
			}; 
			definition['row3']['col'+(definition.width - 1)] = ['25.7'];
			//Maison
			definition['row4'] = { colN : ['23.3'] }; 
			definition['row5'] = { colN : ['23.3'] }; 
			definition['row6'] = { colN : ['23.3'] }; 
			// Porte 
			// TODO 
			break;
		case CONST.directions.RIGHT : 
			definition.width  = 5;
			definition.height =  7;
			// Toit
			definition['row0'] = {
				col0 : ['00.1','23.5']
				, colN : ['23.6']
			};
			definition['row0']['col'+(definition.width - 2)] = ['00.1','23.7'];
			definition['row0']['col'+(definition.width - 1)] = ['00.1'];
			definition['row1'] = {
				col0 : ['24.5']
				, colN : ['24.6']
			};
			definition['row1']['col'+(definition.width - 2)] = ['24.7'];
			definition['row1']['col'+(definition.width - 1)] = ['00.1'];
			definition['row2'] = definition['row3'] = {
				col0 : ['24.5']
				, colN : ['24.6']
			};
			definition['row2']['col'+(definition.width - 2)] = ['24.7'];
			definition['row2']['col'+(definition.width - 1)] = ['09.3'];
			definition['row3'] = {
				col0 : ['25.5']
				, colN : ['25.6']
			}; 
			definition['row3']['col'+(definition.width - 2)] = ['25.7'];
			definition['row3']['col'+(definition.width - 1)] = ['09.3'];
			//Maison
			definition['row4'] = { colN : ['23.3'] }; 
			definition['row5'] = definition['row6'] = { colN : ['23.3'] }; 
			// Sol
			definition['row4']['col'+(definition.width - 1)] = ['09.4'];
			definition['row5']['col'+(definition.width - 1)] = ['09.4'];
			break;
		case CONST.directions.LEFT : 
			definition.width  = 5;
			definition.height =  7;
			// Toit
			definition['row0'] = {
				col0 : ['00.1']
				, col1 : ['00.1','23.5']
				, colN : ['23.6']
			};
			definition['row0']['col'+(definition.width - 1)] = ['00.1','23.7'];
			definition['row1'] = {
				col0 : ['00.1']
				, col1 : ['24.5']
				, colN : ['24.6']
			};
			definition['row1']['col'+(definition.width - 1)] = ['24.7'];
			definition['row2'] = definition['row3'] = {
				col0 : ['09.3']
				, col1 : ['24.5']
				, colN : ['24.6']
			};
			definition['row2']['col'+(definition.width - 1)] = ['24.7'];
			definition['row3'] = {
				col0 : ['09.3']
				, col1 : ['25.5']
				, colN : ['25.6']
			}; 
			definition['row3']['col'+(definition.width - 1)] = ['25.7'];
			//Maison
			definition['row4'] = { 
				col0 : ['09.4']
				, colN : ['23.3'] 
			}; 
			definition['row5'] = definition['row6'] = { 
				col0 : ['09.4']
				, colN : ['23.3'] 
			}; 
			break;
	}
	return standFromDefinition(definition);	
	
}

// Stand GOld
function standGold(direction){
	var array = [];
	for (var row = 0; row < 8; row++){
		var arrayRow = [];
		for (var col = 0; col < widthGold; col++){
			if (row === 0 ){
				if (col === 0){
					arrayRow.push(['00.1','23.0']);
				}else if (col === widthGold -1){
					arrayRow.push(['00.1','23.2']);
				}else{
					arrayRow.push('23.1');
				}				
			}else if (row === 1){
				if (col === 0){
					arrayRow.push('24.0');
				}else if (col === widthGold -1){
					arrayRow.push('24.2');
				}else{
					arrayRow.push('24.1');
				}				
			}else if (row === 2){
				if (col === 0){
					arrayRow.push('25.0');
				}else if (col === widthGold -1){
					arrayRow.push('25.2');
				}else{
					arrayRow.push('25.1');
				}				
			}else if (row === 3
				|| row === 4){
				if (col === 3 && row === 4){					
					arrayRow.push('40.6');
				}else if (col === 0){
					arrayRow.push('04.0');
				}else if (col === widthGold - 1){
					arrayRow.push('04.2');
				}else{
					arrayRow.push('04.1');
				}
			}else if (row === 5){
				if (col === 3 && row === 5){					
					arrayRow.push('41.6');
				}else if (col === 0){
					arrayRow.push('05.0');
				}else if (col === widthGold - 1){
					arrayRow.push('05.2');
				}else{
					arrayRow.push('05.1');
				}
			}else if (row === 6){
				if (col === 0){					
					arrayRow.push('09.0');
				}else if (col === widthGold - 1){					
					arrayRow.push('09.2');
				}else{
					arrayRow.push('09.1');

				}
			}else if (row === 7){
				if (col === 0){					
					arrayRow.push('11.0');
				}else if (col === widthGold - 1){					
					arrayRow.push('11.2');
				}else{
					arrayRow.push('11.1');

				}
			}
		}
		array.push(arrayRow);
	}
	return array;
}

// Stand Platinium
function standPlatinium(direction){
	var array = [];
	for (var row = 0; row < 9; row++){
		var arrayRow = [];
		for (var col = 0; col < widthPlatinium; col++){
			if (row === 0 ){
				if (col === 0){
					arrayRow.push(['00.1','23.5']);
				}else if (col === widthPlatinium -1){
					arrayRow.push(['00.1','23.7']);
				}else{
					arrayRow.push('23.6');
				}				
			}else if (row === 1){
				if (col === 0){
					arrayRow.push('24.5');
				}else if (col === widthPlatinium -1){
					arrayRow.push('24.7');
				}else{
					arrayRow.push('24.6');
				}				
			}else if (row === 2){
				if (col === 0){
					arrayRow.push('25.5');
				}else if (col === widthPlatinium -1){
					arrayRow.push('25.7');
				}else{
					arrayRow.push('25.6');
				}				
			}else if (row === 3){
				if (col === 0){
					arrayRow.push('26.4');
				}else if (col === widthPlatinium - 1){
					arrayRow.push('26.6');
				}else{
					arrayRow.push('26.5');
				}
			}else if (row === 4){
				if (col === 4){					
					arrayRow.push('40.6');
				}else if (col === 0){
					arrayRow.push('27.4');
				}else if (col === widthPlatinium - 1){
					arrayRow.push('27.6');
				}else{
					arrayRow.push('27.5');
				}
			}else if (row === 5){
				if (col === 4){					
					arrayRow.push('41.6');
				}else if (col === 0){
					arrayRow.push('28.4');
				}else if (col === widthPlatinium - 1){
					arrayRow.push('28.6');
				}else{
					arrayRow.push('28.5');
				}
			}else if (row === 6){
				if (col === 0){					
					arrayRow.push('09.0');
				}else if (col === widthPlatinium - 1){					
					arrayRow.push('09.2');
				}else{
					arrayRow.push('09.1');

				}
			}else if (row === 7){
				if (col === 0){					
					arrayRow.push('10.0');
				}else if (col === widthPlatinium - 1){					
					arrayRow.push('10.2');
				}else{
					arrayRow.push('10.1');

				}
			}else if (row === 8){
				if (col === 0){					
					arrayRow.push('11.0');
				}else if (col === widthPlatinium - 1){					
					arrayRow.push('11.2');
				}else{
					arrayRow.push('11.1');

				}
			}
		}
		array.push(arrayRow);
	}
	return array;
}



// Initialise la map vide des Stands
function initMap(){
	var array = [];
	for (var row = 0; row < CONST.ui.SIZE_UNIT.h; row++){
		var arrayRow = [];
		for (var col =0; col < CONST.ui.SIZE_UNIT.w; col++){
			arrayRow.push('');
		}
		array.push(arrayRow);
	}
	return array;
}

// Fonction qui positionne un stand  en fonction d'un point de départ
// La map complète est générée afin de placer correctement le stand
function placeStand(type, idStand, orientation, rowIndex, colIndex, map){
	var standArray = type === CONST.common.STAND_SILVER ? arraySilver[''+orientation] : 
				(type === CONST.common.STAND_GOLD ? arrayGold[''+orientation] : arrayPlatinium[''+orientation]);
	for (var row = 0; row < CONST.ui.SIZE_UNIT.h; row++){
		for (var col =0; col < CONST.ui.SIZE_UNIT.w; col++){
			// Si on trouve notre place, alors, on positionne un stand à cette place
			if (row === rowIndex && col === colIndex){
				for (var rowStand = 0; rowStand < standArray.length; rowStand++){
					for (var colStand = 0; colStand < standArray[0].length; colStand++){
						map[row+rowStand][col+colStand] = standArray[rowStand][colStand];
						// On doit aussi mettre à jour la map de collision 
						switch (type){
							case CONST.common.STAND_SILVER :
								if (rowStand === 6){
									Model.ui.mapCollision[row+rowStand][col+colStand] = false;
								}else{
									Model.ui.mapCollision[row+rowStand][col+colStand] = true;
									// On gère l'interaction (entrée dans un stand)
									if (colStand === 2 && rowStand === 4){
										arrayInteraction.push({
									        x : CONST.ui.UNIT * (col + 2)
									      , y : CONST.ui.UNIT * (row + 4)
									      , w : CONST.ui.UNIT * 1
									      , h : CONST.ui.UNIT * 2
									      , key : CONST.screens.INSIDE_SILVER
									      , id : idStand
									    });
									}
								}
							break;
							case CONST.common.STAND_GOLD:
								if (rowStand === 6
									|| rowStand === 7){
									Model.ui.mapCollision[row+rowStand][col+colStand] = false;
								}else{
									Model.ui.mapCollision[row+rowStand][col+colStand] = true;
									// On gère l'interaction (entrée dans un stand)
									if (colStand === 3 && rowStand === 4){
										arrayInteraction.push({
									        x : CONST.ui.UNIT * (col + 3)
									      , y : CONST.ui.UNIT * (row + 4)
									      , w : CONST.ui.UNIT * 1
									      , h : CONST.ui.UNIT * 2
									      , key : CONST.screens.INSIDE_GOLD
									      , id : idStand
									    });
									}
								}
							break;
							case CONST.common.STAND_PLATINIUM:
								if (rowStand === 6
									|| rowStand === 7
									|| rowStand === 8){
									Model.ui.mapCollision[row+rowStand][col+colStand] = false;
								}else{
									Model.ui.mapCollision[row+rowStand][col+colStand] = true;
									// On gère l'interaction (entrée dans un stand)
									if (colStand === 4 && rowStand === 4){
										arrayInteraction.push({
									        x : CONST.ui.UNIT * (col + 4)
									      , y : CONST.ui.UNIT * (row + 4)
									      , w : CONST.ui.UNIT * 1
									      , h : CONST.ui.UNIT * 2
									      , key : CONST.screens.INSIDE_PLATINIUM
									      , id : idStand
									    });
									}
								}
							break;
						}						
					}
				}
				return map;
			}
		}
	}
	return map;
}

//////////////////////////////////
//////API
/////////////////////////////////

function initStands(){
	var map = initMap();
	StandsModel.forEach(function(stand){
		placeStand(stand.type, stand.name, stand.position.orientation, stand.position.y,stand.position.x,map);
	});
	return map;
}


// Initialisation des variables de stand
arraySilver[''+CONST.directions.UP] = standSilver(CONST.directions.UP);
arraySilver[''+CONST.directions.DOWN] = standSilver(CONST.directions.DOWN);
arraySilver[''+CONST.directions.LEFT] = standSilver(CONST.directions.LEFT);
arraySilver[''+CONST.directions.RIGHT] = standSilver(CONST.directions.RIGHT);
arrayGold[''+CONST.directions.UP] = standGold(CONST.directions.UP);
arrayGold[''+CONST.directions.DOWN] = standGold(CONST.directions.DOWN);
arrayGold[''+CONST.directions.LEFT] = standGold(CONST.directions.LEFT);
arrayGold[''+CONST.directions.RIGHT] = standGold(CONST.directions.RIGHT);
arrayPlatinium[''+CONST.directions.UP] = standPlatinium(CONST.directions.UP);
arrayPlatinium[''+CONST.directions.DOWN] = standPlatinium(CONST.directions.DOWN);
arrayPlatinium[''+CONST.directions.LEFT] = standPlatinium(CONST.directions.LEFT);
arrayPlatinium[''+CONST.directions.RIGHT] = standPlatinium(CONST.directions.RIGHT);

module.exports = {
	initStands : initStands,
	arrayInteraction : arrayInteraction
};