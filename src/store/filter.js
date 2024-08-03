import { create } from "zustand";

const useFilterStore = create((set) => ({
  author: null,
  source: null,
  sources: [],
  setSource: (source) => set({ source }),
  setAuthor: (author) => set({ author }),
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
