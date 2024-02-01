import { ProjectDocument } from "@/models/project";
import axios from "axios";

export const getAllProjects = async (): Promise<ProjectDocument[]> => {
  const response = await axios.get<ProjectDocument[]>(
    "/api/auth/get-all-project"
  );
  return response.data;
};
