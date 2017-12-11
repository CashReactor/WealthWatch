const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const { _secret } = require('../../config');
const { User } = require('../../database/models/user');

// jwt login strategy options configuration
const jwtOptions = {
  secretOrKey: _secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};


//Add Google Strategy

passport.use(
  new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    User.findById(jwt_payload._id).then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  })
);
// Function to be used when checking user JWT
module.exports.jwtAuth = () => {
  return passport.authenticate('jwt', { session: false });
};

// local login strategy options configuration
// Telling passport to use email as the username field
const localOptions = { usernameField: 'email' };

passport.use(
  new LocalStrategy(localOptions, function(email, password, done) {
    console.log('local strategy');
    User.findOne({ email: email }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
      }

      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
        }

        return done(null, user);
      });
    });
  })
);

// Function to be used when logging in
module.exports.localAuth = () => {
  console.log('local auth');
  return passport.authenticate('local', { session: false });
};

module.exports.passport = passport;
