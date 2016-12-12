/*

 在表单中通过 GET 方法提交两个参数，我们可以使用 process_get 路由器来处理输入：

*/


var express = require('express');
var app = express();

// post请求使用
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// post请求使用.end

app.use(express.static('public'));

app.get('/', function (req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + '/' + 'express_demo4.html');
});

app.get('/process_get',function(req,res){
    // 输出json格式
    response = {
        first_name : req.query.first_name,
        last_name : req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});


app.post('/process_post',urlencodedParser,function(req,res){
    // 输出json格式
    response = {
        first_name : req.body.first_name,
        last_name : req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});


var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});


// node express_demo4.js
// http://localhost:8081/express_demo4.html