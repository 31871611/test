const puppeteer = require('puppeteer');
var fs = require("fs");

const TOTAL_PAGE = 9
const saveArr = [];


// 精选
(async () => {
    // 首先通过Puppeteer启动一个浏览器环境
    const browser = await puppeteer.launch({
        // 要看演示可以使用false
        headless: false,
        // 禁用超时
        timeout: 0
    })
    // 使用 try catch 捕获异步中的错误进行统一的错误处理
    try {
        // 打开一个新的页面
        const page = await browser.newPage()

        for (let i = 1;i<=TOTAL_PAGE;i++){
            // 打开页面
            await page.goto('http://777xl.cn/forum.php?mod=forumdisplay&fid=44&page=' + i)

            // 等待标签
            await page.waitForSelector('#threadlist');

            // 抓取数据
            var list = await page.$$("#threadlist > #moderate > .threadlist");
            for (let j = 3;j <= list.length + 2;j++){
                let ele = '#threadlist > #moderate > .threadlist:nth-child('+ j +') > .threadlist_title > a'
                let text = await page.$eval(ele, node => node.innerText);
                let url = await page.$eval(ele, node => node.getAttribute("href"));

                // 进入详情页
                const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));    		// 声明变量
                await page.click(ele);
                const newPage = await newPagePromise;           // newPage就是a链接打开窗口的Page对象
                // 等待标签
                await newPage.waitForSelector('#thread_subject');
                const title = await newPage.$eval('#thread_subject', node => node.innerText);
                const content = await newPage.$eval('.viewthread_table > table > tbody > tr > td', node => node.innerHTML);
                saveArr.push({
                    text:text,
                    url:url,
                    title:title,
                    content:content
                })
                // 关闭页面
                await newPage.close();
                console.log(saveArr)
            }
        }

        // 生成json
        fs.writeFile('777xl.json', JSON.stringify(saveArr),  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log('生成文件完成')
        });

        await browser.close()
    } catch (error) {
        // 出现任何错误，打印错误消息并且关闭浏览器
        console.log(error)
        console.log('-----服务意外终止-----')
        await browser.close()
    }
})()
