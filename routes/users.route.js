const router = require('express').Router();
const { register, login, logout, profile } = require('../controllers/users.controller');
const { authentication } = require("../middlewares/auth");

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', authentication, logout)

// Profile User
router.get('/profile', authentication, profile)

module.exports = router;