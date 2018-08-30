const Category = require('../../models/Category');
const Tag = require('../../models/Tag');
const logger = require('../../lib/logger');
const alias = 'category';

const all = async (req, res) => {
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
				name: userName,
			},
			categories,
			alias,
		});
	} catch (error) {
		logger.error(error);
	}
};

const add = async (req, res) => {
	const { userId, userName } = req.session;

	if (!userId || !userName) {
		res.redirect('/');
		return;
	}

	res.render('admin/categories/add', {
		user: {
			id: userId,
			name: userName,
		},
		alias,
	});
};

const create = async (req, res) => {
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
			fields,
		});
	} else {
		try {
			await Category.create({ title });

			res.json({
				ok: true,
			});
		} catch (error) {
			logger.error(error);
			res.json({
				ok: false,
			});
		}
	}
};

const edit = async (req, res) => {
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
				name: userName,
			},
			category,
			alias,
		});
	} catch (error) {
		logger.error(error);
	}
};

const update = async (req, res) => {
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
			ok: true,
		});
	} catch (error) {
		logger.error(error);
		res.json({
			ok: false,
		});
	}
};

const deleted = async (req, res) => {
	const { userId, userName } = req.session;
	const id = req.body.id.trim().replace(/ +(?= )/g, '');

	if (!userId || !userName) {
		res.redirect('/');
		return;
	}

	try {
		await Category.remove({ _id: id });

		res.json({
			ok: true,
		});
	} catch (error) {
		logger.error(error);
		res.json({
			ok: false,
		});
	}
};

const tag = async (req, res) => {
	const id = req.body.id.trim().replace(/ +(?= )/g, '');

	try {
		const tags = await Tag.find({ category: id });

		res.json({
			tags: tags,
		});
	} catch (error) {
		logger.error(error);
		res.json({
			ok: false,
		});
	}
};

module.exports = {
	all,
	add,
	create,
	edit,
	update,
	deleted,
	tag,
};
