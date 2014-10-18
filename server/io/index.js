var Primus = require('primus');
var Emitter = require('primus-emitter');
var _ = require('lodash');
var primus;

/**
 * Attach server.
 *
 * @param {HttpServer} server
 */

exports.attach = function (server) {
  var users = require('../resources/users');

  // Create and expose primus instance.
  primus = new Primus(server);

  // Enable emitter on primus instance.
  primus.use('emitter', Emitter);

  // Connection handler.
  primus.on('connection', function connected(spark) {
    // Create user.
    users.create({id: spark.id});

    // Self-update of the user.
    spark.on('me.update', function (data) {
      users.update(spark.id, data);
    });

    // Chat.
    spark.on('chat', function (data) {
      primus.send('chat', _.extend(data, {userId: spark.id}));
    });
  });

  // Disconnection handler.
  primus.on('disconnection', function disconnected(spark) {
    // Destroy user.
    users.destroy(spark.id);
  });
};

// Expose primus methods.
['emit'].forEach(function (method) {
  exports[method] = function () {
    primus[method].apply(primus, arguments);
  };
});
