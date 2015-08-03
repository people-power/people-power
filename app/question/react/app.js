var React = require('react');
var QuestionList = require('./components/QuestionList.react');
var initialState = JSON.parse(document.getElementById('questions-json').innerHTML)

React.render(
  <QuestionList questions={initialState}/>,
  document.getElementById('question-list')
);
