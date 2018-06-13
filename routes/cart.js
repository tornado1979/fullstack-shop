const express = require('express');
const router = express.Router();

/*import cart schema */
const Cart = require('../models/cart')

/* GET cart items. */
router.get('/', (req, res, next) => {
  Cart.find()
  .exec()
  .then((cart) => res.json(cart))
  .catch((err) => next(err));
})

/* POST add item to cart*/
router.post('/add', (req,res,next) => {
  Cart.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST remove item from cart */
router.post('/remove/:productId', (req, res, next) => {
  const productId = req.params.productId;
  Cart.deleteOne({_id: productId}, (err, post) => {
    if(err) {
      return next(err)
    }
    res.json(post)
  })

})
module.exports = router;
