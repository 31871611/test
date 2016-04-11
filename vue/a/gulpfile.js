var gulp = require('gulp');
var sass = require('gulp-sass');                    //scss
var minifyCss = require("gulp-minify-css");         //压缩css
var livereload = require('gulp-livereload');        //gulp-livereload
var sourcemaps = require('gulp-sourcemaps');        //编译sass时生成额外的.map文件用
var cssBase64 = require('gulp-css-base64');





var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
gulp.task("webpack", function(callback) {
    var myConfig = Object.create(webpackConfig);
    // run webpack
    webpack(
        // configuration
        myConfig
        , function(err, stats) {
            // if(err) throw new gutil.PluginError("webpack", err);
            // gutil.log("[webpack]", stats.toString({
            //	 // output options
            // }));
            callback();
        });
});




//html
gulp.task('html', function() {
    gulp.src('./src/html/*.html')
        .pipe(livereload());
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./src/html/css'))
        .pipe(livereload());
});

//压缩css
gulp.task('minify-css', function () {
    gulp.src('./src/html/css/*.css')
        .pipe(minifyCss())      //压缩css
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('cssBase64', function () {
    return gulp.src('./src/html/css/*.css')
        .pipe(cssBase64())
        .pipe(gulp.dest('./src/html/css'));
});


//转base64
//var base64 = require('gulp-base64');                //把图片转换为base64
//var config = require('./config').base64;              //base64配置文件
//gulp.task('base64', ['sass'], function() {
//    return gulp.src('./src/html/css/*.css')
//        .pipe(base64({
//            baseDir: build,
//            extensions: ['png'],
//            maxImageSize: 20 * 1024, // bytes
//            debug: false
//        }))
//        .pipe(gulp.dest('./src/html/css'));
//});


//webpack
//var webpack = require('gulp-webpack');              //webpack
//gulp.task('webpack', function(){
//    return gulp.src('./src/**/*.vue')
//        .pipe(webpack( require('./webpack.config.js') ))
//        .pipe(gulp.dest('./dist'));
//});

//默认任务
gulp.task('default', function() {

    gulp.run('minify-css');
    livereload.listen();

    // 监听文件变化
    gulp.watch('./src/html/*.html', function(){
        gulp.run('html');
    });
    gulp.watch('./src/sass/**/*.scss', function(){
        gulp.run('sass');
    });


    gulp.watch('./src/**/*.vue', ['webpack']);

});


//错误提示
gulp.on("error",function(err){
    console.log(err);
});