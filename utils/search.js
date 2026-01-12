const { newPage } = require("./puppeteer");

async function searchText(query) {
  const page = await newPage();
  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
  const text = await page.evaluate(() =>
    document.body.innerText.slice(0, 3000)
  );
  await page.close();
  return text;
}

async function searchImage(query) {
  const page = await newPage();
  await page.goto(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`);
  const url = await page.evaluate(() => {
    const img = document.querySelector("img");
    return img ? img.src : null;
  });
  await page.close();
  return url;
}

async function searchAudio(query) {
  // placeholder (YouTube / music search later)
  return {
    title: query,
    url: null
  };
}

async function searchNews(query) {
  const page = await newPage();
  await page.goto(`https://news.google.com/search?q=${encodeURIComponent(query)}`);
  const news = await page.evaluate(() =>
    document.body.innerText.slice(0, 2000)
  );
  await page.close();
  return news;
}

module.exports = {
  searchText,
  searchImage,
  searchAudio,
  searchNews
};
