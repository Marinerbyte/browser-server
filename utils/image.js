const { newPage } = require("../puppeteer");
const downloader = require("./downloader");

/**
 * getImage(query)
 * - searches image
 * - downloads to /tmp
 * - returns { file, title }
 */
async function getImage(query) {
  const page = await newPage();
  try {
    await page.goto(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`);
    const url = await page.evaluate(() => {
      const img = document.querySelector("img");
      return img ? img.src : null;
    });

    if (!url) throw new Error("No image found");

    const filePath = await downloader.downloadFromUrl(url, "jpg");

    return {
      file: filePath,
      title: query
    };
  } catch (err) {
    console.error("Image fetch error:", err.message);
    return {
      file: null,
      title: query
    };
  } finally {
    await page.close();
  }
}

module.exports = { getImage };
