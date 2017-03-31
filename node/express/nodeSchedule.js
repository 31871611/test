/**

 在实际开发项目中，会遇到很多定时任务的工作。比如：定时导出某些数据、定时发送消息或邮件给用户、定时备份什么类型的文件等等
 一般可以写个定时器，来完成相应的需求，在node.js中自已实现也非常容易，接下来要介绍的是node-schedule来完成定时任务

 npm install nodeSchedule --save

*/


var schedule = require('node-schedule');

function scheduleCronstyle(){
    var j = schedule.scheduleJob('30 * * * * *', function(){
        console.log('scheduleCronstyle:' + new Date());
    });


    // 取消
    //setTimeout(function() {
    //    console.log('定时器取消');
    //    j.cancel();
    //}, 5000);

}

scheduleCronstyle();


/*
 '*'需要特别注意，任意秒数都触发


 传入的'30 * * * * *'带来的结果是每分钟的30秒时都会执行


 6个占位符从左到右分别代表：秒、分、时、日、月、周几

 '*'表示通配符，匹配任意，当秒是'*'时，表示任意秒数都触发，其它类推

 下面可以看看以下传入参数分别代表的意思

 每分钟的第30秒触发： '30 * * * * *'
 每小时的1分30秒触发 ：'30 1 * * * *'
 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
 每周1的1点1分30秒触发 ：'30 1 1 * * 1'

 传入范围，'1-10 * * * * *'，每分钟1-10秒触发

*/