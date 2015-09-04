mongoose = require('mongoose');
Comment = require('./comment')

var AnswerSchema = mongoose.Schema({
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User' 
  },
  createdOn: { 
    type: Date, default: Date.now 
  },
  content: { 
    type: String, required: true 
  },
  votes: { 
    type: Number, default: 0 
  },
  comments: {
    type: [Comment.schema], default: []
  }  
});

var Answer = module.exports = mongoose.model('Answer', AnswerSchema)

module.exports.createAnswer = function(answer, callback){
  var newAnswer = new Answer({
    createdBy: answer.createdBy,
    title: answer.title,
    content: answer.content
  });
  newAnswer.save(callback)
}