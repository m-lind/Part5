import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  const result = request.then(response => response.data);
  return result;
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const addLike = async newObject => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return response.data;
};

const remove = async removeObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${removeObject.id}`, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, addLike, remove };
