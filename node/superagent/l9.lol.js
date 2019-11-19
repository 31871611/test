/**

 npm install express --save-dev
 npm install superagent --save-dev
 npm install cheerio --save-dev

*/

var superagent = require('superagent');
var url = require('url');
var fs = require('fs');
var cheerio = require('cheerio');                // jq
var charset = require('superagent-charset');     // 解决乱码问题:

var l9 = "https://www.l9.lol";
var count = 66;
var page = 65;
var href = [];
var urlArr = [];

// 分页页面
function getPage(page){
    console.log("第" + page + "页");
    superagent.get(l9 + "/category/8.html?page=" + page).then(function(res){
        //加载html内容
        var $ = cheerio.load(res.text);
        var ele = $('.bounceInLeft');
        var arr = [];
        for(var j = 0;j < ele.length;j++){
            var a = url.resolve(l9,ele.eq(j).find("a").attr('href'));
            //href.push(a)
            arr.push(a)
        }
        return arr;
    }).then(function(res){
        getHref(res);
    }).catch(console.error);
}


// 子页面
function getHref(arr){
    console.log(arr)
    var subPage = 0;
    function funA(subPage){
        if(subPage < arr.length){
            superagent.get(arr[subPage]).then(function(res){
                //加载html内容
                var $ = cheerio.load(res.text);
                var html = $('.container').find(".panel-default").eq(1).find(".panel-body").eq(0).html();
                if(html){
                    //URL正则
                    var urlP= /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(:[0-9]+)?/;
                    console.log(arr[subPage])
                    var rxArr = html.match(urlP);
                    urlArr.push({
                        "url" : rxArr[0],
                        "href" : arr[subPage]
                    });
                }
                subPage++;
                // 等待1-10秒
                //var num = Math.floor(Math.random() * (5 - 1)) + 1;
                //setTimeout(function(){},num * 1000);
                funA(subPage);
            }).catch(console.error);
        }else{
            // 异步完成后做的事情
            if(page < count){
                page++;
                // 等2秒进入下一页
                var num = Math.floor(Math.random() * (10 - 1)) + 1;
                setTimeout(function(){
                    getPage(page);
                },num * 1000)
            }else{

            }
            // 写入文件
            fs.writeFile('input.txt', JSON.stringify(urlArr),  function(err) {
                if (err) {
                    return console.error(err);
                }
                console.log("数据写入成功！");
            });
        }
    }
    funA(subPage);

    /*
    arr.forEach(function(value,key){
        (function(value,key){
            // 等待5秒
            setTimeout(function(){
                superagent.get(value).then(function(res){
                    //加载html内容
                    var $ = cheerio.load(res.text);
                    var html = $('.container').find(".panel-default").eq(1).find(".panel-body").eq(0).html();
                    //URL正则
                    var urlP= /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(:[0-9]+)?/;
                    console.log(value)
                    var rxArr = html.match(urlP);
                    urlArr.push({
                        "url" : rxArr[0],
                        "href" : value
                    });
                    // 完成写入文件
                    if(key == (arr.length-1)){
                        // 下一页
                        if(page < count){
                            page++;
                            // 等2秒进入下一页
                            setTimeout(function(){
                                getPage(page);
                            },2000)
                        }else{
                            // 全部完成写入文件
                            fs.writeFile('input.txt', JSON.stringify(urlArr),  function(err) {
                                if (err) {
                                    return console.error(err);
                                }
                                console.log("数据写入成功！");
                            });
                        }
                        //if(page == count){}
                    }
                }).catch(console.error);
            },5000)
        })(value,key)
    })
    */
}

getPage(page);
