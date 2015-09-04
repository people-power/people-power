var express = require('express');
var router = express.Router();

exports.checkQuestion = function(req){
  var createdBy = req.user;
  var title = req.body.title;
  var content = req.body.question_content;
  var tags = req.body.tags;
  req.checkBody('title', 'Please create a title to your question.').notEmpty();
  req.checkBody('question_content', 'Please create the main body of your question.').notEmpty();  
  return {
    errors: req.validationErrors(),
    createdBy: createdBy,
    title: title,
    content: content,
    tags: tags
  } 
}

exports.io = function(io){
  return io;
}