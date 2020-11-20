const express = require('express');
const controller = require("../controllers/home.controller");
const validator = require("../controllers/home.validator");
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/')
    .all(auth.authenticate)
    .get(validator.getAllInfo, controller.getAllInfo)

module.exports = router;
