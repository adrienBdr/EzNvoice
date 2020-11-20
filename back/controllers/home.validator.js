const validator = require('express-validator');
const utils = require('../utils');

module.exports = {
    getAllInfo: [
        validator.body('user_id').exists().isNumeric(),
        utils.validate,
    ],
}
