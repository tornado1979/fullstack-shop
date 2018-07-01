var jwt = require('jsonwebtoken');
var config = require('../config')

var User = require('../models/user')

function createUserWebToken(user){
  const timestamp = Date.now() // or new Date().getTime()
  const token = jwt.sign({sub: user.id, iat: timestamp}, config.secret_word)
  return token
}

exports.getAccess = function(req, res) {
  res.send({success: true, message: 'access granted.'})
}

exports.signin = function(req, res, next) {
  // create jwt user token
  const token = createUserWebToken(req.user)
  res.json({ 'token': token })
}
exports.signUp = function(req, res, next) {

  // get email & password from request
  const email = req.body.email
  const password = req.body.password

  // if no data sent from the user
  if(!email || !password) {
    return res
    .status(422)
    .send({success: false, message: 'You must provide email and password.'})
  }

  // lookfor if email exists alredy in the db
  User.findOne({email: email}, function(err, existUser) {
    if(err) {
      return next(error)
    }

    // if user exists, return message
    if(existUser) {
      return res
      .status(422)
      .send({success: false, message: 'This email already exists!'})
    }

    User.create({
      email: email,
      password: password},
      function(error, newUser) {

        const token = createUserWebToken(newUser)

        return res.json({success: true, message: "New user added", token: token})
    })
  })
}
