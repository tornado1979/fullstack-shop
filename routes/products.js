const express = require('express')
const router = express.Router()

// middleware specific to this router
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

router.get('/', (req, res) => {
  res.json([
    {name:'lenovo', price: 100},
    {name:'ibm', price: 120}
  ])
})
module.exports = router
