const express = require('express');

const googleRouter = express.Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const { createGoogleUser, googleUserLogin } = require('../handlers/googleUtility');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://wealthwatch.herokuapp.com/auth/google/callback',
}, createGoogleUser));

googleRouter.route('/')
  .get(passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/contacts.readonly'],
  }));

googleRouter.get('/callback', passport.authenticate('google', { session: false }), googleUserLogin, (req, res) => {
  const { token, email, currency } = res.body;
  res.redirect(`/?${token}?${email}?${currency}`);
});
module.exports = googleRouter;
