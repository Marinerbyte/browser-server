const puppeteer = require("puppeteer-core");

let browser;

async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome-stable",
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--window-size=1920,1080"
      ]
    });
  }
  return browser;
}

async function newPage() {
  const b = await getBrowser();
  const page = await b.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  return page;
}

module.exports = { newPage };
