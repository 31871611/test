


var express = require('express');
var app = express();
var fs = require('fs');

// post请求使用
var bodyParser = require('body-parser');
// multer 实现文件上传
var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:'/tmp/'}).array('image'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + 'express_file_upload.html');
});


app.post('/file_upload',function(req,res){

    console.log('上传信息：' + req.files[0]);

    //var des_file = __dirname + '/' + req.files[0].originalname;
    var des_file = __dirname + '/public/images/' + req.files[0].originalname;

    // 读取选择的图片
    fs.readFile(req.files[0].path,function(err,data){
        // 写入一个文件
        fs.writeFile(des_file,data,function(err){
            if(err){
                console.log(err);
            }else{
                response = {
                    message : '文件上传成功！',
                    filename : req.files[0].originalname
                }
            }
            console.log(response);
            res.send(JSON.stringify(response));
        })
    })

});




var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});