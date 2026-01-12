const express = require("express");
const bodyParser = require("body-parser");

const audio = require("./utils/audio");
const image = require("./utils/image");
const text = require("./utils/text");

// cleanup auto-start
require("./utils/cleanup");

const app = express();
app.use(bodyParser.json());

/*
 Expected JSON from plugin:

 {
   "type": "audio" | "image" | "text",
   "query": "song name / image name / info text"
 }
*/

app.post("/task", async (req, res) => {
  try {
    const { type, query } = req.body;

    if (!type || !query) {
      return res.status(400).json({
        error: "type and query required"
      });
    }

    switch (type) {
      case "audio": {
        const result = await audio.getSongMp3(query);

        return res.json({
          type: "audio",
          file: result.file,
          title: result.title,
          duration: result.duration
        });
      }

      case "image": {
        const result = await image.getImage(query);

        return res.json({
          type: "image",
          file: result.file,
          title: result.title
        });
      }

      case "text": {
        const result = await text.getText(query);

        return res.json({
          type: "text",
          content: result
        });
      }

      default:
        return res.status(400).json({
          error: "Unknown type"
        });
    }
  } catch (err) {
    console.error("Browser Server Error:", err.message);
    return res.status(500).json({
      error: err.message
    });
  }
});

/* Health check */
app.get("/", (req, res) => {
  res.send("Browser Server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Browser Server running on port", PORT);
});
