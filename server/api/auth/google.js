const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// don't forget to install passport-google-oauth
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: '939799157183-oj74cvfn68dkvb4gblsl2bqh8kddba4k.apps.googleusercontent.com',
    clientSecret: 'YOUR_APP_SECRET',
    callbackURL: 'YOUR_CALLBACK_URL'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    /*
    --- fill this part in ---
    */
  })
);

// Google authentication and login 
app.get('/', passport.authenticate('google', { scope: 'email' }));

// handle the callback after Google has authenticated the user
app.get('/callback',
  passport.authenticate('google', {
    successRedirect: '/', // or wherever
    failureRedirect: '/' // or wherever
  })
);
