const db = require('../models');
const utils = require('../utils');

module.exports = {
  createUser: function(req, res, next) {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    utils.hashPassword(password).then(hash => {
      db.User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash
      }).then(() => {
        utils.resSuccess(res, [], 'New user created');
      }).catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          utils.respond(res, 400, {message: 'Email already exist'})
        } else {
          utils.respond(res, 400, {message: err})
        }
      })
    }).catch(err => {
      utils.respond(res, 400, {message: err})
    })
  }
}