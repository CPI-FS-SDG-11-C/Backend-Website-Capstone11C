const router = require('express').Router();

const subdistrictRouter = require('./subdistricts.route');
const userRouter = require('./users.route');
const rthRouter = require('./rth.route');
const articleRouter = require('./article.route')

router.use('/subdistricts', subdistrictRouter);
router.use('/users', userRouter);
router.use('/rths', rthRouter);
router.use('/articles', articleRouter);

module.exports = router;