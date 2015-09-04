var express = require('express');
var router = express.Router();
var tags = require('../models/tags.json');
var Comment = require('../models/comment');
var Answer = require('../models/answer');
var Question = require('../models/question');
var questionService = require('./services/question')

router.get('/ask', function(req, res, next){
  res.render('question/ask', {title: 'People Power | Ask', tags: tags})
});

router.post('/ask', function(req, res, next){
  questionCheck = questionService.checkQuestion(req)
  if(questionCheck.errors){
    res.render('question/ask', {
      title: 'People Power | Ask', 
      tags: tags, 
      errors: questionCheck.errors })
  } else {
    Question.createQuestion(questionCheck, function(err, question){
      if(err){ console.log(err) }
      console.log("question posted:" + question)
      // questionService.io.emit('question', question);
      req.flash('Your question was posted successfully');
      res.redirect('/');
    })
  }

});

module.exports = router;