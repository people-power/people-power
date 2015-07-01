var express = require('express');
var router = express.Router();
var passport = require('passport');
var questionService = require('../models/services/questionService')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { user: req.user });
});

router.get('/login', function(req, res, next){
  res.render('login.ejs', { message: req.flash('loginMessage') });
}); 

router.get('/signup', function(req, res, next) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile.ejs', {
    user : req.user // get the user out of session and pass to template
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

router.post('/create_question', function(req, res){
  res.body
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;