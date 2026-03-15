import api from "./api";

export async function fetchWeather(params = {}) {
  const response = await api.get("/weather-proxy", { params });
  return response.data;
}
