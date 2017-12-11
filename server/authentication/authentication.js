const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const { _secret } = require('../../config');
const { User } = require('../../database/models/user');

// JWT login strategy options configuration
const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/',
  passReqToCallback: true
};

//Google Strategy
passport.use(
  new GoogleStrategy(googleOptions, function(request, accessToken, refreshToken, profile, done) {
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
        });
      }
    });
  })
);

// Function to be used when login with Google account
module.exports.googleAuth = () => {
  return passport.authenticate('google', { scope: ['profile'] });
};
module.exports.googleAuthCallback = () => {
  return passport.authenticate('google', { failureRediret: '/login' });
};

// JWT login strategy options configuration
const jwtOptions = {
  secretOrKey: _secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

//JWT Strategy
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

//Local Strategy
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
