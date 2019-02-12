var express = require('express');
var router = express.Router();

/* 发表信息 */
router.get('/', function(req, res, next) {
  res.render('post', {
    title: '发表信息',
    layout:'layout'
  });
});

module.exports = router;
