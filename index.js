const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');
const mongoose = require('mongoose');
const session = require('express-session');
const routes = require('./routes');
const logger = require('./lib/logger');

const MongoStore = require('connect-mongo')(session);

// database
mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION);
mongoose.connection
	.on('error', error => logger.error(error))
	.on('close', () => logger.info('Database connection closed.'))
	.once('open', () => {
		const info = mongoose.connections[0];
		logger.info(`Connected to ${info.host}:${info.port}/${info.name}`);
	});
mongoose.connect(
	config.MONGO_URL,
	{ useNewUrlParser: false }
);

const app = express();

// sessions
app.use(
	session({
		secret: config.SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
		}),
		expires: new Date(Date.now() + 60 * 60 * 24 * 30),
	})
);

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, config.DESTINATION)));

app.use('/', routes.site);

app.use('/admin', routes.admin);

app.use('/logout', routes.auth.logout);

app.use('/login', routes.auth.login);

//The 404 Route (ALWAYS Keep this as the last route)
app.use(function(req, res, next) {
	res.status('404').render('404');
});

try {
	app.listen(config.PORT, () =>
		logger.info(`Example app listening on port ${config.PORT}!`)
	);
} catch (error) {
	logger.error(error);
}
