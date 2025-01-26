import { useState, useEffect } from "react";
import { getWeather } from "./services/weatherServices";

export default function Details(props) {
  const { name, capital, area, languages, flags } = props;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeather(capital).then((weather) => {
      setWeather(weather);
    });
  }, [name, capital, area, languages, flags]);

  return (
    <div>
      <h1>{name}</h1>
      <p>
        <span>Capital {capital}</span> <br />
        <span>Area {area}</span>
      </p>
      <strong>languages:</strong>
      <ul>
        {Object.entries(languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
      {weather && (
        <div>
          <h2>Weather in {capital}</h2>
          <p>
            <span>Temperature {weather.main.temp} Celcius</span> <br />
            <img
              src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              width="100px"
              height="100px"
            />
            <br />
            <span>wind speed {weather.wind.speed} m/s</span> <br />
          </p>
        </div>
      )}
    </div>
  );
}
