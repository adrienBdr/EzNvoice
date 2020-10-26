const validator = require('express-validator');
const db = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

  respond: function(res, status, body) {
    return res.status(status).json(body);
  },

  resSuccess: function (res, data, message = "success",  code = 200) {
    return module.exports.respond(res, code, {message: message, data: data});
  },

  resDbError: function (res, err) {
    console.log(JSON.stringify(err));
    return module.exports.respond(res, 400, {message: 'Database error'});
  },

  validate: function(req, res, next) {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return module.exports.respond(res, 422, {message: 'invalid parameters', errors: errors.array()});
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

  comparePassword: function (plain, hashed) {
    return new Promise(((resolve, reject) => {
      bcrypt.compare(plain, hashed, function (err, match) {
        if (err) {
          reject(err)
        } else {
          resolve(match)
        }
      })
    }))
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
          db.User.findOne({where: {id: decoded.id}}).then(user => {
            if (user) {
              return next(null, user);
            } else {
              return next({success: false, message: 'invalid token'}, null);
            }
          }).catch(error => {
            console.log(JSON.stringify(error));
            return next({success: false, message: 'User not found'}, null);
          })
        }
      });

    } else {
      return next({
        success: false,
        message: 'No token provided.'
      }, null);

    }
  },

  getCompany: function(req, next) {
    if (req.query.id) {
      db.Company.findOne({where: {id: req.query.id}}).then(company => {
        if (company) {
          return next(null, company);
        } else {
          return next({success: false, message: 'Company not found'}, null);
        }
      }).catch(err => {
        module.exports.resDbError(err);
      })
    } else {
      return next({success: false, message: 'Company id is mandatory'}, null);
    }
  },

  getCustomer: function (req, next) {
    if (req.query.id) {
      db.Customer.findByPk(req.query.id).then(customer => {
        if (customer) {
          db.Company.findByPk(customer.company_id).then(company => {
            return next(null, customer, company);
          }).catch(() => {
            return next({success: false, message: 'Customer\'s company not found'}, null, null);
          })
        } else {
          return next({success: false, message: 'Customer not found'}, null, null);
        }
      }).catch(err => {
        module.exports.resDbError(err);
      })
    } else {
      return next({success: false, message: 'Customer id is mandatory'}, null, null);
    }
  }
}
