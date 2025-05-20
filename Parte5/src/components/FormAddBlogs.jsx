import { useState } from "react";
import Input from "./Input";
import { postBlog } from "../services/blogs";

const FormAddBlogs = ({ handleClickCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const limpiarCampos = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h1>create new</h1>
      <form
        onSubmit={(event) => handleClickCreate(event, postBlog, limpiarCampos, title, author, url)}
      >
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
