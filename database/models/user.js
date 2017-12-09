const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const recurringSchema = new mongoose.Schema({
  expense: {
    type: String,
    unique: true,
  },
  amount: Number,
  period: String,
  category: String,
  startDate: Date
});

// expense: Hulu, amount: 12, period: monthly/daily/weekly cat: Entertainment

const oneTimeSchema = new mongoose.Schema({
  expense: String,
  amount: Number,
  date: Date,
  category: String
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  password: {
    type: String,
    required: false
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  budget: Number,
  recurring: [recurringSchema],
  oneTime: [oneTimeSchema]
});

userSchema.pre('save', next => {
  if (this.password) {
    return bcrypt.hash(this.password, 10, (error, hash) => {
      if (hash) {
        this.password = hash;
        next();
      }
    });
  }
});

userSchema.methods.comparePassword = password => {
  return bcrypt.compare(password, this.password);
};




module.exports.User = mongoose.model('User', userSchema);
