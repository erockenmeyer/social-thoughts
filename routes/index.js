const router = require('express').Router();
// import api routes
const apiRoutes = require('./api');

// add /api prefix to api routes
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('404 error!');
});

module.exports = router;