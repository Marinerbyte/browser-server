const { searchImage } = require("./search");

async function getImage(query) {
  const result = await searchImage(query);
  return result;
}

module.exports = { getImage };
