const express = require('express');
const controller = require("../controllers/users.controller")
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .all(auth.authenticate)
  .put(controller.updateUser)
  .delete(controller.deleteUser)
  .get(controller.getUser, controller.getMe)

module.exports = router;
