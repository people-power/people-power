mongoose = require('mongoose');
Comment = require('./comment')

var AnswerSchema = new mongoose.Schema({
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User' 
  },
  createdOn: { 
    type: Date, default: Date.now 
  },
  text: { 
    type: String, required: true 
  },
  votes: { 
    type: Number, default: 0 
  },
  comments: [Comment.schema]
});

var Answer = module.exports = mongoose.model('Answer', AnswerSchema)

module.exports.createQuestion = function(answer, callback){
  var newAnswer = new Answer({
    createdBy: answer.createdBy,
    text: answer.text
  });
  newQuestion.save(callback)
}