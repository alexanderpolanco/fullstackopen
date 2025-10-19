import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlog, actualizarBlog, agregarComentarios } from "../services/blogs";
import { useState } from "react";

export default function BlogDetalils() {
  const params = useParams();
  const [inputError, setInputError] = useState(false);
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["blog", params.idBlog],
    queryFn: () => getBlog(params.idBlog),
  });

  const blog = result.data;

  const handleClickLike = () => {
    blog.likes = blog.likes + 1;
    const newBlog = { ...blog };
    delete newBlog.user;
    actualizarBlogMutation.mutate(newBlog);
  };

  const actualizarBlogMutation = useMutation({
    mutationFn: actualizarBlog,
    onSuccess: () => {},
  });

  const agregarComentariosMutation = useMutation({
    mutationFn: agregarComentarios,
    onSuccess: () => {
      queryClient.invalidateQueries(["blog"]);
      document.getElementById("comentario").value = "";
    },
  });

  const handleClickSubmit = (event) => {
    event.preventDefault();
    const comment = event.target[0].value;
    if (comment.trim() === "") {
      setInputError(true);
      return;
    }

    agregarComentariosMutation.mutate({ idBlog: params.idBlog, comment });
    setInputError(false);
  };

  return (
    <div>
      {result.isLoading && <div>loading data...</div>}
      {result.isError && (
        <span>user service not available due to problems in server</span>
      )}
      {result.data && (
        <div className="container-details-blogs">
          <h2 className="title-page">{`${result.data.title} - ${result.data.author}`}</h2>
          <a href={result.data.url} target="_blank">
            {result.data.url}
          </a>
          <div className="d-flex f-align-center gap-5">
            {result.data.likes} <b>likes</b>
            <button className="button cursor-pointer" onClick={handleClickLike}>
              like
            </button>
          </div>
          <div>added by: {result.data.user.name}</div>
          <h3>Comments</h3>
          <form
            className="d-flex f-align-center gap-5"
            onSubmit={handleClickSubmit}
          >
            <input
              id="comentario"
              className={inputError ? "inputError" : ""}
              type="text"
            />
            <button className="button cursor-pointer">add comment</button>
          </form>
          <ul>
            {result.data.comments &&
              result.data.comments.map((comment) => (
                <li key={comment}>{comment}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
