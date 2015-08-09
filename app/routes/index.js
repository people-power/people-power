var express = require('express');
var router = express.Router();
var question = require('../models/question');
var user = require('../models/user')

router.get('/', function(req, res, next) {
  question.find({})
  .populate('createdBy')
  .exec(function(err, questions){
    if(!err){
      res.render('index', { title: 'Home', questions: questions });
    }
  })
});

module.exports = router;
