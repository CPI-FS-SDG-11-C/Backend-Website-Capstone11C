const router = require('express').Router();

const subdistrictRouter = require('./subdistricts.route');
const userRouter = require('./users.route');

router.use('/subdistricts', subdistrictRouter);
router.use('/users', userRouter);

module.exports = router;