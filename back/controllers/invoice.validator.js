const validator = require('express-validator');
const utils = require('../utils');

module.exports = {
  create: [
    validator.body('date').exists(),
    validator.body('date_due').exists(),
    validator.body('company_id').exists().isNumeric(),
    validator.body('customer_id').exists().isNumeric(),
    validator.body('currency_id').exists().isNumeric(),
    validator.body('total').exists().isDecimal(),
    validator.body('tax').exists().isDecimal(),
    utils.validate,
  ],
  list: [
    validator.query('limit').exists().isNumeric().withMessage('limit parameter is mandatory'),
    utils.validate,
  ]
}