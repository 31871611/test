var gulp = require('gulp');
var sass = require('gulp-sass');                    //scss
var minifyCss = require("gulp-minify-css");         //压缩css
var livereload = require('gulp-livereload');        //gulp-livereload
var sourcemaps = require('gulp-sourcemaps');        //编译sass时生成额外的.map文件用
var webpack = require('gulp-webpack');        //webpack


//html
gulp.task('html', function() {
    gulp.src('./src/html/*.html')
        .pipe(livereload());
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./src/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});

//压缩css
gulp.task('minify-css', function () {
    gulp.src('./dist/css/*.css')
        .pipe(minifyCss())      //压缩css
        .pipe(gulp.dest('./dist/css'));
});

//webpack
gulp.task('webpack', function(){
    return gulp.src('./src')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('./dist'));
});

//默认任务
gulp.task('default', function() {

    gulp.run('minify-css');
    livereload.listen();

    // 监听文件变化
    gulp.watch('./src/html/*.html', function(){
        gulp.run('html');
    });
    gulp.watch('./src/sass/*.scss', function(){
        gulp.run('sass');
    });

});


//错误提示
gulp.on("error",function(err){
    console.log(err);
});