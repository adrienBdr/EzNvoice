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
      console.log(JSON.stringify(err));
      utils.respond(res, 400, err);
    })
  },

  updateCompany: async function(req, res, next) {
    const id = req.query.id;
  },

  deleteCompany: async function(req, res, next) {
    const id = req.query.id;
  },

  getCompany: async function(req, res, next) {
    const id = req.query.id;


  },

  getMyCompaniesList: async function(req, res, next) {

  },

}