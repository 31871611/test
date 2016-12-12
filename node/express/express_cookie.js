/*

 使用中间件向 Node.js 服务器发送 cookie 信息，以下代码输出了客户端发送的 cookie 信息

*/

var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

app.get('/',function(req,res){
    // 设置cookie，后不为空
    res.cookie('user','qq');
    console.log("Cookies: ", req.cookies);
    res.send('cookie');
});

app.listen(8081);


// http://localhost:8081/
// cookie空的