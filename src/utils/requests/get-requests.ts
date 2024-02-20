import axios from "axios";

export const getAllProjects = async () => {
  const response = await axios.get("/api/auth/get-all-project");
  return response.data;
};

export const getUser = async () => {
  const response = await axios.get("/api/auth/user/get-user");
  return response.data;
};
