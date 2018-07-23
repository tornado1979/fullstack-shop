const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  clientId: {
    type: String,
    default: '',
  },
  updated_at: {
    type: String,
    default: Date.now()
  },
  totalPrice: {
    type: Boolean,
    default: 0
  },
  discount: {
    type: Boolean,
    default: 0,
  },
  products: [
    {
      productId: {
        type: String,
        default: '',
      },
      quantity: {
        type: Boolean,
        default: 0,
      },
    }
  ]
})

module.exports = mongoose.model('Order', orderSchema)
