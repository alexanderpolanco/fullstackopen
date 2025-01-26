import axios from "axios";
const api_key = import.meta.env.VITE_SECRET_KEY
const baseUrlOpenweathermap = "https://api.openweathermap.org/data/2.5/weather?";

const getWeather = (capital) => {
  const request = axios.get(`${baseUrlOpenweathermap}q=${capital}&appid=${api_key}&units=metric`);
  return request.then((response) => response.data);
};

export {
    getWeather,
};