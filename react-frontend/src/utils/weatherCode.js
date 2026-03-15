const WEATHER_CODE_MAP = {
  0: { label: "Clear", icon: "☀️" },
  1: { label: "Mainly Clear", icon: "🌤️" },
  2: { label: "Partly Cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  48: { label: "Rime Fog", icon: "🌫️" },
  51: { label: "Light Drizzle", icon: "🌦️" },
  53: { label: "Moderate Drizzle", icon: "🌦️" },
  55: { label: "Dense Drizzle", icon: "🌧️" },
  56: { label: "Freezing Drizzle", icon: "🌧️" },
  57: { label: "Dense Freezing Drizzle", icon: "🌧️" },
  61: { label: "Slight Rain", icon: "🌧️" },
  63: { label: "Moderate Rain", icon: "🌧️" },
  65: { label: "Heavy Rain", icon: "🌧️" },
  66: { label: "Freezing Rain", icon: "🌨️" },
  67: { label: "Heavy Freezing Rain", icon: "🌨️" },
  71: { label: "Slight Snow", icon: "🌨️" },
  73: { label: "Moderate Snow", icon: "🌨️" },
  75: { label: "Heavy Snow", icon: "❄️" },
  77: { label: "Snow Grains", icon: "❄️" },
  80: { label: "Rain Showers", icon: "🌦️" },
  81: { label: "Moderate Showers", icon: "🌧️" },
  82: { label: "Violent Showers", icon: "⛈️" },
  85: { label: "Snow Showers", icon: "🌨️" },
  86: { label: "Heavy Snow Showers", icon: "🌨️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
  96: { label: "Thunderstorm with Hail", icon: "⛈️" },
  99: { label: "Heavy Thunderstorm with Hail", icon: "⛈️" },
};

export function getWeatherMetadata(code) {
  return WEATHER_CODE_MAP[code] || { label: "Unknown", icon: "❔" };
}
