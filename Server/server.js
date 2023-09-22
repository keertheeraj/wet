const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

const apiKey = '3b6cf585fe3b2586e69acb62bbc21418';

app.get('/weather', (req, res) => {
  const location = req.query.location;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
  axios.get(url)
    .then((response) => {
      const data = response.data;
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching weather data' });
    });
});

app.get('/forecastweather', (req, res) => {
  const location = req.query.location;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
  axios.get(url)
    .then((response) => {
      const data = response.data;
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching weather data' });
    });
});

app.get('/currentweather', (req, res) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(apiUrl) 
    .then((response) => { 
      const data = response.data; 
      res.json(data); 
    }) 
    .catch((error) => { 
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching weather data' });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});