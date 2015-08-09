mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
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
  }
});

var Comment = module.exports = mongoose.model('Comment', CommentSchema)

module.exports.createComment = function(comment, callback){
  var newComment = new Comment({
    createdBy: comment.createdBy,
    text: comment.text,
  });
  newQuestion.save(callback)
}