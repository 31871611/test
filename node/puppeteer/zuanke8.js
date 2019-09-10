const puppeteer = require('puppeteer');
const express = require('express');
const fs = require('fs');
const path = require('path');
const mineType = require('mime-types');

const app = express();
// 静态文件目录
app.use(express.static('images'));
// 文件名
var photoName = "name";
var date = new Date()-0;

// req (请求) 和 res (响应)
app.get('/',function(req,res){
    zuanke8({
        "name" :"帐号",
        "password":"密码",
        "questionid":"问题",
        "answer":"答案"
    },()=>{
        let filePath = path.resolve('./images/' + photoName + date +'.png');
        let data = fs.readFileSync(filePath);
        //data = new Buffer(data).toString('base64');
        data = Buffer.from(data).toString('base64');
        let base64 = 'data:' + mineType.lookup(filePath) + ';base64,' + data;
        response = {
            name : "screenshot1568097973380.png",
            path : base64
        };
        res.end(JSON.stringify(response));
        //res.send('<img src="'+base64+'" />');
    })
});

var server = app.listen(8081,function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('应用实例，访问地址为：http://%s:%s',host,port);
});

function zuanke8(opt,callback){
    puppeteer.launch({
        headless: false //要看演示可以使用false
    }).then(async browser => {
        const page = await browser.newPage();

        await page.goto('http://www.zuanke8.com/member.php?mod=logging&action=login');

        // loginhash参数
        const loginhash = await page.$eval('form[name=login]',ele => {
            let urlParse = ele.action.split("?")[1];
            let actionArr = urlParse.split("&");
            let loginhashStr = actionArr[actionArr.length-1];
            let loginhashArr = loginhashStr.split("=");
            return loginhashArr[1];
        });

        // 输入表单 //
        // 帐号
        await page.type('#username_' + loginhash, opt.name);
        // 密码
        await page.type('#password3_' + loginhash, opt.password);
        // 选择下拉
        page.select('select#loginquestionid_' + loginhash, opt.questionid);
        // 答案
        await page.type('#loginanswer_' + loginhash, opt.answer);
        // 等待几毫秒
        await page.waitFor(1000);
        // 提交
        await page.click('button[name=loginsubmit]');
        await page.goto('http://www.zuanke8.com/home.php?mod=spacecp&ac=credit&op=buy&accept=1');
        // 充值按钮
        await page.click('#addfundssubmit_btn');
        // 等待元素加载之后，否则获取不异步加载的元素
        await page.waitForSelector('.qrcode-img-area canvas');
        // 截图
        //调用evaluate 方法返回元素的位置信息
        let clip = await page.evaluate(() => {
            let {
                x,
                y,
                width,
                height
            } = document.querySelector('.qrcode-img-wrapper').getBoundingClientRect();
            return {
                x,
                y,
                width,
                height
            };
        });
        await page.screenshot({
            path: './images/' + photoName + date +'.png',    // 手动建个images文件夹
            clip:clip
        });
        await browser.close();
    }).then(() =>{
        callback && callback()
        //console.log("结束")
    })
}