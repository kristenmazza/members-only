const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const connection = require('./config/database');
const passport = require('passport');
const compression = require('compression');
const helmet = require('helmet');

require('dotenv').config();

const indexRouter = require('./routes/index');
const messageRouter = require('./routes/message');

const app = express();

app.use(compression()); // Compress all routes
app.use(helmet()); // Protect against well-known vulnerabilities

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session setup
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// Passport authentication
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

// Adds session error message from Passport
// to res.locals to access it in the views
// req.session.messages accumulates all error messages,
// so we access the last (most recent) index
app.use((req, res, next) => {
  if (req.session.messages) {
    res.locals.errorMessage = req.session.messages.at(-1);
  }
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/message', messageRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
