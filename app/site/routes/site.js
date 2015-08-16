var express = require('express'),
    router = express.Router(),
    JSX = require('node-jsx').install({
      extension: '.jsx'
    }),
    React = require('react'),
    Question = require.main.require('./app/question/models/question'),
    QuestionList = require.main.require("./app/question/react/components/QuestionList.react.jsx");

router.get('/', function(req, res, next) {
  Question.getQuestions(function(questions){
    var markup = React.renderToString(
      QuestionList({
        questions: questions
      })
    );
    console.log(questions)
    res.render('index', { 
      title: 'People Power | Home',
      markup: markup,
      state: JSON.stringify(questions) 
    });
  });   
});

module.exports = router;