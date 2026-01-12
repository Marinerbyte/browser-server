const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { v4: uuid } = require("uuid");

const TMP = "/tmp";

async function download(url, ext) {
  const res = await fetch(url);
  const file = path.join(TMP, `${uuid()}.${ext}`);
  const stream = fs.createWriteStream(file);

  await new Promise((resolve, reject) => {
    res.body.pipe(stream);
    res.body.on("error", reject);
    stream.on("finish", resolve);
  });

  return file;
}

module.exports = { download };
