const express = require('express');
const controller = require("../controllers/product.controller");
const validator = require("../controllers/product.validator");
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .all(auth.authenticate)
  .post(validator.create, controller.createProduct)
  .put(auth.authorizeProduct, controller.updateProduct)
  .delete(auth.authorizeProduct, controller.deleteProduct)
  .get(auth.authorizeProduct, controller.getProduct)

router.get('/list', auth.authenticate, auth.authorizeCompany, validator.list , controller.getCompanyProductsList);

module.exports = router;