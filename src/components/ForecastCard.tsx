import React from 'react';

interface ForecastCardProps {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  icon: string;
}

export function ForecastCard({
  date,
  minTemp,
  maxTemp,
  condition,
  icon,
}: ForecastCardProps) {
  return (
    <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-xl shadow-lg p-4 text-center transition-all duration-300">
      <p className="font-medium text-gray-600">{date}</p>
      <img src={icon} alt={condition} className="w-12 h-12 mx-auto my-2" />
      <p className="text-base text-gray-700 font-medium mb-1">{condition}</p>
      <div className="flex justify-between mt-2 text-base font-semibold">
        <span className="text-blue-600">{Math.round(minTemp)}°</span>
        <span className="text-red-600">{Math.round(maxTemp)}°</span>
      </div>
    </div>
  );
}