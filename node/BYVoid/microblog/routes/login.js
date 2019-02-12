var express = require('express');
var router = express.Router();

/* 用户登录 */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: '用户登录',
    layout:'layout'
  });
});

module.exports = router;
