import React, { useState, useEffect } from 'react';
import './Forecast.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const WeatherForecast = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (location) {
        console.log(`Fetching${location}`);
      fetch(`http://localhost:3001/forecastweather?location=${location}`)
        .then((response) => response.json())
        .then((data) => {
            console.log('Data', data);
          const filteredData = data.list.filter((forecast) =>
            forecast.dt_txt.includes('09:00:00')
          );

          setWeatherData(filteredData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="weather-forecast">
        {weatherData.map((forecast) => (
          <div key={forecast.dt} className="weather-block">
            <p><i class="fa-solid fa-calendar"></i>{forecast.dt_txt.split(" ")[0]}</p>
            <p>Temperature: {forecast.main.temp}°C</p>
            <p>Description: {forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
