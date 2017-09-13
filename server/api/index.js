// apiRoutes/index.js
const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/auth', require('./auth')) // matches all requests to /api/users/


//// JUST TRYING TO SEE SEQ DATA
router.use('/orders', require('./orders'));




router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
