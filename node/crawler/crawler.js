/*

    http小爬虫
    npm install cheerio         // cheerio是node.js版的 jQuery

*/

var fs = require('fs');
var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';
var html = '';


function filterChapters(html){
    var $ = cheerio.load(html);
    var chapters = $('.chapter');

/*
    //需要格式风格
    [{
        chapterTitle:'',
        videos:[
            title:'',
            id:''
        ]
    }]
*/

    var courserData = [];
    chapters.each(function(index,item){
        // 会反复声明变量，可在函数顶部先定义
        var chapter = $(item);
        // 获取相关节点内容
        var chapterTitle = chapter.find('strong').text().replace(/\s*\r\n\s*/g,"");
        var videos = chapter.find('.video').children('li');
        var chapterData = {
            chapterTitle : chapterTitle,
            videos : []
        };

        videos.each(function(index,item){
            var video = $(item).find('.J-media-item');
            var videoTitle = video.text().replace(/\s*\r\n\s*/g,"");
            var id = video.attr('href').split('video/')[1];
            chapterData.videos.push({
                title : videoTitle,
                id : id
            });

        });

        courserData.push(chapterData);
    });

    return courserData;
}

var testHtml = '';
function printCourseInfo(courserData){
    courserData.forEach(function(item){
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle + '\n');

        testHtml += chapterTitle;

        item.videos.forEach(function(video){
            console.log('【' + video.id + '】' + '【' + video.title + '】' + '\n');

            testHtml += '【' + video.id + '】' + '【' + video.title + '】';
        });

    });
    // 输出到文件
    fs.writeFile('test.html',testHtml);
}


http.get(url,function(res){

    res.on('data',function(data){
        html += data;
    });

    res.on('end',function(){
        var courserData = filterChapters(html);

        printCourseInfo(courserData);

    }).on('error',function(){
        console.log('获取课程数据出错！');
    })

});


















