const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {
    // If wanted to could store only the user.id in session, but this works for now
    done(null, user);
  });

  // Retrieves user from session
  passport.deserializeUser((user, done) => {
    // If wanted to could store only the user.id in session, but this works for now
    done(null, user);
  });
};
