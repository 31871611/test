var images = require("images");

/*

 node-webkit:开发桌面+WEB混合型应用的神器 - 天上的神明与星辰,...
 https://segmentfault.com/a/1190000000498344
 nw.js

 https://github.com/zhangyuanwei/node-images

images("input.jpg")                     //Load image from file 
    //加载图像文件
    .size(400)                          //Geometric scaling the image to 400 pixels width

    //.draw(images("logo.png"), 10, 10)   //Drawn logo at coordinates (10,10)
    //在(10,10)处绘制Logo
    .save("output.jpg", {               //Save the image to a file,whih quality 50
        quality : 50                    //保存图片到文件,图片质量为50
    });


    //原图大小   截图大小
    w:750 / 2 - 300 / 2 = 375 - 150 = 225
    h:500 / 2 - 300 / 2 = 250 - 150 = 100

 */



//读取指定目录下所有的文件
//files 是一个存储目录中所包含的文件名称的数组，数组中不包括 '.' 和 '..'
var fs = require('fs');
var errorArr=[];
var count=0;
var inputFiles='./input/';
var outFiles='./out/';

fs.readdir(inputFiles,function(err,files){
    if (err) throw err;
    console.log('本次需要处理文件数：' + files.length);
    for(var i=0;i < files.length;i++){

        //原图大小
        var img=images(inputFiles + files[i]).size();
        //输出大小
        var out={
            w:1000,
            h:1000
        };

        /*

        //以图片中心点截xy坐标
        var pos={
            x:img.width / 2 - out.w / 2,
            y:img.height / 2 - out.h / 2
        };

        //原图小于截图大小?
        if(img.width < out.w && img.height < out.h){
            //console.log(files[i] + '文件原图不能小于截图大小');
            //return;

            //跳过太小的图片，在把太小的图片保存为一个数组，结束后输出
            errorArr.push(files[i]);
            continue;
        }

        //按相关参数截图
        images(images(inputFiles + files[i]),pos.x,pos.y,out.w,out.h)
            .save(outFiles + files[i]);

        */

        images(images(inputFiles + files[i]))
            //等比缩放图像到400像素宽
            .size(out.w,out.h)
            .save(outFiles + files[i],{
                quality : 50                    //保存图片到文件,图片质量为50
            });

        //记录成功数.怎么算成功？怎么算失败？
        count++;

    }

    if(errorArr.length > 1){
        console.log('以下文件不能小于'+ out.w + 'x' + out.h +'\r\n'  + errorArr);
    }

    //console.log('本次成功处理文件数：' + count);

});






