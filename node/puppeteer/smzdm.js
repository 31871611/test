// https://zhaoqize.github.io/puppeteer-api-zh_CN/

/*
    https://www.jb51.net/article/138391.htm
    https://segmentfault.com/a/1190000013978236
*/
const puppeteer = require('puppeteer');
var fs = require("fs");


const TOTAL_PAGE = 5


// 精选
async function home() {
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

        // 禁用超时
        page.setDefaultNavigationTimeout(0);

        // 打开页面
        await page.goto('https://www.smzdm.com/jingxuan/')

        for(let j = 0;j < TOTAL_PAGE;j++){
            // 滚动加载
            let preScrollHeight = 0;
            let scrollHeight = -1;
            while(preScrollHeight !== scrollHeight) {
                // 详情信息是根据滚动异步加载，所以需要让页面滚动到屏幕最下方，通过延迟等待的方式进行多次滚动
                let scrollH1 = await page.evaluate(async () => {
                    let h1 = document.body.scrollHeight;
                    window.scrollTo(0, h1);
                    return h1;
                });
                await page.waitFor(500);
                let scrollH2 = await page.evaluate(async () => {
                    return document.body.scrollHeight;
                });
                let scrollResult = [scrollH1, scrollH2];
                preScrollHeight = scrollResult[0];
                scrollHeight = scrollResult[1];
            }

            var saveArr = [];
            // 等待标签
            await page.waitForSelector('#feed-main-list');
            // 抓取数据
            var list = await page.$$("#feed-main-list li");
            for(let i = 0;i<list.length;i++){
                let classNameStr = await page.evaluate(dom => dom.className, list[i]);
                if(classNameStr == "feed-top-hot"){
                    continue;
                }
                let price = await page.evaluate(dom =>{
                    return dom.querySelector("div > div.z-feed-content > .z-highlight").innerText;
                    // await list[i].$eval('div > div.z-feed-content > a', node => node.innerText)
                    // await list[i].$eval('div > div.z-feed-content > div.z-highlight > a', node => node.innerText)
                }, list[i]);

                let obj = {
                    num:await list[i].$eval('div > div.z-feed-content > div.z-feed-foot > div.z-feed-foot-l > a:nth-child(3) > span', node => node.innerText),
                    title:await list[i].$eval('div > div.z-feed-content > h5 > a', node => node.innerText),
                    photo:await list[i].$eval('div > div.z-feed-img > a > img', node => node.getAttribute("src")),
                    url:await list[i].$eval('div > div.z-feed-content > h5 > a', node => node.getAttribute("href")),
                    price:price,
                    time:''
                }
                if(obj.num > 2){
                    saveArr.push(obj)
                }
            }

            // 点击下一页
            await page.click('#J_feed_pagenation > li.page-turn.next-page');
        }

        console.log(saveArr)
        await browser.close()

        // 生成json
        fs.writeFile('smzdm.json', JSON.stringify(saveArr),  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log('生成文件完成')
        });
    } catch (error) {
        // 出现任何错误，打印错误消息并且关闭浏览器
        console.log(error)
        console.log('-----服务意外终止-----')
        await browser.close()
    }
}
home();
