'use strict';
var CONST = require('../model/const.js');
var Model = require('../model/model.js');

var widthSilver = 7
	,widthGold = 9
	, widthPlatinium = 11
	, arraySilver = []
	, arrayGold = []
	, arrayPlatinium = []
	, screenSilver = null
	, screenGold = null
	, screenPlatinium = null;


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
				if (col === 0){ // Début & fin
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthSilver - 1){
					arrayRow.push(['inside_2','05.4']);
				}else if (col === 1){ // début & fin pièce
					arrayRow.push(['inside_1','13.3', '08.1', '00.4']);
				}else if (col === widthSilver - 2){
					arrayRow.push(['inside_1','13.3','08.1', '00.3']);
				}else {
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
		for (var col = 0; col < widthGold; col++){
			if (row === 0 ){
				if (col === 0){
					arrayRow.push(['inside_2','04.2']);
				}else if (col === widthGold -1){
					arrayRow.push(['inside_2','04.4']);
				}else{
					arrayRow.push(['inside_2','04.3']);
				}
			}else if (row === 1){
				if (col === 1){
					arrayRow.push(['inside_2','03.3']);
				}else if (col === widthGold - 2){
					arrayRow.push(['inside_2','03.4']);
				}else if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthGold - 1){
					arrayRow.push(['inside_2','05.4']);
				}else{
					arrayRow.push(['inside_2','03.5']);
				}
			}else if (row === 2){
				if (col === 4){
					arrayRow.push(['inside_2','00.0','12.3']);
				}else if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthGold - 1){
					arrayRow.push(['inside_2','05.4']);
				}else if (col === 1){
					arrayRow.push(['inside_2','02.3']);
				}else if (col === widthGold - 2){
					arrayRow.push(['inside_2','02.4']);
				}else{
					arrayRow.push(['inside_2','00.0']);
				}
			}else if (row === 3){
				if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthGold - 1){
					arrayRow.push(['inside_2','05.4']);
				}else if (col === 1){
					arrayRow.push(['inside_2','02.1']);
				}else if (col === widthGold - 2){
					arrayRow.push(['inside_2','02.2']);
				}else{
					arrayRow.push(['inside_2','00.2']);
				}
			}else if (row === 4
				|| row === 5
				|| row === 6){
				if (col === 0){
					arrayRow.push(['inside_2','00.0','05.2']);
				}else if (col === widthGold - 1){
					arrayRow.push(['inside_2','00.0','05.4']);
				}else if (col === 1 && row === 4){	// Caisses
					arrayRow.push(['inside_1','00.0','02.2']);
				}else if (col === 2 && row === 4){
					arrayRow.push(['inside_1','00.0','02.3']);
				}else if (col === 1 && row === 5){
					arrayRow.push(['inside_1','00.0','03.2']);
				}else if (col === 2 && row === 5){
					arrayRow.push(['inside_1','00.0','03.3']);
				}else if (col === 6 && row === 5){	// Table
					arrayRow.push(['inside_1','00.0','09.1']);
				}else if (col === 6 && row === 6){
					arrayRow.push(['inside_1','00.0','10.1']);
				}else if (col === 4 && row === 6){ // Porte
					arrayRow.push(['inside_1','00.0','08.1']);
				}else{
					arrayRow.push(['inside_1','00.0']);

				}
			}else if (row === 7){
				if (col === 0){
					arrayRow.push(['inside_2','06.2']);
				}else if (col === widthGold -1){
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
		for (var col = 0; col < widthPlatinium; col++){
			if (row === 0 ){
				if (col === 0){
					arrayRow.push(['inside_2','04.2']);
				}else if (col === widthPlatinium -1){
					arrayRow.push(['inside_2','04.4']);
				}else{
					arrayRow.push(['inside_2','04.3']);
				}
			}else if (row === 1){
				if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthPlatinium - 1){
					arrayRow.push(['inside_2','05.4']);
				}else if (col === 1){// Début & fin pièce
					arrayRow.push(['inside_1','10.6']);
				}else if (col === widthPlatinium - 2){
					arrayRow.push(['inside_1','11.7']);
				}else if (col === 2){ // Cheminée
					arrayRow.push(['inside_1','01.6']);
				}else if (col === 3
					|| col === 7 ){ // Colonnes
					arrayRow.push(['inside_1','10.5']);
				}else{
					arrayRow.push(['inside_1','01.3']);
				}
			}else if (row === 2){
				if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthPlatinium - 1){
					arrayRow.push(['inside_2','05.4']);
				}else if (col === 8){ // Cadre Photo
					arrayRow.push(['inside_1','00.7','13.6']);
				}else if (col === 1){// Début & fin pièce
					arrayRow.push(['inside_1','11.6']);
				}else if (col === widthPlatinium - 2){
					arrayRow.push(['inside_1','12.7']);
				}else if (col === 2){ // Cheminée
					arrayRow.push(['inside_1','02.6']);
				}else if (col === 3
					|| col === 7 ){ // Colonnes
					arrayRow.push(['inside_1','11.5']);
				}else { // Le reste
					arrayRow.push(['inside_1','00.7']);
				}
			}else if (row === 3){
				if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthPlatinium - 1){
					arrayRow.push(['inside_2','05.4']);
				}else if (col === 1){// Début & fin pièce
					arrayRow.push(['inside_1','12.6', '03.4']);
				}else if (col === widthPlatinium - 2){
					arrayRow.push(['inside_1','13.7']);
				}else if (col === 2){ // Cheminée
					arrayRow.push(['inside_1','03.4','02.6']);
				}else if (col === 3){
					arrayRow.push(['inside_1','12.5','03.6']);
				}else if (col === 7 ){ // Colonnes
					arrayRow.push(['inside_1','12.5']);
				}else { // Le reste
					arrayRow.push(['inside_1','11.0']);
				}
			}else if (row === 4
				|| row === 5
				|| row === 6){
				if (col === 0){
					arrayRow.push(['inside_2','05.2']);
				}else if (col === widthPlatinium - 1){
					arrayRow.push(['inside_2','05.4']);
				}else if (col === 1 && row === 4){ // Cheminée
					arrayRow.push(['inside_1','00.0','04.4']);
				}else if (col === 2 && row === 4){ // Cheminée
					arrayRow.push(['inside_1','00.0','04.5']);
				}else if (col === 3 && row === 4){ // Cheminée
					arrayRow.push(['inside_1','00.0','04.6']);
				}else if (col === 5 && row === 6){ // Porte
					arrayRow.push(['inside_1','00.0','08.1']);
				}else{
					arrayRow.push(['inside_1','00.0']);

				}
			}else if (row === 7){
				if (col === 0){
					arrayRow.push(['inside_2','06.2']);
				}else if (col === widthPlatinium -1){
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
	for (var row = 0; row < CONST.ui.SIZE_UNIT.h; row++){
		var arrayRow = [];
		for (var col =0; col < CONST.ui.SIZE_UNIT.w; col++){
			arrayRow.push(['inside_2', '00.1']);
		}
		array.push(arrayRow);
	}
	return array;
}

// Fonction qui positionne un stand  en fonction d'un point de départ
// La map complète est générée afin de placer correctement le stand
function placeStand(type, map, rowIndex){
	var standArray = type === CONST.common.STAND_SILVER ? arraySilver :
				(type === CONST.common.STAND_GOLD ? arrayGold : arrayPlatinium);
	var widthStand = type === CONST.common.STAND_SILVER ? widthSilver :
				(type === CONST.common.STAND_GOLD ? widthGold : widthPlatinium);
	var heightStand = 8;
	//var rowIndex = Math.max(0, Math.floor((Model.ui.screenSize.height - heightStand) / 2));
	var colIndex = Math.max(0, Math.floor((Model.ui.screenSize.width - widthStand) / 2));
	if (CONST.debug){
		console.debug("R:%s, C:%s",rowIndex, colIndex);
	}
	for (var row = 0; row < CONST.ui.SIZE_UNIT.h; row++){
		for (var col =0; col < CONST.ui.SIZE_UNIT.w; col++){
			// Si on trouve notre place, alors, on positionne un stand à cette place
			if (row === rowIndex && col === colIndex){
				for (var rowStand = 0; rowStand < standArray.length; rowStand++){
					for (var colStand = 0; colStand < standArray[0].length; colStand++){
						map[row+rowStand][col+colStand] = standArray[rowStand][colStand];
						// On doit aussi mettre à jour la map de collision
					}
				}
				return map;
			}
		}
	}
	return map;
}

// Initialisation des variables de stand
arraySilver = standSilver();
arrayGold = standGold();
arrayPlatinium = standPlatinium();


//////////////////////////////////
//////API
/////////////////////////////////

function showSilverStand(rowIndex){
	if (!screenSilver){
		screenSilver = placeStand(CONST.common.STAND_SILVER, initMap(), rowIndex);
	}
	return screenSilver;
}

function showGoldStand(rowIndex){
	if (!screenGold){
		screenGold = placeStand(CONST.common.STAND_GOLD, initMap(), rowIndex);
	}
	return screenGold;
}

function showPlatiniumStand(rowIndex){
	if (!screenPlatinium){
		screenPlatinium = placeStand(CONST.common.STAND_PLATINIUM, initMap(), rowIndex);
	}
	return screenPlatinium;
}


module.exports = {
	showSilverStand : showSilverStand,
	showGoldStand : showGoldStand,
	showPlatiniumStand : showPlatiniumStand
};
