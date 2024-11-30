const axios = require("axios");

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching from API:", error);
    throw error;
  }
}

module.exports = fetchData;
