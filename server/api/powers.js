const router = require('express').Router();
const db = require('../db').db;
const Power = require('../db').Power;
const Dragon = db.model('dragon');


router.get('/', (req, res, next) => {
  console.log(typeof Power)
  Power.findAll({})
    .then(
          powers => console.log('in power find all!!'))
    .catch(next)
});

router.get('/:powerId', (req, res, next) => {
  Power.findOne({
    where: {id: req.params.studentId},
    include: [Dragon]
  })
    .then(power => res.json(power))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Power.create(req.body)
    .then(power => res.status(201).json(power))
    .catch(next)
})

router.put('/:powerId', (req, res, next) => {
  Power.update(req.body, {
    where: {
      id: req.params.powerId
    }
  })
  .then(result => {
    return Power.findOne({
      where: {
        id: req.params.powerId
      }
    })
  })
  .then(power => res.json(power))
})

router.delete('/delete/:powerId', (req, res, next) => {
  Power.findOne({
    where: {
      id: req.params.powerId
    }
  })
  .then(result => {
    return Power.destroy({
      where: {
        id: req.params.powerId
      }
    })
    .then(u => res.send(result))
  })
  .catch(next);
});


module.exports = router
