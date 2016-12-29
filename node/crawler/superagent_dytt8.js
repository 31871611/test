/*

 http://www.cnblogs.com/xianyulaodi/p/6075661.html
 使用superagent抓取电影天堂

 npm install superagent-charset --save-dev

*/

var superagent = require('superagent');
var charset = require('superagent-charset');    // 解决乱码问题:
var url = require('url');
var cheerio = require('cheerio');
charset(superagent);                            // 不添加会报错
var async = require('async');                   //异步抓取
var eventproxy = require('eventproxy');         //流程控制
var ep = eventproxy();
var express = require('express');
var app = express();


var baseUrl = 'http://www.dytt8.net';       //迅雷首页链接
var newMovieLinkArr=[];                     //存放新电影的url
var errLength=[];                           //统计出错的链接数
var highScoreMovieArr=[];                   //高评分电影


/*
    //需要格式风格
    courserData = {
        'title' : '标题',
        'number' : '学习过的人数',
        'videos' : [{
            chapterTitle:'',
            videos:[
                'title' : '',
                'id' : ''
            ]
        }]
    }
*/

var movie = {
    'title' : '电影天堂',
    'newMovieData' : [],
    'fineNewData' : []
};



app.get('/',function(req,res,next){
    superagent
        .get(baseUrl)
        .charset('gb2312')
        .end(function(serr,sres){
            if(serr) return console.log(err + '错误');
            //加载html内容
            var $ = cheerio.load(sres.text);
            // 获取左侧栏除了第1部的电影.最新发布170部影视，注意去重
            getIndexLeftNew($);

            // 获取中间新片精品
            getCenterNewUrl($);

            /*
                程控制语句
                当首页左侧的链接爬取完毕之后，我们就开始爬取里面的详情页
                对获取到的电影详情页进行爬虫，提取有用信息，比如电影的下载链接，这个是我们所关心的。
            */
            ep.emit('get_topic_html', 'get '+baseUrl+' successful');


            res.send(movie);
        });


}).listen(3000, function (req, res) {
    console.log('http://localhost:3000');
});


// 获取首页中左侧栏的所有链接
function getIndexLeftNew($){
    var leftNewUrl = $('.co_content2').eq(0).find('a');
    var title;
    var href;
    // 从第一条开始获取
    for(var i = 1;i < leftNewUrl.length;i++){
        title = leftNewUrl.eq(i).text();    // 标题
        href = url.resolve(baseUrl,leftNewUrl.eq(i).attr('href'));      // 拼接url
        // 注意去重
        if(href.indexOf(url) == -1){
            movie.newMovieData.push({
                title : title,
                url : href
            });
        }
    }
    //console.log(movie.newMovieData);
}


// 获取中间新片精品
function getCenterNewUrl($){
    var centerNewUrl = $('.co_content8').eq(0).find('tr');
    var title;
    var href;
    for(var i = 0;i < centerNewUrl.length;i++){
        title = centerNewUrl.eq(i).find('a').eq(1).text();
        href = url.resolve(baseUrl,centerNewUrl.eq(i).find('a').eq(1).attr('href'));
        movie.fineNewData.push({
            title : title,
            url : href
        });
    }
    //console.log(movie.fineNewData);
}


/*

    只处理了newMovieLinkArr存放新电影的url

*/


// 命令 ep 重复监听 emit事件(get_topic_html)，当get_topic_html爬取完毕之后执行
ep.after('get_topic_html', 1, function (eps) {
    var concurrencyCount = 0;
    var num=-4;     //因为是5个并发，所以需要减4

    // 利用callback函数将结果返回去，然后在结果中取出整个结果数组。
    var fetchUrl = function (myurl, callback) {
        var fetchStart = new Date().getTime();
        concurrencyCount++;
        num += 1;
        console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', myurl);
        superagent
            .get(myurl)
            .charset('gb2312') //解决编码问题
            .end(function (err, ssres) {

                if (err) {
                    callback(err, myurl + ' error happened!');
                    errLength.push(myurl);
                    return next(err);
                }

                var time = new Date().getTime() - fetchStart;
                console.log('抓取 ' + myurl + ' 成功', '，耗时' + time + '毫秒');
                concurrencyCount--;

                var $ = cheerio.load(ssres.text);

                // 对获取的结果进行处理函数....
                getDownloadLink($,function(obj){
                    res.write('<br/>');
                    res.write(num+'、电影名称-->  '+obj.movieName);
                    res.write('<br/>');
                    res.write('迅雷下载链接-->  '+obj.downLink);
                    res.write('<br/>');
                    res.write('详情链接-->  <a href='+myurl+' target="_blank">'+myurl+'<a/>');
                    res.write('<br/>');
                    res.write('<br/>');
                });
                var result = {
                    movieLink: myurl
                };
                callback(null, result);
            });
    };

    // 控制最大并发数为5，在结果中取出callback返回来的整个结果数组。
    // mapLimit(arr, limit, iterator, [callback])
    async.mapLimit(movie.fineNewData, 5, function (myurl, callback) {
        fetchUrl(myurl, callback);
    }, function (err, result) {
        // 爬虫结束后的回调，可以做一些统计结果
        console.log('抓包结束，一共抓取了：' + movie.fineNewData.length+'条数据');
        console.log('出错：' + errLength.length+'条数据');
        console.log('新片精品：' + movie.fineNewData.length);
        return false;
    });

});