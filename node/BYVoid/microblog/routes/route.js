var express = require('express');
var router = express.Router();

// 首页
router.get('/', function(req, res, next) {
    res.render('index', {
        title: '首页',
        layout:'layout'
    });
});


// 用户主页
router.get('/users', function(req, res, next) {
    res.render('users',{
        title:'用户主页',
        layout:'layout'
    })
});

// 通过调用next()会将路由控制权转移给后面的规则
router.get('/users/:username',function(req,res,next){
    console.log('all methods captured');
    next();
});

// http://localhost:3000/users/name
router.get('/users/:username',function(req,res,next){
    res.send('user：' + req.params.username);
});


// 发表信息
router.get('/post', function(req, res, next) {
    res.render('post', {
        title: '发表信息',
        layout:'layout'
    });
});


// 用户注册
router.get('/reg', function(req, res, next) {
    res.render('reg', {
        title: '用户注册',
        layout:'layout'
    });
});

router.post('/reg',function(req, res, next){
    // res.send(req.body['password-repeat']);       //有下划线不能使用req.send.password-repeat
    // 检验用户两次输入的密码是否一致
    if(req.body['password'] != req.body['password-repeat']){
        req.flash('error','两次输入的口令不一致');
        return res.redirect('/reg');
    }
});


// 用户登录
router.get('/login', function(req, res, next) {
    res.render('login', {
        title: '用户登录',
        layout:'layout'
    });
});

router.post('/login',function(req,res,next){

});


// 用户登出
router.get('/logout', function(req, res, next) {
    res.render('logout', {
        title: '用户登出',
        layout:'layout'
    });
});


module.exports = router;