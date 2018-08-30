const express = require('express');
const router = express.Router();
const SiteController = require('../../controllers/site');

router.get('/', SiteController.homeAction);

router.get('/category/:id', SiteController.categoryAction);

router.get('/post/:url', SiteController.postAction);

module.exports = router;