const fs = require("fs");
const path = require("path");

async function cleanupFiles() {
    const dir = path.join(__dirname, "..", "downloads");
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const f of files) fs.unlinkSync(path.join(dir, f));
    console.log("Downloads folder cleaned");
}

module.exports = { cleanupFiles };
