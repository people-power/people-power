var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  user: Schema.Types.ObjectId,
  body: String,
  created: { type: Date, default: Date.now },
  meta: {
    votes: Number,
    favs: Number
  }   
});