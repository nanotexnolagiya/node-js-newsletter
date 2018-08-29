const express = require('express');
const router = express.Router();
const PostController = require('../../../controllers/admin/post');

router.get('/', PostController.all);

router.get('/add', PostController.add);

router.post('/add', PostController.create);

router.get('/edit/:id', PostController.edit);

router.put('/edit', PostController.update);

router.delete('/delete', PostController.deleted);

module.exports = router;
