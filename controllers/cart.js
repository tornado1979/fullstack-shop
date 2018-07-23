var Cart = require('../models/cart')
// car bot = require('../services/bot')

exports.clear = function(req, res, next ) {
  // delete products from cart
  Cart.deleteMany({ clientId: '5b4a3539392c2e0abc48eb43' },
    function (err) {
      if(err) {
        return res
        .json({
          message: err.message,
          success: false,
      })
      } else {
        // we need clientId
        return res.send({
          message: 'clear cart',
          success: true,
        })
      }
  });
}
