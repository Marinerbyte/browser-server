const fs = require("fs");
const path = require("path");

function startCleaner(TEMP) {
  setInterval(() => {
    const now = Date.now();

    fs.readdirSync(TEMP).forEach(dir => {
      const full = path.join(TEMP, dir);
      if (now - fs.statSync(full).mtimeMs > 5 * 60 * 1000) {
        fs.rmSync(full, { recursive: true, force: true });
      }
    });
  }, 5 * 60 * 1000);
}

module.exports = { startCleaner };
