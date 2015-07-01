'use strict';
var CONST = require('./const.js');
var Model = require('./model.js');


// Gestion du sol on affiche aléatoirement le sol une seul fois
function initSol(){
	var sprites = ['00.1','01.1','41.2','41.4'];
	var array = [];
	for (var row = 0; row < CONST.SIZE_UNIT.h; row++){
		var arrayRow = [];
		for (var col =0; col < CONST.SIZE_UNIT.w; col++){
			arrayRow.push(sprites[Math.floor((Math.random() * sprites.length))]);
		}
		array.push(arrayRow);
	}
	return array;
}

// Ajout de l'herbe le long des murs
function initHerbe(){
	var array = [];
	for (var row = 0; row < CONST.SIZE_UNIT.h; row++){
		var arrayRow = [];
		for (var col =0; col < CONST.SIZE_UNIT.w; col++){
			// Première ligne
			if (row === 3){
				if (col === 1 
					|| col === 2
					|| col === CONST.SIZE_UNIT.w -2
					|| col === CONST.SIZE_UNIT.w -3){
					arrayRow.push('00.0');
				}else if (col > 0 && col < CONST.SIZE_UNIT.w -1){
					arrayRow.push('29.3');					
				}else{
					arrayRow.push('');
				}

			}else // Dernière ligne
				if (row === CONST.SIZE_UNIT.h -3){
					if (col === 1
						|| col === 2
						|| col === CONST.SIZE_UNIT.w -2
						|| col === CONST.SIZE_UNIT.w -3){
						arrayRow.push('00.0');
					}else if (col > 0 && col < CONST.SIZE_UNIT.w -1){
						arrayRow.push('28.3');					
					}else{
						arrayRow.push('');
					}
			}else // Colonne Gauche 
				if (col === 1 && row > 3 && row < CONST.SIZE_UNIT.h - 3){				
					arrayRow.push('26.3');					
			}else // Colonne Droite
				if (col === CONST.SIZE_UNIT.w -2  && row > 3 && row < CONST.SIZE_UNIT.h - 3){
					arrayRow.push('27.3');					
			}else{
				arrayRow.push('');
			}	
			
			
		}
		array.push(arrayRow);
	}
	return array;
}

// Ajout des murs
function initMurs(){
	var array = [];
	for (var row = 0; row < CONST.SIZE_UNIT.h; row++){
		var arrayRow = [];
		for (var col =0; col < CONST.SIZE_UNIT.w; col++){
			if (row > 0 && row < 3 && col > 0 && col < CONST.SIZE_UNIT.w - 1){
				arrayRow.push(row === 1 ? '04.1' : '05.1');		
				Model.ui.mapCollision[row][col] = true;
			}else{
				arrayRow.push('');		
			}
		}
		array.push(arrayRow);
	}
	return array;
}

// Ajout du contour
function initContour(){
	var array = [];
	for (var row = 0; row < CONST.SIZE_UNIT.h; row++){
		var arrayRow = [];
		for (var col =0; col < CONST.SIZE_UNIT.w; col++){
			// Première ligne
			if (row === 0){
				if (col === 0){
					arrayRow.push('24.4');
					Model.ui.mapCollision[row][col] = true;
				}else if (col === CONST.SIZE_UNIT.w -1){
					arrayRow.push('24.3');
					Model.ui.mapCollision[row][col] = true;
				}else{
					arrayRow.push('25.1');					
					Model.ui.mapCollision[row][col] = true;
				}

			}else // Dernière ligne
				if (row === CONST.SIZE_UNIT.h -1){
					if (col === 0){
						arrayRow.push('25.0');
						Model.ui.mapCollision[row][col] = true;
					}else if (col === CONST.SIZE_UNIT.w -1){
						arrayRow.push('25.2');
						Model.ui.mapCollision[row][col] = true;
					}else{
						arrayRow.push('25.1');					
						Model.ui.mapCollision[row][col] = true;
					}
			}else // Avant Dernière ligne
				if (row === CONST.SIZE_UNIT.h -2){
					if (col === 0){
						arrayRow.push(['24.2','23.0']);
						Model.ui.mapCollision[row][col] = true;
					}else if (col === CONST.SIZE_UNIT.w -1){
						arrayRow.push(['24.0','23.2']);
						Model.ui.mapCollision[row][col] = true;
					}else{
						arrayRow.push('23.1');					
						Model.ui.mapCollision[row][col] = true;
					}
			}else // Colonne Gauche 
				if (col === 0){				
					arrayRow.push('24.2');					
					Model.ui.mapCollision[row][col] = true;
			}else // Colonne Droite
				if (col === CONST.SIZE_UNIT.w -1){
					arrayRow.push('24.0');					
					Model.ui.mapCollision[row][col] = true;
			}else{
				arrayRow.push('');
			}	
			
			
		}
		array.push(arrayRow);
	}
	return array;
}

// Ajout des entrées sorties
function initSorties(){
	var array = [];
	var deltaHeightSortie = 15;
	var deltaWidthSortie = 6;
	for (var row = 0; row < CONST.SIZE_UNIT.h; row++){
		var arrayRow = [];
		for (var col =0; col < CONST.SIZE_UNIT.w; col++){
			// Ouverture gauche & droite
			// Toit haut
			if (row === CONST.SIZE_UNIT.h - deltaHeightSortie){
				if (col === 0){
					arrayRow.push('25.2');
					Model.ui.mapCollision[row][col] = true;
				}else if (col === CONST.SIZE_UNIT.w - 1){
					arrayRow.push('25.0');
					Model.ui.mapCollision[row][col] = true;
				}else{
					arrayRow.push('');					
				}

			}else  // Mur
				if (row === CONST.SIZE_UNIT.h - (deltaHeightSortie-1)){
					if (col === 0
						|| col === CONST.SIZE_UNIT.w - 1){
						arrayRow.push('04.6');
					Model.ui.mapCollision[row][col] = true;
					}else{
						arrayRow.push('');					
					}

			}else if (row === CONST.SIZE_UNIT.h - (deltaHeightSortie-2)){
				if (col === 0
					|| col === CONST.SIZE_UNIT.w - 1){
					arrayRow.push('05.6');
				Model.ui.mapCollision[row][col] = true;
				}else if (col === 1){
					arrayRow.push('29.6');
					Model.ui.mapCollision[row][col] = false;
				}else if (col === CONST.SIZE_UNIT.w - 2){
					arrayRow.push('29.7');
					Model.ui.mapCollision[row][col] = false;
				}else{
					arrayRow.push('');					
				}

			}else // Chemin
				if (row === CONST.SIZE_UNIT.h - (deltaHeightSortie-3)
					|| row === CONST.SIZE_UNIT.h - (deltaHeightSortie-4)
					|| row === CONST.SIZE_UNIT.h - (deltaHeightSortie-5)
					|| row === CONST.SIZE_UNIT.h - (deltaHeightSortie-6)
					|| row === CONST.SIZE_UNIT.h - (deltaHeightSortie-7)){
					if (col === 0
						|| col === 1
						|| col === CONST.SIZE_UNIT.w - 1
						|| col === CONST.SIZE_UNIT.w - 2){
						arrayRow.push('00.1');
					Model.ui.mapCollision[row][col] = false;
					}else{
						arrayRow.push('');					
					}

			}else // Toit bas
				if (row === CONST.SIZE_UNIT.h - (deltaHeightSortie-8)){
					if (col === 0){
						arrayRow.push(['00.1','23.2']);
						Model.ui.mapCollision[row][col] = true;
					}else if (col === CONST.SIZE_UNIT.w -1){
						arrayRow.push(['00.1','23.0']);
						Model.ui.mapCollision[row][col] = true;
					}else if (col === 1						
						|| col === CONST.SIZE_UNIT.w - 2){
						arrayRow.push('00.1');					
						Model.ui.mapCollision[row][col] = false;
					}else{
						arrayRow.push('');					
					}
			}else // Toit bas herbe
				if (row === CONST.SIZE_UNIT.h - (deltaHeightSortie-9)){
					if (col === 1){
						arrayRow.push('29.4');
						Model.ui.mapCollision[row][col] = false;
					}else if (col === CONST.SIZE_UNIT.w - 2){
						arrayRow.push('29.5');					
						Model.ui.mapCollision[row][col] = false;
					}else{
						arrayRow.push('');					
					}
			}else // Sortie en bas
				if (row === CONST.SIZE_UNIT.h -3){
					if (col === deltaWidthSortie){
						arrayRow.push('29.4');
						Model.ui.mapCollision[row][col] = false;
					}else if (col === deltaWidthSortie + 1 
						|| col === deltaWidthSortie + 2
						|| col === deltaWidthSortie + 3
						|| col === deltaWidthSortie + 4
						|| col === deltaWidthSortie + 5){
						arrayRow.push('00.1');
						Model.ui.mapCollision[row][col] = false;
					}else if (col === deltaWidthSortie + 6){
						arrayRow.push('29.5');
						Model.ui.mapCollision[row][col] = false;
					}else{
						arrayRow.push('');					
					}
			}else if (row === CONST.SIZE_UNIT.h -2){
					if (col === deltaWidthSortie){
						arrayRow.push(['26.3','23.2']);
						Model.ui.mapCollision[row][col] = true;
					}else if (col === deltaWidthSortie + 1 
						|| col === deltaWidthSortie + 2
						|| col === deltaWidthSortie + 3
						|| col === deltaWidthSortie + 4
						|| col === deltaWidthSortie + 5){
						arrayRow.push('00.1');
						Model.ui.mapCollision[row][col] = false;
					}else if (col === deltaWidthSortie + 6){
						arrayRow.push(['27.3','23.0']);
						Model.ui.mapCollision[row][col] = true;
					}else{
						arrayRow.push('');					
					}
			}else if (row === CONST.SIZE_UNIT.h -1){
					if (col === deltaWidthSortie){
						arrayRow.push('24.2');
						Model.ui.mapCollision[row][col] = true;
					}else if (col === deltaWidthSortie + 1 
						|| col === deltaWidthSortie + 2
						|| col === deltaWidthSortie + 3
						|| col === deltaWidthSortie + 4
						|| col === deltaWidthSortie + 5){
						arrayRow.push('00.1');
						Model.ui.mapCollision[row][col] = false;
					}else if (col === deltaWidthSortie + 6){
						arrayRow.push('24.0');
						Model.ui.mapCollision[row][col] = true;
					}else{
						arrayRow.push('');					
					}
			}else{
				arrayRow.push('');
			}	
			
			
		}
		array.push(arrayRow);
	}
	return array;
}


module.exports = {
	initSol : initSol,
	initSorties : initSorties,
	initContour : initContour,
	initMurs : initMurs,
	initHerbe : initHerbe,
};