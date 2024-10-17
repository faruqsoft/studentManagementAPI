const express = require('express');
const { uploadFile, readFile, deleteFile } = require('../controllers/fileController');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/upload', authenticateJWT, uploadFile);
router.get('/read/:filename', authenticateJWT, readFile);
router.delete('/delete/:filename', authenticateJWT, deleteFile);

module.exports = router;
