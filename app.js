var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const storesRouter = require('./routes/stores')
const cartRouter = require('./routes/cart')
const ordersRouter = require('./routes/orders');

// Set up Mongoose
const dbconn = process.env.NODE_ENV === 'production' ? config.db : config.db_dev;

// db=Heroku  db_dev= local mongodb
// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(dbconn, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + dbconn + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + dbconn);
  }
});

mongoose.Promise = global.Promise;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// All incoming requests will be parsed as json
app.use(bodyParser.json({type:'*/*'}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/stores', storesRouter)
// Serve static files from express app
// Add a virtual path point to real path 'public/images/products'
app.use('/pr', express.static('public/images/products'));
app.use('/cart', cartRouter);
// use /orders
app.use('/orders', ordersRouter)

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
