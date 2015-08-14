/** @jsx React.DOM */
var React = require('react');
var initialState = JSON.parse(document.getElementById('questions-json').innerHTML);
var QuestionList = require.main.require("./app/question/react/components/QuestionList.react.jsx");

React.render(
  <QuestionList questions={initialState}/>,
  document.getElementById('question-list')
);
