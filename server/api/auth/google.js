const router = require('express').Router();
const passport = require('passport');
const db = require('../../db').db
const User = db.model('user')
var GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/verify'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('in the google strategy')
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;
    var values = {googleId, name, email}
    var selector = {where: {googleId}}
    User.findOne(selector)
      .then(user => user
      ? done(null, user)
      : User.create({name, email, googleId})
        .then(user => done(null, user))
    )
    .catch(done)
}));

// // register our strategy with passport
// passport.use(strategy);

// Google authentication and login
router.get('/', passport.authenticate('google', { scope: ['email'] }));

// handle the callback after Google has authenticated the user
router.get('/verify',
  passport.authenticate('google',  // strategy name
                        { failureRedirect: '/login' }),
  function(req, res) {
    console.log('in the verify redirect')
    console.log(req.url)
    // Successful authentication, redirect home.
    res.redirect('/');
  }
  );

module.exports = router
