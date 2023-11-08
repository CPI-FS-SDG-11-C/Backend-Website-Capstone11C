const router = require('express').Router();

const { getAll, getSubDistrictById,getDIstrictAndRTH } = require('../controllers/subdistricts.controller');

router.get('/', getAll);
router.get('/subDist-And-RTH', getDIstrictAndRTH);

router.get('/:subdistrictId', getSubDistrictById);

module.exports = router;