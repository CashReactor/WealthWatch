const {
  localAuth,
  jwtAuth,
  // googleAuth,
  // googleAuthCallback,
  forgotPassword,
  resetPassword,
  confirmedPassword,
  updatePassword,
} = require('../handlers/authentication');

const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../../database/models/user');
const { _secret } = require('../../config');

// Helper functions
const generateToken = user => jwt.sign(user, _secret, { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 });
/* ******************************************************* */

// Test route: The purpose of this route is only to test JWT authentication
router.get('/', jwtAuth(), (req, res, next) => {
  res.json('Authentication Route');
});
/* ******************************************************* */

router.post('/login', localAuth(), (req, res) => {
  console.log('THIS IS THE EMAILLLLL', req.body.email)
  console.log('THIS IS THE USERRRRRR', req.user);
  const { _id, email, name } = req.user;
  const user = { _id, email, name };
  const token = generateToken(user);
  res.status(200).json({ message: 'Login successful', token, email });
});

router.post('/signup', (req, res) => {
  const { email, name, password } = req.body;
  const budget = 0;
  const jwtData = { email, name };
  const newUser = new User({ email, name, password, budget });

  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(409).json({ message: 'Email taken' });
      }
      return newUser.save();
    })
    .then(() => {
      const token = generateToken(jwtData);
      res.status(201).json({ message: 'Registration Successful', token, email });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

// router.get('/google', googleAuth());

// router.get('/google/callback', googleAuthCallback(), (req, res) => {
//   res.redirect('/');
// });

router.post('/forgot', forgotPassword, (req, res) => {
  res.status(201).json({ message: 'Email Sent' });
});

router.get('/reset/:token', resetPassword, (req, res) => {
  const resLen = !Object.keys(res.body).length;
  if (resLen) {
    res.status(400).json({ message: 'Link Expired' });
  } else {
    res.status(200).json({ message: 'Valid Link' });
  }
});

router.post('/reset/:token', confirmedPassword, updatePassword, (req, res) => {
  res.status(201).json({ message: 'Password Updated' });
});

module.exports.auth = router;

