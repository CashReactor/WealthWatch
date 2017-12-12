const mongoose = require('mongoose');

const recurringSchema = new mongoose.Schema({
  expense: {
    type: String,
    unique: true,
  },
  amount: Number,
  period: String,
  category: String,
  startDate: Date,
});

module.exports.recurringSchema = recurringSchema;
module.exports.Rec = mongoose.model('Rec', recurringSchema);
