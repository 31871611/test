/*

 http小爬虫
 npm install cheerio         // cheerio是node.js版的 jQuery

 */

var fs = require('fs');
var http = require('http');
var promise = require('bluebird');
var cheerio = require('cheerio');
var baseUrl = 'http://www.imooc.com/learn/';
var videoIds = [348,259,197,134,75];
var html = '';


function filterChapters(html){
    var $ = cheerio.load(html);
    var chapters = $('.chapter');
    var title = $('.hd').children('h2').text();
    var number = parseInt($('.js-learn-num').text().trim(),10);

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


    var courserData = {
        'title' : title,
        'number' : number,
        'videos' : []
    };

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

        courserData.videos.push(chapterData);
    });

    return courserData;
}

var testHtml = '';
function printCourseInfo(courserData){
    courserData.forEach(function(courserData){
        console.log(courserData.number + '人学过' + courserData.title + '\n');
    });


    courserData.forEach(function(courserData){
        console.log('###' + courserData.title + '\n');

        courserData.videos.forEach(function(item){
            var chapterTitle = item.chapterTitle;
            console.log(chapterTitle + '\n');

            testHtml += chapterTitle + '\n';

            item.videos.forEach(function(video){
                console.log('【' + video.id + '】' + '【' + video.title + '】' + '\n');

                testHtml += '【' + video.id + '】' + '【' + video.title + '】' + '\n';
            });
        });

    });
    // 输出到文件
    fs.writeFile('test.html',testHtml);
}


function getPageAsync(url){
    return new promise(function(resolve,reject){
        console.log('正在抓取!');

        http.get(url,function(res){

            res.on('data',function(data){
                html += data;
            });

            res.on('end',function(){
                resolve(html);
                // var courserData = filterChapters(html);

                // printCourseInfo(courserData);
            }).on('error',function(){
                reject(e);
                console.log('获取课程数据出错！');
            })

        });

    });
}



var fetchCourseArray = [];
videoIds.forEach(function(id){
    fetchCourseArray.push(getPageAsync(baseUrl + id));
});


Promise
    .all(fetchCourseArray)
    .then(function(pages){
        var coursesData = [];

        pages.forEach(function(html){
            var courses = filterChapters(html);
            coursesData.push(courses);
        });

        coursesData.sort(function(a,b){
            return a.number < b.number;
        });

        printCourseInfo(coursesData);

    });






























