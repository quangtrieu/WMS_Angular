'use strict';
const uuid = require('uuid/v4');
const db = require('../entities');
const bcrypt = require('bcrypt-nodejs');

/**
 * Returns a user if it finds one, otherwise returns null if a user is not found.
 * @param   {String}   id - The unique id of the user to find
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.findById = function (id) {
  return db.Users.find({ where: { id: id }, attributes: ['id', 'userName'], raw: true });
}

/**
 * Returns a user if it finds one, otherwise returns null if a user is not found.
 * @param   {String}   username - The unique user name to find
 * @param   {Function} done     - The user if found, otherwise returns undefined
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.findByUsername = userName =>
  Promise.resolve(db.Users.find({ where: { userName: userName }, raw: true }));

exports.create = function (user, res) {
  //TODO: need validation user
  user.passwordSalt = uuid();
  var passwordNew = user.passwordSalt.concat(user.password);
  user.password = bcrypt.hashSync(passwordNew);
  user.passwords = user.password + ",";

  db.Users.build(user).save().then(function (result) {
    let response = { success: 1, message: "Add new user success!" };

    res.send(response);
  }).catch(function (e) {
    let message = "Add new user error!";
    if (e.errors) {
      message = [];
      e.errors.forEach(function (item) {
        message.push(item.message);
      });
    }
    let response = { success: 0, message: message };
    res.send(response);
  });
}