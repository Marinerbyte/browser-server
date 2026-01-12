const puppeteer = require("puppeteer");

let browser;

async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
  }
  return browser;
}

async function newPage() {
  const b = await getBrowser();
  return await b.newPage();
}

module.exports = { newPage };
