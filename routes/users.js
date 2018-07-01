var express = require('express');
var router = express.Router();

var passport = require('passport')
var passportService = require('../services/passport')

// var User = require('../models/user')

var authController = require('../controllers/authentication')

const requireAuthentication = passport.authenticate('jwt', {session: false})
const requireSignIn = passport.authenticate('local', { session: false })

// authenticate and signin user
router.post('/signin', requireSignIn, authController.signin)

// authenticate user and give access to a restricted route
router.get('/', requireAuthentication, authController.getAccess)

/* POST add user */
router.post('/signup', authController.signUp)

module.exports = router;
