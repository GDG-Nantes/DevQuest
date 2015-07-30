'use strict'
var CONST = require('../model/const.js');
var Credentials = require('../model/credentials.js')


// API


function login(type){
	var network = '';
	switch (type){
		case CONST.BTN_G_PLUS :
		network = 'google';
		break;
		case CONST.BTN_TWITTER :
		network = 'twitter';
		break;
		case CONST.BTN_GITHUB :
		network = 'github';
		break;
		case CONST.BTN_CUSTO :
		// TODO 
		return;
	}
	hello(network).login(network, {}, function(auth){
		console.log('Logged');
		console.log('try to reach /me for : %s',auth.network);
		console.log(auth);
		hello(auth.network).api('/me').then(function(r) {
			// TODO 
			console.info(r);
	});
}

function initSocialsLogins(){


	var creds = {
		google : Credentials.GOOGLE_CLIENT,
		twitter : Credentials.TWITTER_CLIENT,
		github : Credentials.GITHUB_CLIENT
	};
	var config = {
		redirect_uri : 'redirect.html',
		scope:'email'
	} 
	if(window.location.hostname === "localhost"
		|| window.location.hostname === "127.0.0.1"){
		config.oauth_proxy = 'http://localhost:3000/oauthproxy'
	}

	hello.init(creds, config); 

	
}

module.exports = {
	initSocialsLogins : initSocialsLogins,
	login : login
}