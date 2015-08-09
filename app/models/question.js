mongoose = require('mongoose');
Answer = require('./answer');
Comment = require('./comment')

var QuestionSchema = new mongoose.Schema({
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User' 
  },
  createdOn: { 
    type: Date, default: Date.now 
  },
  title: {
    type: String, required: true
  },
  text: { 
    type: String, required: true 
  },
  votes: { 
    type: Number, default: 0 
  },
  tags: {
    type : Array , default: []
  },
  answers: [Answer.schema],
  comments: [Comment.schema]
});

var Question = module.exports = mongoose.model('Question', QuestionSchema)

module.exports.createQuestion = function(question, callback){
  var newQuestion = new Question({
    createdBy: question.createdBy,
    text: question.text,
    tags: question.tags
  });
  newQuestion.save(callback)
}