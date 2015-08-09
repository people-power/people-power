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
  content: { 
    type: String, required: true 
  },
  votes: { 
    type: Number, default: 0 
  },
  tags: {
    type : Array , default: []
  },
  answers: {
    type: [Answer.schema], default: []
  },
  comments: {
    type: [Comment.schema], default: []
  }  
});

var Question = module.exports = mongoose.model('Question', QuestionSchema)

module.exports.createQuestion = function(question, callback){
  var newQuestion = new Question({
    createdBy: question.createdBy,
    title: question.title,
    content: question.content,
    tags: question.tags
  });
  newQuestion.save(callback)
}