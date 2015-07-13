'use strict';
var CONST = require('../model/const.js');
var Model = require('../model/model.js');

var widthSilver = 7
	,widthGold = 9
	, widthPlatinium = 11
	, TYPE_SILVER = 1
	, TYPE_GOLD = 2
	, TYPE_PLATINIUM = 3
	, arraySilver = []
	, arrayGold = []
	, arrayPlatinium = [];


// Stand silver tout seul
function standSilver(){
	var array = [];
	for (var row = 0; row < 8; row++){
		var arrayRow = [];
		for (var col = 0; col < widthSilver; col++){
			if (row === 0 ){
				if (col === 0){
					arrayRow.push(['inside_2','04.2']);
				}else if (col === widthSilver -1){
					arrayRow.push(['inside_2','04.4']);
				}else{
					arrayRow.push(['inside_2','04.3']);
				}				
			}else if (row === 1){
				if (col === 1){
					arrayRow.push(['inside_1','13.3', '08.1', '00.4']);
				}else if (col === widthSilver - 2){
					arrayRow.push(['inside_1','13.3','08.1', '00.3']);
				}else if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthSilver - 1){
					arrayRow.push(['inside_2','05.4']);
				}else{
					arrayRow.push(['inside_1','13.3','08.1']);
				}				
			}else if (row === 2){
				if (col === 5){
					arrayRow.push(['inside_1','13.3','13.6']);
				}else if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthSilver - 1){
					arrayRow.push(['inside_2','05.4']);
				}else{
					arrayRow.push(['inside_1','13.3']);
				}				
			}else if (row === 3){
				if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthSilver - 1){
					arrayRow.push(['inside_2','05.4']);
				}else{
					arrayRow.push(['inside_1','14.3']);				
				}
			}else if (row === 4
				|| row === 5
				|| row === 6){
				if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthSilver - 1){
					arrayRow.push(['inside_2','05.4']);
				}else if (col === 1 && row === 4){					
					arrayRow.push(['inside_1','00.0','02.0']);
				}else if (col === 3 && row === 6){					
					arrayRow.push(['inside_1','00.0','08.1']);
				}else{
					arrayRow.push(['inside_1','00.0']);

				}
			}else if (row === 7){
				if (col === 0){
					arrayRow.push(['inside_2','06.2']);
				}else if (col === widthSilver -1){
					arrayRow.push(['inside_2','06.4']);
				}else{
					arrayRow.push(['inside_2','06.3']);
				}	
			}
		}
		array.push(arrayRow);
	}
	return array;
}

// Stand GOld
function standGold(){
	var array = [];
	for (var row = 0; row < 8; row++){
		var arrayRow = [];
		for (var col = 0; col < widthSilver; col++){
			if (row === 0 ){
				if (col === 0){
					arrayRow.push(['inside_2','04.2']);
				}else if (col === widthSilver -1){
					arrayRow.push(['inside_2','04.4']);
				}else{
					arrayRow.push(['inside_2','04.3']);
				}				
			}else if (row === 1){
				if (col === 1){
					arrayRow.push(['inside_2','03.3']);
				}else if (col === widthSilver - 2){
					arrayRow.push(['inside_2','03.4']);
				}else if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthSilver - 1){
					arrayRow.push(['inside_2','05.4']);
				}else{
					arrayRow.push(['inside_2','03.5']);
				}				
			}else if (row === 2){
				if (col === 4){
					arrayRow.push(['inside_2','00.0','12.3']);
				}else if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthSilver - 1){
					arrayRow.push(['inside_2','05.4']);
				}else if (col === 1){
					arrayRow.push(['inside_2','02.3']);
				}else if (col === widthSilver - 2){
					arrayRow.push(['inside_2','02.4']);
				}else{
					arrayRow.push(['inside_1','00.0']);
				}				
			}else if (row === 3){
				if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthSilver - 1){
					arrayRow.push(['inside_2','05.4']);
				}else if (col === 1){
					arrayRow.push(['inside_2','02.3']);
				}else if (col === widthSilver - 2){
					arrayRow.push(['inside_2','02.4']);
				}else{
					arrayRow.push(['inside_1','02.5']);				
				}
			}else if (row === 4
				|| row === 5
				|| row === 6){
				if (col === 0){
					arrayRow.push(['inside_2','00.0','05.2']);
				}else if (col === widthSilver - 1){
					arrayRow.push(['inside_2','00.0','05.4']);
				}else if (col === 1 && row === 4){	// Caisses
					arrayRow.push(['inside_1','00.0','02.2']);
				}else if (col === 2 && row === 4){					
					arrayRow.push(['inside_1','00.0','02.3']);
				}else if (col === 1 && row === 5){					
					arrayRow.push(['inside_1','00.0','03.2']);
				}else if (col === 2 && row === 5){					
					arrayRow.push(['inside_1','00.0','03.3']);
				}else if (col === 5 && row === 5){	// Table
					arrayRow.push(['inside_1','00.0','09.1']);
				}else if (col === 5 && row === 6){					
					arrayRow.push(['inside_1','00.0','09.1']);
				}else if (col === 4 && row === 6){ // Porte
					arrayRow.push(['inside_1','00.0','08.1']);
				}else{
					arrayRow.push(['inside_1','00.0']);

				}
			}else if (row === 7){
				if (col === 0){
					arrayRow.push(['inside_2','06.2']);
				}else if (col === widthSilver -1){
					arrayRow.push(['inside_2','06.4']);
				}else{
					arrayRow.push(['inside_2','06.3']);
				}	
			}
		}
		array.push(arrayRow);
	}
	return array;
}

// Stand Platinium
function standPlatinium(){
	var array = [];
	for (var row = 0; row < 8; row++){
		var arrayRow = [];
		for (var col = 0; col < widthSilver; col++){
			if (row === 0 ){
				if (col === 0){
					arrayRow.push(['inside_2','04.2']);
				}else if (col === widthSilver -1){
					arrayRow.push(['inside_2','04.4']);
				}else{
					arrayRow.push(['inside_2','04.3']);
				}				
			}else if (row === 1){
				if (col === 1){
					arrayRow.push(['inside_1','13.3', '08.1', '00.4']);
				}else if (col === widthSilver - 2){
					arrayRow.push(['inside_1','13.3','08.1', '00.3']);
				}else if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthSilver - 1){
					arrayRow.push(['inside_2','05.4']);
				}else{
					arrayRow.push(['inside_1','13.3','08.1']);
				}				
			}else if (row === 2){
				if (col === 5){
					arrayRow.push(['inside_1','13.3','13.6']);
				}else if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthSilver - 1){
					arrayRow.push(['inside_2','05.4']);
				}else{
					arrayRow.push(['inside_1','13.3']);
				}				
			}else if (row === 3){
				if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthSilver - 1){
					arrayRow.push(['inside_2','05.4']);
				}else{
					arrayRow.push(['inside_1','14.3']);				
				}
			}else if (row === 4
				|| row === 5
				|| row === 6){
				if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthSilver - 1){
					arrayRow.push(['inside_2','05.4']);
				}else if (col === 1 && row === 4){					
					arrayRow.push(['inside_1','00.0','02.0']);
				}else if (col === 3 && row === 6){					
					arrayRow.push(['inside_1','00.0','08.1']);
				}else{
					arrayRow.push(['inside_1','00.0']);

				}
			}else if (row === 7){
				if (col === 0){
					arrayRow.push(['inside_2','06.2']);
				}else if (col === widthSilver -1){
					arrayRow.push(['inside_2','06.4']);
				}else{
					arrayRow.push(['inside_2','06.3']);
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
	for (var row = 0; row < CONST.SIZE_UNIT.h; row++){
		var arrayRow = [];
		for (var col =0; col < CONST.SIZE_UNIT.w; col++){
			arrayRow.push('');
		}
		array.push(arrayRow);
	}
	return array;
}

// Fonction qui positionne un stand  en fonction d'un point de départ
// La map complète est générée afin de placer correctement le stand
function placeStand(type, rowIndex, colIndex, map){
	var standArray = type === TYPE_SILVER ? arraySilver : 
				(type === TYPE_GOLD ? arrayGold : arrayPlatinium);
	for (var row = 0; row < CONST.SIZE_UNIT.h; row++){
		for (var col =0; col < CONST.SIZE_UNIT.w; col++){
			// Si on trouve notre place, alors, on positionne un stand à cette place
			if (row === rowIndex && col === colIndex){
				for (var rowStand = 0; rowStand < standArray.length; rowStand++){
					for (var colStand = 0; colStand < standArray[0].length; colStand++){
						map[row+rowStand][col+colStand] = standArray[rowStand][colStand];
						// On doit aussi mettre à jour la map de collision 
						switch (type){
							case TYPE_SILVER :
								if (rowStand === 6){
									Model.ui.mapCollision[row+rowStand][col+colStand] = false;
								}else{
									Model.ui.mapCollision[row+rowStand][col+colStand] = true;
								}
							break;
							case TYPE_GOLD:
								if (rowStand === 6
									|| rowStand === 7){
									Model.ui.mapCollision[row+rowStand][col+colStand] = false;
								}else{
									Model.ui.mapCollision[row+rowStand][col+colStand] = true;
								}
							break;
							case TYPE_PLATINIUM:
								if (rowStand === 6
									|| rowStand === 7
									|| rowStand === 8){
									Model.ui.mapCollision[row+rowStand][col+colStand] = false;
								}else{
									Model.ui.mapCollision[row+rowStand][col+colStand] = true;
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


// Initialisation des variables de stand
arraySilver = standSilver();
arrayGold = standGold();
arrayPlatinium = standPlatinium();

module.exports = {
	silver : arraySilver,
	gold : arrayGold,
	Platinium : arrayPlatinium
};