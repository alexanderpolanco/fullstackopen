import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import login from "./services/login";
import { getAll, postBlog } from "./services/blogs";
import "./styles.css";

const Input = ({ value, onChange, type, label }) => (
  <label>
    {label}
    <input
      type={type}
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />
  </label>
);

const FormLogin = ({ handleSubmit, states, setStates }) => {
  const { username, password, message } = states;
  const { setUsername, setPassword } = setStates;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          type="text"
          value={username}
          onChange={setUsername}
          label="username"
        />
      </div>
      <div>
        <Input
          type="password"
          value={password}
          onChange={setPassword}
          label="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

const FormAddBlogs = ({ handleSubmit, states, setStates }) => {
  const { title, author, url } = states;
  const { setTitle, setAuthor, setUrl } = setStates;

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmit}>
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

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [stateSession, setStateSession] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);

  const session = localStorage.getItem("session");
  if (session) {
    const sessionParse = JSON.parse(session);
    if (stateSession === null) {
      setStateSession(sessionParse);
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await login(username, password);
    console.log("response: ", response);
    if ("error" in response) {
      setMessage({ description: "wrong username or password", type: "error" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
      const { data } = response;

      const dataSession = {
        username: data.username,
        token: data.token,
      };

      setStateSession(dataSession);
      localStorage.setItem("session", JSON.stringify(dataSession));
      setUsername("");
      setPassword("");
      setMessage(null);
    }
  };

  const handleClickLogout = () => {
    localStorage.removeItem("session");
    setStateSession(null);
    setUsername("");
    setPassword("");
    setMessage(null);
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

      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };

  useEffect(() => {
    if (stateSession) {
      getAll().then((response) => {
        const blogs = response.data;
        setBlogs(blogs);
      });
    }
  }, [stateSession]);

  return (
    <div>
      {stateSession === null ? (
        <div>
          <h1>log in to application</h1>
          <div>
            {message && (
              <div className={message.type === "error" ? "error" : "success"}>
                {message.description}
              </div>
            )}
          </div>
          <FormLogin
            handleSubmit={handleLogin}
            states={{ password, username, message }}
            setStates={{ setPassword, setUsername }}
          />
        </div>
      ) : (
        <div>
          <h1>blogs</h1>
          <div>
            {message && (
              <div className={message.type === "error" ? "error" : "success"}>
                {message.description}
              </div>
            )}
          </div>
          <div>
            {`${stateSession.username} logged in `}
            <button onClick={handleClickLogout}>logout</button>
          </div>
          <FormAddBlogs
            handleSubmit={handleClickCreate}
            states={{ title, author, url }}
            setStates={{ setTitle, setAuthor, setUrl }}
          />
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
