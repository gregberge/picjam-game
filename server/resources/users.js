var Promise = require('bluebird');
var _ = require('lodash');
var io = require('../io');
var logger = require('../logger');
var users = {};

/**
 * Create a new user.
 *
 * @param {object} user
 * @returns {Promise}
 */

exports.create = function (user) {
  // If user already exists, error.
  if (users[user.id]) return Promise.reject(new Error('User already exist'));

  // Create user.
  user = users[user.id] = _.defaults(user, {
    username: 'user' + (_.size(users) + 1)
  });

  // Notify io.
  io.emit('users.create', user);

  // Log.
  logger.log('users.create', user);

  return Promise.resolve(user);
};

/**
 * Update a user.
 *
 * @param {string} id
 * @param {object} data
 * @returns {Promise}
 */

exports.update = function (id, data) {
  var user = users[id];

  // If user doesn't exist, error.
  if (!user) return Promise.reject(new Error('User not found'));

  // Update user.
  _.extend(user, data);

  // Notify io.
  io.emit('users.update', user);

  // Log.
  logger.log('users.update', user);

  return Promise.resolve(user);
};

/**
 * Delete a user.
 *
 * @param {string} id
 * @returns {Promise}
 */

exports.destroy = function (id) {
  var user = users[id];

  // If user doesn't exist, error.
  if (!user) return Promise.reject(new Error('User not found'));

  // Remove user.
  _.remove(users, user);

  // Notify io.
  io.emit('users.destroy', user);

  // Log.
  logger.log('users.destroy', user);

  return Promise.resolve();
};
