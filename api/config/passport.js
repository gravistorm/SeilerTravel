const passport = require('passport');

function PassportConfig (app, dbConfig) {
  require('./strategies/local.strategy')(dbConfig);

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = PassportConfig;
