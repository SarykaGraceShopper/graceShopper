const router = require('express').Router();


router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));
router.use('/powers', require('./powers'));
router.use('/auth', require('./auth'));
router.use('/dragons', require('./dragons'));


router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
