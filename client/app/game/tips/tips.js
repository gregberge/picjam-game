(function (angular) { 'use strict';

  /**
   * Advert directive.
   */

  angular.module('picjam.game.tips', ['primus'])
  .directive('pjTips', function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/app/game/tips/tips.html',
      controllerAs: 'tips',
      controller: function ($scope, primus) {
        $scope.gameStatus = 'stopped';

        primus.$on('game.start', function (obj) {
          console.log('obj.time', obj.time);
          $scope.countdown = obj.time;
          $scope.gameStatus = 'starting';
        });

        primus.$on('question.end', function (obj) {
          $scope.countdown = obj.time;
          $scope.gameStatus = 'questionEnd';
        });

        primus.$on('game.end', function (obj) {
          $scope.countdown = obj.time;
          $scope.gameStatus = 'ended';
        });

      }
    };
  });

}(window.angular));
