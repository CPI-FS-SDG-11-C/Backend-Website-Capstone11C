const router = require('express').Router();

const { getAll, getRthByKecId, getDetailRth} = require('../controllers/rth.controller');

router.get('/', getAll);
router.get('/subdistricts/:kecId', getRthByKecId);
router.get('/rth/:rthId', getDetailRth);

module.exports = router;