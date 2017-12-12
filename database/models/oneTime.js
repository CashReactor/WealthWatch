const mongoose = require('mongoose');

const oneTimeSchema = new mongoose.Schema({
  expense: String,
  amount: Number,
  date: Date,
  category: String
});

module.exports.oneTimeSchema = oneTimeSchema;
module.exports.One = mongoose.model('One', oneTimeSchema);
