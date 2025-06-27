import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    dispatch(addAnecdote(content));
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
