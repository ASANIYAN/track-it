import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteSingleProject } from "../../utils/requests/delete-requests";
import { ErrorToast, SuccessToast } from "@/components/toast/toasts";
import { addRemoveProjectFavourite } from "../../utils/requests/patch-requests";
import { getAllProjects, getUser } from "../../utils/requests/get-requests";
import { logInUser, logOutUser } from "../../utils/requests/post-requests";

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
    mutationKey: ["addRemoveProjectFavourite"],
    mutationFn: addRemoveProjectFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
      SuccessToast("Project updated successfully", "top-center");
    },
    onError: () => {
      ErrorToast("Error occurred, please try again.");
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["logInUser"],
    mutationFn: logInUser,
    onSuccess: () => {
      window.location.href = "/";
      SuccessToast("Login Successful");
    },
  });
};

export const useLogOut = () => {
  return useMutation({
    mutationKey: ["logOutUser"],
    mutationFn: logOutUser,
    onSuccess: () => {
      window.location.href = "/login";
      SuccessToast("Logout Successful");
    },
  });
};
