import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSingleProject } from "../requests/delete-requests";
import { ErrorToast, SuccessToast } from "@/components/toast/toasts";
import {
  addProjectToFavourite,
  removeProjectFromFavourite,
} from "../requests/patch-requests";

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
