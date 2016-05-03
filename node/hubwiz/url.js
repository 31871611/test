
/*
    //parse函数的作用是解析url，返回一个json格式的数组

    var url=require("url");
    var result=url.parse("http://www.baidu.com");
    console.log(result);
*/


/*
    //parse函数的第二个参数是布尔类型，当参数为true时，会将查询条件也解析成json格式的对象。
    //为true时，query为对象

    var url=require("url");
    var result=url.parse("http://www.baidu.com?page=1",true);
    console.log(result);
*/

/*
    //parse函数的第三个参数也是布尔类型的，当参数为true，解析时会将url的"//"和第一个"/"之间的部分解析为主机名，示例如下：

    var url=require("url");
    var result=url.parse("http://www.baidu.com/news?page=1",true,true);
    console.log(result);
*/


/*
    //format函数的作用与parse相反，它的参数是一个JSON对象，返回一个组装好的url地址
    var url=require('url');
    var result=url.format({
        protocol: 'http:',
        hostname:'www.baidu.com',
        port:'80',
        pathname :'/news',
        query:{page:1}
    });
    console.log(result);
*/


/*
//resolve函数的参数是两个路径，第一个路径是开始的路径或者说当前路径，第二个则是想要去往的路径，返回值是一个组装好的url
var url = require('url');

url.resolve('http://example.com/', '/one')  // 'http://example.com/one'
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
*/


