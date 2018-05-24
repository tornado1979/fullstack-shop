const express = require('express')
const router = express.Router()

const Store = require('../models/store')

// middleware specific to this router
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

router.get('/', (req, res) => {
  Store.find()
  .exec()
  .then((store) => res.json(store))
  .catch((err) => next(err));
})


module.exports = router
