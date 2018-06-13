var mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  quantity: {
    type: Number,
    default: 1,
  },
  updated_at: {
    type: String,
    default: Date.now,
  },
});

cartSchema.post('find', (docs) => {
  console.log('this fired after you run find query')
});

module.exports = mongoose.model('Cart', cartSchema);