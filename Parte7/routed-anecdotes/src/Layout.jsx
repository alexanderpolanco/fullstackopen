import { Outlet } from "react-router";
import Notification from "./components/Notification";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

const Layout = ({ notification, setNotification }) => {

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} setNotification={setNotification} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;