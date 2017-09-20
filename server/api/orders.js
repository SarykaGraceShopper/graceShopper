const router = require('express').Router();
const db = require('../db').db;
const Order = db.model('order');
const Dragon = db.model('dragon');


router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{
      model: Dragon
    }]
  })
    .then(orders => res.json(orders))
    .catch(next)
});

router.get('/:orderId', (req, res, next) => {
  Order.findOne({
    where: { id: req.params.orderId },
    include: [{ model: Dragon }]
  })
    .then(order => res.json(order))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.status(201).json(order))
    .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  Order.update(req.body, {
    where: {
      id: req.params.orderId
    }
  })
    .then(result => {
      return Order.findOne({
        where: {
          id: req.params.orderId
        }
      })
    })
    .then(order => res.json(order))
})

router.put('/:orderId/addDragon', (req, res, next) => {
  Order.findOne({
    where: { id: req.params.orderId },
    include: [{ model: Dragon }]
  })
    .then(order => {
      order.addDragon(req.body.dragonId);
      res.json(order);
    })
    .catch(next);
});

router.delete('/:orderId', (req, res, next) => {
  Order.findOne({
    where: {
      id: req.params.orderId
    }
  })
    .then(result => {
      return Order.destroy({
        where: {
          id: req.params.orderId
        }
      })
        .then(u => res.send(result))
    })
    .catch(next);
});

module.exports = router
