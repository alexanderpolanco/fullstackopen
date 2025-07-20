import axios from "axios";

let token = null;

const getAll = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createService = async (url, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.post(url, newObject, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getAll, createService };
