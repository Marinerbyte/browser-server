const express = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");

const { runTask } = require("./utils/downloader");
const { startCleaner } = require("./utils/cleaner");

const app = express();
app.use(express.json());

const TEMP = path.join(__dirname, "temp");
if (!fs.existsSync(TEMP)) fs.mkdirSync(TEMP);

// 🔁 background cleaner
startCleaner(TEMP);

// 🧠 ONE UNIVERSAL ENDPOINT
app.post("/task", async (req, res) => {
  const task = req.body;

  if (!task || !task.type) {
    return res.status(400).json({ error: "invalid task" });
  }

  const jobId = uuid();
  const jobDir = path.join(TEMP, jobId);
  fs.mkdirSync(jobDir);

  try {
    const result = await runTask(task, jobDir);

    // TEXT response
    if (result.type === "text") {
      fs.rmSync(jobDir, { recursive: true, force: true });
      return res.json(result);
    }

    // FILE response
    res.sendFile(result.path, () => {
      fs.rmSync(jobDir, { recursive: true, force: true });
    });

  } catch (e) {
    fs.rmSync(jobDir, { recursive: true, force: true });
    res.status(500).json({ error: "task failed" });
  }
});

app.listen(process.env.PORT || 3000);
