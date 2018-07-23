var express = require('express');
var router = express.Router();

var ordersController = require('../controllers/orders')

var passport = require('passport')
const requireAuthentication = passport.authenticate('jwt', {session: false})

// a middleware, that writes the datetime
router.use((req, res, next) => {
  console.log('orders route requested at:', Date.now());
  next();
})

router.all('*', requireAuthentication)
router.post('/', ordersController.addOrder)

module.exports = router
