// https://zhaoqize.github.io/puppeteer-api-zh_CN/
const puppeteer = require('puppeteer');

puppeteer.launch({
    // 要看演示可以使用false
    headless: false
}).then(async browser => {
    const page = await browser.newPage();
    // 修改浏览器视窗大小，设置视窗大小为 1920x1080
    //await page.setViewport({width:1920, height:1080});
    // 设置浏览器的 UserAgent 信息
    //await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36');

    await page.goto('https://www.smzdm.com/fenlei/nantongzhuang/');

    var pageIndex = 1;
    var pageNum = 20;
    var saveArr = [];

/*
    var list = await page.$$("#feed-main-list li");
    for(let i = 0;i<list.length;i++){
        let num = await list[i].$eval('div > div.z-feed-content > div.z-feed-foot > div.z-feed-foot-l > a:nth-child(3) > span', node => node.innerText)
        if(num > 2){
            saveArr.push({
                title:await list[i].$eval('div > div.z-feed-content > h5 > a', node => node.innerText),
                photo:await list[i].$eval('div > div.z-feed-img > a > img', node => node.getAttribute("src")),
                url:await list[i].$eval('div > div.z-feed-content > h5 > a', node => node.getAttribute("href")),
                price:await list[i].$eval('div > div.z-feed-content > div.z-highlight > a', node => node.innerText),
                time:''
            })
        }
    }
    // 点击下一页
    await page.click('#J_feed_pagenation > li.page-turn.next-page > a');
*/

    console.log(saveArr)
    await browser.close();
})