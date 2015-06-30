'use strict';

var widthSilver = 5
	,widthGold = 7
	, widthPlatinium = 9;


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
					arrayRow.push('23.4');

				}
			}else if (row === 6){
				if (col === 0){					
					arrayRow.push('09.4');
				}else if (col === widthSilver - 1){					
					arrayRow.push('09.5');
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
				}else if (col === widthGold - 1){
					arrayRow.push('26.6');
				}else{
					arrayRow.push('26.5');
				}
			}else if (row === 4){
				if (col === 2){					
					arrayRow.push('40.6');
				}else if (col === 0){
					arrayRow.push('27.4');
				}else if (col === widthGold - 1){
					arrayRow.push('27.6');
				}else{
					arrayRow.push('27.5');
				}
			}else if (row === 5){
				if (col === 2){					
					arrayRow.push('41.6');
				}else if (col === 0){
					arrayRow.push('28.4');
				}else if (col === widthGold - 1){
					arrayRow.push('28.6');
				}else{
					arrayRow.push('28.5');
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
					arrayRow.push('10.0');
				}else if (col === widthGold - 1){					
					arrayRow.push('10.2');
				}else{
					arrayRow.push('10.1');

				}
			}else if (row === 8){
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

module.exports = {
	
};