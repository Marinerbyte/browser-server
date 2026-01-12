const fetch = require("node-fetch");

async function searchText(query) {
    // Example: Wikipedia summary
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.extract || "No info found";
}

async function searchImage(query) {
    // Placeholder: can use Puppeteer scrape / Bing / Google Image API
    return `https://via.placeholder.com/400?text=${encodeURIComponent(query)}`;
}

async function searchNews(query) {
    // Placeholder: basic news API call
    return [`News result for ${query}`];
}

module.exports = { searchText, searchImage, searchNews };
