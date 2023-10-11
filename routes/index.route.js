const router = require('express').Router();

const subdistrictRouter = require('./subdistrict.route');
const attractionRouter = require('./attract.route');

router.use('/subdistricts', subdistrictRouter);
router.use('/attractions', attractionRouter);

module.exports = router;