const express = require('express');
const router = express.Router();
const Tag = require('../../../models/Tag');
const Category = require('../../../models/Category');
const Post = require('../../../models/Post');
const TurndownService = require('turndown');
const turndownService = new TurndownService();
const alias = 'post';

router.get('/', async (req, res) => {
  const { userId, userName } = req.session;

  if (!userId || !userName) {
    res.redirect('/');
    return;
  }

  try {
    const posts = await Post.find({});

    res.render('admin/posts/index', {
      user: {
        id: userId,
        name: userName
      },
      posts,
      alias
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/add', async (req, res) => {
  const { userId, userName } = req.session;

  if (!userId || !userName) {
    res.redirect('/');
    return;
  }

  try {
    const categories = await Category.find({});

    res.render('admin/posts/add', {
      user: {
        id: userId,
        name: userName
      },
      categories,
      alias
    });
  } catch (error) {
    console,log(error)
  }
});

router.post('/add', async (req, res) => {
  const { userId, userName } = req.session;

  if (!userId || !userName) {
    res.redirect('/');
    return;
  }

  const title = req.body.title.trim().replace(/ +(?= )/g, '');
  const content = turndownService.turndown(req.body.content.trim());
  const category = req.body.category;
  const tags = req.body.tags;

  if (!title || !category) {
    const fields = [];
    if (!title) fields.push('title');
    if (!category) fields.push('category');

    res.json({
      ok: false,
      error: 'Заполните поле!',
      fields
    });
  } else {
    try {
      const post = await Post.create({
        title,
        content,
        category,
        tags
      });

      res.json({
        ok: true
      });

    } catch (error) {
      console.log(error);
      res.json({
        ok: false
      });
    }
  }
});

router.get('/edit/:id', async (req, res) => {
  const { userId, userName } = req.session;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');

  if (!userId || !userName) {
    res.redirect('/');
    return;
  }

  try {
    const post = await Post.findById(id);
    const categories = await Category.find({});
    const tags = await Tag.find({});

    res.render('admin/posts/edit', {
      user: {
        id: userId,
        name: userName
      },
      categories,
      post,
      tags,
      alias
    });
  }catch (error) {
    console.log(error);
  }
});

router.put('/edit/', async (req, res) => {
  const { userId, userName } = req.session;

  if (!userId || !userName) {
    res.redirect('/');
    return;
  }

  const title = req.body.title.trim().replace(/ +(?= )/g, '');
  const content = turndownService.turndown(req.body.content.trim());
  const category = req.body.category;
  const tags = req.body.tags;
  const id = req.body.id.trim().replace(/ +(?= )/g, '');

  try {
    await Post.update({ _id: id }, { title, content, category, tags });

    res.json({
      ok: true
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false
    });
  }
});

router.delete('/delete/', async (req, res) => {
  const { userId, userName } = req.session;
  const id = req.body.id.trim().replace(/ +(?= )/g, '');

  if (!userId || !userName) {
    res.redirect('/');
    return;
  }

  try {
    await Post.remove({_id: id});

    res.json({
      ok: true
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false
    });
  }
});

module.exports = router;
