import { useState } from 'react'

function App() {

  const InitialAnecdotes = [
    {anecdote:'If it hurts, do it more often.', votes:0},
    {anecdote:'Adding manpower to a late software project makes it later!', votes:0},
    {anecdote:'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes:0},
    {anecdote:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes:0},
    {anecdote:'Premature optimization is the root of all evil.', votes:0},
    {anecdote:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes:0},
    {anecdote:'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes:0},
    {anecdote:'The only way to go fast, is to go well.', votes:0},
  ]

  const [anecdotes, setAnecdote] = useState(InitialAnecdotes)

  const [selected, setSelected] = useState(0)

  function getNumRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function handleClickVote(selected) {
    const newAnecdote = [...anecdotes]
    newAnecdote[selected].votes += 1
    setAnecdote(newAnecdote)
  }

  function sort(anecdotes) {
    return anecdotes.toSorted((a, b) => b.votes - a.votes)
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
       <div>{anecdotes[selected]['anecdote']}</div>
       <div>has {anecdotes[selected]['votes']} votes</div>
       <button onClick={() => handleClickVote(selected)}>Vote</button>
       <button onClick={() => setSelected(getNumRandom(0,7))}>Next anecdote</button>
       <h2>Anecdote with most votes</h2>
       <div>{sort(anecdotes)[0].anecdote}</div>
       <div>has {sort(anecdotes)[0].votes} votes</div>
    </>
  )
}

export default App
