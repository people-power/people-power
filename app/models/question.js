var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = mongoose.Schema({
  user: { 
    _id: Schema.Types.ObjectId,
    firstname: String,
    lastname: String,
    username: String      
  },
  title: String,
  body: String,
  comments: [{
    _id: Schema.Types.ObjectId,
    body: String
  }],
  created: { type: Date, default: Date.now },
  meta: {
    votes: Number,
    favs: Number
  }  
});

module.exports = mongoose.model('Question', questionSchema);