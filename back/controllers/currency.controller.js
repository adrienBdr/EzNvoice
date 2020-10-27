const db = require('../models');
const utils = require("../utils");

module.exports = {
  getCurrency: function (req, res, next) {
    db.Currency.findByPk(req.query.id).then(currency => {
      if (currency) {
        utils.resSuccess(res, currency);
      } else {
        utils.respond(res, 400, {message: 'Currency not found'});
      }
    }).catch(err => {
      utils.resDbError(res, err);
    })
  },

  getCurrenciesList: function (req, res, next) {
    db.Currency.findAll().then(currencies => {
      utils.resSuccess(res, currencies);
    }).catch(err => {
      utils.resDbError(res, err);
    })
  }
}