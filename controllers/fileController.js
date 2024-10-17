const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads folder if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage }).single('file');

exports.uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(500).json({ error: 'File upload failed' });
        res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    });
};

exports.readFile = (req, res) => {
    const file = path.join(uploadsDir, req.params.filename);
    if (fs.existsSync(file)) {
        res.sendFile(file);
    } else {
        res.status(404).json({ error: 'File not found' });
    }
};

exports.deleteFile = (req, res) => {
    const file = path.join(uploadsDir, req.params.filename);
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        res.status(200).json({ message: 'File deleted successfully' });
    } else {
        res.status(404).json({ error: 'File not found' });
    }
};
