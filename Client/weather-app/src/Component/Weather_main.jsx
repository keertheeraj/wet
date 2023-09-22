import React, { useState } from 'react';
import WeatherApp from './Current_Location_Weather';
import Clock from './CurrentTime';
import WeatherForecast from './Forecast_weather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
function Weather_main(){
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const handleSearch = () => {
      if (location) {
        fetch(`http://localhost:3001/weather?location=${location}`)
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          })
          .catch((error) =>{
            console.error(error);
          });
      }
    };

    if (!data){
      return <div>Loading...</div>;
    }

    return(
      <div className="app">
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter Location"
            type="text"
          />
          <button onClick={handleSearch} className='Search'><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <WeatherApp/>
        <Clock/>
        <WeatherForecast location={location}/>
        <div className="container">
        <div className="card">
              <h3>{data.name}</h3>
            <div className="temp">
              {data.main ? <h1>{(0.555*(parseInt(data.main.temp-32))).toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
          </div>
          {data.name !== undefined &&
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          }
        </div>
        </div>
    );
}

export default Weather_main