const axios = require("axios");

const sendUserChanges = async (userData) => {
  try {
    const response = await axios.post(
      "http://history:4002/history",
      userData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendUserChanges,
};
