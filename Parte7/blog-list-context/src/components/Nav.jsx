import { useNavigate, NavLink } from "react-router";
import { logOutAction } from "../reducers/sessionReducer";
import { useStore } from "../context/globalContext";

export default function Nav() {
  const navigate = useNavigate();

  const {
    dispatch,
    state: { session },
  } = useStore();

  const handleClickLogout = () => {
    logOutAction(dispatch);
    navigate("/");
  };
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/blogs">BLOGS</NavLink>
        </li>
        <div>|</div>
        <li>
          <NavLink to="/users">USERS</NavLink>
        </li>
      </ul>
      {`- ${session.username} logged in `}
      <button className="cursor-pointer" onClick={handleClickLogout}>logout</button>
    </nav>
  );
}
