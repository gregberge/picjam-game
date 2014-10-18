(function (angular) { 'use strict';

  /**
   * Chat directive.
   */

  angular.module('picjam.game.chat', [])
  .directive('pjChat', function () {
    return {
      restrict: 'E',
      scope: {
        users: '='
      },
      templateUrl: '/app/game/chat/chat.html',
      controllerAs: 'chat',
      controller: function () {

      }
    };
  });

}(window.angular));
