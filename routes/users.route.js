const router = require('express').Router();
const { register, login, logout, profile, updateProfile} = require('../controllers/users.controller');
const { authentication } = require("../middlewares/auth");

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', authentication, logout)

// Profile User
router.get('/profile', authentication, profile)
router.put('/update', authentication, updateProfile)

module.exports = router;