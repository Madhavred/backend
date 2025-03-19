require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

app.get("/", (req, res) => {
  res.send("Welcome to Multi-API Server!");
});

app.get("/weather", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Location required!" });

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Weather API error", details: error.message });
  }
});

app.get("/joke", async (req, res) => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Joke API error", details: error.message });
  }
});

app.get("/crypto", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Cryptocurrency name required!" });

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${query}&vs_currencies=usd`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Crypto API error", details: error.message });
  }
});

app.get("/movie", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Movie name required!" });

    const url = `http://www.omdbapi.com/?t=${query}&apikey=${MOVIE_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Movie API error", details: error.message });
  }
});

app.get("/word", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Word required!" });

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;
    const response = await axios.get(url);
    res.json(response.data[0]);
  } catch (error) {
    res.status(500).json({ error: "Word API error", details: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
