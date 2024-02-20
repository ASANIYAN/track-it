import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteSingleProject } from "../requests/delete-requests";
import { ErrorToast, SuccessToast } from "@/components/toast/toasts";
import {
  addProjectToFavourite,
  removeProjectFromFavourite,
} from "../requests/patch-requests";
import { getAllProjects, getUser } from "../requests/get-requests";

export const useGetAllProject = () => {
  return useQuery({
    queryKey: ["getAllProject"],
    queryFn: getAllProjects,
    staleTime: Infinity,
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
    staleTime: Infinity,
  });
};

export const useDeleteProject = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProject"],
    mutationFn: deleteSingleProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
      SuccessToast("Project deleted successfully", "top-left");
    },
  });
};

export const useAddProjectToFavourite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addProjectToFavourite"],
    mutationFn: addProjectToFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
      SuccessToast("Project updated successfully", "top-center");
    },
    onError: () => {
      ErrorToast("Error occurred, please try again.");
    },
  });
};

export const useRemoveProjectFromFavourite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["removeProjectFromFavourite"],
    mutationFn: removeProjectFromFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
      SuccessToast("Project updated successfully", "top-center");
    },
    onError: () => {
      ErrorToast("Error occurred, please try again.");
    },
  });
};
