import { NavLink } from "react-router";

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <NavLink to={`/anecdotes/${anecdote.id}`}>
              {anecdote.content}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
