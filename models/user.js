var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    defaultValue: '',
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    defaultValue: '',
  },
  firstName: {
    type: String,
    defaultValue: '',
  },
  lastName: {
    type: String,
    defaultValue: '',
  },
  updated_at: {
    type: String,
    defaultValue: new Date()
  },
});

userSchema.post('find', (docs) => {
  console.log('this fired after run find query')
});

// Before save user to DB
userSchema.pre('save', function(next){
  const user = this
  // genSalt(rounds, minor, cb)
  const rounds = 10;

  // generate salt
  bcrypt.genSalt(rounds, function(error, salt) {
    if(error) {
      return next(error);
    }

    // hash (decrypt) the plain password
    bcrypt.hash(user.password, salt, null, function(error, hash) {
      if(error) {
        return next(error)
      }

      //save hash to the password field
      user.password = hash
    })

    // continue to the save process
    next();

  })

})

// compare db password with the login password
userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err){
      return callback(err)
    } else {
      return callback(null, isMatch)
    }
  })
}

module.exports = mongoose.model('User', userSchema);
