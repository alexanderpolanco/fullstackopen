import { useEffect } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { useStore } from "../context/globalContext";
import Notification from "../components/Notification";
import Nav from "../components/Nav";
import "../styles.css";

const MainLayout = () => {
  const navigate = useNavigate();

  const {
    state: { session },
  } = useStore();

  useEffect(() => {
    if (session === null) {
      navigate("/");
    }
  }, []);

  if (session === null) {
    return null;
  }

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className="container-layout">
        <h1>BLOGS APP</h1>
        <div className="container-notification">
          <Notification />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
