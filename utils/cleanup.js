const fs = require("fs");
const path = require("path");

const TMP_DIR = "/tmp";

function cleanup() {
  fs.readdir(TMP_DIR, (err, files) => {
    if (err) return;
    files.forEach(file => {
      const filePath = path.join(TMP_DIR, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;
        const age = Date.now() - stats.mtimeMs;
        if (age > 5 * 60 * 1000) fs.unlink(filePath, () => {});
      });
    });
  });
}

// Run every 5 minutes
setInterval(cleanup, 5 * 60 * 1000);
