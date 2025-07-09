import { newVote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";

function orderByVotes(a, b) {
  return b.votes - a.votes;
}

export default function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const handleVote = (anecdote) => {
    dispatch(newVote(anecdote));
    dispatch(showNotification(`You voted for '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {anecdotes.toSorted(orderByVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
