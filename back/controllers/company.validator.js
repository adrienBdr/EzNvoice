const validator = require('express-validator');
const utils = require('../utils');

module.exports = {
  create: [
    validator.body('name').exists().withMessage('name field is mandatory'),
    utils.validate,
  ],
}