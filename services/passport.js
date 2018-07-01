var passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

var User = require('../models/user')
var config = require('../config')

// import passport-local for signing in
var LocalStrategy = require('passport-local')


// create localStrategy object
const options = {usernameField: 'email'}
var localLogin = new LocalStrategy(options, function(email, password, done){
  User.findOne({ email: email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // verify password
    user.comparePassword(password, function(err, isMatch){
      if(err) {
        return done(err)
      } else if(!isMatch){
        return done(null, false)
      }

      // saves user on the req object.
      // so we can get it on  exports.signin() function and create the user token
      return done(null, user);
    })
  });
})

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

// Tell passport to use this strategy for authenticate restricted routes
passport.use(Jwtlogin)

// Tell passport to use this strategy for the user login process
passport.use(localLogin)
