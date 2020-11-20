const AWS = require('aws-sdk');
const db = require('../models');
const utils = require("../utils");
const { v4: uuidv4 } = require('uuid');

module.exports = {

  createInvoice: async function(req, res, next) {
    const {
      date,
      date_due,
      company_id,
      customer_id,
      total,
      tax,
      currency_id,
      file,
    } = req.body

    const s3 = new AWS.S3({apiVersion: '2006-03-01'});
    const key = `invoice-${uuidv4()}.png`;

    const buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64');
    s3.putObject({
      ACL: 'public-read',
      Bucket: 'ez-invoice-bucket',
      Key: key,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      Body: buf
    }, (err, data) => {
    if (err) {
      return utils.resDbError(err);
    }

      db.Invoice.create({
        date: utils.euToJsDate(date),
        date_due: utils.euToJsDate(date_due),
        company_id: company_id,
        customer_id: customer_id,
        total: total,
        tax: tax,
        currency_id: currency_id,
        file: key
      }).then(() => {
        return utils.resSuccess(res, "GG");
      }).catch(err => {
        return utils.resDbError(res, err);
      })
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
