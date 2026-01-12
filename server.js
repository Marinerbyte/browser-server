const express = require("express");
const bodyParser = require("body-parser");

const { getSongMp3 } = require("./utils/audio");
const { getImage } = require("./utils/image");
const { getText } = require("./utils/text");

// cleanup auto-start
require("./utils/cleanup");

const app = express();
app.use(bodyParser.json());

app.post("/task", async (req, res) => {
  try {
    const { type, query } = req.body;
    if (!type || !query) return res.status(400).json({ error: "type and query required" });

    switch (type) {
      case "audio":
        return res.json(await getSongMp3(query));
      case "image":
        return res.json(await getImage(query));
      case "text":
        return res.json({ type: "text", content: await getText(query) });
      default:
        return res.status(400).json({ error: "Unknown type" });
    }
  } catch (err) {
    console.error("Browser Server Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => res.send("Browser Server running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Browser Server running on port", PORT));
