const db = require('../models');
const utils = require("../utils");

module.exports = {

  createInvoice: async function(req, res, next) {
    const {
      date,
      date_due,
      company_id,
      customer_id,
      total,
      tax,
      currency_id
    } = req.body

    db.Invoice.create({
      date: utils.euToJsDate(date),
      date_due: utils.euToJsDate(date_due),
      company_id: company_id,
      customer_id: customer_id,
      total: total,
      tax: tax,
      currency_id: currency_id,
      file: ''
    }).then(() => {
      utils.resSuccess(res, [], 'New Invoice created');
    }).catch(err => {
      utils.resDbError(err);
    })
  },

  deleteInvoice: async function(req, res, next) {
    const invoiceDb = req.invoice;

    invoiceDb.destroy().then(() => {
      return utils.resSuccess(res, [], "Invoice deleted");
    }).catch(err => {
      utils.resDbError(err);
    })
  },

  getInvoice: async function(req, res, next) {
    return utils.resSuccess(res, [req.invoice]);
  },

  getCompanyInvoicesList: async function(req, res, next) {
    await db.Invoice.findAll({
      where: {company_id: req.company.id},
      offset: req.query.offset ? req.query.offset : 0,
      limit: req.query.limit
    }).then(list => {
      return utils.resSuccess(res, list);
    }).catch(err => {
      utils.resDbError(err);
    })
  },

}