/*
 api资料
 http://nodejs.cn/api/
 http://nodeapi.ucdok.com/#/api/
*/

/*
进程管理
文件的读写
网络通信
即时聊天
*/

/*
var 全局变量或函数
let 块级变量
const 不可变的变量
export 规定对外接口
import 用于输入其它模块提供的接口功能
*/


/*
版本说明

偶数为稳定版本
-0.6.x
-0.8.x
-0.10.x

奇数为非稳定版本
-0.7.x
-0.9.x
-0.11.x
 */

/*
安装node
先安装git
去官网nodejs.org下载node

查看node版本
cmd->node -v
npm -v
*/

/*
进入目录运行server.js文件
C:\wamp\www\test\node>node server.js
在浏览器中访问127.0.0.1:1337

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
*/

/*
 http://nodejs.cn/api/process
 http://nodeapi.ucdok.com/#/api/process.html
 全局变量process
 process对象可以截获进程的异常、退出等事件，也可以获取进程的当前目录、环境变量、内存占用等信息，还可以执行进程退出、工作目录切换等操作。
 process.cwd();     //查看应用程序当前目录
 process.stdout.write('hello world');   //stdout是标准输出流，类似console.log
 process.stderr.write('hello world');   //stderr是标准错误流，用来打印错误信息的，我们可以通过它来捕获错误信息
 process.exit(code);    //在程序内杀死进程，退出程序。参数code为退出后返回的代码，如果省略则默认返回0
 process.stdin.setEncoding('utf8');     //在我们的输入输出的内容中有中文的时候，可能会乱码的问题，这是因为编码不同造成的，所以在这种情况下需要为流设置编码
*/

/*
 commonjs规范
*/

/*
模块分类

核心模块：http、fs、path
文件模块：var util=require("./util.js");
第三方模块：var promise=require("bluebird");
*/

/*
模块的流程

创建模块：teacher.js
导出模块：exports.add=function(){}
加载模块：var teacher=require("./teacher.js");
使用模块：teacher.add("Scott");
*/


/*
 使用require函数获取模块
 require("模块");

*/

/*
 使用模块
 os模块可提供操作系统的一些基本信息
 var os = require("os");
 var result = os.platform(); //查看操作系统平台
             //os.release(); 查看操作系统版本
             //os.type();   查看操作系统名称
             //os.arch();   查看操作系统CPU架构

 console.log(result);

//运行方法一：
 cmd->node
 os.platform();
//运行方法二：
cmd->node server.js

*/






