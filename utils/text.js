const { searchText } = require("./search");

async function getText(query) {
  return await searchText(query);
}

module.exports = { getText };
