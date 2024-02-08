import axios from "axios";

export const deleteSingleProject = async (id: string) => {
  const response = await axios.delete(`/api/auth/delete-project/${id}`);
  return response.data;
};
