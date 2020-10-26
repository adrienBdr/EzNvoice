const express = require('express');
const controller = require("../controllers/customer.controller");
const validator = require("../controllers/customer.validator");
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .all(auth.authenticate)
  .post(validator.create, controller.createCustomer)
  .put(auth.authorizeCustomer, controller.updateCustomer)
  .delete(auth.authorizeCustomer, controller.deleteCustomer)
  .get(auth.authorizeCustomer, controller.getCustomer)

router.get('/list', auth.authenticate, auth.authorizeCompany, validator.list ,controller.getCompanyCustomersList);

module.exports = router;