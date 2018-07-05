const express = require('express');
const router = express.Router();

var passport = require('passport')
const requireAuthentication = passport.authenticate('jwt', {session: false})


/*import cart schema */
const Cart = require('../models/cart')

/* GET cart items. */
function callback(req, res, next) {
  Cart.find()
  .exec()
  .then((cart) => res.json(cart))
  .catch((err) => next(err));
}

// implement 'requireAuthentication' on all '/cart' paths
router.all('*', requireAuthentication)

router.get('/', requireAuthentication, callback)

router.get('/history', (req,res, next) => {
  res.send('user cart history')
})
/* POST add item to cart*/
router.post('/add', (req,res,next) => {
  Cart.create(req.body, function (err, post) {
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
