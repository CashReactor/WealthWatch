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

const cryptoCurrencyListSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  recentSeries: [
    {
      date: String,
      price: Number,
    },
  ],
});

module.exports.DigitalCurrency = mongoose.model('DigitalCurrency', digitalCurrencySchema);
module.exports.PhysicalCurrency = mongoose.model('PhysicalCurrency', physicalCurrencySchema);
module.exports.CryptoCurrencyList = mongoose.model('CryptoCurrencyList', cryptoCurrencyListSchema);
