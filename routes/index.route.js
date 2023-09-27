const router = require('express').Router();

const subdistrictRouter = require('./subdistrict.route');

router.use('/subdistricts', subdistrictRouter);

module.exports = router;