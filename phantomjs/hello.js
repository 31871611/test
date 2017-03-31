/*

 操作DOM、事件捕获、用户事件模拟

*/


// webpage是phantomjs的核心模块之一，给用户提供了访问、操作、选择web文档的接口
var page = require('webpage').create();
// 设置编码格式
phantom.outputEncoding="gbk";
//viewportSize being the actual size of the headless browser
//page.viewportSize = { width: 1024, height: 768 };
//the clipRect is the portion of the page you are taking a screenshot of
//page.clipRect = { top: 0, left: 0, width: 1024, height: 768 };

// 当页面去请求一个资源时，会触发onResourceRequested()方法的回调函数。
//page.onResourceRequested = function(requestData, networkRequest) {
//    console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
//};
// page.open函数，其中第一个参数是你要访问的url，第二个参数是一个回调函数。在回调函数里我们检查了下返回的状态，如果是success那么我们就将浏览的url制定文档的title打印出来，如你所见，如果不是那么打印文档加载出错
page.open("http://www.cnblogs.com/front-Thinking", function(status) {
    if ( status === "success" ) {

/*
        console.log(page.title);
        // 加载并且将它保存为一张图片，第二个可选参数是一个JSON对象，format指定图片格式，quality指定0-100区间内的图片质量，必须是整数
        page.render('example.jpg',{format: 'jpeg', quality: '100'});

        // dom节点
        var content = page.evaluate(function () {
            var element = document.querySelector('#blog_nav_sitehome');
            return element.textContent;
        });
        console.log(content);
*/

        page.render('example.jpg',{format: 'jpeg', quality: '100'});


    } else {
        console.log("Page failed to load.");
    }

    // 退出phantomjs执行环境
    phantom.exit(0);
});