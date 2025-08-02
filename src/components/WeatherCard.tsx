import React from 'react';
import { Star, Wind, Droplets } from 'lucide-react';

interface WeatherCardProps {
  location: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function WeatherCard({
  location,
  temp,
  condition,
  humidity,
  windSpeed,
  isFavorite,
  onToggleFavorite,
}: WeatherCardProps) {
  return (
    <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center transition-all duration-300">
      <div className="flex justify-between items-center w-full mb-2">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 drop-shadow-sm">{location}</h2>
          <p className="text-lg text-blue-700 font-medium mt-1">{condition}</p>
        </div>
        {onToggleFavorite && (
          <button
            onClick={onToggleFavorite}
            className="p-2 hover:bg-yellow-100 rounded-full transition-colors border border-yellow-300"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star
              className={`w-7 h-7 ${
                isFavorite ? 'fill-yellow-400 text-yellow-400 drop-shadow' : 'text-gray-400'
              }`}
            />
          </button>
        )}
      </div>
      
      <div className="flex flex-col items-center my-4">
        <span className="text-6xl font-bold text-blue-600 drop-shadow-lg">{Math.round(temp)}°</span>
      </div>

      <div className="flex items-center justify-between mt-4 w-full text-gray-700">
        <div className="flex items-center gap-2">
          <Droplets className="w-6 h-6 text-blue-400" />
          <span className="font-semibold">{humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-6 h-6 text-blue-400" />
          <span className="font-semibold">{windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
}