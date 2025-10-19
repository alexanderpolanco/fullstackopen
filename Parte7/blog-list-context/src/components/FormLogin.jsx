import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Input from "./Input";
import { loginAction } from "../reducers/sessionReducer";
import Notification from "../components/Notification";
import { useStore } from "../context/globalContext";

const FormLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    dispatch,
    state: { session },
  } = useStore();

  useEffect(() => {
    const sessionStorage = localStorage.getItem("session");

    if (sessionStorage && session === null) {
      const sessionParse = JSON.parse(sessionStorage);
      dispatch({
        type: "login",
        payload: sessionParse,
      });
    }

    if (session !== null) {
      navigate("/blogs");
    }
  }, [session]);

  const handleClickLogin = async (event) => {
    event.preventDefault();
    loginAction({ username, password }, dispatch);
  };

  return (
    <div className="container-login">
      <form className="formLogin" onSubmit={handleClickLogin}>
        <h2>LOG IN TO APPLICATION</h2>
        <div className="container-notifications">
          <Notification />
        </div>
        <div>
          <Input
            data-testid="username"
            type="text"
            value={username}
            onChange={setUsername}
            label="Username"
          />
        </div>
        <div>
          <Input
            data-testid="password"
            type="password"
            value={password}
            onChange={setPassword}
            label="Password"
          />
        </div>
        <button type="submit" className="cursor-pointer button">login</button>
      </form>
    </div>
  );
};

export default FormLogin;
