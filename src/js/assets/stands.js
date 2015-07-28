'use strict';
var CONST = require('../model/const.js');
var Model = require('../model/model.js');

var widthSilver = 5
	,widthGold = 7
	, widthPlatinium = 9
	, TYPE_SILVER = 1
	, TYPE_GOLD = 2
	, TYPE_PLATINIUM = 3
	, arraySilver = []
	, arrayGold = []
	, arrayPlatinium = []
	, arrayInteraction = [];


// Stand silver tout seul
function standSilver(){
	var array = [];
	for (var row = 0; row < 7; row++){
		var arrayRow = [];
		for (var col = 0; col < widthSilver; col++){
			if (row === 0 ){
				if (col === 0){
					arrayRow.push(['00.1','23.5']);
				}else if (col === widthSilver -1){
					arrayRow.push(['00.1','23.7']);
				}else{
					arrayRow.push('23.6');
				}				
			}else if (row === 1){
				if (col === 0){
					arrayRow.push('24.5');
				}else if (col === widthSilver -1){
					arrayRow.push('24.7');
				}else{
					arrayRow.push('24.6');
				}				
			}else if (row === 2){
				if (col === 0){
					arrayRow.push('25.5');
				}else if (col === widthSilver -1){
					arrayRow.push('25.7');
				}else{
					arrayRow.push('25.6');
				}				
			}else if (row === 3
				|| row === 4
				|| row === 5){
				if (col === 2 && row === 4){					
					arrayRow.push('40.6');
				}else if (col === 2 && row === 5){					
					arrayRow.push('41.6');
				}else{
					arrayRow.push('23.3');

				}
			}else if (row === 6){
				if (col === 0){					
					arrayRow.push('09.3');
				}else if (col === widthSilver - 1){					
					arrayRow.push('09.4');
				}else{
					arrayRow.push('10.1');

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
				if (col === 2 && row === 4){					
					arrayRow.push('40.6');
				}else if (col === 0){
					arrayRow.push('04.0');
				}else if (col === widthGold - 1){
					arrayRow.push('04.2');
				}else{
					arrayRow.push('04.1');
				}
			}else if (row === 5){
				if (col === 2 && row === 5){					
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
function standPlatinium(){
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
				if (col === 2){					
					arrayRow.push('40.6');
				}else if (col === 0){
					arrayRow.push('27.4');
				}else if (col === widthPlatinium - 1){
					arrayRow.push('27.6');
				}else{
					arrayRow.push('27.5');
				}
			}else if (row === 5){
				if (col === 2){					
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
function placeStand(type, idStand, rowIndex, colIndex, map){
	var standArray = type === TYPE_SILVER ? arraySilver : 
				(type === TYPE_GOLD ? arrayGold : arrayPlatinium);
	for (var row = 0; row < CONST.ui.SIZE_UNIT.h; row++){
		for (var col =0; col < CONST.ui.SIZE_UNIT.w; col++){
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
							case TYPE_GOLD:
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
							case TYPE_PLATINIUM:
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
	placeStand(TYPE_SILVER, 'stand1', 10,5,map);
	placeStand(TYPE_GOLD, 'stand2', 10,15,map);
	placeStand(TYPE_PLATINIUM, 'stand3', 10,25,map);
	return map;
}


// Initialisation des variables de stand
arraySilver = standSilver();
arrayGold = standGold();
arrayPlatinium = standPlatinium();

module.exports = {
	initStands : initStands,
	arrayInteraction : arrayInteraction
};