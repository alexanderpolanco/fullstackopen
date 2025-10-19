import { useState } from "react";
import { NavLink } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog, actualizarBlog } from "../services/blogs";

const handleRemoveBlog = async (blog, token, queryClient) => {
  const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
  if (!confirm) {
    return;
  }
  const response = await deleteBlog(blog.id, token);
  if (response) {
    const blogs = queryClient.getQueryData(["blogs"]);
    queryClient.setQueryData(
      ["blogs"],
      blogs.filter((a) => a.id !== blog.id),
    );
  }
};

const handleClickLike = (actualizarBlogMutation, blog) => {
  delete blog.user;
  actualizarBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
};

const Blog = ({ blog, session }) => {
  const [show, setShow] = useState(false);
  const toggleVisibility = () => {
    setShow(!show);
  };

  const queryClient = useQueryClient();

  const actualizarBlogMutation = useMutation({
    mutationFn: actualizarBlog,
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((a) => a.id !== blog.id).concat(blog),
      );
    },
  });

  return (
    <div>
      <div className="containerBlog">
        <NavLink to={`/blogs/${blog.id}`}>{`${blog.title} `}</NavLink>
        {/*<button onClick={toggleVisibility}>view</button>*/}
      </div>
      <div
        className="containerBlog"
        data-testid="post"
        style={{ display: show ? "" : "none" }}
      >
        <div>
          {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {`likes ${blog.likes} `}
          <button onClick={() => handleClickLike(actualizarBlogMutation, blog)}>
            like
          </button>
        </div>
        <div>{blog.user?.name}</div>
        {blog.user?.username === session.username && (
          <div>
            <button
              onClick={() => handleRemoveBlog(blog, session.token, queryClient)}
            >
              remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
