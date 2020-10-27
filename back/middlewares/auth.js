const utils = require('../utils');

module.exports = {
  authenticate: function (req, res, next) {
    utils.decryptToken(req, (err, user) => {
      if (err) {
        return utils.respond(res, 401, err);
      } else {
        req.user = user;
        next();
      }
    });
  },

  authorizeCompany: function (req, res, next) {
    utils.getCompany(req, (err, company) => {
      if (err) {
        return utils.respond(res, 401, err);
      } else {
        if (company.user_id === req.user.id) {
          req.company = company;
          next();
        } else {
          return utils.respond(res, 401, {success: false, message: 'Company doesn\'t belong to this user'});
        }
      }
    });
  },

  authorizeCustomer: function (req, res, next) {
    utils.getCustomer(req, (err, customer, company) => {
      if (err) {
        return utils.respond(res, 401, err);
      } else {
        if (customer.company_id === company.id && company.user_id === req.user.id) {
          req.customer = customer;
          next();
        } else {
          return utils.respond(res, 401, {success: false, message: 'Customer doesn\'t belong to a user\'s Company'});
        }
      }
    })
  },

  authorizeProduct: function (req, res, next) {
    utils.getProduct(req, (err, product, company) => {
      if (err) {
        return utils.respond(res, 401, err);
      } else {
        if (product.company_id === company.id && company.user_id === req.user.id) {
          req.product = product;
          next();
        } else {
          return utils.respond(res, 401, {success: false, message: 'Product doesn\'t belong to a user\'s Company'});
        }
      }
    })
  },

  authorizeInvoice: function (req, res, next) {
    utils.getInvoice(req, (err, invoice, company) => {
      if (err) {
        return utils.respond(res, 401, err);
      } else {
        if (invoice.company_id === company.id && company.user_id === req.user.id) {
          req.invoice = invoice;
          next();
        } else {
          return utils.respond(res, 401, {success: false, message: 'Invoice doesn\'t belong to a user\'s Company'});
        }
      }
    })
  },
};
