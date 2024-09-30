// NextDayWeather.tsx
import React from 'react';
import "../page.css"

interface ForecastData {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

interface NextDayWeatherProps {
  forecast: ForecastData[];
  unit: "C" | "F";
  setSelectedDayIndex: (index: number) => void;
  getTemperature: (temp: number) => number;
}

const NextDayWeather: React.FC<NextDayWeatherProps> = ({ forecast, unit, setSelectedDayIndex, getTemperature }) => {
  return (
    <div className="next-day-weather-box">
      <h3>Next 5 Days Weather</h3>
      <div className="next-day-component">
        {forecast.slice(0, 5).map((item, index) => {
          const date = new Date(item.dt * 1000);
          return (
            <div key={item.dt} onClick={() => setSelectedDayIndex(index)}>
              <p>{date.toLocaleDateString()}</p>
              <p>{getTemperature(item.main.temp)}°{unit}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
              <p>{item.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NextDayWeather;
