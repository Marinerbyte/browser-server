const { newPage } = require("../puppeteer");

/**
 * getText(query)
 * - simple info / wiki / news / quiz text fetch
 */
async function getText(query) {
  const page = await newPage();
  try {
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    const content = await page.evaluate(() => {
      return document.body.innerText.slice(0, 3000); // max 3000 chars
    });
    return content;
  } catch (err) {
    console.error("Text fetch error:", err.message);
    return `No results found for: ${query}`;
  } finally {
    await page.close();
  }
}

module.exports = { getText };
