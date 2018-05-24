const express = require('express')
const router = express.Router()

const Product = require('../models/product')

// middleware specific to this router
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

router.get('/', (req, res) => {
  Product.find()
  .exec()
  .then((product) => res.json(product))
  .catch((err) => next(err));
})

router.get('/:productId', (req, res) => {
  res.json({
    name: 'lenovo',
    description: "fixed json object",
  })
})
module.exports = router
