const validator = require('express-validator');
const utils = require('../utils');

module.exports = {
  create: [
    validator.body('name').exists(),
    validator.body('company_id').exists(),
    utils.validate,
  ],
  list: [
    validator.query('limit').exists().isNumeric().withMessage('limit parameter is mandatory'),
    validator.query('id').exists().withMessage('id parameter is mandatory'),
    utils.validate,
  ]
}