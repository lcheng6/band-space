const LocalStrategy = require('passport-local').Strategy;
const configAuth = require('../auth');
const User = require('../../models/user.js');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

// expose this function to our app using module.exports
module.exports = function(passport) {
  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  }, function(req, username, password, done) {

      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {
        console.log("hit local signup strategy", req.body);
        console.log("email", username);
        console.log("password", password);
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'local.email' :  email }, function(err, user) {
          // if there are any errors, return the error
          if (err)
              return done(err);

          // check to see if theres already a user with that email
          if (user) {
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {
            // if there is no user with that email
            // create the user
            var newUser = new User();
            // set the user's local credentials
            newUser.local.name     = req.body.Name
            newUser.local.email    = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.local.zipcode  = req.body.Zipcode;
            newUser.local.phonenumer = req.body.Phonenumber;

            console.log("Saving new user");
            // save the user
            newUser.save(function(err, user) {
              if (err) return done(err, null);

              const payload = {
                sub: user._id
              };

               // create a token string
              const token = jwt.sign(payload, config.jwtSecret);

              return done(null, token, user);
              // return done(null, newUser);
          });
        }
      });
    });
  }));
};
