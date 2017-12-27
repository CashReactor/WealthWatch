const mongoose = require('mongoose');
const database = require('../config.js').database;

const digitalCurrencySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
    },
    name: String,
  },
  { collection: 'DigitalCurrencies' }
);

const physicalCurrencySchema = new mongoose.Schema({
  code: String,
  name: String,
});

module.exports.DigitalCurrency = mongoose.model('DigitalCurrency', digitalCurrencySchema);
module.exports.PhysicalCurrency = mongoose.model('PhysicalCurrency', physicalCurrencySchema);
