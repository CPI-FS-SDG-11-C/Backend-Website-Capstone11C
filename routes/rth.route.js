const router = require('express').Router();

const { getAll, getRthByKecId, getDetailRth } = require('../controllers/rth.controller');
const { addReview, getReviewsByRthId, getReviewsByUserId } = require('../controllers/reviews.controller');
const { authentication } = require("../middlewares/auth");

router.get('/', getAll);
router.get('/subdistricts/:kecId', getRthByKecId);
router.get('/rth/:rthId', getDetailRth);
router.post('/:rthId/reviews', authentication, addReview);
router.get('/:rthId/reviews', getReviewsByRthId);
router.get('/userreviews', authentication, getReviewsByUserId);



module.exports = router;