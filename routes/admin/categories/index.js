const express = require('express');
const router = express.Router();
const Category = require('../../../models/Category');
const Tag = require('../../../models/Tag');
const alias = 'category';

router.get('/', async(req, res) => {
  const { userId, userName } = req.session;

  if (!userId || !userName) {
    res.redirect('/');
    return;
  }

  try {
    const categories = await Category.find({});

    res.render('admin/categories/index', {
      user: {
        id: userId,
        name: userName
      },
      categories,
      alias
    });
  } catch (error) {
    console.log(error);
  }
  
});

router.get('/add', async(req, res) => {
  const { userId, userName } = req.session;

  if (!userId || !userName) {
    res.redirect('/');
    return;
  }

  res.render('admin/categories/add', {
    user: {
      id: userId,
      name: userName
    },
    alias
  });

});

router.post('/add', async(req, res) => {
  const { userId, userName } = req.session;

  if (!userId || !userName) {
    res.redirect('/');
    return;
  }

  const title = req.body.title.trim().replace(/ +(?= )/g, '');

  if (!title) {
    const fields = [];
    if (!title) fields.push('title');

    res.json({
      ok: false,
      error: 'Заполните поле!',
      fields
    });
  } else {
    try {
      await Category.create({title});

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

router.get('/edit/:id', async(req, res) => {
  const { userId, userName } = req.session;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');

  if (!userId || !userName) {
    res.redirect('/');
    return;
  }

  try {
    const category = await Category.findById(id);

    res.render('admin/categories/edit', {
      user: {
        id: userId,
        name: userName
      },
      category,
      alias
    });
  } catch (error) {
    console.log(error);
  }

});

router.put('/edit/', async(req, res) => {
  const { userId, userName } = req.session;
  const title = req.body.title.trim().replace(/ +(?= )/g, '');
  const id = req.body.id.trim().replace(/ +(?= )/g, '');

  if (!userId || !userName) {
    res.redirect('/');
    return;
  }

  try {
    await Category.update({ _id: id }, { title });

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

router.delete('/delete/', async(req, res) => {
  const { userId, userName } = req.session;
  const id = req.body.id.trim().replace(/ +(?= )/g, '');

  if (!userId || !userName) {
    res.redirect('/');
    return;
  }

  try {
    await Category.remove({_id: id});

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

router.post('/tags', async(req, res) => {
  const id = req.body.id.trim().replace(/ +(?= )/g, '');

  try {
    const tags = await Tag.find({category: id});

    res.json({
      tags: tags
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false
    });
  }

});

module.exports = router;
