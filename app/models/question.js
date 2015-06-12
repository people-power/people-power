var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
  user: { 
    _id: Schema.Types.ObjectId,
    firstname: String,
    lastname: String,
    username: String      
  },
  body: String,
  comments: [{
    _id: Schema.Types.ObjectId
    body: String
  }],
  created: { type: Date, default: Date.now },
  meta: {
    votes: Number,
    favs: Number
  }  
});

module.exports = mongoose.model('Question', questionSchema);