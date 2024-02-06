import { create } from "zustand";
import { AllProject } from "@/types/types";

type ProjectStore = {
  projectsWithUsers: AllProject[];
  setProjectWithUsers: (newState: AllProject[]) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projectsWithUsers: [],
  setProjectWithUsers: (newState) => set({ projectsWithUsers: newState }),
}));
