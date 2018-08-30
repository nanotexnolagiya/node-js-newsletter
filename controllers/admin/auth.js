const bcrypt = require('bcrypt-nodejs');
const logger = require('../../lib/logger');

const User = require('../../models/User');

const login = async (req, res) => {
	let errors = {};
	const email = req.body.email;
	const password = req.body.password;
	if (!email || !password) {
		if (!email) errors.errorEmail = 'Email not found';
		if (!password) errors.errorPassword = 'Password not found';
	} else if (
		!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		)
	) {
		errors.errorEmail = 'Email in valid';
	} else {
		errors.noError = true;
	}

	if (errors.noError) {
		try {
			const user = await User.findOne({ email });

			if (!user) {
				errors.formError = 'Error E-mail or Password';
				res.render('auth/login', errors);
			} else {
				bcrypt.compare(password, user.password, function(err, result) {
					if (!result) {
						errors.formError = 'Error E-mail or Password';
						res.render('auth/login', errors);
					} else {
						req.session.userId = user.id;
						req.session.userName = user.name;

						res.redirect('/admin');
					}
				});
			}
		} catch (error) {
			logger.error(error);
			errors.formError = 'Error';
			res.render('auth/login', errors);
		}
	} else {
		res.render('auth/login', errors);
	}
};

const logout = (req, res) => {
	if (req.session) {
		// delete session object
		req.session.destroy(() => {
			res.redirect('/admin');
		});
	} else {
		res.redirect('/admin');
	}
};

module.exports = {
	login,
	logout,
};
