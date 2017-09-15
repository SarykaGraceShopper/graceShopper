const router = require('express').Router();
const db = require('../db').db;
const Power = db.model('power');
const Dragon = db.model('dragon');


router.get('/', (req, res, next) => {
  Dragon.findAll({})
    .then(dragons => res.json(dragons))
    .catch(next)
});

router.get('/:dragonId', (req, res, next) => {
  Dragon.findOne({
    where: {id: req.params.dragonId},
    include: [Power]
  })
    .then(dragon => res.json(dragon))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Dragon.create(req.body)
    .then(dragon => res.status(201).json(dragon))
    .catch(next)
})

router.put('/:dragonId', (req, res, next) => {
  Dragon.update(req.body, {
    where: {
      id: req.params.dragonId
    }
  })
  .then(result => {
    return Dragon.findOne({
      where: {
        id: req.params.dragonId
      }
    })
  })
  .then(dragon => res.json(dragon))
})

router.delete('/delete/:dragonId', (req, res, next) => {
  Dragon.findOne({
    where: {
      id: req.params.dragonId
    }
  })
  .then(result => {
    return Dragon.destroy({
      where: {
        id: req.params.dragonId
      }
    })
    .then(u => res.send(result))
  })
  .catch(next);
});


module.exports = router

