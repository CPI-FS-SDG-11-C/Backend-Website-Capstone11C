const router = require('express').Router();

const { getAll, getRthByKecId } = require('../controllers/rth.controller');

router.get('/', getAll);

router.get('/:kecId', getRthByKecId);

module.exports = router;