import { useState } from "react";
import Input from "./Input";
import { postBlog } from "../services/blogs";

const FormAddBlogs = ({ states, setStates, toggleFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const { stateSession } = states;
  const { setMessage, setBlogs } = setStates;

  const limpiarCampos = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const handleClickCreate = async (event) => {
    event.preventDefault();
    if (title !== "" && author !== "" && url !== "") {
      const response = await postBlog(
        { title, author, url },
        stateSession.token
      );
      if (response) {
        const { data } = response;

        const blog = {
          id: data.id,
          title: data.title,
          author: data.author,
        };
        setBlogs((blogs) => [...blogs, blog]);
        setMessage({
          description: `a new blog ${blog.title} ${blog.author}`,
          type: "success",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }

      limpiarCampos();
      toggleFormRef.current.toggleVisibility();
    }
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleClickCreate}>
        <div>
          <Input type="text" value={title} onChange={setTitle} label="title" />
        </div>
        <div>
          <Input
            type="text"
            value={author}
            onChange={setAuthor}
            label="author"
          />
        </div>
        <div>
          <Input type="text" value={url} onChange={setUrl} label="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default FormAddBlogs;
