const express = require('express');
const router = express.Router();
const UploadController = require('../../controllers/admin/upload');

router.post('/image', UploadController.image);

router.delete('/delete', UploadController.deleted);

module.exports = router;
