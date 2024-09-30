// CurrentWeather.tsx
import React from 'react';
import "../page.css"

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

interface CurrentWeatherProps {
  weather: WeatherData | null;
  unit: "C" | "F";
  getTemperature: (temp: number) => number;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, unit, getTemperature }) => {
  if (!weather) {
    return <div>The country that you want to show is not defined</div>;
  }

  return (
    <div className="current-weather-box">
      <h1>{weather.name}</h1>
      <h2 className="temp">{getTemperature(weather.main.temp)}°{unit}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <h3>{weather.weather[0].description}</h3>
    </div>
  );
};

export default CurrentWeather;
