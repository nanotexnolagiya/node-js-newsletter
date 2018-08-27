const express = require('express');
const router = express.Router();
const Tag = require('../../models/Tag');
const Category = require('../../models/Category');
const Post = require('../../models/Post');
const TurndownService = require('turndown');
const turndownService = new TurndownService();
const category = require('./category');

router.get('/', async (req, res) => {
    const tags = await Tag.find({});
    const categories = await Category.find({});

    res.render('site/index', {
        categories
    });
});

router.use('/category', category);

module.exports = router;