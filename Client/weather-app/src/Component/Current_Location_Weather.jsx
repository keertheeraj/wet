import React, { useEffect, useState } from 'react';
import './Currentlocation.css'

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          getWeatherData(position);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };
    
    const getWeatherData = async (position) => {
      const { latitude, longitude } = position.coords;
      if (latitude && longitude) {
        fetch(`http://localhost:3001/currentweather?latitude=${latitude}&longitude=${longitude}`)
          .then((response) => response.json())
          .then((data) => {
            setWeatherData(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    getLocation();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="weather-container">
      <div className="top-left">
        <h2>{weatherData.name}</h2>
        <p>Weather: {weatherData.weather[0].description}</p>
        <p>Temperature: {weatherData.main.temp}°K</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind Speed: {weatherData.wind.speed} MPH</p>
      </div>
    </div>
  );
};

export default WeatherApp;