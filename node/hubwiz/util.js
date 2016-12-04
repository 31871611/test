/*

    util模块呢，是一个Node.js核心模块，提供常用函数的集合，用于弥补核心JavaScript的一些功能过于精简的不足。
    并且还提供了一系列常用工具，用来对数据的输出和验证。

*/


/*

    // 转换字符串
    // util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换为字符串的函数，通常用于调试和错误输出
    // 至少接受一个参数object，即要转换的对象

    var util = require('util');
    var result = util.inspect({name:'姓名',sex:'性别'});
    console.log(result);
    console.log(typeof result);     // string

*/


/**********************************************************************************************/


/*

    // 字符串格式化
    // format函数根据第一个参数，返回一个格式化字符串，第一个参数是一个可包含零个或多个占位符的字符串
    // 每一个占位符被替换为与其对应的转换后的值，
    // 支持的占位符有："%s(字符串)"、"%d(数字<整型和浮点型>)"、"%j(JSON)"、"%(单独一个百分号则不作为一个参数)"。

    var util = require('util');
    var result = util.format('%s:%s', 'foo');
    console.log(result);    // 'foo:%s'

*/


/*

    // 多个参数占位符，额外的参数将会调用util.inspect()转换为字符串。这些字符串被连接在一起，并且以空格分隔。
    // 默认以空格分隔

    var util = require('util');
    var result = util.format('%s:%s', 'foo', 'bar', 'baz');     // 以:分隔
    var result2 = util.format('%s:%s:%s', 'foo', 'bar', 'baz');     // 以:分隔
    console.log(result);    // foo:bar baz
    console.log(result2);    // foo:bar:baz

*/


/*

    // 第一个参数是一个非格式化字符串，则会把所有的参数转成字符串并以空格隔开拼接在一块，而且返回该字符串。

    var util = require('util');
    var result = util.format(1, 2, 3);
    console.log(result);    // 1 2 3

*/


/**********************************************************************************************/


/*

    // isArray函数可以判断对象是否为数组类型，是则返回ture,否则为false

    var util = require('util');
    var result = util.isArray({'name':'姓名'});
    var result2 = util.isArray([{'name':'姓名'}]);
    console.log(result);    // false
    console.log(result2);   // true

*/


/*

    // isDate函数可以判断对象是否为日期类型，是则返回ture,否则返回false

    var util = require('util');
    var result = util.isDate('1990/10/10');
    var result2 = util.isDate(new Date());
    var result3 = util.isDate(new Date('1990/10/10'));
    console.log(result);    // false
    console.log(result2);   // true
    console.log(result3);   // true

*/


/*

    // isRegExp函数可以判断对象是否为正则类型，是则返回ture,否则返回false

    var util = require('util');
    var result = util.isRegExp(/$/g);
    console.log(result);    // true

*/









