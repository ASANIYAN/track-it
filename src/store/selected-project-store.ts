import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProjectIDState {
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
}

export const useProjectIDStore = create<ProjectIDState>()(
  persist(
    (set) => ({
      selectedProjectId: null,
      setSelectedProjectId: (id) => set({ selectedProjectId: id }),
    }),
    {
      name: "project-id-storage",
    }
  )
);
