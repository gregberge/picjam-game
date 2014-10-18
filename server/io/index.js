var Primus = require('primus');
var Emitter = require('primus-emitter');
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

  primus.on('connection', function connected(spark) {
    users.create({id: spark.id});
  });

  primus.on('disconnection', function disconnected(spark) {
    users.destroy(spark.id);
  });
};

// Expose primus methods.
['emit'].forEach(function (method) {
  exports[method] = function () {
    primus[method].apply(primus, arguments);
  };
});
