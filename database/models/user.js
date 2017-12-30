const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const md5 = require('md5');
const database = require('../config');
const isEmail = require('validator/lib/isEmail');
const { recurringSchema } = require('./recurring.js');
const { oneTimeSchema } = require('./oneTime.js');

const { Schema } = mongoose;

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
  banks: Array,
});

userSchema.virtual('gravatar').get(function () {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200&d=https://www.sideshowtoy.com/photo_903079_thumb.jpg`;
});

userSchema.methods.comparePassword = function (password, callback) {
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
