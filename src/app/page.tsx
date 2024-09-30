"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import ErrorModal from "./component/errorModal";
import SelectedDayWeather from "./component/selectedDayWeather";
import NextDayWeather from "./component/nextDayWeather";
import CurrentWeather from "./component/currentWeather";

const API_KEY = 'b1f8320990959ae01c114f0a81a204a3';


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

const Home: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const fetchWeatherData = async (url: string) => {
    try {
      const response = await fetch(url);
      if(response.ok) {
        const data: WeatherData = await response.json();
        setWeather(data);
      } 
    } catch (err) {
      setError('The country that you want to show is not defined')
    }

  };

  const fetchForecastData = async (url: string) => {
    try {
      const response = await fetch(url);
      if(response.ok) {
        const data = await response.json();
        setForecast(data.list);
      } else {
        setError('The country that you want to show is not defined')
      }
    } catch (err) {
      setError('The country that you want to show is not defined')
    }
  };

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
          fetchForecastData(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
        },(error) => {
          console.log("location is not defined.");
        }
      );
    } else {
      console.log("Geolocation is not defined .");
    }
  };

  const getSearchedCountryWeather = () => {
    if (searchText.trim()) {
      const trimmedSearchText = searchText.trim();
      fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${trimmedSearchText}&appid=${API_KEY}`);
      fetchForecastData(`https://api.openweathermap.org/data/2.5/forecast?q=${trimmedSearchText}&appid=${API_KEY}`);
    }
  };

  useEffect(() => { getCurrentLocationWeather(); }, []);

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    getSearchedCountryWeather();
  };

  const handleUnitToggle = () => {
    setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const getTemperature = (temp: number) => {
    return unit === "C" ? Math.round(temp - 273.15) : Math.round((temp - 273.15) * 9/5 + 32);
  };

  return (
    <div className="home">
      <div className="header" >
        <input
          className="base-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch} className="search-button" type="submit">Search</button>
      </div>
      
      {!!error ? <ErrorModal errorMessage={error} onClose={() => setError('')}/> : <>
      <div className="unit-toggle">
        <button  className="toggle-switch" onClick={handleUnitToggle}>
          Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
        </button>
      </div>

      <div className="main">
      {weather && (
        <CurrentWeather
          weather={weather} 
          unit={unit} 
          getTemperature={getTemperature} 
        />
      )}

      {forecast.length > 0 && (
        <>
          <NextDayWeather 
            forecast={forecast}
            unit={unit}
            setSelectedDayIndex={setSelectedDayIndex}
            getTemperature={getTemperature}
          />
          <SelectedDayWeather 
            forecast={forecast}
            selectedDayIndex={selectedDayIndex}
            unit={unit}
            getTemperature={getTemperature}
          />
        </>
      )}
      </div>
      </>}

    </div>
  );
};

export default Home;
