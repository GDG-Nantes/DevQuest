'use strict';
var Model = require('./model');

// Méthodes internes
function paint() {
	
	// Affichage des décors
	paintBackground();		

}

function paintBackground(){
	
}


// API

function run(){
	try{

		window.requestAnimationFrame(run);
	}catch(err){
		console.error("Error  : %s \n %s",err.message, err.stack);			
	}
}

module.exports = {
	run : run
};
