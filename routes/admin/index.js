const express = require('express');
const router = express.Router();
const posts = require('./posts');
const categories = require('./categories');
const tags = require('./tags');
const upload = require('./upload');
const alias = 'admin';

router.get('/', function(req, res) {
  const { userId, userName } = req.session;

  if (!userId || !userName) {
    res.redirect('/login');
    return;
  }

  res.render('admin/index', {
    user: {
      id: userId,
      name: userName
    },
    alias
  });
});

router.use('/posts', posts);
router.use('/categories', categories);
router.use('/tags', tags);
router.use('/upload', upload);

module.exports = router;
