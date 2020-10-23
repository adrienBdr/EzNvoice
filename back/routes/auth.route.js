const express = require('express');
const controller = require("../controllers/users.controller")
const validator = require("../controllers/users.validator")

const router = express.Router();

router.post('/register', validator.register, controller.createUser);
router.post('/login', validator.login, controller.loginUser);

module.exports = router;