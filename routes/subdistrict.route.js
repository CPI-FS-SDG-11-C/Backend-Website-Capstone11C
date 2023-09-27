const router = require('express').Router();

const { getAll } = require('../controllers/subdistrict.controller');

router.get('/', getAll);

module.exports = router;