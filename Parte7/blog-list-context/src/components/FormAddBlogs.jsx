import { useState } from "react";
import Input from "./Input";
import { agregarBlog } from "../services/blogs";

import { showNotification } from "../reducers/notificationReducer";
import { useStore } from "../context/globalContext";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const FormAddBlogs = ({ toggleFormRef, stateSession }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient();
  const { dispatch } = useStore();

  const limpiarCampos = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const agregarBlogMutation = useMutation({
    mutationFn: agregarBlog,
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const newBlog = {
        user: blog.user,
        author: blog.author,
        id: blog.id,
        likes: blog.likes,
        title: blog.title,
        url: blog.url,
      };

      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      showNotification(
        {
          description: `A new blog ${blog.title} ${blog.author}`,
          type: "success",
        },
        dispatch,
      );
      limpiarCampos();
      toggleFormRef.current.toggleVisibility();
    },
  });

  const handleClickCreate = async (event, title, author, url) => {
    event.preventDefault();
    if (title !== "" && author !== "" && url !== "") {
      agregarBlogMutation.mutate({
        blog: { title, author, url },
        token: stateSession.token,
      });
    }
  };

  return (
    <div className="container-form-new-blog">
      <h1 className="title-page">Create new</h1>
      <form
        className="form-new-blog"
        onSubmit={(event) => handleClickCreate(event, title, author, url)}
      >
        <div>
          <Input
            type="text"
            value={title}
            onChange={setTitle}
            label="Title"
            data-testid="title"
          />
        </div>
        <div>
          <Input
            type="text"
            value={author}
            onChange={setAuthor}
            label="Author"
            data-testid="author"
          />
        </div>
        <div>
          <Input
            type="text"
            value={url}
            onChange={setUrl}
            label="Url"
            data-testid="url"
          />
        </div>
        <button className="button cursor-pointer" type="submit">Create</button>
      </form>
    </div>
  );
};

export default FormAddBlogs;
