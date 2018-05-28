const express = require('express')
const router = express.Router()

const Product = require('../models/product')

// middleware specific to this router
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId, (err, post) => {
    if(err) return next(err)
    res.json(post)
  })
  
})

// Get all products
router.get('/', (req, res) => {
  Product.find()
  .exec()
  .then((product) => res.json(product))
  .catch((err) => next(err));
})

// Add new product
router.post('/add', (req, res) => {
  Product.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
})

module.exports = router
