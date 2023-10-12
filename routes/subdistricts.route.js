const router = require('express').Router();

const { getAll, getSubDistrictById } = require('../controllers/subdistricts.controller');

router.get('/', getAll);

router.get('/:subdistrictId', getSubDistrictById);

module.exports = router;