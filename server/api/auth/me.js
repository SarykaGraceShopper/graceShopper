const router = require('express').Router();
const User = require('../db/user')

router.get('/', (req, res, next) =&gt; {
  res.json(req.user);
});

  router.post('/login', (req, res, next) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) res.status(401).send('User not found');
        else if (!user.hasMatchingPassword(req.body.password) res.status(401).send('Incorrect password');
        else {
          req.login(user, err => {
            if (err) next(err);
            else res.json(user);
          });
        }
      })
      .catch(next);
  });

  router.post('/signup', (req, res, next) => {
    User.create(req.body)
      .then(user => {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      })
      .catch(next);
  });

  router.post('/logout', (req, res, next) =&gt; {
    req.logout();
    res.sendStatus(200);
  });

module.exports = router
