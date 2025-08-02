import React, { useState } from 'react';
import { Cloud, MapPin } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { SearchBar } from './components/SearchBar';
import type { WeatherData, SavedLocation } from './types/weather';


const API_KEY = "76d5c99776854364877183033250208";
const BASE_URL = "https://api.weatherapi.com/v1";

const defaultWeatherData: WeatherData = {
  location: "London",
  current: {
    temp: 0,
    condition: "",
    humidity: 0,
    windSpeed: 0,
    icon: ""
  },
  forecast: Array(5).fill({
    date: "",
    temp: { min: 0, max: 0 },
    condition: "",
    icon: ""
  })
};


function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>(defaultWeatherData);
  const [favorites, setFavorites] = useState<SavedLocation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      // Fetch current weather
      const currentRes = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(query)}`);
      const currentJson = await currentRes.json();

      // Fetch forecast (5 days)
      const forecastRes = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=5`);
      const forecastJson = await forecastRes.json();

      const newWeatherData: WeatherData = {
        location: currentJson.location.name,
        current: {
          temp: currentJson.current.temp_c,
          condition: currentJson.current.condition.text,
          humidity: currentJson.current.humidity,
          windSpeed: currentJson.current.wind_kph,
          icon: `https:${currentJson.current.condition.icon}`
        },
        forecast: forecastJson.forecast.forecastday.map((day: any) => ({
          date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: {
            min: day.day.mintemp_c,
            max: day.day.maxtemp_c
          },
          condition: day.day.condition.text,
          icon: `https:${day.day.condition.icon}`
        }))
      };
      setWeatherData(newWeatherData);
    } catch (error) {
      alert("Failed to fetch weather data. Please try again.");
    }
    setLoading(false);
  };

  const toggleFavorite = () => {
    const isFavorite = favorites.some(fav => fav.name === weatherData.location);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.name !== weatherData.location));
    } else {
      setFavorites([...favorites, { id: Date.now().toString(), name: weatherData.location }]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Cloud className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Weather Forecast</h1>
        </div>

        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex justify-center">
              <WeatherCard
                location={weatherData.location}
                temp={weatherData.current.temp}
                condition={weatherData.current.condition}
                humidity={weatherData.current.humidity}
                windSpeed={weatherData.current.windSpeed}
                isFavorite={favorites.some(fav => fav.name === weatherData.location)}
                onToggleFavorite={toggleFavorite}
              />
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5-Day Forecast</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <ForecastCard
                    key={index}
                    date={day.date}
                    minTemp={day.temp.min}
                    maxTemp={day.temp.max}
                    condition={day.condition}
                    icon={day.icon}
                  />
                ))}
              </div>
            </div>

            {favorites.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Favorite Locations</h2>
                <div className="flex flex-wrap gap-2">
                  {favorites.map(fav => (
                    <button
                      key={fav.id}
                      onClick={() => handleSearch(fav.name)}
                      className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      {fav.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;