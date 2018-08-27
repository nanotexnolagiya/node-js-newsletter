const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  if (req.session) {
    // delete session object
    req.session.destroy(() => {
      res.redirect('/admin');
    });
  } else {
    res.redirect('/admin');
  }
});

module.exports = router;
