'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('RootCtrl', function(primus) {
	primus.id(function (id) {
		console.log('ID', id);
	});

	primus.$on('users.create', function (user) {
		console.log('create', user);
	});

	primus.$on('users.destroy', function (user) {
		console.log('destroy', user);
	});

	primus.$on('users.update', function (user) {
		console.log('update', user);
	});

	primus.$on('chat', function (obj) {
		console.log('chat', obj);
	});

	primus.$on('game.join', function (obj) {
		console.log('game.join', obj);
	});

	primus.$on('game.leave', function (obj) {
		console.log('game.leave', obj);
	});

	primus.$on('game.start', function (obj) {
		console.log('game.start', obj);
	});

	primus.$on('game.end', function (obj) {
		console.log('game.end', obj);
	});

	primus.$on('question.start', function (obj) {
		console.log('question.start', obj);
	});

	primus.$on('question.end', function (obj) {
		console.log('question.end', obj);
	});

	primus.$on('question.answer.ack', function (obj) {
		console.log('question.answer.ack', obj);
	});

	primus.$on('question.winner', function (obj) {
		console.log('question.winner', obj);
	});

	this.submit = function () {
		primus.send('question.answer', {text: this.answer});
		this.answer = '';
	};
});
