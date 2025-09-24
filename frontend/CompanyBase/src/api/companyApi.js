import axios from "axios";

const API_URL = "http://localhost:5001/api/company";

export const getCompanies = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/get-All-companies`, { params: filters });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error.response?.data || error.message);
    throw error;
  }
};
