import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSingleProject } from "../requests/delete-requests";
import { SuccessToast } from "@/components/toast/toasts";

export const useDeleteProject = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProject"],
    mutationFn: deleteSingleProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
      SuccessToast("Project deleted Successfully", "top-left");
    },
  });
};
