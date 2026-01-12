const express = require('express');
const { runBrowserTask } = require('./puppeteer');

const app = express();
app.use(express.json());

app.post('/scrape', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL missing' });

    try {
        const data = await runBrowserTask(url);
        res.json({ html: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Browser server running on port ${port}`));
