const express = require('express');
const { signup, login, getProfile, updateProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile/update', authMiddleware, updateProfile);

module.exports = router;
