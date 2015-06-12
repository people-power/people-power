// server setup
var express = require('express');
var app = express();
var path = require('path');
// var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var routes = require('./app/routes/index');

// var port = process.env.PORT || 3000;
// var server = app.listen(port, function () {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log('People Power listening at ', host, port);
// });

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// pipeline
app.use(express.static(path.join(__dirname, '/app/public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(session({ secret: 'peoplepowersecrets' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes/index.js')(app, passport); // load our routes and pass in our app and fully configured passport

//routes
// app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;