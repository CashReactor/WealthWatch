//Import your routes here
const { auth } = require('./routes/authentication.js');
const { User } = require('../database/models/user.js');
const { Rec } = require('../database/models/recurring.js');
const { One } = require('../database/models/oneTime.js');

// ***********************
var axios = require('axios');
const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const session = require('express-session');
var bcrypt = require('bcrypt');

require('dotenv').config();

app.set('port', process.env.PORT || 1337);
const port = app.get('port');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(express.static(__dirname + '/../client/public'));

// Routes
app.use('/auth', auth); // Authentication route
/******************************************************/

//*****DATABASE SCHEMA FOR RECURRING EXPENSE FOR REFERENCE*****
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

//*****DATABASE SCHEMA FOR ONE-TIME EXPENSE FOR REFERENCE*****
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

app.post('/oneExpense', function(req, res) {
  console.log('adding one-time expense');
  var currentEmail = req.body.currentEmail;
  User.findOne({ email: currentEmail }, function(err, user) {
    if (err) throw err;
    var oneExpenses = user.oneTime;
    var oneExpense = new One({
      expense: req.body.expense,
      amount: req.body.expense,
      date: new Date(),
      category: req.body.category
    })
    oneExpenses.push(oneExpense);
    User.findOneAndUpdate({ email: currentEmail }, { oneTime: oneExpenses}, { new: true }, (err, updatedUser) => {
      if (err) throw err;
      res.send(updatedUser);
      res.end();
    })
  })
})

app.post('/recExpense', function(req, res) {
  console.log('adding recurring expense');
  var currentEmail = req.body.currentEmail;
  User.findOne({ email: currentEmail }, function(err, user) {
    if (err) throw err;
    var recExpenses = user.recurring;
    var recExpense = new Rec({
      expense: req.body.expense,
      amount: req.body.period,
      category: req.body.category,
      startDate: new Date()
    })
    recExpense.push(recExpense);
    User.findOneAndUpdate({ email: currentEmail }, { recurring: recExpenses }, {new: true }, (err, updatedUser) => {
      if (err) throw err;
      res.send(updatedUser);
      res.end();
    })
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

app.listen(port, () => {
  console.log('Express is listening on port 1337');
});