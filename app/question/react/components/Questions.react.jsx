/** @jsx React.DOM */
var React = require('react');
var Question = require('./Question.react.jsx');

var Questions = React.createClass({

  // Render our tweets
  render: function(){

    // Build list items of single tweet components using map
    var content = this.props.questions.map(function(question, key){
      return (
        <Question question={question} />
      )
    });

    // Return ul filled with our mapped tweets
    return (
      <ul className="questions">{content}</ul>
    )

  }

});

module.exports = React.createFactory(Questions);