const { localAuth } = require('../authentication/authentication');

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../../database/models/user');
const { _secret } = require('../../config');

// Helper functions
const generateToken = user => {
  return jwt.sign(user, _secret, { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 });
};
/*********************************************************/

router.post('/login', localAuth, (req, res) => {
  const token = generateToken(req.body.username);
  res.json({ message: 'Login successful', token });
});

router.post('/signup', (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const newUser = { email, name, password };

  User.findOne({ email })
    .then(user => {
      if (user) {
        res.status(409).json({ message: 'Email taken' });
      } else {
        User.create(newUser).then(user => {
          const token = generateToken(user);
          res.status(201).json({ message: 'Registration succcessful', token });
        });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

module.exports.auth = router;
