const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');

const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;
const crypto = require('crypto');
const mail = require('./mail');

const { _secret } = require('../../config');
const { User } = require('../../database/models/user');

// JWT login strategy options configuration
const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:1337/auth/google/callback',
  passReqToCallback: true,
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Google Strategy
passport.use(
  new GoogleStrategy(googleOptions, function(request, accessToken, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id }, function(err, user) {
      if (err) throw err;
      if (user) {
        return done(err, user);
      } else {
        console.log(profile)
        var data = {};
        data.imageUrl = '';
        data.email = profile.emails[0].value;
        data.name = profile.displayName;
        if (profile.photos && profile.photos.length) {
          data.imageUrl = profile.photos[0].value;
        }
        var newUser = new User(data);
        newUser.save(function(err) {
          if (err) throw err;
          return done(null, newUser);
        });
      }
    });
  })
);

// Function to be used when login with Google account
module.exports.googleAuth = () => {
  return passport.authenticate('google', { scope: ['profile email'] });
};
module.exports.googleAuthCallback = () => {
  return passport.authenticate('google', { failureRediret: '/login' });
};

// JWT login strategy options configuration
const jwtOptions = {
  secretOrKey: _secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload._id).then((user) => {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));

// Function to be used when checking user JWT
module.exports.jwtAuth = () => passport.authenticate('jwt', { session: false });

// local login strategy options configuration
// Telling passport to use email as the username field
const localOptions = { usernameField: 'email' };

// Local Strategy
passport.use(new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
    }

    user.comparePassword(password, (error, isMatch) => {
      if (error) {
        return done(error);
      }
      if (!isMatch) {
        return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
      }

      return done(null, user);
    });
  });
}));

// Function to be used when logging in
module.exports.localAuth = () => passport.authenticate('local', { session: false });

module.exports.forgotPassword = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordExpires = Date.now() + 3600000;
      return user.save();
    })
    .then((data) => {
      const { email, resetPasswordToken } = data;
      const resetURL = `http://${req.headers.host}/auth/reset/${resetPasswordToken}`;
      mail.send({
        email,
        filename: 'password-reset',
        subject: 'Password Reset',
        resetURL,
      });
      return next(null, data);
    })
    .catch((error) => {
      return next(error);
    });
};

module.exports.resetPassword = (req, res, next) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  }).then((user) => {
    const { email, name, resetPasswordExpires } = user;
    const data = { email, name, resetPasswordExpires };
    res.body = data;
    next();
  }).catch(error => console.error(error));
};

module.exports.confirmedPassword = (req, res, next) => {
  if (req.body.password === req.body.passwordConfirm) {
    const { email, password } = req.body;
    const data = { email, password };
    return next(null, data);
  }
  return next(new Error('Passwords do not match'));
};

module.exports.updatePassword = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.save();
    })
    .then(data => next(null, data))
    .catch(error => next(error));
};