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
