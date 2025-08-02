export interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
  forecast: Array<{
    date: string;
    temp: {
      min: number;
      max: number;
    };
    condition: string;
    icon: string;
  }>;
}

export interface SavedLocation {
  id: string;
  name: string;
}