const db = require('../models');
const utils = require("../utils");

module.exports = {

  createCustomer: async function(req, res, next) {
    const {
      name,
      email,
      address,
      phone,
      company_id
    } = req.body

    db.Customer.create({
      name: name,
      email: email,
      address: address,
      phone: phone,
      company_id: company_id
    }).then(() => {
      utils.resSuccess(res, [], 'New customer created');
    }).catch(err => {
      utils.resDbError(err);
    })
  },

  updateCustomer: async function(req, res, next) {
    const customerDB = req.customer;
    const {
      name,
      email,
      address,
      phone
    } = req.body;

    customerDB.name = name ? name : customerDB.name;
    customerDB.email = email ? email : customerDB.email;
    customerDB.address = address ? address : customerDB.address;
    customerDB.phone = phone ? phone : customerDB.phone;

    customerDB.save().then(() => {
      return utils.resSuccess(res, [], "Customer updated");
    }).catch(err => {
      utils.resDbError(err);
    });
  },

  deleteCustomer: async function(req, res, next) {
    const customerDB = req.customer;

    customerDB.destroy().then(() => {
      return utils.resSuccess(res, [], "Customer deleted");
    }).catch(err => {
      utils.resDbError(err);
    })
  },

  getCustomer: async function(req, res, next) {
    return utils.resSuccess(res, [req.customer]);
  },

  getCompanyCustomersList: async function(req, res, next) {
    await db.Customer.findAll({
      attributes: ['id', 'name'],
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