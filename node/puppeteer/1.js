// https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
const puppeteer = require('puppeteer');

puppeteer.launch({
    headless: false //要看演示可以使用false
}).then(async browser => {
    const page = await browser.newPage();
    // 修改浏览器视窗大小，设置视窗大小为 1920x1080
    await page.setViewport({width:1920, height:1080});
    // 设置浏览器的 UserAgent 信息
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36');


    await page.goto('https://www.baidu.com/');
    // 输入表单
    await page.type('#kw', '贝尔塔猫');
    await page.click('#su');

    await page.waitFor(1000);
    // 截图
    await page.screenshot({path: 'screenshot.png'});
    await browser.close();
})