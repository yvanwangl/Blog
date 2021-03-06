let express = require('express');
let compression = require('compression');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let systemConfig = require('../system.config');
mongoose.connect(systemConfig.mongooseConnect, {useMongoClient: true});

//转用nginx代理
//require('./proxy');
/*let webpack = require('webpack');
 let webpackDevMiddleware = require('webpack-dev-middleware');
 let webpackHotMiddleware = require('webpack-hot-middleware');
 let config = require('../webpack.config');
 let compiler = webpack(config);*/

let routes = require('./routes/index');
let users = require('./routes/users');
let test = require('./routes/test');
let login = require('./routes/login');
let blog = require('./routes/blog');
let comment = require('./routes/comment');
let upload = require('./routes/upload');

let app = express();

app.use(compression());
//set staticResource resource
//打包之后的静态资源文件
app.use(express.static(path.join(__dirname, `../${systemConfig.publicDir}`)));
//ssl验证文件
app.use(express.static(path.join(__dirname, '../public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(express.staticResource(path.join(__dirname, 'public')));

/*//set webpack dev
 app.use(webpackDevMiddleware(compiler, {
 noInfo: true,
 publicPath: config.output.publicPath,
 hot: true,
 historyApiFallback: true,
 stats: {
 colors: true
 }
 }));

 app.use(webpackHotMiddleware(compiler));*/

// ************************************
// This is the real meat of the example
// ************************************
/*if (app.get('env') === 'development') {
	// Step 1: Create & configure a webpack compiler
	let webpack = require('webpack');
	let webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../webpack.config');
	let compiler = webpack(webpackConfig);

	// Step 2: Attach the dev middleware to the compiler & the server
	app.use(require("webpack-dev-middleware")(compiler, {
		noInfo: true, publicPath: webpackConfig.output.publicPath
	}));

	// Step 3: Attach the hot middleware to the compiler & the server
	app.use(require("webpack-hot-middleware")(compiler, {
		log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
	}));
}*/

console.log(app.get('env'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://sunnyhuan.yvanwang.com/");
    res.header("Access-Control-Allow-Credentials", true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//set routers
app.use('/users', users);
app.use('/test', test);
app.use('/login', login);
app.use('/blog-api', blog);
app.use('/comment', comment);
app.use('/upload', upload);
app.get('*', function (request, response) {
	response.sendFile(path.resolve(__dirname, `../${systemConfig.publicDir}`, 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
