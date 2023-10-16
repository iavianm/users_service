import axios from "axios";

const BASE_URL = "http://localhost:4001";

export const getUsers = () => {
  return axios
    .get(`${BASE_URL}/users`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response ? error.response.status : new Error("Network Error");
    });
};

export const createUser = (userData) => {
  return axios
    .post(`${BASE_URL}/users`, userData)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response ? error.response.status : new Error("Network Error");
    });
};

export const updateUser = (id, userData) => {
  return axios
    .patch(`${BASE_URL}/users/${id}`, userData)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response ? error.response.status : new Error("Network Error");
    });
};
