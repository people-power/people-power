var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport');
var userService = require('./services/user')

router.get('/register', function(req, res, next) {
  res.render('user/register', { layout: '../layout', title: 'People Power | Register' });
});

router.post('/register', function(req, res, next) {
  userCheck = userService.checkRegistration(req, next);
  if(userCheck.errors){
    res.render('user/register', { errors: userCheck.errors });
  } else {
    User.createUser(userCheck, function(err, user){
      if(err) throw err;
      userService.resizeImage(userCheck, function(){
        req.login(user, function(err) {
          res.redirect('/');
        });
      });
    });
  }   
});

router.get('/login', function(req, res, next) {
  res.render('user/login', { title: 'People Power | Login', message: req.flash('error') } );
});

router.post('/login', 
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/user/login', 
    failureFlash: true
  }) 
);

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You have logged out')
  res.redirect('/')
});

module.exports = router;