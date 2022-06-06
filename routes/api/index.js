const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add prefixes for /user and /thought
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;