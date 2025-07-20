import { useField } from "../hooks/useField";
import { useNavigate } from "react-router";

export const NewAnecdote = ({ setAnecdotes, setNotification }) => {
  const navigate = useNavigate();
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");

  const handleReset = (e) => {
    e.preventDefault();
    resetContent();
    resetAuthor();
    resetInfo();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnecdotes((state) => [
      ...state,
      {
        id: state.length + 1,
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0,
      },
    ]);
    setNotification(content.value);
    navigate(`/`);
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default NewAnecdote;
