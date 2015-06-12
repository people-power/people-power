module.exports = function(app, passport){
  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index.ejs', { user: req.user });
  });

  app.get('/login', function(req, res, next){
    res.render('login.ejs', { message: req.flash('loginMessage')})
  }); 

  app.get('/signup', function(req, res, next) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
};  

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}

