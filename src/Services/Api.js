import axios from "axios";

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";
console.log(API_URL);

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
