const router = require('express').Router();

const { getAll, getSubDistrictById } = require('../controllers/subdistrict.controller');

router.get('/', getAll);

router.get('/:subdistrictId', getSubDistrictById);

module.exports = router;