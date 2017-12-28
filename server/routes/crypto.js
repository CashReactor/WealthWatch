const express = require('express');
const cryptoRouter = express.Router();
const axios = require('axios');

cryptoRouter.get(`/getCrypto`, (req, res) => {
  console.log('req.body in crypto::::', req.query.code);
  const symbol = req.query.code;
  const market = 'USD';
  const apiKey = process.env.ALPHA_VANTAGE;
  const alphaVantage = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=${symbol}&market=${market}&apikey=${apiKey}`;
  axios.get(alphaVantage)
    .then((response) => {
      // console.log('resp::::', response);
      console.log('sending data for crypto-currency')
      res.status(200).json({ message: 'Data Found', data: response.data });
    });
});

module.exports.crypto = cryptoRouter;