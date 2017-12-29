const express = require('express');
const cryptoRouter = express.Router();
const axios = require('axios');

cryptoRouter.get('/getCrypto', (req, res) => {
  // console.log('req.body in crypto::::', req.query.code);
  const symbol = req.query.code;
  const market = 'USD';
  const apiKey = process.env.ALPHA_VANTAGE;
  const alphaVantage = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${
    market
  }&apikey=${apiKey}`;
  axios.get(alphaVantage).then((response) => {
    // console.log('resp::::', response);
    console.log('sending data for crypto-currency');
    res.status(200).json({ message: 'Data Found', data: response.data });
  });
});

cryptoRouter.get('/getNews', (req, res) => {
  const aylieanId = process.env.X_AYLIEN_NewsAPI_Application_ID;
  const aylieanKey = process.env.X_AYLIEN_NewsAPI_Application_Key;
  const currency = 'bitcoin';
  // console.log('inside the getNews');
  const aylieanLink = `https://api.newsapi.aylien.com/api/v1/stories?text=${currency}&published_at.start=NOW-30DAYS%2FDAY&published_at.end=NOW&language=en&sort_by=relevance`;
  axios
    .get(aylieanLink, {
      headers: { "X-AYLIEN-NewsAPI-Application-ID": aylieanId, "X-AYLIEN-NewsAPI-Application-Key": aylieanKey },
    })
    .then((response) => {
      const { stories } = response.data;
      const newsInfo = [];
      /*
      title --> stories[0].title
      summary --> stories[0].summary.sentences[0]
      links --> stories[0].links.permalink
      sentiment --> { stories[0].sentiment.body.polarity, stories[0].sentiment.body.score }
      */
      // console.log(stories)
      for (let i = 0; i < 5; i++) {
        newsInfo.push({
          ['id']: stories[i].id,
          ['title']: stories[i].title,
          ['summary']: stories[i].summary.sentences[0],
          ['link']: stories[i].links.permalink,
          ['sentiment']: stories[i].sentiment.body.polarity,
        });
      }
      res.json(newsInfo);
    });
});

cryptoRouter.get('/getSentiment', (req, res) => {
  const currency = 'bitcoin';
  const sentimentLink = `https://api.newsapi.aylien.com/api/v1/trends?field=sentiment.title.polarity&text=${currency}&published_at.start=NOW-30DAYS%2FDAY&published_at.end=NOW&language=en&sort_by=relevance`
  const aylieanId = process.env.X_AYLIEN_NewsAPI_Application_ID;
  const aylieanKey = process.env.X_AYLIEN_NewsAPI_Application_Key;
  axios
    .get(sentimentLink, {
      headers: { "X-AYLIEN-NewsAPI-Application-ID": aylieanId, "X-AYLIEN-NewsAPI-Application-Key": aylieanKey }
    })
    .then((response) => {
      // console.log('response::::', response.data);
      const sentiment = response.data.trends;
      const total = sentiment[1].count + sentiment[2].count;
      const portions = {
        negative: Math.floor(sentiment[1].count/total * 100)/100,
        positive: Math.floor(sentiment[2].count/total * 100)/100,
      }
      res.json(portions);
    });
});

cryptoRouter.get('/getSymbol', (req, res) => {});

module.exports.crypto = cryptoRouter;
