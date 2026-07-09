import { create } from "zustand";
import type { TrainingCourse } from "@/types";
import { MOCK_TRAINING } from "@/constants/mockData";
import { useDashboardStore } from "./dashboardStore";

interface TrainingState {
  courses: TrainingCourse[];
  selectedCourse: TrainingCourse | null;
  filter: { category?: string; difficulty?: string; search: string };
  enrollCourse: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  completeCourse: (id: string) => void;
  setSelected: (course: TrainingCourse | null) => void;
  setFilter: (filter: Partial<TrainingState["filter"]>) => void;
  getFilteredCourses: () => TrainingCourse[];
}

export const useTrainingStore = create<TrainingState>((set, get) => ({
  courses: MOCK_TRAINING,
  selectedCourse: null,
  filter: { search: "" },

  enrollCourse: (id) =>
    set((state) => ({
      courses: state.courses.map((c) =>
        c.id === id ? { ...c, enrolled: c.enrolled + 1, progress: 0 } : c
      ),
    })),

  updateProgress: (id, progress) =>
    set((state) => ({
      courses: state.courses.map((c) =>
        c.id === id ? { ...c, progress, completed: progress === 100 } : c
      ),
    })),

  completeCourse: (id) => {
    set((state) => ({
      courses: state.courses.map((c) =>
        c.id === id ? { ...c, progress: 100, completed: true } : c
      ),
    }));
    useDashboardStore.getState().incrementStat("trainingCompletion", 2);
  },

  setSelected: (course) => set({ selectedCourse: course }),

  setFilter: (filter) =>
    set((state) => ({ filter: { ...state.filter, ...filter } })),

  getFilteredCourses: () => {
    const { courses, filter } = get();
    return courses.filter((c) => {
      if (filter.category && c.category !== filter.category) return false;
      if (filter.difficulty && c.difficulty !== filter.difficulty) return false;
      if (filter.search && !c.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
      return true;
    });
  },
}));
