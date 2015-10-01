'use strict'
var Helper = require('../util/helper.js');

var _questions = [];

function exposeQuestions_(){
	return _questions;
}

function getQuestions(){
	var promise = new Promise(function promiseQuestions(resolve, reject){

		Helper.http("/api/v1/questions")
			.get()
			.then(function (data){
				_questions = JSON.parse(data).questions;
				resolve();
			})
			.catch(function(error){
				reject(error);
			});
	});

	return promise;

}

module.exports = {
	getQuestions : getQuestions,
	questions : exposeQuestions_
};