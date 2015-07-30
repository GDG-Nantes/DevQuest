var oauthshim = require('oauth-shim'),
        express = require('express'),
        credentials = require('./src/js/model/credentials') ;

var app = express();

app.all('/oauthproxy', oauthshim);

var creds = {
	'139abc4e310f8adaf6bb' : '505849b65b3d971e54730401082f437eba810037'
}
//creds[credentials.TWITTER_CLIENT] = credentials.TWITTER_CLIENT_SECRET;
//creds[credentials.GITHUB_CLIENT] = credentials.GITHUB_CLIENT_SECRET;


oauthshim.init(creds);


var server = app.listen(3000, function () { console.log('Server Up!'); });
