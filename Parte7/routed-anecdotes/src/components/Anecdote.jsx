export default function Anecdote({ anecdote }) {
  const { content, author, info, votes } = anecdote;
  return (
    <div>
      <h1>{`${content} by ${author}`}</h1>
      <div>votes: {votes}</div>
      <p>
        for more info see <a href={info}>{info}</a>
      </p>
    </div>
  );
}
