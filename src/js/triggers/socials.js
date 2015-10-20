'use strict'
var CONST = require('../model/const.js');
var Model = require('../model/model.js');
var Credentials = require('../model/credentials.js')


// API


function login(type){
	var network = '';
	switch (type){
		case CONST.uiElements.BTN_G_PLUS :
		network = 'google';
		break;
		case CONST.uiElements.BTN_TWITTER :
		network = 'twitter';
		break;
		case CONST.uiElements.BTN_GITHUB :
		network = 'github';
		break;
		case CONST.uiElements.BTN_CUSTO :
		// TODO 
		return;
	}
	if (CONST.DEBUG){
		console.debug('try to log %s',network);
	}
	hello(network).login(network, {}, function(auth){
		if (CONST.DEBUG){			
			console.debug('Logged !try to reach /me for : %s',auth.network);
			console.debug(auth);
		}
		hello(auth.network).api('/me').then(function(r) {
			Model.gameModel.user = r;
			switch(network){
				case 'google':
					Model.gameModel.typeSocial = CONST.uiElements.BTN_G_PLUS;
					Model.gameModel.userHash = ""+r.email.hashCode();
				break;
				case 'twitter':
					Model.gameModel.typeSocial = CONST.uiElements.BTN_TWITTER;
					Model.gameModel.userHash = ""+r.screen_name.hashCode();
				break;
				case 'github':
					Model.gameModel.typeSocial = CONST.uiElements.BTN_GITHUB;
					Model.gameModel.userHash = ""+r.login.hashCode();
				break;
			}
			Model.ui.changeScreen = CONST.screens.CHOOSE_USER;
			if (CONST.DEBUG){
				console.debug(r);
			}
		});
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