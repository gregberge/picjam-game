(function (angular, _) { 'use strict';

  /**
   * Chat directive.
   */

  angular.module('picjam.game.chat', ['primus'])
  .directive('pjChat', function ($timeout) {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: '/app/game/chat/chat.html',
      link: function (scope, element) {
        scope.$watchCollection('messages', function () {
          $timeout(function () {
            var messages = element.find('ul')[0];
            messages.scrollTop = messages.scrollHeight;
          });
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
          var message = _.extend({
            type: obj.user.id === $scope.game.me.id ? 'chat-me' : 'chat'
          }, obj);
          $scope.messages.push(message);
        });

        primus.$on('question.start', function(obj){
          var message = _.extend({
            text: 'Question number #' + obj.number,
            type: 'question'
          });
          $scope.messages.push(message);
        });

        primus.$on('question.winner', function(obj){
          var message = _.extend({
            type: obj.user.id === $scope.game.me.id ? 'win-me' : 'win'
          }, obj);
          $scope.messages.push(message);
        });

        primus.$on('question.answer.ack', function(obj){
          var text = obj.valid ? 'Correct ! Bazinga !!!' : 'Nope, try again !';
          $scope.messages.push({
            text: text,
            type: 'info'
          });
        });

        this.submit = function () {
          if (!$scope.text) return ;
          
          if($scope.game && $scope.game.me){
           if ($scope.game.currentQuestion){
              primus.send('question.answer', {text: $scope.text});
              var message = _.extend({
                text: $scope.text,
                type: 'answer'
              });
              $scope.messages.push(message);
             } else{
              primus.send('chat', {text: $scope.text});
             }

            $scope.text = '';
          }
        };
      }
    };
  });

}(window.angular, window._));
