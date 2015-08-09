var express = require('express');
var router = express.Router();

router.get('/ask', function(req, res, next){
  res.render('question/ask', {title: 'People Power | Ask'})
});

module.exports = router;