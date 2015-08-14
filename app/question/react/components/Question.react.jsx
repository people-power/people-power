/** @jsx React.DOM */
var React = require('react');

var Question = React.createClass({
  render: function(){
    var question = this.props.question;
    return (
      <li className={"question"}>
        <blockquote>
          <cite>
            <a href="#">{question.title}</a> 
            <span className="question-createdby">{question.createdBy.username}</span> 
          </cite>
          <span className="question-content">{question.content}</span>
        </blockquote>
      </li>
    )
  }
});

module.exports = React.createFactory(Question);