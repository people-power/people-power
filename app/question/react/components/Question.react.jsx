/** @jsx React.DOM */
var React = require('react');

var Question = React.createClass({
  render: function(){
    var question = this.props.question;
    return (
      <li className={"question"}>
        <blockquote>
          <cite>
            <h2><a href="#">{question.title}</a></h2> 
            <span className="question-createdby">Asked by: {question.createdBy.username} on {question.createdOn}</span> 
          </cite>
          <p className="question-content">{question.content}</p>
        </blockquote>
      </li>
    )
  }
});

module.exports = React.createFactory(Question);