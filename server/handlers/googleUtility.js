const jwt = require('jsonwebtoken');
const { User } = require('../../database/models/user');
const { _secret } = require('../../config');

const generateToken = user =>
  jwt.sign(user, _secret, { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 });

const createGoogleUser = (token, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const googleId = profile.id;
  const name = profile.displayName;
  const googleToken = token;
  const { photos } = profile;

  const newUser = { email, name, googleId, googleToken };

  User.findOne({ googleId }).then((user) => {
    if (user) {
      user.update({ googleToken }).then(user => done(null, profile));
    } else {
      User.findOne({ email }).then((user) => {
        if (user) {
          const googleUser = { googleId, googleToken };
          if (!user.imageURL) {
            googleUser.imageURL = photos[0].value;
          }
          user.update(googleUser).then(user => done(null, profile));
        } else {
          User.create(newUser)
            .then(user => done(null, profile))
            .catch(error => done(error));
        }
      });
    }
  });
};

const googleUserLogin = (req, res, next) => {
  const { id } = req.user;
  User.findOne({ googleId: id })
    .then((user) => {
      const { _id, email, name } = user;

      if (user) {
        const token = generateToken({ _id, email, name });
        res.body = { token, email };
        next();
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  createGoogleUser,
  googleUserLogin,
};
