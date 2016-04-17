var gulp = require('gulp');
var mockServer = require('gulp-mock-server');   //http://www.07net01.com/2015/10/936619.html
var Mock = require('mockjs');

//http://mockjs.com/
//https://github.com/nuysoft/Mock/wiki/Getting-Started
//var Mock = require('mockjs');
//var data = Mock.mock({
//    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//    'list|1-10': [{
//        // 属性 id 是一个自增数，起始值为 1，每次增 1
//        'id|+1': 1
//    }]
//});
//gulp.task("test",function(){
//    console.log(JSON.stringify(data, null, 4));
//});


//输出数据
gulp.task('mock', function() {
    gulp.src('.')
        .pipe(mockServer({
            livereload: false,
            directoryListing: true,
            port: 8090,
            open: true
        }));
});

//默认任务
//gulp.task('default',["mock"]);
gulp.task('default', function() {

    gulp.run('mock');

});



//方法二
/**
 https://www.npmjs.com/package/gulp-webserver
 http://www.tuicool.com/articles/aYVz2mM
 **/