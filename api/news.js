// api/news.js
export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  const { country = 'us', category = 'general', page = 1 } = req.query;
  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(response.status).json(data);
}
