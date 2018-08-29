const express = require('express');
const router = express.Router();
const TagController = require('../../../controllers/admin/tag');

router.get('/', TagController.all);

router.get('/add', TagController.add);

router.post('/add', TagController.create);

router.get('/edit/:id', TagController.edit);

router.put('/edit/', TagController.update);

router.delete('/delete/', TagController.deleted);

module.exports = router;
