import { create } from "zustand";

const useFilterStore = create((set) => ({
  sources: [],
  setSources: (source) =>
    set((state) => ({
      sources: [...state.sources, source],
    })),
  removeSource: (source) =>
    set((state) => ({
      sources: [...state.sources?.filter((s) => s !== source)],
    })),
}));

export default useFilterStore;
