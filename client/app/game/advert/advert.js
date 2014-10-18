(function (angular) { 'use strict';

  /**
   * Advert directive.
   */

  angular.module('picjam.game.advert', [])
  .directive('pjAdvert', function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/app/game/advert/advert.html',
      controllerAs: 'advert',
      controller: function () {

      }
    };
  });

}(window.angular));
