var passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

var User = require('../models/user')
var config = require('../config')

// Setup options for JwtStrategy
const JwtOptions = {
  secretOrKey: config.secret_word,
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
}

// Create Jwt Strategy
const Jwtlogin = new JwtStrategy(JwtOptions, function(jwt_payload, done){
  // check if the user with that payload exists
  User.findById(jwt_payload.sub, function(err, user){
    // if an error happened on server
    if(err) {
      return done(err, false)
      // if user exists cal done with user obj
    } else if(user) {
      return done(null, user)
      // if user dont exist call done without user obj
    } else {
      return done(null, false)
    }
  })
})

// Tell passport to use that strategy
passport.use(Jwtlogin)
