'use strict'

var Credentials = require('../model/credentials.js')

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

	
	document.getElementById('googleBtn').addEventListener('click', function socialGoogle(){
		hello('github').login('github', {}, function(auth){
			console.log('Logged');
			console.log('try to reach /me for : %s',auth.network);
			console.log(auth);
			hello(auth.network).api('/me').then(function(r) {
				console.info(r);
		});
		});
	}, false);
}

module.exports = {
	initSocialsLogins : initSocialsLogins
}