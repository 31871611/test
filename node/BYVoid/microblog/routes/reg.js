var express = require('express');
var router = express.Router();

/* 用户注册 */
router.get('/', function(req, res, next) {
  res.render('reg', {
    title: '用户注册',
    layout:'layout'
  });
});



module.exports = router;
