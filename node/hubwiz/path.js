/*

    http://nodejs.cn/api/path

*/
//path模块的基本用法
//用于处理和转换文件路径的工具集,用于处理目录的对象


/*

    //normalize函数将不符合规范的路径经过格式化转换为标准路径,解析路径中的.与..外，还能去掉多余的斜杠。

    var path=require('path');
    var data=path.normalize('/path///normalize/hi/..');         //结尾两个点与一个点会造成输出不同
    console.log(data);  // '/path/normalize/'

*/


/*

    //join函数将传入的多个路径拼接为标准路径并将其格式化，返回规范后的路径，避免手工拼接路径字符串的繁琐

    var path = require('path');
    var data = path.join('///you', '/are', '//beautiful');
    console.log(data);  // '/you/are/beautiful'

*/


/*

    //dirname函数用来返回路径中的目录名

    var path = require('path');
    var data = path.dirname('/foo/strong/cool/nice');
    console.log(data);  // '/foo/strong/cool' ,对文件返回路径？

*/


/*

    // basename函数可返回路径中的最后一部分，并且可以对其进行条件排除
    // 例1：path.basename('路径字符串');
    // 例2：path.basename('路径字符串', '[ext]')<排除[ext]后缀字符串>;

    var path = require('path');
    var data1 = path.basename('/foo/strong/basename/index.html');
    var data2 = path.basename('/foo/strong/basename/index.html','.html');
    console.log(data1 + ' "and" ' + data2);     // 'index.html "and" index'

*/


/*

    // extname函数返回路径中文件的扩展名(以最后一个'.'开始,返回'.'以及'.'以后的所有字符串,如没有'.',则返回空字符串)

    var path = require('path');
    var data = path.extname('index.html');
    console.log(data);      // '.html'

*/



