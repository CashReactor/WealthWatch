//Import your routes here
const { auth } = require('./routes/authentication.js');
// ***********************
var axios = require('axios');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { User } = require('../database/models/user.js');
require('dotenv').config();

const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.set('port', process.env.PORT || 1337);
const port = app.get('port');

app.use('/auth', auth);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GOOGLE AUTH STRATEGY

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/',
  passReqToCallback: true
},
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id }, function(err, user) {
      if (err) throw err;
      if (user) {
        return done(err, user);
      } else {
        var data = {};
        data.imageUrl = '';
        data.email = profile.emails[0].value;
        data.name = profile.displayName;
        if (profile.photos && profile.photos.length) {
          data.imageUrl = profilephotos[0].value;
        }
        var newUser = new User(data);
        newUser.save(function(err) {
          if (err) throw err;
          return done(null, newUser);
        })
      }
    })
  }
))

app.get('/auth/google', passport.authenticate('google',
  { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRediret: '/login'}), function(req, res) {
  res.redirect('/');
})

// GOOGLE AUTH STRATEGY

app.use(express.static(__dirname + '/../client/public'));
// Use Routes here.....
app.use('/auth', auth);
/************************/

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.listen(port, () => {
  console.log('Express is listening on port 1337');
});

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

