// SelectedDayWeather.tsx
import React from 'react';
import "../page.css"

interface WeatherData {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

interface SelectedDayWeatherProps {
  forecast: WeatherData[];
  selectedDayIndex: number;
  unit: "C" | "F";
  getTemperature: (temp: number) => number;
}

const SelectedDayWeather: React.FC<SelectedDayWeatherProps> = ({ forecast, selectedDayIndex, unit, getTemperature }) => {
  if (forecast.length === 0) return null;

  const selectedWeather = forecast[selectedDayIndex];

  return (
    <div className="selected-day-weather">
      <h3>Selected Day Weather</h3>
      <p>{new Date(selectedWeather.dt * 1000).toLocaleString()}</p>
      <p>{getTemperature(selectedWeather.main.temp)}°{unit}</p>
      <img
        src={`https://openweathermap.org/img/wn/${selectedWeather.weather[0].icon}@2x.png`}
        alt={selectedWeather.weather[0].description}
      />
      <p>{selectedWeather.weather[0].description}</p>
    </div>
  );
};

export default SelectedDayWeather;
