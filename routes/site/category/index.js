const express = require('express');
const router = express.Router();
const Tag = require('../../../models/Tag');
const Category = require('../../../models/Category');
const Post = require('../../../models/Post');
const TurndownService = require('turndown');
const turndownService = new TurndownService();

router.get('/:id', async (req, res) => {
    tags = await Tag({})
    categories = await Category({})
})

module.exports = router;