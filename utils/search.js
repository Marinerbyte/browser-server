const { newPage } = require("./puppeteer");
const { downloadFromUrl } = require("./downloader");

async function searchText(query) {
  const page = await newPage();
  try {
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    const content = await page.evaluate(() => {
      return document.body.innerText.slice(0, 3000);
    });
    return content;
  } finally {
    await page.close();
  }
}

async function searchImage(query) {
  const page = await newPage();
  try {
    await page.goto(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`);
    const url = await page.evaluate(() => {
      const img = document.querySelector("img");
      return img ? img.src : null;
    });
    if (!url) throw new Error("No image found");
    const file = await downloadFromUrl(url, "jpg");
    return { file, title: query };
  } finally {
    await page.close();
  }
}

async function searchAudio(query) {
  const page = await newPage();
  try {
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}+mp3`);
    const url = await page.evaluate(() => {
      const link = document.querySelector("a[href$='.mp3']");
      return link ? link.href : null;
    });
    if (!url) throw new Error("No mp3 found");
    const file = await downloadFromUrl(url, "mp3");
    return { file, title: query, duration: "unknown" };
  } finally {
    await page.close();
  }
}

async function searchNews(query) {
  return await searchText(query);
}

async function searchGif(query) {
  return await searchImage(query);
}

module.exports = { searchText, searchImage, searchAudio, searchNews, searchGif };
