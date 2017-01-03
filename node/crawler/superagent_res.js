/**

 npm install express --save-dev
 npm install superagent --save-dev
 npm install cheerio --save-dev
 npm install eventproxy --save-dev
 npm install async --save-dev

 使用 superagent 与 cheerio 完成简单爬虫

*/

var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var url = require('url');
var async = require('async');

var cnodeUrl = 'https://cnodejs.org/';

// 建立 express 实例
var app = express();


/*

// app 本身有很多方法，其中包括最常用的 get、post、put/patch、delete，在这里我们调用其中的 get 方法，为我们的 `/` 路径指定一个 handler 函数。
// 这个 handler 函数会接收 req 和 res 两个对象，他们分别是请求的 request 和 response。
// request 中包含了浏览器传来的各种信息，比如 query 啊，body 啊，headers 啊之类的，都可以通过 req 对象访问到。
// res 对象，我们一般不从里面取信息，而是通过它来定制我们向浏览器输出的信息，比如 header 信息，比如想要向浏览器输出的内容。这里我们调用了它的 #send 方法，向浏览器输出一个字符串。
app.get('/',function(req,res,next){
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    superagent.get('https://cnodejs.org/').end(function(err,sres){
        if(err) return next(err);
        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
        // 剩下就都是 jquery 的内容了
        var $ = cheerio.load(sres.text);
        var items = [];
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            items.push({
                title: $element.attr('title'),
                href: $element.attr('href')
            });
        });
        res.send(items);
    })
});


app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});

*/


/**/

// 获取下一级url与评论内容
superagent.get(cnodeUrl).end(function(err,res){
    if(err) return console.log(err);
    // console.log(res.statusCode);         //请求
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    // 获取首页所有的链接
    $('#topic_list .topic_title').each(function(idx,element){
        var $element = $(element);
        // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
        // 我们用 url.resolve 来自动推断出完整 url，变成
        // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
        // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
        var href = url.resolve(cnodeUrl,$element.attr('href'));
        topicUrls.push(href);
    });
    // 所有下一级链接
    //console.log(topicUrls);


    // 得到一个 eventproxy 的实例
    // https://github.com/JacksonTian/eventproxy#%E9%87%8D%E5%A4%8D%E5%BC%82%E6%AD%A5%E5%8D%8F%E4%BD%9C
    var ep = new eventproxy();
    // 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
    ep.after('topic_html',topicUrls.length,function(urlList){
        // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair

        urlList = urlList.map(function(html){
            // 接下来都是 jquery 的用法了
            var htmlUrl = html[0];
            var htmlText = html[1];
            var index = html[2];
            var $ = cheerio.load(htmlText);
            return({
                title: $('.topic_full_title').text().trim(),
                href: htmlUrl,
                comment1: $('.reply_content').eq(0).text().trim()
            })
        });

        console.log('final:');
        console.log(urlList);
    });

    // 所有下一级链接
    topicUrls.forEach(function(url,index){
        // 一次性发了 40 个并发请求出去
        superagent.get(url).end(function(err,res){
            // 请求造成异步.顺序错乱了
            console.log('fetch ' + url + ' successful' + '|' + index);
            // 参数2：需要传入的数据内容
            ep.emit('topic_html',[url,res.text,index]);
        })
    })

});




/*

// 需要测试的url
var urls = [];
for(var i = 0; i < 30; i++) {
    urls.push('http://datasource_' + i);
}

var concurrencyCount = 0;
var fetchUrl = function (url, callback) {
    // 随机时间
    var delay = parseInt((Math.random() * 10000000) % 2000, 10);
    // 叠加数.提示.没有功能意义
    concurrencyCount++;

    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');

    // 5条以后根据随机时间一条一条请求
    setTimeout(function () {
        //concurrencyCount--;
        callback(null, url + ' html content');
    }, delay);
};

// 一次请求5条
async.mapLimit(urls, 5, function (url, callback) {
    fetchUrl(url, callback);
}, function (err, result) {
    console.log('final:');
    console.log(result);        // 输出：['http://datasource_1 html content','http://datasource_2 html content',...]
});

*/
