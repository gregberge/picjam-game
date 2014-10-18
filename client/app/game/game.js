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

    // Current question.
    game.currentQuestion = null;

    // Previous question.
    game.previousQuestion = null;

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
      game.timer = msg.time - 1000;
    });

    // End the game.
    primus.$on('game.end', function () {
      // Set status to finished.
      game.status = 'finished';
    });

    // Set current question.
    primus.$on('question.start', function (msg) {
      game.previousQuestion = null;
      game.currentQuestion = msg;

      game.timer = msg.time - 1000;
    });

    // Remove current question.
    primus.$on('question.end', function (msg) {
      game.previousQuestion = msg.question;
      game.currentQuestion = null;
      game.timer = msg.time - 1000;
    });

    // Set up winner.
    primus.$on('question.winner', function (obj) {
      console.log(obj);
    });
  });

}(window.angular, window._));
