const search = require("./search");
const downloader = require("./downloader");

async function getSongMp3(songName) {
  const result = await search.audio(songName);

  if (!result || !result.url) {
    throw new Error("Song not found");
  }

  const filePath = await downloader.downloadFromUrl(
    result.url,
    "mp3"
  );

  return {
    file: filePath,
    title: result.title || songName,
    duration: result.duration || null
  };
}

module.exports = { getSongMp3 };
