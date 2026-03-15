import { useEffect, useState } from "react";
import { fetchWeather } from "../../services/weatherApi";
import ForecastDisplay from "./ForecastDisplay";

function weatherCodeLabel(code) {
  const map = {
    0: "Clear",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    80: "Rain Showers",
    95: "Thunderstorm",
  };

  return map[code] || "Unknown";
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWeather = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchWeather();
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load weather data right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3>Weather Forecast</h3>
        <p>Current conditions and 5-day forecast</p>
      </div>

      {loading && <p>Loading weather...</p>}
      {error && <div className="alert error">{error}</div>}

      {weather?.current && (
        <div className="weather-current">
          <div className="weather-item">
            <span>Temperature</span>
            <strong>{weather.current.temperature_2m}°C</strong>
          </div>
          <div className="weather-item">
            <span>Humidity</span>
            <strong>{weather.current.relative_humidity_2m}%</strong>
          </div>
          <div className="weather-item">
            <span>Wind Speed</span>
            <strong>{weather.current.wind_speed_10m} km/h</strong>
          </div>
          <div className="weather-item">
            <span>Condition</span>
            <strong>{weatherCodeLabel(weather.current.weather_code)}</strong>
          </div>
        </div>
      )}

      <ForecastDisplay daily={weather?.daily} />
    </div>
  );
}