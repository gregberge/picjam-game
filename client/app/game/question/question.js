(function (angular) { 'use strict';

  /**
   * Advert directive.
   */

  angular.module('picjam.game.question', [])
  .directive('pjQuestion', function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/app/game/question/question.html',
      controllerAs: 'question',
      controller: function () {

      }
    };
  });

}(window.angular));
