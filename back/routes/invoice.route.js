const express = require('express');
const controller = require("../controllers/invoice.controller");
const validator = require("../controllers/invoice.validator");
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .all(auth.authenticate)
  .post(validator.create, controller.createInvoice)
  .delete(auth.authorizeInvoice, controller.deleteInvoice)
  .get(auth.authorizeInvoice, controller.getInvoice)

router.get('/listCompany', auth.authenticate, auth.authorizeCompany, validator.list , controller.getCompanyInvoicesList);

module.exports = router;