const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  path: {
    type: String,
    default: 'pr/default.jpeg',
  },
  updated_at: {
    type: String,
    default: Date.now,
  }
});

module.exports = mongoose.model('Product', ProductSchema);
