//for relative paths use require.main.require('app/models/article')
// server setup
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var multer = require('multer');
var gm = require('gm')
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var http = require('http');
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at ', host, port);
});
var io = require('socket.io').listen(server);
server.listen(port);

//db
var mongo = require('mongodb');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

// view engine setup
app.set('views', path.join(__dirname, './browser/views'));
app.engine('html', require('jade').renderFile);
app.set('view engine', 'jade');

//general
app.use(favicon(__dirname + '/browser/images/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './app/user/uploads/' }).single('profileimage'));
app.use('/uploads', express.static(__dirname + '/app/user/uploads'));

//validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//express sessions
app.use(session(
  {
    secret: 'secret',
    saveUninitialized: false,
    resave: false
  }
));

//passport
app.use(passport.initialize());
app.use(passport.session());
require('./app/user/routes/services/passport')(passport);

//current user
app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

//flash messages
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// pipeline
app.use('/browser', express.static(__dirname + '/browser'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

var site = require('./app/site/routes/site');
var user = require('./app/user/routes/user');
var question = require('./app/question/routes/question');

//routes
app.use('/', site);
app.use('/user', user);
app.use('/question', question);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;