mongoose = require('mongoose');
Comment = require('./comment')

var CommentSchema = mongoose.Schema({
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
  } 
});

var Comment = module.exports = mongoose.model('Comment', CommentSchema)

module.exports.createComment = function(comment, callback){
  var newComment = new Comment({
    createdBy: comment.createdBy,
    title: comment.title,
    content: comment.content,
    tags: comment.tags
  });
  newComment.save(callback)
}