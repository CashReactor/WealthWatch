const { localAuth, jwtAuth, googleAuth, googleAuthCallback } = require('../authentication/authentication');

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../../database/models/user');
const { _secret } = require('../../config');

// Helper functions
const generateToken = user => {
  return jwt.sign(user, _secret, { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 });
};
/*********************************************************/

// Test route: The purpose of this route is only to test JWT authentication
router.get('/', jwtAuth(), (req, res, next) => {
  res.json('Authentication Route');
});
/*********************************************************/

router.post('/login', localAuth(), (req, res) => {
  console.log('Login state req:', req);
  const { _id, email, name } = req.user;
  const user = { _id, email, name };
  const token = generateToken(user);
  res.json({ message: 'Login successful', token });
});

router.post('/signup', (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const jwtData = { email, name };
  let newUser = new User({ email, name, password });

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        res.status(409).json({ message: 'Email taken' });
      }
      return newUser.save();
    })
    .then(() => {
      const token = generateToken(jwtData);
      res.status(201).json({ message: 'Registration Successful', token });
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

router.get('/google', googleAuth());

router.get('/google/callback', googleAuthCallback(), function(req, res) {
  res.redirect('/');
});

module.exports.auth = router;
