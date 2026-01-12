const fs = require("fs");
const path = require("path");

async function downloadAudio(query) {
    const dir = path.join(__dirname, "..", "downloads");
    fs.mkdirSync(dir, { recursive: true });
    const fileName = query.replace(/\s+/g, "_") + ".mp3";
    const filePath = path.join(dir, fileName);
    fs.writeFileSync(filePath, ""); // placeholder: Puppeteer will download real file
    return filePath;
}

async function downloadImage(query) {
    const dir = path.join(__dirname, "..", "downloads");
    fs.mkdirSync(dir, { recursive: true });
    const fileName = query.replace(/\s+/g, "_") + ".png";
    const filePath = path.join(dir, fileName);
    fs.writeFileSync(filePath, ""); // placeholder
    return filePath;
}

module.exports = { downloadAudio, downloadImage };
