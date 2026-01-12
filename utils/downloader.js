const fs = require("fs");
const path = require("path");

async function downloadAudio(query) {
    const fileName = query.replace(/\s+/g, "_") + ".mp3";
    const filePath = path.join(__dirname, "..", "downloads", fileName);
    fs.mkdirSync(path.join(__dirname, "..", "downloads"), { recursive: true });
    // Placeholder: write empty file, later Puppeteer scrape YouTube / API
    fs.writeFileSync(filePath, ""); 
    return filePath;
}

async function downloadImage(query) {
    const fileName = query.replace(/\s+/g, "_") + ".png";
    const filePath = path.join(__dirname, "..", "downloads", fileName);
    fs.mkdirSync(path.join(__dirname, "..", "downloads"), { recursive: true });
    fs.writeFileSync(filePath, ""); 
    return filePath;
}

module.exports = { downloadAudio, downloadImage };
