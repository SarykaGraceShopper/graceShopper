const db = require('../db').db
const router = require('express').Router();
const Review = db.model('review');

router.get('/', (req, res, next) => {
  Review.findAll({})
    .then(reviews => res.json(reviews))
    .catch(next)
});

router.get('/:reviewId', (req, res, next) => {
  Review.findOne({
    where: {id: req.params.reviewId},
    include: [Dragon] // require in Dragon so this works --OB
  })
    .then(review => res.json(review))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next)
})

router.put('/:reviewId', (req, res, next) => {
  Review.update(req.body, {
    where: {
      id: req.params.reviewId
    }
  })
  .then(result => {
    return Review.findOne({
      where: {
        id: req.params.reviewId
      }
    })
  })
  .then(review => res.json(review))
})

router.delete('/delete/:reviewId', (req, res, next) => {
  Review.findOne({
    where: {
      id: req.params.reviewId
    }
  })
  .then(result => {
    return Review.destroy({
      where: {
        id: req.params.reviewId
      }
    })
    .then(u => res.send(result))
  })
  .catch(next);
});

// don't need to put delete in the actual route, don't write verbs in URL matching! --OB
// look at dragons.js for relevant comments --FF

module.exports = router
