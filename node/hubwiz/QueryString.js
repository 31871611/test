/*

    Query String模块用于实现URL参数字符串与参数对象之间的互相转换，
    提供了"stringify"、"parse"等一些实用函数来针对字符串进行处理，
    通过序列化和反序列化

*/


/*

    // stringify函数的作用就是序列化对象，将对象类型转换成一个字符串类型（默认的分割符（"&"）和分配符（"="））
    // 例1：querystring.stringify("对象")

    var querystring= require('querystring');
    var result = querystring.stringify({foo:'bar',cool:['xux', 'yys']});
    console.log(result);    // foo=bar&cool=xux&cool=yys

*/


/*

    // stringify函数的多参数用法
    // 例1：querystring.stringify("对象"，"分隔符"，"分配符")

    var querystring = require('querystring');
    var result = querystring.stringify({foo:'bar',cool:['xux', 'yys']},'*','$');
    console.log(result);    // foo$bar*cool$xux*cool$yys

*/

/**********************************************************************************************/

/*

    // 反序列化函数——parse函数
    // parse函数的作用就是反序列化字符串（默认是由"="、"&"拼接而成），转换得到一个对象类型
    // 例1：querystring.parse("字符串")

    var querystring = require('querystring');
    var result = querystring.parse('foo=bar&cool=xux&cool=yys');
    console.log(result);    // { foo: 'bar', cool: ['xux', 'yys']}

*/


/*

    // parse函数可以根据用户所自定义的分割符、分配符来反序列化字符串，从而得到相应的对象结果
    // 例1：querystring.parse("字符串"，"分隔符"，"分配符")

    var querystring = require('querystring');
    var result = querystring.parse('foo@bar$cool@xux$cool@yys','@','$');
    console.log(result);    // { foo: '', bar: 'cool', xux: 'cool', yys: '' }

*/

