import axios from "axios";

const BASE_URL = "http://localhost:4002";

export const getUserHistory = (userId) => {
  return axios
    .get(`${BASE_URL}/history/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response ? error.response.status : new Error("Network Error");
    });
};
