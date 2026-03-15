<<<<<<< HEAD
import { getWeatherMetadata } from "../../utils/weatherCode";

function formatForecastDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-PH", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function ForecastDisplay({ daily }) {
  if (!daily?.time?.length) {
    return <p className="weather-status">No forecast data available.</p>;
  }

  return (
    <div className="forecast-grid">
      {daily.time.slice(0, 5).map((date, index) => {
        const metadata = getWeatherMetadata(daily.weather_code?.[index]);

        return (
          <div className="forecast-card" key={`${date}-${index}`}>
            <h4>{formatForecastDate(date)}</h4>
            <p className="forecast-condition">
              <span className="weather-icon" aria-hidden="true">
                {metadata.icon}
              </span>{" "}
              {metadata.label}
            </p>
            <div className="forecast-temp">
              <span>{daily.temperature_2m_max?.[index]}\u00B0C</span>
              <small>{daily.temperature_2m_min?.[index]}\u00B0C</small>
            </div>
            <p>Rain: {daily.precipitation_sum?.[index]} mm</p>
          </div>
        );
      })}
    </div>
  );
}
=======
function weatherCodeLabel(code) {
  const map = {
    0: "Clear",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Slight Snow",
    80: "Rain Showers",
    95: "Thunderstorm",
  };

  return map[code] || "Unknown";
}

export default function ForecastDisplay({ daily }) {
  if (!daily?.time?.length) {
    return <p>No forecast data available.</p>;
  }

  return (
    <div className="forecast-grid">
      {daily.time.map((date, index) => (
        <div className="forecast-card" key={date}>
          <h4>{date}</h4>
          <p>{weatherCodeLabel(daily.weather_code?.[index])}</p>
          <div className="forecast-temp">
            <span>{daily.temperature_2m_max?.[index]}°C</span>
            <small>{daily.temperature_2m_min?.[index]}°C</small>
          </div>
          <p>Rain: {daily.precipitation_sum?.[index]} mm</p>
        </div>
      ))}
    </div>
  );
}
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
