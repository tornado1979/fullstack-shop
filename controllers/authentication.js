var jwt = require('jsonwebtoken');
var config = require('../config')

// import bot here
const bot = require('../services/bot');

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
  // send notification
  bot.sendMessage('598666449', `User ${req.user.email} just loged in.`);
  // create jwt user token
  const token = createUserWebToken(req.user)
  // return messaage to the client
  res.json({
     'token': token,
     email: req.user.email,
     successs: true,
     message: 'Welcome, feel free to play around.'
     })
}
exports.signUp = function(req, res, next) {

  // destruct values from req.body object
  const {
    companyName,
    streetAddress,
    townCity,
    stateCountry,
    postcode,
    phone,
    email,
    country,
    password,
  } = req.body

  // if no data sent from the user
  if(!email || !password) {
    return res
    .status(422)
    .send({success: false, message: 'You must provide email and password.'})
  }

  // check if user provides required data
  if(!companyName) {
    return res
    .status(422)
    .send({success: false, message: 'You must provide company Name.'})
  }
  if(!streetAddress) {
    return res
    .status(422)
    .send({success: false, message: 'You must provide street address.'})
  }
  if(!townCity) {
    return res
    .status(422)
    .send({success: false, message: 'You must provide Town/City.'})
  }
  if(!stateCountry) {
    return res
    .status(422)
    .send({success: false, message: 'You must provide State/Country.'})
  }
  if(!postcode) {
    return res
    .status(422)
    .send({success: false, message: 'You must provide Postcode/ZIP.'})
  }
  if(!phone) {
    return res
    .status(422)
    .send({success: false, message: 'You must provide contact Phone.'})
  }
  if(!country) {
    return res
    .status(422)
    .send({success: false, message: 'You must provide Country.'})
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
      password: password,
      companyName: companyName,
      streetAddress: streetAddress,
      townCity: townCity,
      stateCountry: stateCountry,
      postcode: postcode,
      phone: phone,
      country: country,
    },
      function(error, newUser) {

        const token = createUserWebToken(newUser)
        // send notification
        bot.sendMessage('598666449',`New user just created: ${newUser.email}.`)

        return res.json({success: true, message: "New user added!", token: token})
    })
  })
}
