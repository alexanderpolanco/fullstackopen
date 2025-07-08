import { useDispatch } from "react-redux";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import { createNew } from "../services/anecdotes";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    const newAnecdote = await createNew(content);
    dispatch(appendAnecdote(newAnecdote));
    dispatch(showNotification(`You created '${content}'`, 5));
    event.target.content.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        <input id="content" name="content" type="text" />
      </div>
      <button>create</button>
    </form>
  );
}
