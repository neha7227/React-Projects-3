import React, { useState } from "react";
import "../components/Weather.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      // Replace 'YOUR_API_KEY' in the API URL with the actual key
      const apiKey = "9804e9cad3c445f7aac181707232709";
      const response = await fetch(
        `https://api1.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`
      );
      //`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`
      console.log(
        response.ok,
        response.status,
        response.text,
        response,
        "response.ok, resp.status"
      );
      console.log(`Failed to fetch weather data. Status: ${response.status}`);
      if (!response.ok) {
        // Check if the response status is not OK (e.g., 404, 500, etc.)
        const errorMessage = await response.text();
        throw new Error(
          `Failed to fetch weather data. Status: ${response.status}. ${errorMessage}`
        );
      }

      const data = await response.json();

      const currentDay = data.forecast.forecastday[0].day;

      setWeatherData({
        temperature: currentDay.avgtemp_c,
        humidity: currentDay.avghumidity,
        condition: currentDay.condition.text,
        windSpeed: currentDay.maxwind_kph,
      });

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch weather data");
      // console.error("Failed to fetch weather data", error.message);
      setLoading(false);
      alert("Failed to fetch weather data");
    }
  };

  return (
    <div className="app-body">
      <h1>Weather Application</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading data...</p>}

      {weatherData && (
        <div className="weather-cards">
          {/* <h2>Weather Information for {city}</h2> */}
          <div className="weather-card">
            Temperature:
            <div>{weatherData.temperature}°C </div>
          </div>

          <div className="weather-card">
            Humidity:
            <div>{weatherData.humidity}%</div>
          </div>
          <div className="weather-card">
            Condition:
            <div>{weatherData.condition}</div>
          </div>

          <div className="weather-card">
            Wind Speed:
            <div>{weatherData.windSpeed} kph</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
