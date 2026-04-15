import { useEffect, useState } from "react";
import { getAllEntries, createEntry } from "./services/services";
import { type Entry, type NewEntry } from "./types/types";
import Visibility from "./components/Visibility";
import Weather from "./components/Weather";

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState<string>();
  const [visibility, setVisibility] = useState<string>("good");
  const [weather, setWeather] = useState<string>("sunny");

  const handleNewEntry = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target;
    const newEntry: NewEntry = {
      date: target.date.value,
      weather: target.weather.value,
      visibility: target.visibility.value,
      comment: target.comment.value,
    };
    createEntry(newEntry).then((entry) => {
      if (entry) {
        setEntries(entries.concat(entry));
      }
    }).catch((error) => {
      setError(error);
    });
  };

  useEffect(() => {
    getAllEntries().then((entries) => {
      setEntries(entries);
    });
  }, []);

  return (
    <div>
      <form onSubmit={handleNewEntry}>
        <h2>Add a new entry</h2>
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        <div className="d-flex flex-column maxWidth-300">
          <label htmlFor="date">date
            <input type="date" name="date" id="date" />
          </label>
          <label htmlFor="visibility">visibility
            <Visibility visibility={visibility} setVisibility={setVisibility} />
          </label>
          <label htmlFor="weather">weather
            <Weather weather={weather} setWeather={setWeather} />
          </label>
          <label htmlFor="comment">comment
            <input type="text" name="comment" id="comment" />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <div>
        {entries.length > 0 && entries.map((entry) => (
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            <div>weather: {entry.weather}</div>
            <div>visibility: {entry.visibility}</div>
            <div>comment: {entry.comment}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
