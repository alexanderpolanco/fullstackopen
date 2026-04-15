interface WeatherProps {
    weather: string;
    setWeather: (weather: string) => void;
}

export default function Weather({ weather, setWeather }: WeatherProps) {
    const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeather(event.target.value);
    };
    return (
        <div>
            <label htmlFor="weather">weather
                sunny
                <input type="radio" name="weather" id="sunny" value="sunny" checked={weather === "sunny"} onChange={handleWeatherChange} readOnly />
                rainy
                <input type="radio" name="weather" id="rainy" value="rainy" checked={weather === "rainy"} onChange={handleWeatherChange} readOnly />
                cloudy
                <input type="radio" name="weather" id="cloudy" value="cloudy" checked={weather === "cloudy"} onChange={handleWeatherChange} readOnly />
                windy
                <input type="radio" name="weather" id="windy" value="windy" checked={weather === "windy"} onChange={handleWeatherChange} readOnly />
            </label>
        </div>
    )
}
