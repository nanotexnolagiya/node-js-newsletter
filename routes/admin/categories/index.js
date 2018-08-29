const express = require('express');
const router = express.Router();
const CategoryController = require('../../../controllers/admin/category');

router.get('/', CategoryController.all);

router.get('/add', CategoryController.add);

router.post('/add', CategoryController.create);

router.get('/edit/:id', CategoryController.edit);

router.put('/edit/', CategoryController.update);

router.delete('/delete/', CategoryController.deleted);

router.post('/tags', CategoryController.tag);

module.exports = router;
