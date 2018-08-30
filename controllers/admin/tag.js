const Tag = require('../../models/Tag');
const Category = require('../../models/Category');
const logger = require('../../lib/logger');
const alias = 'tags';

const all = async (req, res) => {
	const { userId, userName } = req.session;

	if (!userId || !userName) {
		res.redirect('/');
		return;
	}

	try {
		const tags = await Tag.find({}).populate('category');

		res.render('admin/tags/index', {
			user: {
				id: userId,
				name: userName,
			},
			tags,
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

	try {
		const categories = await Category.find({});

		res.render('admin/tags/add', {
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

const create = async (req, res) => {
	const { userId, userName } = req.session;

	if (!userId || !userName) {
		res.redirect('/');
		return;
	}

	const title = req.body.title.trim().replace(/ +(?= )/g, '');
	const category = req.body.category.trim().replace(/ +(?= )/g, '');

	if (!title || !category) {
		const fields = [];
		if (!title) fields.push('title');
		if (!category) fields.push('category');

		res.json({
			ok: false,
			error: 'Заполните поле!',
			fields,
		});
	} else {
		try {
			const tags = await Tag.create({
				title,
				category,
			});

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
		const tag = await Tag.findById(id);
		const categories = await Category.find({});

		res.render('admin/tags/edit', {
			user: {
				id: userId,
				name: userName,
			},
			tag,
			categories,
			alias,
		});
	} catch (error) {
		logger.error(error);
	}
};

const update = async (req, res) => {
	const { userId, userName } = req.session;
	const title = req.body.title.trim().replace(/ +(?= )/g, '');
	const category = req.body.category.trim().replace(/ +(?= )/g, '');
	const id = req.body.id.trim().replace(/ +(?= )/g, '');

	if (!userId || !userName) {
		res.redirect('/');
		return;
	}

	try {
		await Tag.update({ _id: id }, { title, category });

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
		await Tag.remove({ _id: id });

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

module.exports = {
	all,
	add,
	create,
	edit,
	update,
	deleted,
};
