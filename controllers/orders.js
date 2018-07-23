var Order = require('../models/orders')
var bot = require('../services/bot')

exports.addOrder = function(req, res, next) {
    // save order to the database
    Order.create({
      clientId: req.user.id,
      totalPrice: 0,
      discount: 0,
      products: req.body
    },
    function(error, newOrder) {

    // send new order as notification to the user
    bot.sendMessage('598666449',`New order has just submited: ${JSON.stringify(newOrder)}.`)

    return res
    .json({
      success: true,
      message: "New order submited",
      order: newOrder,
    })
  })

  }
