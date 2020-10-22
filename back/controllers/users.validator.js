const validator = require('express-validator');
const utils = require('../utils');

module.exports = {
  register: [
    validator.body('email').exists().isEmail().withMessage('email required'),
    validator.body('firstName').exists().withMessage('firstname required'),
    validator.body('lastName').exists().withMessage('lastname required'),
    validator.body('password').exists().isLength({min: 4}),
    utils.validate,
  ],
  login: [
    validator.body('email').exists().isEmail().withMessage('email required'),
    validator.body('password').exists().withMessage('password required'),
    utils.validate,
  ]
}