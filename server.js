const express = require("express");
const bodyParser = require("body-parser");
const launchBrowser = require("./puppeteer");
const { searchText, searchImage, searchNews } = require("./utils/search");
const { downloadAudio, downloadImage } = require("./utils/downloader");
const { cleanupFiles } = require("./utils/scleanup");

const app = express();
app.use(bodyParser.json());

app.post("/task", async (req, res) => {
    const task = req.body;

    if (!task.type || !task.query) return res.json({ error: "type and query required" });

    try {
        if (task.type === "audio") {
            const filePath = await downloadAudio(task.query);
            return res.json({ type: "audio", file: filePath });
        } else if (task.type === "image") {
            const filePath = await downloadImage(task.query);
            return res.json({ type: "image", file: filePath });
        } else if (task.type === "info") {
            const text = await searchText(task.query);
            return res.json({ type: "text", content: text });
        } else if (task.type === "news") {
            const news = await searchNews(task.query);
            return res.json({ type: "news", content: news });
        } else {
            return res.json({ error: "Invalid task type" });
        }
    } catch (err) {
        console.error("Task Error:", err);
        return res.json({ error: err.message });
    }
});

// Cleanup endpoint
app.post("/cleanup", async (req, res) => {
    try {
        await cleanupFiles();
        res.json({ status: "done" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Browser-server running on port ${PORT}`);
});
