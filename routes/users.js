var express = require('express');
var router = express.Router();

var passport = require('passport')
var passportService = require('../services/passport')

// var User = require('../models/user')

var authController = require('../controllers/authentication')

const requireAuthentication = passport.authenticate('jwt', {session: false})
/* POST add user */
router.get('/', requireAuthentication, function(req, res) {
  res.send('Hello, user!!')
})
router.post('/signup', authController.signUp)

module.exports = router;
