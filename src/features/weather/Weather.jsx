import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './weatherSlice';

const Weather = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);

  const handleSearch = () => {
    if (city.trim()) dispatch(fetchWeather(city));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Weather App</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter city"
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        {status === 'loading' && <p className="text-gray-600">Loading...</p>}
        {status === 'failed' && <p className="text-red-500">{error}</p>}
        {status === 'succeeded' && data && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-blue-700">
              {data.location.name}, {data.location.country}
            </h2>
            <p className="text-lg">{data.current.condition.text}</p>
            <img
              src={data.current.condition.icon}
              alt={data.current.condition.text}
              className="mx-auto"
            />
            <p className="mt-2 text-lg">🌡️ Temp: {data.current.temp_c} °C</p>
            <p className="text-lg">💧 Humidity: {data.current.humidity}%</p>
            <p className="text-lg">💨 Wind: {data.current.wind_kph} kph</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
