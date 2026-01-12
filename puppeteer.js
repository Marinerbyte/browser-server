const puppeteer = require("puppeteer");

async function launchBrowser() {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu"
        ],
        executablePath: puppeteer.executablePath() // default Chromium
    });
    return browser;
}

module.exports = launchBrowser;
