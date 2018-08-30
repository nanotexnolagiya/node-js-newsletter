const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/admin/auth');

router.get('/', (req, res) => {
	if (req.session.userId) {
		res.redirect('/admin');
	} else {
		res.render('auth/login');
	}
});

router.post('/', AuthController.login);

module.exports = router;
