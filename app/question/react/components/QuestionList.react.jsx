/** @jsx React.DOM */
var React = require('react');
var Questions = require('./Questions.react.jsx');

var QuestionList = React.createClass({
  // Set the initial component state
  getInitialState: function(props){
    props = props || this.props;
    // Set initial application state using props
    return {
      questions: props.questions,
    };
  },
  componentWillReceiveProps: function(newProps, oldProps){
    this.setState(this.getInitialState(newProps));
  },
  // Called directly after component rendering, only on client
  componentDidMount: function(){

    // Preserve self reference
    var self = this;

    // Initialize socket.io
    var socket = io.connect();

    // On tweet event emission...
    socket.on('question', function (data) {
        // Add a tweet to our queue
      self.addQuestion(data);

    });

  },
  addQuestion: function(question){

    // Get current application state
    var updated = this.state.questions;

    // Add tweet to the beginning of the tweets array
    updated.unshift(question);

    // Set application state
    this.setState({questions: updated});

  },
  // Render the component
  render: function(){ 
    return (
      <div className="questions-list">
        <Questions questions={this.state.questions} />
      </div>
    )
  }  
});

module.exports = React.createFactory(QuestionList);