var _ = require('lodash');
var uuid = require('node-uuid');
var config = require('../config');

/**
 * Create a new question.
 */

var Question = module.exports = function (data) {
  _.defaults(this, data, {
    id: uuid.v4(),
    answers: [],
    answer: null,
    time: config.game.questionTime,
    winners: []
  });
};

/**
 * Valid the answer.
 *
 * @param {object} answer
 * @returns {boolean}
 */

Question.prototype.valid = function (answer, user) {
  var valid = _.contains(this.answers, answer.text);

  if (valid && !_.find(this.winners, user)) {
    this.winners.push(user);
  }

  return valid;
};

/**
 * JSON serialization.
 *
 * @returns {object}
 */

Question.prototype.toJSON = function () {
  return _.pick(this, 'id', 'answer', 'time', 'imageUrl');
};
