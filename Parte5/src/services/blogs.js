import axios from "axios";
const url = "/api/blogs";

const getAll = async () => {
  let response = false;
  try {
    response = await axios.get(url);
  } catch (error) {
    console.error(error);
  }
  return response;
};

const postBlog = async (blog, token) => {
  let response = false;
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    response = await axios.post(url, blog, headers);
  } catch (error) {
    console.error(error);
  }
  return response;
};

export { getAll, postBlog };
