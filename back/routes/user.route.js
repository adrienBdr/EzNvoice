const express = require('express');
const controller = require("../controllers/users.controller")
const validator = require("../controllers/users.validator")
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', validator.register, controller.createUser);

module.exports = router;
