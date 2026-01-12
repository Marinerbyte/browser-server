const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { withBrowser } = require("../puppeteer");

async function runTask(task, dir) {
  switch (task.type) {

    case "play":
      return downloadSong(task.query, dir);

    case "image":
      return fetchImage(task.query, dir);

    case "info":
      return fetchText(task.query);

    default:
      throw "unknown task";
  }
}

function downloadSong(query, dir) {
  return new Promise((resolve, reject) => {
    const cmd = `yt-dlp "ytsearch1:${query}" -x --audio-format mp3 -o "${dir}/%(title)s.%(ext)s"`;

    exec(cmd, (err) => {
      if (err) return reject();

      const file = fs.readdirSync(dir).find(f => f.endsWith(".mp3"));
      resolve({ type: "file", path: path.join(dir, file) });
    });
  });
}

async function fetchImage(query, dir) {
  return withBrowser(async page => {
    await page.goto(`https://www.google.com/search?tbm=isch&q=${query}`);
    const src = await page.$eval("img", img => img.src);

    const img = await page.goto(src);
    const file = path.join(dir, "image.jpg");
    fs.writeFileSync(file, await img.buffer());

    return { type: "file", path: file };
  });
}

async function fetchText(query) {
  return {
    type: "text",
    content: `Info about ${query} (API / scrape yahan lagega)`
  };
}

module.exports = { runTask };
