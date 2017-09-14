const db = require('../db').db
const router = require('express').Router();
const User = db.model('user');
const Dragon = db.model('dragon');

router.get('/', (req, res, next) => {
  User.findAll({})
    .then(users => res.json(users))
    .catch(next)
});

router.get('/:userId', (req, res, next) => {
  User.findOne({
    where: {id: req.params.userId}
  })
    .then(user => res.json(user))
    .catch(next);
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
})

router.put('/:userId', (req, res, next) => {
  User.update(req.body, {
    where: {
      id: req.params.userId
    }
  })
  .then(result => {
    return User.findOne({
      where: {
        id: req.params.userId
      }
    })
  })
  .then(user => res.json(user))
})

router.delete('/delete/:userId', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.userId
    }
  })
  .then(result => {
    return User.destroy({
      where: {
        id: req.params.userId
      }
    })
    .then(u => res.send(result))
  })
  .catch(next);
});


module.exports = router
