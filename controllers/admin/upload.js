const multer = require('multer');
const path = require('path');
const mkdirp = require('mkdirp');
const Upload = require('../../models/Upload');
const config = require('../../config');
const logger = require('../../lib/logger');

const rs = () =>
	Math.random()
		.toString(36)
		.slice(-3);

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		const dir = '/' + rs() + '/' + rs();
		req.dir = dir;

		mkdirp(config.DESTINATION + dir, err =>
			callback(err, config.DESTINATION + dir)
		);

		// callback(null, config.DESTINATION);
	},
	filename: async (req, file, callback) => {
		const fileName = Date.now().toString(36) + path.extname(file.originalname);
		const dir = req.dir;

		// upload

		try {
			const upload = await Upload.create({
				path: dir + '/' + fileName,
			});

			req.filePath = dir + '/' + fileName;
			req.id = upload._id;
		} catch (error) {
			logger.error(error);
		}

		callback(null, fileName);
	},
});

const upload = multer({
	storage,
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
	fileFilter: (req, file, callback) => {
		const ext = path.extname(file.originalname);

		if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.gif') {
			const error = new Error('Extention');
			error.code = 'EXTENTION';
			return callback(error);
		}

		callback(null, true);
	},
}).single('file');

const image = async (req, res) => {
	const { userId, userName } = req.session;

	if (!userId || !userName) {
		res.redirect('/');
		return;
	}

	upload(req, res, err => {
		let error = '';

		if (err) {
			if (err.code == 'LIMIT_FILE_SIZE') {
				error = 'Картинка болшее 2Мб';
			} else if (err.code == 'EXTENTION') {
				error = 'Только .jpg, .png и .gif';
			}
		}

		res.json({
			ok: !error,
			error,
			filePath: req.filePath,
			id: req.id,
		});
	});
};

const deleted = async (req, res) => {
	const { userId, userName } = req.session;

	if (!userId || !userName) {
		res.redirect('/');
		return;
	}

	const id = req.body.id.trim().replace(/ +(?= )/g, '');
	const path = req.body.path;

	try {
		await Upload.remove({
			_id: id,
		});

		res.json({
			ok: true,
			id,
		});
	} catch (error) {
		res.json({
			ok: false,
		});
	}
};

module.exports = {
	image,
	deleted,
};
