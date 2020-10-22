const validator = require('express-validator');
const db = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

  respond: function(res, status, body) {
    res.status(status).json(body);
  },

  resSuccess: function (res, data, message = "success",  code = 200) {
    this.respond(res, code, {message: message, data: data});
  },

  validate: function(req, res, next) {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return this.respond(res, 422, {message: 'invalid parameters', errors: errors.array()});
    }
    next();

  },

  hashPassword: function (password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  },

  decryptToken: function (req, next) {
    let token = req.headers['authorization'];

    if (!token) {
      return next({status: false, message: 'permission not granted'}, null);
    }
    token = token.split(' ');
    if (token.length !== 2) {
      return next({status: false, message: 'invalid token format'}, null);
    }
    token = token[1];

    if (token) {
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return next({success: false, message: 'Failed to authenticate token.'}, null);
        } else {
          console.warn( JSON.stringify(decoded))
          db.User.findOne({where: {id: decoded.id}}).then(user => {
            if (user) {
              console.warn("user found")
              return next(null, user);
            } else {
              return next({success: false, message: 'invalid token'}, null);
            }
          }).catch(error => {
            console.warn(error)
          })
        }
      });

    } else {
      return next({
        success: false,
        message: 'No token provided.'
      }, null);

    }
  }
}
