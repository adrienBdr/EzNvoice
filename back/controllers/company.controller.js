const db = require('../models');
const utils = require("../utils");

module.exports = {

  createCompany: async function(req, res, next) {
    const {
      name,
      image,
      email,
      address,
      phone
    } = req.body

    db.Company.create({
      name: name,
      image: image,
      email: email,
      address: address,
      phone: phone,
      user_id: req.user.id
    }).then(() => {
      utils.resSuccess(res, [], 'New company created');
    }).catch(err => {
      utils.resDbError(err);
    })
  },

  updateCompany: async function(req, res, next) {
    const companyDB = req.company;
    const {
      name,
      image,
      email,
      address,
      phone
    } = req.body;

    companyDB.name = name ? name : companyDB.name;
    companyDB.image = image ? image : companyDB.image;
    companyDB.email = email ? email : companyDB.email;
    companyDB.address = address ? address : companyDB.address;
    companyDB.phone = phone ? phone : companyDB.phone;

    companyDB.save().then(() => {
      return utils.resSuccess(res, [], "Company updated");
    }).catch(err => {
      utils.resDbError(err);
    });
  },

  deleteCompany: async function(req, res, next) {
    const companyDb = req.company;

    companyDb.destroy().then(() => {
      return utils.resSuccess(res, [], "Company deleted");
    }).catch(err => {
      utils.resDbError(err);
    })
  },

  getCompany: async function(req, res, next) {
    return utils.resSuccess(res, [req.company]);
  },

  getMyCompaniesList: async function(req, res, next) {
    await db.Company.findAll({
      attributes: ['id', 'name'],
      where: {user_id: req.user.id},
      offset: req.query.offset ? req.query.offset : 0,
      limit: req.query.limit
    }).then(list => {
      return utils.resSuccess(res, list);
    }).catch(err => {
      utils.resDbError(err);
    })
  },

}