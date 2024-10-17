const express = require('express');
const { getProfile, updateProfile } = require('../controllers/studentController');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', authenticateJWT, getProfile);
router.put('/profile', authenticateJWT, updateProfile);

module.exports = router;
