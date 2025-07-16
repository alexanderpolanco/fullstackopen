import { useState } from "react";
import { Routes, Route, useMatch } from "react-router";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import About from "./components/About";
import NewAnecdote from "./components/NewAnecdote";
import Layout from "./Layout";

export default function App() {
  const [notification, setNotification] = useState(null);

  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;
    
  return (
    <Routes>
      <Route element={<Layout notification={notification} setNotification={setNotification} />}>
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route index element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/create"
          element={<NewAnecdote setAnecdotes={setAnecdotes} setNotification={setNotification} />}
        />
      </Route>
    </Routes>
  );
}
