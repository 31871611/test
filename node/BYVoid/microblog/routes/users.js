var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// 通过调用next()会将路由控制权转移给后面的规则
router.get('/:username',function(req,res,next){
  console.log('all methods captured');
  next();
});

// http://localhost:3000/users/name
router.get('/:username',function(req,res,next){
  res.send('user：' + req.params.username);
});

module.exports = router;
