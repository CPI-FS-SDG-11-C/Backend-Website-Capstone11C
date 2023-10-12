const router = require('express').Router();

const { getAll, getRthByKecId, getDetailRth } = require('../controllers/rth.controller');
const { addReview } = require('../controllers/reviews.controller');
const { authentication } = require("../middlewares/auth");

router.get('/', getAll);
router.get('/subdistricts/:kecId', getRthByKecId);
router.get('/rth/:rthId', getDetailRth);
router.post('/:rthId/reviews', authentication, addReview);


module.exports = router;