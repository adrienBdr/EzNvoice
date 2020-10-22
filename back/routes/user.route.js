const express = require('express');
const controller = require("../controllers/users.controller")
const validator = require("../controllers/users.validator")
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth.authenticate, controller.getMe);

module.exports = router;
