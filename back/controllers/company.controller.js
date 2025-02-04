const AWS = require('aws-sdk');
const db = require('../models');
const utils = require("../utils");
const { v4: uuidv4 } = require('uuid');

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
      companyDB.email = email ? email : companyDB.email;
      companyDB.address = address ? address : companyDB.address;
      companyDB.phone = phone ? phone : companyDB.phone;

      if (image) {
          const s3 = new AWS.S3({apiVersion: '2006-03-01'});
          const key = `company-${uuidv4()}.png`;

          const buf = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');

          await s3.putObject({
              ACL: 'public-read',
              Bucket: 'ez-invoice-bucket',
              ContentEncoding: 'base64',
              ContentType: 'image/jpeg',
              Key: key,
              Body: buf
          }, (err, data) => {

              companyDB.image = key;

              companyDB.save().then(() => {
                  return utils.resSuccess(res, [], "Company updated");
              }).catch(err => {
                  return utils.resDbError(err);
              });
          })
      }
      companyDB.save().then(() => {
          return utils.resSuccess(res, [], "Company updated");
      }).catch(err => {
          return utils.resDbError(err);
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
      attributes: ['id', 'name', 'image'],
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
