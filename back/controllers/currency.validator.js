const validator = require('express-validator');
const utils = require('../utils');

module.exports = {
  get: [
    validator.query('id').exists(),
    utils.validate,
  ],
}