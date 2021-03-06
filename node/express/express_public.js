/*

 Express 提供了内置的中间件 express.static 来设置静态文件如：图片， CSS, JavaScript 等。
 可以使用 express.static 中间件来设置静态文件路径。
 例如，如果你将图片， CSS, JavaScript 文件放在 public 目录下，
 你可以这么写：
 app.use(express.static('public'));

*/


var express = require('express');
var app = express();

// 静态文件目录
app.use(express.static('public'));
app.use(express.static('files'));       // 可以多次调用 express.static 中间件

// 虚拟（virtual）”目录（即目录根本不存在）
app.use('/static', express.static('public'));       // http://localhost:3000/static/css/style.css

app.get('/', function (req, res) {
    res.send('Hello World');
});

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});


//  http://127.0.0.1:8081/images/logo.jpg