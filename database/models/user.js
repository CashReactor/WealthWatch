const mongoose = require('mongoose');
const database = require('../config');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const { recurringSchema } = require('./recurring.js');
const { oneTimeSchema } = require('./oneTime.js')

// const recurringSchema = new mongoose.Schema({
//   expense: {
//     type: String,
//     unique: true
//   },
//   amount: Number,
//   period: String,
//   category: String,
//   startDate: Date
// });
// expense: Hulu, amount: 12, period: monthly/daily/weekly cat: Entertainment

// const oneTimeSchema = new mongoose.Schema({
//   expense: String,
//   amount: Number,
//   date: Date,
//   category: String
// });

const userSchema = new mongoose.Schema({
  //user has email, name, password, budget, and recurring/onetime as arrays of expense models
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [{ isAsync: false, validator: isEmail, msg: 'Invalid Email Address' }],
    required: 'Please supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  password: {
    type: String,
    required: 'Please supply a password'
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  budget: Number,
  googleId: String,
  googleToken: String,
  recurring: [recurringSchema],
  oneTime: [oneTimeSchema],
  imageUrl: String
});

userSchema.methods.comparePassword = function (password, callback) {
  console.log('Compare password:', this.password);
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) {
      return callback(error);
    }
    callback(null, isMatch);
  });
};

//The second argument of pre can't be arrow function or else this will not be the user
userSchema.pre('save', function(next) {
  return bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) {
      return next(error);
    }
    this.password = hash;
    next();
  });
});

module.exports.User = mongoose.model('User', userSchema);
// module.exports.One = mongoose.model('One', oneTimeSchema);
// module.exports.Rec = mongoose.model('Rec', recurringSchema);
