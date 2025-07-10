import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/anecdotes";
import { useNotificationDispatch } from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(anecdote));
      dispatch({ type: "add", payload: anecdote.content });
      //queryClient.invalidateQueries({ queryKey: ["anecdotes"] }); <-- realiza una peticion al servidor y actualiza el estado en la aplicación
    },
    onError: (error) => {
      const { error: errorMessage } = error.response.data;
      dispatch({ type: "error", payload: errorMessage });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
