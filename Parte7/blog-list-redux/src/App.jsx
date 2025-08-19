import { useEffect, useRef } from "react";
import FormLogin from "./components/FormLogin";
import FormAddBlogs from "./components/FormAddBlogs";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import { getAll } from "./services/blogs";
import { initializeBlogs, createBlog, newLike } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { logOut, setSession } from "./reducers/sessionReducer";

const orderBlogs = (blogs) => {
  return blogs.sort((a, b) => {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes < b.likes) {
      return 1;
    }
    return 0;
  });
};

const handleClickGetBlogs = async (setBlogs) => {
  const response = await getAll();
  if (response) {
    const { data } = response;
    const blogsOrdered = orderBlogs(data);
    setBlogs(blogsOrdered);
  }
};

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const stateSession = useSelector((state) => state.session);

  const dispatch = useDispatch();

  const toggleFormRef = useRef();

  const session = localStorage.getItem("session");

  if (session) {
    const sessionParse = JSON.parse(session);
    if (stateSession === null) {
      dispatch(setSession(sessionParse));
    }
  }

  const handleClickLogout = () => {
    localStorage.removeItem("session");
    dispatch(logOut());
  };

  const handleClickCreate =  (
    event,
    limpiarCampos,
    title,
    author,
    url,
  ) => {
    event.preventDefault();
    if (title !== "" && author !== "" && url !== "") {
      const blog = { title, author, url };
      dispatch(createBlog(blog, stateSession.token));

      limpiarCampos();
      toggleFormRef.current.toggleVisibility();
    }
  };

  const handleClickLike = (updateBlogs) => {
    const { author, id, likes, title, url } = updateBlogs;
    const updatedBlog = { author, id, likes, title, url };

    dispatch(newLike(updatedBlog));
  };

  useEffect(() => {
    if (stateSession) {
      dispatch(initializeBlogs());
    }
  }, [stateSession]);

  return (
    <div>
      {stateSession === null ? (
        <FormLogin />
      ) : (
        <div>
          <h1>blogs</h1>
          <Notification />
          <div>
            {`${stateSession.username} logged in `}
            <button onClick={handleClickLogout}>logout</button>
          </div>
          <Togglable buttonLabel="create new blog" ref={toggleFormRef}>
            <FormAddBlogs handleClickCreate={handleClickCreate} />
          </Togglable>
          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlogs={() => handleClickGetBlogs(setBlogs)}
                handleClickLike={handleClickLike}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
