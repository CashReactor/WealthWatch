const mongoose = require('mongoose');
const database = require('../config');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const { recurringSchema } = require('./recurring.js');
const { oneTimeSchema } = require('./oneTime.js');

const Schema = mongoose.Schema;

// const googleUserSchema = new Schema({
//   googleId: String,
//   googleToken: String,
//   imageUrl: String,
//   recurring: [recurringSchema],
//   oneTime: [oneTimeSchema],
//   budget: Number,
//   name: String,
//   email: String
// });

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [{ isAsync: false, validator: isEmail, msg: 'Invalid Email Address' }],
    required: 'Please supply an email address',
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  budget: Number,
  currency: String,
  googleId: String,
  googleToken: String,
  recurring: [recurringSchema],
  oneTime: [oneTimeSchema],
  imageUrl: String,
  plaidAccessToken: String,
  plaidItemId: String,
});

userSchema.methods.comparePassword = function (password, callback) {
  console.log('Compare password:', this.password);
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) {
      return callback(error);
    }
    return callback(null, isMatch);
  });
};

// The second argument of pre can't be arrow function or else this will not be the user
userSchema.pre('save', function (next) {
  return bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) {
      return next(error);
    }
    this.password = hash;
    return next();
  });
});

module.exports.User = mongoose.model('User', userSchema);
