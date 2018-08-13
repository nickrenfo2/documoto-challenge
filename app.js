const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const compress     = require('compression');
const minify       = require('express-minify');
const http = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(logger('dev'));
app.use(compress());
app.use(minify());


// view engine setup
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'pug');




const indexRouter = require('./routes/index');

app.use('/', indexRouter);//index is the last, because it has the catch-all route

const port = 5001;
const server = http.listen(port, () => {
	console.log('listening on port:',server.address().port);
});

module.exports = app;