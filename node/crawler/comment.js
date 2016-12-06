/*

    http://www.imooc.com/video/8837

*/

var http = require('http');
var querystring= require('querystring');

// 需要发送的内容
var postData = querystring.stringify({
    "content" : "测试下能不能成功了",
    "mid" : 348
});

var options = {
    hostname : 'www.imooc.com',
    port : 80,
    path : '/course/docomment',
    method : 'POST',
    headers : {
        'Accept' : 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding' : 'gzip, deflate',
        'Accept-Language' : 'zh-CN,zh;q=0.8',
        'Connection' : 'keep-alive',
        'Content-Length' : postData.length,
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie' : 'imooc_uuid=df769cc8-aeba-45d3-9dac-47fe04300b65; imooc_isnew_ct=1471417367; loginstate=1; apsid=g3YTgxYzViNzM4YzdhZTdjMjA5MWQ4NzgzZTI0NDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDQ2Njk0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABidG5hbWVAMTYzLmNvbQAAAAAAAAAAAAAAAAAAAAAAAGIwY2FiZmI0NWU1ZGNhM2UyMmU1YzA1NDljOTBhOTBkoBZFWKAWRVg%3DMT; last_login_username=btname%40163.com; PHPSESSID=o2rs4tv2rrcjagbu03ptgfkcr2; jwplayer.volume=44; imooc_isnew=2; cvde=58465304a9101-64; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1479277066,1480922772,1480987259,1481003777; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1481016201; IMCDNS=0',
        'Host' : 'www.imooc.com',
        'Origin' : 'http://www.imooc.com',
        'Referer' : 'http://www.imooc.com/comment/348',
        'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
        'X-Requested-With' : 'XMLHttpRequest'
    }
};

var req = http.request(options ,function(res){
    console.log('status：' + res.statusCode);
    console.log('headers：' + JSON.stringify(res.headers));

    res.on('data',function(chunk){
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    });

    res.on('end',function(){
        console.log('评论完毕！');
    });

});

req.on('error',function(e){
    console.log('Error：' + e.message);
});

req.write(postData);

req.end();

