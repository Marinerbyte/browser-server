const fs = require("fs");
const path = require("path");

const TMP = "/tmp";
const MAX_AGE = 5 * 60 * 1000;

function clean() {
  const now = Date.now();

  fs.readdirSync(TMP).forEach(file => {
    const filePath = path.join(TMP, file);
    try {
      const stat = fs.statSync(filePath);
      if (now - stat.mtimeMs > MAX_AGE) {
        fs.unlinkSync(filePath);
      }
    } catch {}
  });
}

setInterval(clean, 5 * 60 * 1000);
