// Main.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function WeatherDashboard() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("New York");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "feb7fff9061d4c45883164346252504";

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-blue-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Weather Dashboard</h1>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : weather ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
              {weather.location.name}, {weather.location.country}
            </h2>
            <p className="text-5xl font-bold">{weather.current.temp_c}°C</p>
            <p className="text-lg mt-2">{weather.current.condition.text}</p>
            <img
              src={weather.current.condition.icon}
              alt="Weather Icon"
              className="mx-auto mt-4"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WeatherDashboard;
