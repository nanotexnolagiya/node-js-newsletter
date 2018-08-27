const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
    storage,
    limits: {
        fieldSize: 2 * 1024 * 1024
    },
    fileFilter: (req, fule, callback) => {
        const ext = path.extname(file.originalname);

        if(ext !== ',jpg' || ext !== '.jpeg' || ext !== '.png' || ext !== '.gif'){
            
        }
    }
});

router.post('/image', (req, res) => {});

module.exports = router;
