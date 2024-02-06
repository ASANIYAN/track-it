import { ProjectDocument } from "@/models/project";
import axios from "axios";

export const getAllProjects = async () => {
  const response = await axios.get("/api/auth/get-all-project");
  return response.data;
};
