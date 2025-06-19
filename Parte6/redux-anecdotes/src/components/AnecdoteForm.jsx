import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

export default function AnecdoteForm() {

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.elements[0].value;
    dispatch(addAnecdote(content));
    event.target.elements[0].value = "";
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
