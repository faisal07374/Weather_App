// services/weatherAPI.js

const apiKey = 'b07a99624423461ea2d183241252504';

export const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`
    );
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error?.message || 'Failed to fetch weather');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};
