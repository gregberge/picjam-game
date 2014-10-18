'use strict';

/* Directives */

var appDirectives = angular.module('appDirectives', ['primus']);

appDirectives.directive('countDown', function($interval, $rootScope) {
	return {
	  restrict: 'E',
	  template: '<span class="count-down">{{time}}</span>',
	  scope: {
        start: '=',
        delay: '='
      },
      link: function(scope, elt, attrs){
      	console.log('satsr', scope.start);
      	scope.time = scope.start / 1000;
      	var delayInSeconds = scope.delay / 1000;

	  	var timer = $interval(countDown, scope.delay);

	  	function countDown(){
	  		scope.time = scope.time - delayInSeconds;

	  		if(scope.time <= 0){
	  			scope.time = 0;
	  			$interval.cancel(timer);
	  			scope.$parent.$parent.gameStarts = false;
	  		}
	  	}
	  },
      replace: true
	};
});

appDirectives.directive('interactive', function($interval, primus, $rootScope) {
	return {
	  restrict: 'E',
	  templateUrl: '/app/templates/interactive.html',
	  scope: true,
      link: function(scope, elt, attrs){
      	scope.gameStarts = false;

      	primus.$on('game.start', function (obj) {
			scope.countdown = obj.time;
			scope.gameStarts = true;
		});
      },
      replace: true
  };
});