const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart')

var passport = require('passport')
const requireAuthentication = passport.authenticate('jwt', {session: false})


/*import cart schema */
const Cart = require('../models/cart')

/* GET cart items. */
function callback(req, res, next) {
  Cart.find()
  .exec()
  .then((cart) => {
    const cartIsArray = Array.isArray(cart)
    let message = 'cart is loaded' // cart should be array, if its not array, something is wrong!

    if (cartIsArray && cart.length == 0) {
      message = `Your cart is empty.`
    } else {
      message= `There ${cart.length > 1 ? `are` : `is`} ${cart.length} item${cart.length > 1 ? `s` : ``} in your cart`
    }

    res.json({
    items: cart,
    success: true,
    message: message // grab message from above.
  })})
  .catch((err) => next(err));
}

// implement 'requireAuthentication' on all '/cart' paths
router.all('*', requireAuthentication)

router.get('/', requireAuthentication, callback)

router.post('/clear', requireAuthentication, controller.clear)

router.get('/history', (req,res, next) => {
  res.send('user cart history')
})

/* POST add item to cart*/
router.post('/add', (req,res,next) => {
  // add clientId on the product object
  var userId = req.user._id
  var cartProduct = { ...req.body, clientId: userId }

  Cart.create(cartProduct, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST remove item from cart */
router.post('/remove/', (req, res, next) => {
  const cartId = req.body.cartId;
  Cart.deleteOne({_id: cartId}, (err, post) => {
    if(err) {
      return next(err)
    }
    res.json(post)
  })
})

/* POST update item on cart */
router.post('/update/', (req, res, next) => {
  // Get _id & quantity from the item we want to update
  const _id = req.body._id;
  const quantity = req.body.quantity

  // Find cartItem
  Cart.findById(_id, function(err, cartItem) {
    if (err) return handleError(err);

    cartItem.set({quantity})
    cartItem.save(function(err, updateCartItem) {
      if (err) return handleError(err);

      res.send(updateCartItem);
    })
  })
})

module.exports = router;
