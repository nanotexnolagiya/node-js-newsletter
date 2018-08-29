const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/admin/auth');

router.get('/', AuthController.logout);

module.exports = router;
