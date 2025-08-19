import axios from "axios";
const baseUrl = "/api/login";

const postLogin = async (username, password) => {
  if (!username || !password) {
    return { error: "Username and password are required." };
  }
  let response = false;
  try {
    response = await axios.post(baseUrl, { username, password });
  } catch (error) {
    return { error: error.message };
  }

  return response;
};

export default postLogin;
