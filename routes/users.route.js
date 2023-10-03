const router = require('express').Router();
const { register, login, logout } = require('../controllers/users.controller');
const { authentication } = require("../middlewares/auth");

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', authentication, logout)

module.exports = router;