var express = require('express');
var router = express.Router();

var User = require('../models/user')

var authController = require('../controllers/authentication')

/* POST add user */
router.post('/signup', authController.signUp)

module.exports = router;
