import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../requests/get-requests";

const useGetAllProject = () => {
  return useQuery({
    queryKey: ["getAllProject"],
    queryFn: getAllProjects,
    staleTime: Infinity,
  });
};

export default useGetAllProject;
