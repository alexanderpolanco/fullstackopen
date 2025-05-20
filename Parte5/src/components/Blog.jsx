import { useState } from "react";
import { putBlog, deleteBlog } from "../services/blogs";

const handleRemoveBlog = async (blog, token, updateBlogs) => {
  const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
  if (!confirm) {
    return;
  }
  const response = await deleteBlog(blog.id, token);
  if (response) {
    updateBlogs();
  }
};

const Blog = ({ blog, updateBlogs, session, handleClickLike }) => {
  const [show, setShow] = useState(false);
  const toggleVisibility = () => {
    setShow(!show);
  };

  return (
    <div>
      <div className="containerBlog">
        {`${blog.title} `}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div
        className="containerBlog"
        data-testid="post"
        style={{ display: show ? "" : "none" }}
      >
        <div>
          {blog.author} <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {`likes ${blog.likes} `}
          <button onClick={() => handleClickLike(blog, updateBlogs, putBlog)}>
            like
          </button>
        </div>
        <div>{blog.user?.name}</div>
        {blog.user?.username === session.username && (
          <div>
            <button
              onClick={() => handleRemoveBlog(blog, session.token, updateBlogs)}
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
