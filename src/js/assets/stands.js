'use strict';
var CONST = require('../model/const.js');
var StandsModel = require('../model/stands.js');
var Model = require('../model/model.js');

var arraySilver = {}
	, arrayGold = {}
	, arrayPlatinium = {}
	, _arrayInteraction = [];


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
			definition.width  = 5;
			definition.height =  7;
			// Toit
			definition['row0'] = {
				col0 : ['23.5']
				, colN : ['23.6']
				, col4 :['23.7']
			};
			definition['row1'] = {
				col0 : ['24.5']
				, colN : ['24.6']
				, col4 : ['24.7']
			};
			definition['row2'] = {
				col0 : ['25.5']
				, colN : ['25.6']
				, col4 : ['25.7']
			}; 
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
				, col4 : ['09.4']
			}; 
			break;
		case CONST.directions.UP : 
			definition.width  = 5;
			definition.height =  7;
			// Sol & Toit
			definition['row0'] = {
				col0 : ['09.3']
				, col2 : ['09.1','08.0']
				, colN : ['10.1']
				, col4 : ['09.4']
			};
			definition['row1'] = {
				col0 : ['09.3','23.5']
				, colN : ['23.6']
				, col4 : ['09.4','23.7']
			};
			definition['row2'] = {
				col0 : ['24.5']
				, colN : ['24.6']
				, col4 : ['24.7']
			};
			definition['row3'] = {
				col0 : ['25.5']
				, colN : ['25.6']
				, col4 : ['25.7']
			}; 
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
				col0 : ['23.5']
				, colN : ['23.6']
				, col3 : ['23.7']
				, col4 : []
			};
			definition['row1'] = {
				col0 : ['24.5']
				, colN : ['24.6']
				, col3 : ['24.7']
				, col4 : []
			};			
			definition['row2'] = definition['row3'] = {
				col0 : ['24.5']
				, colN : ['24.6']
				, col3 : ['24.7']
				, col4 : ['09.3']
			};			
			definition['row3'] = {
				col0 : ['25.5']
				, colN : ['25.6']
				, col3 : ['25.7']
				, col4 : ['09.3']
			}; 
			
			//Maison
			definition['row4'] = { 
				colN : ['23.3']
				// Sol && porte
				, col4 : ['09.4', '08.0'] 
			}; 
			definition['row5'] = definition['row6'] = { 
				colN : ['23.3'] 
				//Sol
				, col4 : ['09.4']
			}; 			
			break;
		case CONST.directions.LEFT : 
			definition.width  = 5;
			definition.height =  7;
			// Toit
			definition['row0'] = {
				col0 : []
				, col1 : ['23.5']
				, colN : ['23.6']
				, col4 : ['23.7']
			};
			definition['row1'] = {
				col0 : []
				, col1 : ['24.5']
				, colN : ['24.6']
				, col4 : ['24.7']
			};
			definition['row2'] = definition['row3'] = {
				col0 : ['09.3']
				, col1 : ['24.5']
				, colN : ['24.6']
				, col4 : ['24.7']
			};
			definition['row3'] = {
				col0 : ['09.3']
				, col1 : ['25.5']
				, colN : ['25.6']
				, col4 : ['25.7']
			}; 
			//Maison
			definition['row4'] = { 
				// Sol & porte
				col0 : ['09.4', '08.0']
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
	var definition = {};
	switch(direction){
		case CONST.directions.DOWN : 
			definition.width  = 7;
			definition.height =  8;
			// Toit
			definition['row0'] = {
				col0 : ['23.0']
				, colN : ['23.1']
				, col6 : ['23.2']
			};
			definition['row1'] = {
				col0 : ['24.0']
				, colN : ['24.1']
				, col6 : ['24.2']
			};
			definition['row2'] = {
				col0 : ['25.0']
				, colN : ['25.1']
				, col6 : ['25.2']
			}; 
			//Maison
			definition['row3'] = { 
				col0 : ['04.0']
				, colN : ['04.1'] 
				, col6 : ['04.2']
			}; 
			definition['row4'] = { 
				col0 : ['04.0']
				, colN : ['04.1'] 
				, col6 : ['04.2']
			}; 
			definition['row5'] = { 
				col0 : ['05.0']
				, colN : ['05.1'] 
				, col6 : ['05.2']
			}; 
			// Porte 
			definition['row4']['col3'] = ['40.6'];
			definition['row5']['col3'] = ['41.6'];
			// Sol
			definition['row6'] = {
				col0 : ['09.0']
				, colN : ['09.1']
				, col6 : ['09.2']
			}; 
			definition['row7'] = {
				col0 : ['11.0']
				, colN : ['11.1']
				, col6 : ['11.2']
			}; 
			break;
		case CONST.directions.UP : 
			definition.width  = 7;
			definition.height =  7;
			// Sol & Toit
			definition['row0'] = {
				col0 : ['09.0']
				, col3 : ['09.1','08.0']				
				, colN : ['09.1']
				, col6 : ['09.2']
			};
			definition['row1'] = {
				col0 : ['10.3','23.0']
				, colN : ['23.1']
				, col6 : ['10.2','23.2']
			};
			definition['row2'] = {
				col0 : ['24.0']
				, colN : ['24.1']
				, col6 : ['24.2']
			};
			definition['row3'] = {
				col0 : ['25.0']
				, colN : ['25.1']
				, col6 : ['25.2']
			}; 
			//Maison
			definition['row4'] = { 
				col0 : ['04.0']
				, colN : ['04.1'] 
				, col6 : ['04.2']
			}; 
			definition['row5'] = { 
				col0 : ['04.0']
				, colN : ['04.1'] 
				, col6 : ['04.2']
			}; 
			definition['row6'] = { 
				col0 : ['05.0']
				, colN : ['05.1'] 
				, col6 : ['05.2']
			}; 
			// Porte 
			// TODO 
			break;
		case CONST.directions.RIGHT : 
			definition.width  = 6;
			definition.height =  9;
			// Toit
			definition['row0'] = {
				col0 : ['23.0']
				, colN : ['23.1']
				, col4 : ['23.2']
				, col5 : []
				, col6 : []
			};
			definition['row1'] = {
				col0 : ['24.0']
				, colN : ['24.1']
				, col4 : ['24.2']
				, col5 : []
				, col6 : []
			};
			definition['row2'] = {
				col0 : ['24.0']
				, colN : ['24.1']
				, col4 : ['24.2']
				, col5 : ['09.0']
				, col6 : ['09.2']
			};
			definition['row3'] = definition['row4'] = {
				col0 : ['24.0']
				, colN : ['24.1']
				, col4 : ['24.2']
				, col5 : ['10.0']
				, col6 : ['10.2']
			};
			definition['row5'] = {
				col0 : ['25.0']
				, colN : ['25.1']
				, col4 : ['25.2']
				// Porte
				, col5 : ['10.0','08.0']
				, col6 : ['10.2']
			}; 
			//Maison
			definition['row6'] = { 
				col0 : ['04.0']
				, colN : ['04.1'] 
				, col4 : ['04.2']
				, col5 : ['10.0']
				, col6 : ['10.2']
			}; 
			definition['row7'] = { 
				col0 : ['04.0']
				, colN : ['04.1'] 
				, col4 : ['04.2']
				, col5 : ['10.0']
				, col6 : ['10.2']
			}; 
			definition['row8'] = { 
				col0 : ['05.0']
				,colN : ['05.1'] 
				, col4 : ['05.2']
				, col5 : ['11.0']
				, col6 : ['11.2']
			}; 
			// Sol
			
			break;
		case CONST.directions.LEFT : 
		definition.width  = 6;
			definition.height =  9;
			// Toit
			definition['row0'] = {
				col0 : []
				, col1 : []
				, col2 : ['23.0']
				, colN : ['23.1']
				, col5 : ['23.2']
			};
			definition['row1'] = {
				col0 : []
				, col1 : []
				, col2 : ['24.0']
				, colN : ['24.1']
				, col5 : ['24.2']
			};
			definition['row2'] = {
				col0 : ['09.0']
				, col1 : ['09.2']
				, col2 : ['24.0']
				, colN : ['24.1']
				, col5 : ['24.2']
			};
			definition['row3'] = definition['row4'] = {
				col0 : ['10.0']
				, col1 : ['10.2']
				, col2 : ['24.0']
				, colN : ['24.1']
				, col5 : ['24.2']
			};
			definition['row5'] = {
				col0 : ['10.0']
				// Porte
				, col1 : ['10.2','08.0']
				, col2 : ['25.0']
				, colN : ['25.1']
				, col5 : ['25.2']
			}; 
			//Maison
			definition['row6'] = { 
				col0 : ['10.0']
				, col1 : ['10.2']
				, col2 : ['04.0']
				, colN : ['04.1'] 
				, col5 : ['04.2']
			}; 
			definition['row7'] = { 
				col0 : ['10.0']
				, col1 : ['10.2']
				, col2 : ['04.0']
				, colN : ['04.1'] 
				, col5 : ['04.2']
			}; 
			definition['row8'] = { 
				col0 : ['11.0']
				, col1 : ['11.2']
				, col2 : ['05.0']
				, colN : ['05.1'] 
				, col5 : ['05.2']
			}; 
			// Sol


			break;
	}
	return standFromDefinition(definition);	
	
}

// Stand Platinium
function standPlatinium(direction){
	var definition = {};
	switch(direction){
		case CONST.directions.DOWN : 
			definition.width  = 9;
			definition.height =  8;
			// Toit
			definition['row0'] = {
				col0 : ['23.5']
				, colN : ['23.6']
				, col8 : ['23.7']
			};
			definition['row1'] = {
				col0 : ['24.5']
				, colN : ['24.6']
				, col8 : ['24.7']
			};
			definition['row2'] = {
				col0 : ['25.5']
				, colN : ['25.6']
				, col8 : ['25.7']
			}; 
			//Maison
			definition['row3'] = { 
				col0 : ['26.4']
				, colN : ['26.5'] 
				, col8 : ['26.6']
			}; 
			definition['row4'] = { 
				col0 : ['27.4']
				, colN : ['27.6'] 
				, col8 : ['27.6']
			}; 
			definition['row5'] = { 
				col0 : ['28.4']
				, colN : ['28.5'] 
				, col8 : ['28.6']
			}; 
			// Porte 
			definition['row4']['col4'] = ['40.6'];
			definition['row5']['col4'] = ['41.6'];
			// Sol
			definition['row6'] = {
				col0 : ['09.0']
				, colN : ['09.1']
				, col8 : ['09.2']
			}; 
			definition['row7'] = {
				col0 : ['10.0']
				, colN : ['10.1']
				, col8 : ['10.2']
			}; 
			definition['row8'] = {
				col0 : ['11.0']
				, colN : ['11.1']
				, col8 : ['11.2']
			}; 
			break;
		case CONST.directions.UP : 
			definition.width  = 9;
			definition.height =  8;
			// Sol & Toit
			definition['row0'] = {
				col0 : ['09.0']				
				, colN : ['09.1']
				, col8 : ['09.2']
			};
			definition['row1'] = {
				col0 : ['10.0']
				, col5 : ['10.1','08.0']
				, colN : ['10.1']
				, col8 : ['10.2']
			};
			definition['row2'] = {
				col0 : ['10.0','23.5']
				, colN : ['23.6']
				, col8 : ['10.2','23.7']
			};
			definition['row3'] = {
				col0 : ['24.5']
				, colN : ['24.6']
				, col8 : ['24.7']
			};
			definition['row4'] = {
				col0 : ['25.5']
				, colN : ['25.6']
				, col8 : ['25.7']
			}; 
			//Maison
			definition['row5'] = { 
				col0 : ['26.4']
				, colN : ['26.5'] 
				, col8 : ['26.6']
			}; 
			definition['row6'] = { 
				col0 : ['27.4']
				, colN : ['27.6'] 
				, col8 : ['27.6']
			}; 
			definition['row7'] = { 
				col0 : ['28.4']
				, colN : ['28.5'] 
				, col8 : ['28.6']
			}; 
			// Porte 

			// TODO 
			break;
		case CONST.directions.RIGHT : 
			definition.width  = 7;
			definition.height =  13;
			// Toit
			definition['row0'] = {
				col0 : ['23.5']
				, colN : ['23.6']
				, col3 : ['23.7']
				, col4 : []
				, col5 : []
				, col6 : []
			};
			definition['row1'] = {
				col0 : ['24.5']
				, colN : ['24.6']
				, col3 : ['24.7']
				, col4 : []
				, col5 : []
				, col6 : []
			};
			definition['row2'] = {
				col0 : ['24.5']
				, colN : ['24.6']
				, col3 : ['24.7']
				, col4 : ['09.0']
				, col5 : ['09.1']
				, col6 : ['09.2']
			};
			definition['row3'] = definition['row4'] =
			definition['row5'] = definition['row6'] =
			definition['row8'] = {
				col0 : ['24.5']
				, colN : ['24.6']
				, col3 : ['24.7']
				, col4 : ['10.0']
				, col5 : ['10.1']
				, col6 : ['10.2']
			};			
			definition['row7'] = {
				col0 : ['24.5']
				, colN : ['24.6']
				, col3 : ['24.7']
				// Porte
				, col4 : ['10.0','08.0'] 
				, col5 : ['10.1']
				, col6 : ['10.2']
			}; 
			definition['row9'] = {
				col0 : ['25.5']
				, colN : ['25.6']
				, col3 : ['25.7']
				, col4 : ['10.0'] 
				, col5 : ['10.1']
				, col6 : ['10.2']
			}; 
			//Maison
			definition['row10'] = { 
				col0 : ['26.4']
				, colN : ['26.5'] 
				, col3 : ['26.6']
				, col4 : ['10.0'] 
				, col5 : ['10.1']
				, col6 : ['10.2']
			}; 
			definition['row11'] = { 
				col0 : ['27.4']
				, colN : ['27.5'] 
				, col3 : ['27.6']
				, col4 : ['10.0'] 
				, col5 : ['10.1']
				, col6 : ['10.2']
			}; 
			definition['row12'] = { 
				col0 : ['28.4']
				, colN : ['28.5'] 
				, col3 : ['28.6']
				, col4 : ['11.0'] 
				, col5 : ['11.1']
				, col6 : ['11.2']
			}; 
			// Sol
			
			break;
		case CONST.directions.LEFT : 
			definition.width  = 7;
			definition.height =  13;
			// Toit
			definition['row0'] = {
				col0 : []
				, col1 : []
				, col2 : []
				, col3 : ['23.5']
				, colN : ['23.6']
				, col6 : [ '23.7']
			};
			definition['row1'] = {
				col0 : []
				, col1 : []
				, col2 : []
				, col3 : ['24.5']
				, colN : ['24.6']
				, col6 : ['24.7']
			};
			definition['row2'] = {
				col0 : ['09.0']
				, col1 : ['09.1']
				, col2 : ['09.2']
				, col3 : ['24.5']
				, colN : ['24.6']
				, col6 : ['24.7']
			};
			definition['row3'] = definition['row4'] =
			definition['row5'] = definition['row6'] =
			definition['row8'] = {
				col0 : ['10.0']
				, col1 : ['10.1']
				, col2 : ['10.2']
				, col3 : ['24.5']
				, colN : ['24.6']
				, col6 : ['24.7']
			};			
			definition['row7'] = {
				col0 : ['10.0'] 
				, col1 : ['10.1']
				// Porte
				, col2 : ['10.2','08.0']
				, col3 : ['24.5']
				, colN : ['24.6']
				, col6 : ['24.7']
			}; 
			definition['row9'] = {
				col0 : ['10.0'] 
				, col1 : ['10.1']
				, col2 : ['10.2']
				, col3 : ['25.5']
				, colN : ['25.6']
				, col6 : ['25.7']
			}; 
			//Maison
			definition['row10'] = { 
				col0 : ['10.0'] 
				, col1 : ['10.1']
				, col2 : ['10.2']
				, col3 : ['26.4']
				, colN : ['26.5'] 
				, col6 : ['26.6']
			}; 
			definition['row11'] = { 
				col0 : ['10.0'] 
				, col1 : ['10.1']
				, col2 : ['10.2']
				, col3 : ['27.4']
				, colN : ['27.5'] 
				, col6 : ['27.6']
			}; 
			definition['row12'] = { 
				col0 : ['11.0'] 
				, col1 : ['11.1']
				, col2 : ['11.2']
				, col3 : ['28.4']
				, colN : ['28.5'] 
				, col6 : ['28.6']
			}; 
			// Sol


			break;
	}
	return standFromDefinition(definition);	
}


// Calcul des zones d'interaction du stand Silver
function applyInteractionsAreasSilver(row, col, rowStand, colStand, direction, idStand){
	switch (direction){		
		case CONST.directions.DOWN:
			if (rowStand === 6){
				Model.ui.mapCollision[row+rowStand][col+colStand] = false;
			}else{
				Model.ui.mapCollision[row+rowStand][col+colStand] = true;
				// On gère l'interaction (entrée dans un stand)
				if (colStand === 2 && rowStand === 4){
					_arrayInteraction.push({
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
		case CONST.directions.UP:
			if (rowStand === 0){
				Model.ui.mapCollision[row+rowStand][col+colStand] = false;
				// On gère l'interaction (entrée dans un stand)
				if (colStand === 2 && rowStand === 0){
					_arrayInteraction.push({
				        x : CONST.ui.UNIT * (col + 2)
				      , y : CONST.ui.UNIT * (row + 0)
				      , w : CONST.ui.UNIT * 1
				      , h : CONST.ui.UNIT * 1
				      , key : CONST.screens.INSIDE_SILVER
				      , id : idStand
				    });
				}
			}else{
				Model.ui.mapCollision[row+rowStand][col+colStand] = true;
			}
		break;
		case CONST.directions.LEFT:
			if (colStand === 0){
				Model.ui.mapCollision[row+rowStand][col+colStand] = false;
				// On gère l'interaction (entrée dans un stand)
				if (colStand === 0 && rowStand === 4){
					_arrayInteraction.push({
				        x : CONST.ui.UNIT * (col + 0)
				      , y : CONST.ui.UNIT * (row + 4)
				      , w : CONST.ui.UNIT * 1
				      , h : CONST.ui.UNIT * 1
				      , key : CONST.screens.INSIDE_SILVER
				      , id : idStand
				    });
				}
			}else{
				Model.ui.mapCollision[row+rowStand][col+colStand] = true;
			}
		break;
		case CONST.directions.RIGHT:
			if (colStand === 4){
				Model.ui.mapCollision[row+rowStand][col+colStand] = false;
				// On gère l'interaction (entrée dans un stand)
				if (colStand === 4 && rowStand === 4){
					_arrayInteraction.push({
				        x : CONST.ui.UNIT * (col + 4)
				      , y : CONST.ui.UNIT * (row + 4)
				      , w : CONST.ui.UNIT * 1
				      , h : CONST.ui.UNIT * 1
				      , key : CONST.screens.INSIDE_SILVER
				      , id : idStand
				    });
				}
			}else{
				Model.ui.mapCollision[row+rowStand][col+colStand] = true;
			}
		break;
	}
}

// Calcul des zones d'interaction du stand Gold
function applyInteractionsAreasGold(row, col, rowStand, colStand, direction, idStand){
	switch (direction){		
		case CONST.directions.DOWN:
			if (rowStand === 6 || rowStand === 7){
				Model.ui.mapCollision[row+rowStand][col+colStand] = false;
			}else{
				Model.ui.mapCollision[row+rowStand][col+colStand] = true;
				// On gère l'interaction (entrée dans un stand)
				if (colStand === 3 && rowStand === 4){
					_arrayInteraction.push({
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
		case CONST.directions.UP:
			if (rowStand === 0){
				Model.ui.mapCollision[row+rowStand][col+colStand] = false;
				// On gère l'interaction (entrée dans un stand)
				if (colStand === 3 && rowStand === 0){
					_arrayInteraction.push({
				        x : CONST.ui.UNIT * (col + 3)
				      , y : CONST.ui.UNIT * (row + 0)
				      , w : CONST.ui.UNIT * 1
				      , h : CONST.ui.UNIT * 1
				      , key : CONST.screens.INSIDE_GOLD
				      , id : idStand
				    });
				}
			}else{
				Model.ui.mapCollision[row+rowStand][col+colStand] = true;
			}
		break;
		case CONST.directions.LEFT:
			if (colStand === 0 || colStand === 1){
				Model.ui.mapCollision[row+rowStand][col+colStand] = false;
				// On gère l'interaction (entrée dans un stand)
				if (colStand === 1 && rowStand === 5){
					_arrayInteraction.push({
				        x : CONST.ui.UNIT * (col + 1)
				      , y : CONST.ui.UNIT * (row + 5)
				      , w : CONST.ui.UNIT * 1
				      , h : CONST.ui.UNIT * 1
				      , key : CONST.screens.INSIDE_GOLD
				      , id : idStand
				    });
				}
			}else{
				Model.ui.mapCollision[row+rowStand][col+colStand] = true;
			}
		break;
		case CONST.directions.RIGHT:
			if (colStand === 4 || colStand === 5){
				Model.ui.mapCollision[row+rowStand][col+colStand] = false;
				// On gère l'interaction (entrée dans un stand)
				if (colStand === 4 && rowStand === 5){
					_arrayInteraction.push({
				        x : CONST.ui.UNIT * (col + 4)
				      , y : CONST.ui.UNIT * (row + 5)
				      , w : CONST.ui.UNIT * 1
				      , h : CONST.ui.UNIT * 1
				      , key : CONST.screens.INSIDE_GOLD
				      , id : idStand
				    });
				}
			}else{
				Model.ui.mapCollision[row+rowStand][col+colStand] = true;
			}
		break;
	}
}

// Calcul des zones d'interaction du stand Silver
function applyInteractionsAreasPlatinium(row, col, rowStand, colStand, direction, idStand){
	switch (direction){		
		case CONST.directions.DOWN:
			if (rowStand === 6
				|| rowStand === 7
				|| rowStand === 8){
				Model.ui.mapCollision[row+rowStand][col+colStand] = false;
			}else{
				Model.ui.mapCollision[row+rowStand][col+colStand] = true;
				// On gère l'interaction (entrée dans un stand)
				if (colStand === 5 && rowStand === 6){
					_arrayInteraction.push({
				        x : CONST.ui.UNIT * (col + 5)
				      , y : CONST.ui.UNIT * (row + 4)
				      , w : CONST.ui.UNIT * 1
				      , h : CONST.ui.UNIT * 2
				      , key : CONST.screens.INSIDE_PLATINIUM
				      , id : idStand
				    });
				}
			}
		break;
		case CONST.directions.UP:
			if (rowStand === 0 || rowStand === 1){
				Model.ui.mapCollision[row+rowStand][col+colStand] = false;
				// On gère l'interaction (entrée dans un stand)
				if (colStand === 5 && rowStand === 1){
					_arrayInteraction.push({
				        x : CONST.ui.UNIT * (col + 5)
				      , y : CONST.ui.UNIT * (row + 1)
				      , w : CONST.ui.UNIT * 1
				      , h : CONST.ui.UNIT * 1
				      , key : CONST.screens.INSIDE_PLATINIUM
				      , id : idStand
				    });
				}
			}else{
				Model.ui.mapCollision[row+rowStand][col+colStand] = true;
			}
		break;
		case CONST.directions.LEFT:
			if (colStand === 0
				|| colStand === 1
				|| colStand === 2){
				Model.ui.mapCollision[row+rowStand][col+colStand] = false;
				// On gère l'interaction (entrée dans un stand)
				if (colStand === 2 && rowStand === 7){
					_arrayInteraction.push({
				        x : CONST.ui.UNIT * (col + 2)
				      , y : CONST.ui.UNIT * (row + 7)
				      , w : CONST.ui.UNIT * 1
				      , h : CONST.ui.UNIT * 1
				      , key : CONST.screens.INSIDE_PLATINIUM
				      , id : idStand
				    });
				}
			}else{
				Model.ui.mapCollision[row+rowStand][col+colStand] = true;
			}
		break;
		case CONST.directions.RIGHT:
			if (colStand === 4
				|| colStand === 5
				|| colStand === 6){
				Model.ui.mapCollision[row+rowStand][col+colStand] = false;
				// On gère l'interaction (entrée dans un stand)
				if (colStand === 4 && rowStand === 7){
					_arrayInteraction.push({
				        x : CONST.ui.UNIT * (col + 4)
				      , y : CONST.ui.UNIT * (row + 7)
				      , w : CONST.ui.UNIT * 1
				      , h : CONST.ui.UNIT * 1
				      , key : CONST.screens.INSIDE_PLATINIUM
				      , id : idStand
				    });
				}
			}else{
				Model.ui.mapCollision[row+rowStand][col+colStand] = true;
			}
		break;
	}
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
								applyInteractionsAreasSilver(row, col, rowStand, colStand, orientation, idStand);								
							break;
							case CONST.common.STAND_GOLD:
								applyInteractionsAreasGold(row, col, rowStand, colStand, orientation, idStand);																
							break;
							case CONST.common.STAND_PLATINIUM:
								applyInteractionsAreasPlatinium(row, col, rowStand, colStand, orientation, idStand);																
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
	arrayInteraction : _arrayInteraction
};