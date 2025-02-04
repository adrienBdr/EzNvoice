const AWS = require('aws-sdk');
const db = require('../models');
const jwt = require('jsonwebtoken');
const utils = require('../utils');
const config = require('../config/config.json');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  createUser: async function(req, res, next) {
    const {
      image,
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    utils.hashPassword(password).then(hash => {
      db.User.create({
        image: image || '',
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
          utils.resDbError(err);
        }
      })
    }).catch(err => {
      utils.resDbError(err);
    })
  },

  loginUser: async function(req, res, next) {
    const {
      email,
      password
    } = req.body

    db.User.findOne({
      attributes: ['id', 'password'],
      where: {email: email}
    }).then(user => {
      if (!user) {
        utils.respond(res, 400, {message: "Incorrect email or password"});
      } else {
        utils.comparePassword(password, user.password).then(isMatch => {
          if (isMatch) {
            const token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400});
            return utils.resSuccess(res, [{token: token}]);
          } else {
            return utils.respond(res, 400, {message: "Incorrect email or password"});
          }
        }).catch(err => {
          utils.resDbError(err);
        })
      }
    }).catch(err => {
      return utils.respond(res, 400, {message: err});
    })
  },

  getMe: async function(req, res, next) {
    const userDB = req.user;

    db.User.findOne({
      attributes: ['id', 'image', 'firstName', 'lastName', 'email'],
      where: {id: userDB.id}
    }).then(user => {
      if (user) {
        return utils.resSuccess(res, [user]);
      }
    }).catch(err => {
      return utils.respond(res, 400, err)
    });
  },

  getUser: async function(req, res, next) {
    if (req.query.id) {
      db.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        where: {id: req.query.id}
      }).then(user => {
        if (user) {
          return utils.resSuccess(res, [user]);
        } else {
          return utils.respond(res, 400, 'User not found.')
        }
      }).catch(err => {
        return utils.respond(res, 400, err)
      });
    } else {
      next();
    }
  },

  updateUser: async function(req, res, next) {
    const userDB = req.user;
    const {
      firstName,
      lastName,
      email,
      password,
      image,
    } = req.body;

    userDB.firstName = firstName ? firstName : userDB.firstName;
    userDB.lastName = lastName ? lastName : userDB.lastName;
    userDB.email = email ? email : userDB.email;

    if (image) {
      const s3 = new AWS.S3({apiVersion: '2006-03-01'});
      const key = `user-${uuidv4()}.png`;

      try {
        const buf = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""),'base64');
      await s3.putObject({
        ACL: 'public-read',
        Bucket: 'ez-invoice-bucket',
        Key: key,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg',
        Body: buf
      }).promise();
      } catch (e) {
        return utils.respond(res, 400, {message: 'Failed to upload image'});
      }
      userDB.image = key;
    }

    userDB.password = password ?
      await utils.hashPassword(password)
        .then(hash => {return hash})
        .catch(() => {return userDB.password}) :
      userDB.password;

    userDB.save().then(() => {
      return utils.resSuccess(res, [], "User updated");
    }).catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return utils.respond(res, 400, {message: 'Email already exist'});
      } else {
        utils.resDbError(err);
      }
    });
  },

  deleteUser: async function(req, res, next) {
    const userDB = req.user;

    userDB.destroy().then(() => {
      return utils.resSuccess(res, [], "User deleted");
    }).catch(err => {
      utils.resDbError(err);
    })
  }
}
