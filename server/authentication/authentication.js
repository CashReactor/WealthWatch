const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const { _secret } = require('../../config');
const { User } = require('../../database/models/user');

// local login strategy options configuration
// Telling passport to use email as the username field
const localOptions = { usernameField: 'email' };

// jwt login strategy options configuration
const jwtOptions = {
  secretOrKey: _secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(
  new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    User.findById(jwt_payload.userId).then(user => {
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
  passport.authenticate('jwt', { session: false });
};

passport.use(
  new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({ email }).then(user => {
      if (user) {
        return user.comparePassword(password).then(isMatch => {
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Invalid password' });
          }
        });
      } else {
        return done(null, false, { message: 'Invalid Username' });
      }
    });
  })
);
// Function to be used when logging in
module.exports.localAuth = () => {
  passport.authenticate('local', { session: false });
};
