const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user.js");

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      // res.send(?)
      return done(null, user);
    });
  }
));