(function (angular, _) { 'use strict';

  /**
   * Chat directive.
   */

  angular.module('picjam.game.chat', ['primus'])
  .directive('pjChat', function () {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: '/app/game/chat/chat.html',
      link: function (scope, element) {
        scope.$watchCollection('messages', function () {
          var messages = element.find('ul')[0];
          messages.scrollTop = messages.scrollHeight;
        });
      },
      controllerAs: 'chat',
      controller: function ($scope, primus) {
        $scope.messages = [];

        primus.$on('game.join', function (obj) {
          $scope.messages.push({text: obj.user.username + ' joined game', type: 'info'});
        });

        primus.$on('game.leave', function (obj) {
          var user = _.find(obj.game.users, {id: obj.user.id});
          $scope.messages.push({text: user.username + ' left game', type: 'info'});
        });

        primus.$on('chat', function (obj) {
          var message = _.extend({me: obj.user.id === $scope.game.me.id, playing: false}, obj);
          $scope.messages.push(message);
        });

        primus.$on('question.answer', function(obj){
          var message = _.extend({me: obj.user.id === $scope.game.me.id, playing: true}, obj);
          $scope.messages.push(message);
        });

        primus.$on('question.winner', function(obj){
          var message = _.extend({me: obj.user.id === $scope.game.me.id, win: true}, obj);
          $scope.messages.push(message);
        });

        primus.$on('question.answer.ack', function(obj){
          var text = obj.valid ? 'Correct ! Bazinga !!!' : 'Nope, try again !';
          $scope.messages.push({text: text, type: 'info'});
        });

        this.submit = function () {
          if($scope.game && $scope.game.me){
           if($scope.game.currentQuestion){
              primus.send('question.answer', {text: $scope.text});
              var message = _.extend({me: $scope.game.me.me, playing: true, text: $scope.text});
              $scope.messages.push(message);
             }else{
              primus.send('chat', {text: $scope.text});
             }

            $scope.text = '';
          }
        };
      }
    };
  });

}(window.angular, window._));
