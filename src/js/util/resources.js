'use strict';
var Model = require('../model/model.js');

function Resources() {
	this.images = [];
}

function loadSprite(sprite) {

	var p = new Promise(function(resolve, reject) {
		var image = new Image();
		image.src = sprite.url;
		image.onload = function() {
			Model.resources.images[sprite.title] = image;
			resolve(sprite);
		}.bind(this);
		image.onerror = function() {
			reject(sprite);
		};
	}.bind(this));

	return p;
};

function loadSprites(spriteList) {

	var promises = [];
	spriteList.forEach(function(element) {
		promises.push(loadSprite(element));
	}.bind(this));
	return Promise.all(promises);
};

module.exports = {
	loadSprites : loadSprites
};
