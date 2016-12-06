// http小爬虫


var http = require('http');
var url = 'http://www.imooc.com/learn/348';
var html = '';

http.get(url,function(res){

    res.on('data',function(data){
        html += data;
    });

    res.on('end',function(){
        console.log(html);
    }).on('error',function(){
        console.log('获取课程数据出错！');
    })

});


















