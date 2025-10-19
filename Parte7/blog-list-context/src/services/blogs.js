import axios from "axios";
const url = "/api/blogs";

const getAllBlogs = () => axios.get(url).then((res) => res.data);
const getBlog = (id) => axios.get(`${url}/${id}`).then((res) => res.data);

const agregarBlog = ({ blog, token }) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(url, blog, headers).then((res) => res.data);
};

const actualizarBlog = (blog) => {
  return axios.put(`${url}/${blog.id}`, blog).then((res) => res.data);
};

const agregarComentarios = ({ idBlog, comment }) => {
  return axios
    .post(`${url}/${idBlog}/comments`, { comment })
    .then((res) => res.data);
};

const deleteBlog = async (id, token) => {
  let response = false;

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    response = await axios.delete(`${url}/${id}`, headers);
  } catch (error) {
    console.error(error);
  }
  return response;
};

export {
  getAllBlogs,
  getBlog,
  agregarBlog,
  actualizarBlog,
  agregarComentarios,
  deleteBlog,
};
