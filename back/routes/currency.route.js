const express = require('express');
const controller = require("../controllers/currency.controller")
const validator = require("../controllers/currency.validator")
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .all(auth.authenticate)
  .get(validator.get, controller.getCurrency)

router.get('/list', auth.authenticate, controller.getCurrenciesList);

module.exports = router;