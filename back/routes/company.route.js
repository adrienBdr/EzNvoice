const express = require('express');
const controller = require("../controllers/company.controller");
const validator = require("../controllers/company.validator");
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .all(auth.authenticate)
  .post(validator.create, controller.createCompany)
  .put(auth.authorizeCompany, controller.updateCompany)
  .delete(auth.authorizeCompany, controller.deleteCompany)
  .get(auth.authorizeCompany, controller.getCompany)

router.get('/list', auth.authenticate, validator.list ,controller.getMyCompaniesList);

module.exports = router;