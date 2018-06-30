var jwt = require('jsonwebtoken');
var config = require('../config')

var _ = require('lodash')
var User = require('../models/user')

exports.getUsers = function(req,res,next) {
  res.send('auth success')
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

        const token = jwt.sign(newUser.id, config.secret_word)

        return res.json({success: true, message: "New user added", token: token})
    })
  })
}
