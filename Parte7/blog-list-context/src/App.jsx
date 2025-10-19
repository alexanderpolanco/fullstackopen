import { Routes, Route } from "react-router";
import MainLayout from "./layout/MainLayout";
import FormLogin from "./components/FormLogin";
import Blogs from "./pages/Blogs";
import Users from "./pages/Users";
import UserDetalils from "./pages/UserDetalils";
import BlogDetalils from "./pages/BlogDetalils"

const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<FormLogin />} />
        <Route element={<MainLayout />}>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:idBlog" element={<BlogDetalils />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:idUser" element={<UserDetalils />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
