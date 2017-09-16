const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('../db').db;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db });
const passport = require('passport');
const User = require('../db/user');

passport.serializeUser(function (user, done) {
  console.log("serializing");
  console.log(user.id);

  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log("deserializing");
  console.log(id);

  User.findById(id)
  .then(user => done(null, user))
  .catch(done);
});


app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    store: dbStore,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('../api'));

app.use(express.static(path.join(__dirname, '../../public')))

app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

dbStore.sync();

module.exports = app;
