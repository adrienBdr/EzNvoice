const validator = require('express-validator');
const utils = require('../utils');

module.exports = {
  create: [
    validator.body('name').exists(),
    validator.body('company_id').exists().isNumeric(),
    validator.body('currency_id').exists().isNumeric(),
    validator.body('price').exists().isDecimal(),
    utils.validate,
  ],
  list: [
    validator.query('limit').exists().isNumeric().withMessage('limit parameter is mandatory'),
    utils.validate,
  ]
}