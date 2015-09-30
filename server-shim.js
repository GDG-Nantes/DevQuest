var oauthshim = require('oauth-shim'),
        express = require('express'),
        credentials = require('./credentials.json') ;

var app = express();

app.all('/oauthproxy', oauthshim);

var creds = {
};

creds[credentials.TWITTER_CLIENT] = credentials.TWITTER_CLIENT_SECRET;
creds[credentials.GITHUB_CLIENT] = credentials.GITHUB_CLIENT_SECRET;


oauthshim.init(creds);


var server = app.listen(3000, function () { console.log('Server Up!'); });
