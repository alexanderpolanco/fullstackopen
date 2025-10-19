import axios from "axios";
const url = "/api/users";

const getAllUsers = () => axios.get(url).then((res) => res.data);

const getUser = (id) => axios.get(`${url}/${id}`).then((res) => res.data);

export { getAllUsers, getUser };
