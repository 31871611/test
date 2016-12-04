/*

    子进程 child_process模块
    child_process模块提供了四个创建子进程的函数，分别是spawn，exec，execFile和fork。

*/


/*

    // spawn函数用给定的命令发布一个子进程，只能运行指定的程序，参数需要在列表中给出

    var child_process = require('child_process');
    // var child = child_process.spawn( command );         // command报错
    var child = child_process.spawn( 'ping',['www.baidu.com'] );
    child.stdout.on('data', function(data) {
        console.log(data);      // 中文Windows控制台是GBK编码的，应该需要转换为UTF-8
    });

*/


/*

    // exec也是一个创建子进程的函数，与spawn函数不同它可以直接接受一个回调函数作为参数，回调函数有三个参数，分别是err, stdout , stderr

    var child_process = require('child_process');
    child_process.exec( command , function(err, stdout , stderr ) {
        console.log( stdout );
    });

*/


/*

    // execFile函数可以直接执行所指定的文件
    // execFile与spawn的参数相似，也需要分别指定执行的命令和参数，但可以接受一个回调函数，与exec的回调函数相同。

    var child_process = require('child_process');
    child_process.execFile( 'ping' ,['www.baidu.com'], function(err, stdout , stderr ) {
        console.log( stdout );
    });

*/


/*

    // fork函数可直接运行Node.js模块，所以可以直接通过指定模块路径而直接进行操作
    // 该方法是spawn()的特殊情景，用于派生Node进程。除了普通ChildProcess实例所具有的所有方法，所返回的对象还具有内建的通讯通道。

    var child_process = require('child_process');
    child_process.fork( modulePath );

*/





