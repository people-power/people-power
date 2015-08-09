var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = Schema({
  title: String,
  tags: [String],
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  createdOn: { 
    type: Date, 
    default: Date.now 
  },
  content: String,
  answers: {
    type: [Schema.Types.ObjectId],
    ref: 'Answer'
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'Comment'  
  }
});  