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

  // destruct user object to end to the client
  const  login_user = {
    id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    companyName: req.user.companyName,
    streetAddress: req.user.streetAddress,
    townCity: req.user.townCity,
    stateCountry: req.user.stateCountry,
    postcode: req.user.postcode,
    phone: req.user.phone,
    country: req.user.country,
    token: token,
  }

  // return messaage to the client
  res.send({
     successs: true,
     message: 'Welcome, feel free to play around.',
     user: login_user,
     })
}
exports.signUp = function(req, res, next) {

  // destruct values from req.body object
  const {
    firstName,
    lastName,
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

  //check if user provider firstname
  if(!firstName) {
    return res
      .status(422)
      .send({success: false, message: 'You must providde first name'})
  }

  //check if user provides lastname
  if(!lastName) {
    return res
      .status(422)
      .send({success: false, message: 'You must provide lastname'})
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
      firstName: firstName,
      lastName: lastName,
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
      const  new_user = {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        companyName: newUser.companyName,
        streetAddress: newUser.streetAddress,
        townCity: newUser.townCity,
        stateCountry: newUser.stateCountry,
        postcode: newUser.postcode,
        phone: newUser.phone,
        country: newUser.country,
        token: token,
      }

      bot.sendMessage('598666449',`New user just created: ${JSON.stringify(new_user)}.`)

      return res.json({
        success: true,
        message: "New user added!",
        user: new_user})
    })
  })
}
