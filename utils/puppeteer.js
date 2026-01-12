const puppeteer = require("puppeteer");

async function launchBrowser() {
    return await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: puppeteer.executablePath() // <- Render free tier ke liye correct Chromium path
    });
}

module.exports = launchBrowser;
