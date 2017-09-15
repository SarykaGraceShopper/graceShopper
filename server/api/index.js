const router = require('express').Router();


router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));
router.use('/powers', require('./powers'));
router.use('/auth', require('./auth'));
router.use('/orders', require('./orders'));
router.use('/dragons', require('./dragons'));



//// JUST TRYING TO SEE SEQ DATA
// router.use('/orders', require('./orders'));




router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
