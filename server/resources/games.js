var Promise = require('bluebird');
var _ = require('lodash');
var uuid = require('node-uuid');
var logger = require('../logger');
var config = require('../config');
var io = require('../io');
var games = {};

/**
 * Find a game room.
 *
 * @param {string} id
 * @returns {Promise}
 */

exports.find = function (id) {
  var game = games[id];
  if (!game) return Promise.reject(new Error('Game not found'));
  return Promise.resolve(game);
};

/**
 * Add user to a game.
 *
 * @param {object} user
 *
 * @returns {Promise}
 */

exports.addUser = function (user) {
  // Get avalaible game.
  var game = getAvailableGame();

  // Add user in the game.
  game.users.push(user);

  // Join the io game.
  io.join([user.id], game.id);

  logger.log('Add user "%s" to game "%s"', user.id, game.id);

  return Promise.resolve(game);
};

/**
 * Return a game avalaible.
 *
 * @returns {object}
 */

function getAvailableGame() {
  var game = _.find(games, function (game) {
    return game.users.length < config.userPerRoom;
  });

  // If there is no game, create one.
  if (!game) {
    logger.log('No available game, will create one');
    return create();
  }

  return game;
}

/**
 * Create a new game.
 *
 * @returns {object}
 */

function create() {
  // Create game.
  var game = {
    id: uuid.v4(),
    users: []
  };

  // Add game to the game list.
  games[game.id] = game;

  logger.log('Create a new game', game);

  return game;
}
