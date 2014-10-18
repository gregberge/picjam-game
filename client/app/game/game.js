(function (angular, _) { 'use strict';

  /**
   * Game controller.
   */

  angular.module('picjam.game', [
    'picjam.game.leaderboard',
    'picjam.game.countdown',
    'picjam.game.advert',
    'picjam.game.chat',
    'picjam.game.question'
  ])
  .controller('GameCtrl', function (primus, User) {
    var game = this;

    // Id.
    game.id = null;

    // Me.
    game.me = null;

    // Users.
    game.users = null;

    // Status.
    game.status = 'waiting';

    // Timer.
    game.timer = null;

    // Initialize game.
    primus.$on('game.join', function (msg) {
      // Set game id.
      game.id = msg.game.id;

      // Initialize users.
      game.users = game.users || _.map(msg.game.users, function (user) {
        return new User(user);
      });

      var user = new User(msg.user);

      // Set me to true.
      if (msg.me) user.me = true;

      // Add user if it doesn't already exist.
      if (!_.find(game.users, {id: msg.user.id}))
        game.users.push(user);
    });

    // Remove leaving user.
    primus.$on('game.leave', function (msg) {
      // If game is in "waiting" mode, remove the user.
      if (game.status === 'waiting')
        _.remove(game.users, {id: msg.user.id});

      // Set user offline.
      var user = _.find(game.users, {id: msg.user.id});

      // If user is not found, ignore it.
      if (!user) return;

      // Update user.
      user.online = false;
    });

    // Start game.
    primus.$on('game.start', function (msg) {
      // Set status to started.
      game.status = 'started';

      // Update timer.
      game.timer = msg.time;
    });

    // End the game.
    primus.$on('game.end', function () {
      // Set status to finished.
      game.status = 'finished';
    });

    // primus.$on('users.create', function (user) {
    //   console.log('create', user);
    // });
    //
    // primus.$on('users.destroy', function (user) {
    //   console.log('destroy', user);
    // });
    //
    // primus.$on('users.update', function (user) {
    //   console.log('update', user);
    // });
    //
    // primus.$on('chat', function (obj) {
    //   console.log('chat', obj);
    //   $scope.messages.push(obj);
    // });
    //
    // primus.$on('game.join', function (obj) {
    //   console.log('game.join', obj);
    //   $scope.messages.push({text: obj.user.username + ' joined game', type: 'info'});
    // });
    //
    // primus.$on('game.leave', function (obj) {
    //   console.log('game.leave', obj);
    //   var user = _.find(obj.game.users, {id: obj.user.id});
    //   $scope.messages.push({text: user.username + ' left game', type: 'info'});
    // });
    //
    // primus.$on('game.start', function (obj) {
    //   console.log('game.start', obj);
    //   $scope.countdown = obj.time;
    //   $scope.tip = 'Game will start in '+ $scope.countdown + 'seconds';
    // });
    //
    // primus.$on('game.end', function (obj) {
    //   console.log('game.end', obj);
    // });
    //
    // primus.$on('question.start', function (obj) {
    //   console.log('question.start', obj);
    // });
    //
    // primus.$on('question.end', function (obj) {
    //   console.log('question.end', obj);
    // });
    //
    // primus.$on('question.answer.ack', function (obj) {
    //   console.log('question.answer.ack', obj);
    // });
    //
    // primus.$on('question.winner', function (obj) {
    //   console.log('question.winner', obj);
    // });
    //
    // this.submit = function () {
    //   //primus.send('question.answer', {text: this.answer});
    //   //this.answer = '';
    //   primus.send('chat', {text: $scope.text});
    //   $scope.text = '';
    // };
  });

}(window.angular, window._));
