const router = require('express').Router();

const { getAll, getByRTH } = require('../controllers/attraction.controller.js');

router.get('/', getAll);
router.get('/:RTH', getByRTH);

module.exports = router;