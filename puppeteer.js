const puppeteer = require('puppeteer');

async function runBrowserTask(url) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const content = await page.content();
    await browser.close();
    return content;
}

module.exports = { runBrowserTask };
