import { create } from "zustand";
import { AllProject } from "@/types/types";

type ProjectStore = {
  projectsWithUsers: AllProject[];
  setProjectWithUsers: (newState: AllProject[]) => void;
  isLoading: boolean;
  setIsLoading: (newState: boolean) => void;
  isSuccess: boolean;
  setIsSuccess: (newState: boolean) => void;
  singleProject: AllProject | null;
  setSingleProject: (project: AllProject | null) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projectsWithUsers: [],
  setProjectWithUsers: (newState) => set({ projectsWithUsers: newState }),
  isLoading: false,
  setIsLoading: (newState) => set({ isLoading: newState }),
  isSuccess: false,
  setIsSuccess: (newState) => set({ isSuccess: newState }),
  singleProject: null,
  setSingleProject: (project) => set({ singleProject: project }),
}));
