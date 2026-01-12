const { searchAudio } = require("./search");

async function getSongMp3(query) {
  const result = await searchAudio(query);
  return result;
}

module.exports = { getSongMp3 };
