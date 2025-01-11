import { getUsersForAProject } from "@/utils/requests/get-requests";
import { useQuery } from "@tanstack/react-query";

export const useGetUserForProject = (projectId: string) => {
  return useQuery({
    queryKey: ["getUsersForAProject"],
    queryFn: () => getUsersForAProject(projectId),
  });
};
