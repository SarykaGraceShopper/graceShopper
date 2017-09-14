const db = require('../db')
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
    include: [Dragon]
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


module.exports = router