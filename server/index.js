// Import your routes here
const { auth } = require('./routes/authentication.js');
const { expense } = require('./routes/expense.js');
const { User } = require('../database/models/user.js');
const { Rec } = require('../database/models/recurring.js');
const { One } = require('../database/models/oneTime.js');
const { jwtAuth } = require('./handlers/authentication.js');

// ***********************
const path = require('path');
const axios = require('axios');
const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const { NODE_ENV } = process.env;

let webpackConfig;
if (NODE_ENV === 'development') {
  webpackConfig = '../webpack.config.dev';
} else {
  webpackConfig = '../webpack.config';
}

const config = require(webpackConfig);

const app = express();

require('dotenv').config();

app.set('port', process.env.PORT || 1337);
const port = app.get('port');

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
  },
}));
app.use(webpackHotMiddleware(compiler));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.static(__dirname + '/../client/public'));

// Routes
app.use('/auth', auth); // Authentication route
app.use('/api/expense', expense);
/* **************************************************** */

/* ****DATABASE SCHEMA FOR RECURRING EXPENSE FOR REFERENCE**** */
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

/* ****DATABASE SCHEMA FOR ONE-TIME EXPENSE FOR REFERENCE**** */
// const oneTimeSchema = new mongoose.Schema({
//   expense: String,
//   amount: Number,
//   date: Date,
//   category: String
// });

// const userSchema = new mongoose.Schema({
//   //user has email, name, password, budget, and recurring/onetime as arrays of expense models
//   email: {
//     type: String,
//     unique: true,
//     lowercase: true,
//     trim: true,
//     validate: [{ isAsync: false, validator: isEmail, msg: 'Invalid Email Address' }],
//     required: 'Please supply an email address'
//   },
//   name: {
//     type: String,
//     required: 'Please supply a name',
//     trim: true
//   },
//   password: {
//     type: String,
//     required: 'Please supply a password'
//   },
//   resetPasswordToken: String,
//   resetPasswordExpires: Date,
//   budget: Number,
//   googleId: String,
//   googleToken: String,
//   recurring: [recurringSchema],
//   oneTime: [oneTimeSchema],
//   imageUrl: String
// });

app.post('/calculateNPV', function(req, res) {
  var { initialInvestment, discountRate, cashFlow } = req.body;
  var result = initialInvestment * -1;
  Object.keys(cashFlow).forEach(year => {
    var earning;
    if (cashFlow[year][1] === '%') {
      earning = initialInvestment * cashFlow[year][0] * 0.01;
    } else {
      earning = cashFlow[year][0];
    }
    result += Math.pow((100-discountRate) * 0.01, Number(year)) * earning;
  })

  res.send(JSON.stringify(Math.round(result)));
  res.end();
})

app.post('/updateBalance', function(req, res) {
  User.findOneAndUpdate({ email: req.body.email },
    {
      $set: { budget: req.body.budget, currency: req.body.currency }
    }, (err, user) => {
      console.log(user);
      res.send('success')
      res.end();
    }
  )
})

app.post('/reset', function(req, res) {
  User.findOneAndUpdate({ email: req.body.email }, {
    $set: { oneTime: [], recurring: [] }
  }, (err, user) => {
    res.send('success');
    res.end();
  })
})

app.post('/user', function(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    res.send(user);
    res.end();
  })
})

app.post('/fetchBudget', function(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    res.send(String(user.budget));
    res.end();
  })
})

app.get('/logout', function(req, res) {
  req.session.destroy((err) => {
    if (err) throw err;
  })
  res.send('success');
  res.end();
})

app.post('/fetchOneExpenses', function(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    res.send(user.oneTime);
    res.end();
  })
})

app.post('/fetchRecExpenses', function(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    res.send(user.recurring);
    res.end();
  })
})

//weather-map API
app.post('/weather', function(req, res) {
  console.log(req.body);
  var lat = req.body.lat;
  var lon = req.body.lon;
  var url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=fe22cf91271784d706fc84ca44d54cc3`;
  axios.get(url).then(function(response) {
    var data = response.data;
    console.log('THIS IS THE WEATHER', response.data);
    var weather = {
      state: data.name,
      weather: data.weather[0].main + ' (' + data.weather[0].description + ')',
      temperature: data.main.temp
    };
    res.send(weather);
    res.end();
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(port, () => {
  console.log('Express is listening hard on port 1337');
});
