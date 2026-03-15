import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchWeather } from "../../services/weatherApi";
import { getWeatherMetadata } from "../../utils/weatherCode";
import ForecastDisplay from "./ForecastDisplay";

function resolveErrorMessage(error) {
  const status = error?.response?.status;
  const fallbackMessage = "Unable to load weather data right now.";

  if (status === 404) {
    return "City not found. Please try another city name.";
  }

  if (status === 422) {
    return error?.response?.data?.message || "Please check the search values.";
  }

  if (status === 429) {
    return "Weather requests are temporarily rate-limited. Please try again shortly.";
  }

  return error?.response?.data?.message || fallbackMessage;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Tagum");
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");

  const currentMetadata = useMemo(
    () => getWeatherMetadata(weather?.current?.weather_code),
    [weather]
  );

  const loadWeather = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchWeather(params);
      setWeather(data);
    } catch (requestError) {
      console.error(requestError);
      setError(resolveErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  const handleCitySearch = async (event) => {
    event.preventDefault();
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError("Enter a city name to search.");
      return;
    }

    await loadWeather({ city: trimmedCity });
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not available in this browser.");
      return;
    }

    setLocating(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        await loadWeather({
          latitude: Number(coords.latitude.toFixed(5)),
          longitude: Number(coords.longitude.toFixed(5)),
          timezone,
        });

        setLocating(false);
      },
      (geoError) => {
        console.error(geoError);
        setError(
          "Unable to access your location. Allow location permission and try again."
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Weather Forecast</h3>
        <p>Current conditions and 5-day forecast</p>
      </div>

      <form className="weather-search" onSubmit={handleCitySearch}>
        <input
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Search city"
          aria-label="City weather search"
        />
        <button type="submit" className="btn primary" disabled={loading || locating}>
          Search
        </button>
        <button
          type="button"
          className="btn secondary"
          onClick={handleUseLocation}
          disabled={loading || locating}
        >
          {locating ? "Locating..." : "Use My Location"}
        </button>
      </form>

      {loading && <p className="weather-status">Loading weather...</p>}
      {error && <div className="alert error">{error}</div>}

      {weather?.current && (
        <>
          <p className="weather-location">{weather?.location?.label || "Selected location"}</p>

          <div className="weather-current">
            <div className="weather-item">
              <span>Temperature</span>
              <strong>{weather.current.temperature_2m}\u00B0C</strong>
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
              <strong>
                <span className="weather-icon" aria-hidden="true">
                  {currentMetadata.icon}
                </span>{" "}
                {currentMetadata.label}
              </strong>
            </div>
          </div>
        </>
      )}

      <ForecastDisplay daily={weather?.daily} />
    </div>
  );
}
