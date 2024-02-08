import axios from "axios";

export const updateProject = async (data: {
  id: string;
  image: any;
  color: string | undefined;
  name: string;
  category: string;
  description: string;
}) => {
  const response = await axios.put("/api/auth/update-project", data);
  return response;
};
