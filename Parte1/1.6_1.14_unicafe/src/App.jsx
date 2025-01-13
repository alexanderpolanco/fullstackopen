import { useState } from "react";
import StatisticLine from "./StatisticLine .jsx";

function average(good, neutral, bad) {
  const totalPuntos = good + neutral + bad;
  let average = 0;
  if (totalPuntos > 0) {
    average = (good + bad * -1) / totalPuntos;
  }
  return average.toFixed(1);
}

function positivePorcentaje(good, neutral, bad) {
  const totalPuntos = good + neutral + bad;
  let positivePorcentaje = 0;
  if (totalPuntos > 0) {
    positivePorcentaje = (good / totalPuntos) * 100;
  }
  return `${positivePorcentaje.toFixed(1)} %`;
}

function Nofeedback() {
  return <div>No feedback guiven</div>;
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (setState, valor) => {
    setState((state) => state + valor);
  };

  return (
    <div>
      <h2>Guive feedback</h2>
      <button onClick={() => handleClick(setGood, 1)}>Good</button>
      <button onClick={() => handleClick(setNeutral, 1)}>Neutral</button>
      <button onClick={() => handleClick(setBad, 1)}>Bad</button>
      <h2>Statistics</h2>
      {average(good, neutral, bad) !== "0.0" ? (
      <div>
        <StatisticLine  descripcion="good" valor={good} />
        <StatisticLine  descripcion="neutral" valor={neutral} />
        <StatisticLine  descripcion="bad" valor={bad} />
        <StatisticLine  descripcion="average" valor={average(good, neutral, bad)} />
        <StatisticLine  descripcion="positive" valor={positivePorcentaje(good, neutral, bad)} />
      </div>) : <Nofeedback />}
    </div>
  );
}

export default App;
