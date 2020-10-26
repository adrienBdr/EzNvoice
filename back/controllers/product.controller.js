const db = require('../models');
const utils = require("../utils");

module.exports = {

  createProduct: async function(req, res, next) {
    const {
      name,
      options,
      price,
      currency_id,
      company_id
    } = req.body

    db.Product.create({
      name: name,
      options: options,
      price: price,
      currency_id: currency_id,
      company_id: company_id
    }).then(() => {
      utils.resSuccess(res, [], 'New product created');
    }).catch(err => {
      utils.resDbError(err);
    })
  },

  updateProduct: async function(req, res, next) {
    const productDB = req.product;
    const {
      name,
      options,
      price,
      currency_id,
      company_id
    } = req.body;

    productDB.name = name ? name : productDB.name;
    productDB.options = options ? options : productDB.options;
    productDB.price = price ? price : productDB.price;
    productDB.currency_id = currency_id ? currency_id : productDB.currency_id;
    productDB.company_id = company_id ? company_id : productDB.company_id;

    productDB.save().then(() => {
      return utils.resSuccess(res, [], "Product updated");
    }).catch(err => {
      utils.resDbError(err);
    });
  },

  deleteProduct: async function(req, res, next) {
    const productDB = req.product;

    productDB.destroy().then(() => {
      return utils.resSuccess(res, [], "Product deleted");
    }).catch(err => {
      utils.resDbError(err);
    })
  },

  getProduct: async function(req, res, next) {
    return utils.resSuccess(res, [req.product]);
  },

  getCompanyProductsList: async function(req, res, next) {
    await db.Product.findAll({
      attributes: ['id', 'name', 'price', 'currency_id'],
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