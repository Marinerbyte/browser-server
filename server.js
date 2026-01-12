const express = require("express");
const fs = require("fs");

const search = require("./search");
const downloader = require("./downloader");
require("./cleanup");

const app = express();
app.use(express.json());

app.post("/task", async (req, res) => {
  try {
    const { type, query } = req.body;

    if (type === "text") {
      const text = await search.searchText(query);
      return res.json({ type: "text", content: text });
    }

    if (type === "image") {
      const imgUrl = await search.searchImage(query);
      const file = await downloader.download(imgUrl, "jpg");
      return res.sendFile(file);
    }

    if (type === "news") {
      const news = await search.searchNews(query);
      return res.json({ type: "text", content: news });
    }

    if (type === "audio") {
      return res.status(501).json({ error: "Audio downloader coming next step" });
    }

    res.status(400).json({ error: "Unknown task" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Browser server running on", PORT);
});
