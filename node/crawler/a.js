var fs = require('fs');
var async = require('async');


var superagent = require('superagent');
var charset = require('superagent-charset');    // 解决乱码问题:
var url = require('url');
var cheerio = require('cheerio');
charset(superagent);
var eventproxy = require('eventproxy');         //流程控制
var ep = eventproxy();


var baseUrl = 'https://cnodejs.org/';


var date = {
    'title' : 'cnodejs',
    'newMovieData' : [],
    'fineNewData' : []
};


/*

    Async, Promise, EventProxy 优劣，哪个更适合服务端用来减少回调
    功能相同

*/



var list = [];


superagent
    .get(baseUrl)
    .end(function(err,res){
        if(err) return console.log(err);
        //加载html内容
        var $ = cheerio.load(res.text);
        var ele = $('#topic_list').find('a.topic_title');
        var title;
        var href;

        //for(var i = 0;i < ele.length;i++){
        for(var i = 0;i < 10;i++){
            title = ele.eq(i).text().trim();
            href = url.resolve(baseUrl,ele.eq(i).attr('href'));
            date.newMovieData.push({
                'title' : title,
                'href' : href
            });
        }


        // 命令 ep 重复监听 emit事件(get_topic_html)，当get_topic_html爬取完毕之后执行
        ep.after('get_topic_html', 1, function (html) {


            html.forEach(function(url){
                console.log(url[1]);
            });


            //加载html内容
            //var $ = cheerio.load(html);

            //console.log(date.newMovieData[count].title);
            //date.newMovieData[count].down = $('.from-solarhell').text();
            //list.push($('.reply_content').eq(0).text().trim());
            //console.log($('.reply_content').eq(0).text().trim());

            // 利用callback函数将结果返回去，然后在结果中取出整个结果数组。
                // 一次一次分别载入.5条
                // console.log(myurl.href);


                //console.log(count);

                // 异步造成数据顺序错乱


            //根据随机时间一条一条请求 i不能长于数据列表
            //date.newMovieData[i].down = '下载';

        });


        // 处理下一级url.也有url、标题、本页面内容
        // 如果保存到数据库。列表页与详情页怎么关系。异步造成顺序错乱
        for(var i = 0;i < date.newMovieData.length;i++){
            // 随机时间
            var delay = parseInt((Math.random() * 10000000) % 2000, 10);
/*
            (function(i){
                //一次并发length条
                //console.log(i);
                setTimeout(function(){
                    //随机时间并发，顺序随机
                    console.log(i);
                },delay);
            })(i);
*/

            //(function(i){})(i)
                superagent
                    .get(date.newMovieData[i].href)
                    .end(function(err,res){
                        if(err) return console.log(err);
                        console.log(date.newMovieData[i].href + '|' + i);
                        // 要放在ep.after后面.放在请求完
                        ep.emit('get_topic_html', [res.text,i]);
                    });


        }



        // console.log(date);

    });




/*

 eventproxy 就起到了这个计数器的作用，它来帮你管理到底这些异步操作是否完成，
 完成之后，它会自动调用你提供的处理函数，并将抓取到的数据当参数传过来。


 got_file事件名
 ep 重复监听次数


ep.after('got_file', 2, function (list) {
    // 在所有文件的异步执行结束后将被执行
    // 所有文件的内容都存在list数组中
    console.log(list);
});
for (var i = 0; i < files.length; i++) {

    // 触发结果事件
    // 参数2：需要传入的数据内容
    ep.emit('got_file', files[i]);

}

*/

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