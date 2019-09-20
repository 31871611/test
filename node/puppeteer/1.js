// https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
const puppeteer = require('puppeteer');

puppeteer.launch({
    // 要看演示可以使用false
    headless: false,
    // 控制了动作之间的间隔，使其变慢，从而通过人眼可以看清每步操作
    slowMo: 20,
    // 使用本机浏览器
    executablePath:"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
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


// 等待某个 JavaScript 函数返回 true



// 在浏览器中执行一段 JavaScript 代码
// page.evaluate(()=> alert('1'));
