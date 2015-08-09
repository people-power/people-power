var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport');
var userService = require('./services/user')

router.get('/register', function(req, res, next) {
  res.render('user/register', { 
    layout: '../layout', 
    title: 'People Power | Register', 
    message: req.flash('error') 
  });
});

router.post('/register', function(req, res, next){
  userCheck = userService.checkRegistration(req)
  if(userCheck.errors){
    return res.render('user/register', { 
      errors: userCheck.errors,
      message: req.flash('error'),
      title: 'People Power | Register'
    })
  }
  User.isValueUnique({username: req.body.username}, function(err, user){
    if(user){
      return res.render('user/register', { message: 'Username already taken. Please choose another.', title: 'People Power | Register' });  
    }else{
      User.isValueUnique({ email: req.body.email }, function(err, user){
        if(user){
          return res.render('user/register', { message: 'Email already registered. Please try again.', title: 'People Power | Register' }); 
        } else{
          User.createUser(userCheck, function(err, user){
            if(err) throw err;
            userService.resizeImage(userCheck, function(){
              req.login(user, function(err){
                req.flash('success', 'You have registered successfully, and are now logged in!')
                res.redirect('/')
              })
            });
          });
        }             
      })
    }   
  })             
});

router.get('/login', function(req, res, next) {
  res.render('user/login', { 
    title: 'People Power | Login', 
    message: req.flash('error') 
  });
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