//

/*
    //写入一个文件
    //writeFile函数，可以异步的将数据写入一个文件, 如果文件已经存在则会被替换
    //数据参数可以是string或者是Buffer,编码格式参数可选，默认为"utf8"，回调函数只有一个参数err。
    //例：fs.writeFile(filename, data, callback)

    var fs=require('fs');
    fs.writeFile('file.txt','hello node',function(err){
        if(err) throw err;
        console.log('文件保存成功');
    });
*/


/*
    //将新的内容追加到已有的文件中，如果文件不存在，则会创建一个新的文件
    //例：fs.appendFile(文件名,数据,编码,回调函数(err));
    //编码格式默认为"utf8"

    var fs=require('fs');
    fs.appendFile('file.txt','addfile',function(err){
        if(err) throw err;
        console.log('文件追加成功');
    });
*/


/*
    //检查指定路径的文件或者目录是否存在
    //例：fs.exists(文件，回调函数(exists));
    //exists的回调函数只有一个参数，类型为布尔型，通过它来表示文件是否存在。

    var fs=require('fs');
    //fs.exists(process.cwd()+'/express/',function(exists){   //目录
    //fs.exists('./express/',function(exists){
    fs.exists('file.txt',function(exists){
        console.log(exists ? "存在" : "不存在!");
    });
*/


/*
    //修改文件名
    var fs=require('fs');
    fs.rename('name.txt','file.txt',function(err){
        if(err) throw err;
        console.log('文件名修改成功');
    });
*/


/*
    //移动文件也是我们经常会遇见的，可是fs没有专门移动文件的函数，但是我们可以通过rename函数来达到移动文件的目的，示例如下。
    var fs = require('fs');
    fs.rename('file.txt','name.txt',function (err) {
        if (err) throw err;
        console.log('文件移动成功');
    });
*/


/*
    //读取文件
    //例：fs.readFile(文件,编码,回调函数);\

    var fs = require('fs');
    fs.readFile('file.txt', function (err, data) {
        if (err) throw err;
        console.log(data);
    });
*/


/*
    //删除文件
    //例：fs.unlink(文件,回调函数(err));
    var fs = require('fs');
    fs.unlink('file.txt', function(err) {
        if (err) throw err;
        console.log('successfully deleted');
    });
*/


/*
    //创建目录
    //fs.mkdir(路径，权限，回调函数(err));
    //路径：新创建的目录。
    //权限：可选参数，只在linux下有效，表示目录的权限，默认为0777，表示文件所有者、文件所有者所在的组的用户、所有用户，都有权限进行读、写、执行的操作。
    //回调函数：当发生错误时，错误信息会传递给回调函数的err参数。
    var fs = require('fs');
    fs.mkdir("123");
*/



/*
    //删除目录
    var fs = require('fs');
    fs.rmdir(process.cwd()+'/123/', function(err) {
        if (err) throw err;
        console.log('ok');
    });
*/


/*
    //读取指定目录下所有的文件
    //files 是一个存储目录中所包含的文件名称的数组，数组中不包括 '.' 和 '..'
    var fs = require('fs');
    fs.readdir('./',function(err,files){
        if (err) throw err;
        console.log(files);
    });
*/

