(function (angular) { 'use strict';

  /**
   * Countdown.
   */

  angular.module('picjam.game.countdown', [])
  .directive('pjCountdown', function () {
    return {
      restrict: 'E',
      templateUrl: '/app/game/countdown/countdown.html',
      scope: {
        timer: '='
      },
      controller: function ($scope, $interval) {
        $scope.$watch('timer', function init() {
          $scope.time = Math.round($scope.timer / 1000);
        });

        $interval(function () {
          if ($scope.time)
            $scope.time--;
        }, 1000);
      }
    };
  });

}(window.angular));
