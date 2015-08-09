var express = require('express');
var router = express.Router();
var categories = require('../json/categories.json');
var Question = require('../models/question');

router.get('/ask', function(req, res, next) {
  res.render('questions/createQuestion', { title: 'Ask', categories: categories })
});

router.post('/ask', function(req, res, next) {
  var question = {
    text: req.body.text,
    tags: req.body.tags,
    createdBy: req.user
  }
  Question.createQuestion(question, function(err, question){
    if(err) {
      res.redirect('/ask');
    } else {
      res.redirect('/question/' + question._id);
    }
  })
});

module.exports = router;