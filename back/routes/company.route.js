const express = require('express');
const controller = require("../controllers/company.controller");
const validator = require("../controllers/company.validator");
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .all(auth.authenticate)
  .post(validator.create, controller.createCompany)
  .put(controller.updateCompany)
  .delete(controller.deleteCompany)
  .get(controller.getCompany)

module.exports = router;