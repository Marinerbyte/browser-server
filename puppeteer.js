const puppeteer = require("puppeteer");

async function launchBrowser() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: puppeteer.executablePath()
    });
    return browser;
}

module.exports = launchBrowser;
