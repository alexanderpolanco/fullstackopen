import { useState } from "react";
import Input from "./Input";
import Notification from "./Notification";
import { useDispatch } from "react-redux";
import { login } from "../reducers/sessionReducer";

const FormLogin = ({}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClickLogin = async (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <form onSubmit={handleClickLogin}>
      <h1>log in to application</h1>
      <Notification />
      <div>
        <Input
          data-testid="username"
          type="text"
          value={username}
          onChange={setUsername}
          label="username"
        />
      </div>
      <div>
        <Input
          data-testid="password"
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

export default FormLogin;
