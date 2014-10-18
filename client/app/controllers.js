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

	this.chat = function () {
		primus.send('chat', {text: 'ok'});
	};

	primus.$on('chat', function (obj) {
		console.log('chat', obj);
	});

	primus.$on('game.join', function (obj) {
		console.log('game.join', obj);
	});

	primus.$on('game.leave', function (obj) {
		console.log('game.leave', obj);
	});
});
