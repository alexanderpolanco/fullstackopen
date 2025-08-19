import { useState } from "react";
import { putBlog } from "../services/blogs";
import { deleteBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

const Blog = ({ blog, updateBlogs, handleClickLike }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const toggleVisibility = () => {
    setShow(!show);
  };

  const handleRemoveBlog = async (blog, token) => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );
    if (!confirm) {
      return;
    }
    dispatch(deleteBlog({ blog, token }));
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
            <button onClick={() => handleRemoveBlog(blog, session.token)}>
              remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
