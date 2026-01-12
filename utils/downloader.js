const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function downloadFromUrl(url, ext = "tmp") {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Download failed");

  const buffer = await res.arrayBuffer();
  const filename = `${uuidv4()}.${ext}`;
  const filepath = path.join("/tmp", filename);
  fs.writeFileSync(filepath, Buffer.from(buffer));
  return filepath;
}

module.exports = { downloadFromUrl };
