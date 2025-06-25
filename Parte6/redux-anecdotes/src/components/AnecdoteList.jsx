import { addVote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

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

  return (
    <div>
      {anecdotes.sort(orderByVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
