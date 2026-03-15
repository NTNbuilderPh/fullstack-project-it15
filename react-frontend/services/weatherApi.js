import api from "./api";

export async function fetchWeather() {
  const response = await api.get("/weather-proxy");
  return response.data;
}