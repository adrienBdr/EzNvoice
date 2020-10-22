const db = require('../models');
const jwt = require('jsonwebtoken');
const utils = require('../utils');
const config = require('../config/config.json');

module.exports = {
  createUser: async function(req, res, next) {
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
  },

  loginUser: async function(req, res, next) {
    const {
      email,
      password
    } = req.body

    await db.User.findOne({
      attributes: ['id', 'password'],
      where: {email: email}
    }).then(user => {
      if (!user) {
        utils.respond(res, 400, {message: "Incorrect email or password"});
      } else {
        utils.comparePassword(password, user.password).then(isMatch => {
          const token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400});
          utils.resSuccess(res, [{token: token}]);
        }).catch(err => {
          utils.respond(res, 400, {message: "Incorrect email or password"});
        })
      }
    }).catch(err => {
      utils.respond(res, 400, {message: err});
    })
  },

  getMe: async function(req, res, next) {
    const userDB = req.user;
    if (!userDB) {
      return res.status(400).json({message: 'User not found'});
    }

    db.User.findOne({
      attributes: ['id', 'firstName', 'lastName', 'email'],
      where: {id: userDB.id}
    }).then(user => {
      if (user) {
        utils.resSuccess(res, [user]);
      }
    });
  }
}