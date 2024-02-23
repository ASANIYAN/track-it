import axios from "axios";

export const renameProject = async (payload: { id: string; name: string }) => {
  const response = await axios.patch("/api/auth/rename-project", payload);
  return response;
};
export const addRemoveProjectFavourite = async (payload: {
  id: string;
  favourite: boolean;
}) => {
  const response = await axios.patch("/api/auth/project/favourite", payload);
  return response;
};
