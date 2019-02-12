var express = require('express');
var router = express.Router();

/* 用户登出 */
router.get('/', function(req, res, next) {
  res.render('logout', {
    title: '用户登出',
    layout:'layout'
  });
});

module.exports = router;
