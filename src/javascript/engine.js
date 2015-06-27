'use strict';
var Model = require('./model');
var UI = require('./ui.js');


// API

function run(){
	try{
		UI.paint();
		window.requestAnimationFrame(run);
	}catch(err){
		console.error("Error  : %s \n %s",err.message, err.stack);			
	}
}

module.exports = {
	run : run
};
